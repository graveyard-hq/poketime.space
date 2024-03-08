package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/google/uuid"
)

func main() {
	app := fiber.New()
	app.Use(logger.New())

	endpoint := os.Getenv("S3_ENDPOINT")
	region := os.Getenv("S3_REGION")
	bucket := os.Getenv("S3_BUCKET")
	accessKey := os.Getenv("S3_ACCESS_KEY")
	secretKey := os.Getenv("S3_ACCESS_SECRET_KEY")

	if endpoint == "" || region == "" || bucket == "" || accessKey == "" || secretKey == "" {
		log.Fatalln("One or more S3 environment variables are missing.")
	}

	sess, err := session.NewSession(&aws.Config{
		Endpoint:         aws.String(endpoint),
		Region:           aws.String(region),
		Credentials:      credentials.NewStaticCredentials(accessKey, secretKey, ""),
		S3ForcePathStyle: aws.Bool(true),
		DisableSSL:       aws.Bool(false),
	})

	if err != nil {
		log.Fatalf("Error creating S3 session: %v\n", err)
	}

	s3Client := s3.New(sess)

	app.Post("/v1/upload", func(c *fiber.Ctx) error {
		form, err := c.MultipartForm()
		if err != nil {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request payload"})
		}

		files := form.File["file"]
		if len(files) == 0 {
			return c.Status(http.StatusBadRequest).JSON(fiber.Map{"error": "No files uploaded"})
		}

		var streamableURLs []string

		for _, file := range files {
			src, err := file.Open()
			if err != nil {
				return err
			}
			defer src.Close()

			tmpDir := "./tmp"
			if err := os.MkdirAll(tmpDir, 0755); err != nil {
				return err
			}

			dstFileName := filepath.Join(tmpDir, file.Filename)
			dst, err := os.Create(dstFileName)
			if err != nil {
				return err
			}
			defer dst.Close()

			if _, err := io.Copy(dst, src); err != nil {
				return err
			}

			hlsDir := filepath.Join(tmpDir, "hls")
			if err := os.MkdirAll(hlsDir, 0755); err != nil {
				return err
			}

			hlsOutput := filepath.Join(hlsDir, fmt.Sprintf("s3_%s.m3u8", uuid.New().String()))
			cmd := exec.Command("ffmpeg", "-i", dstFileName, "-c:a", "aac", "-c:v", "h264", "-hls_time", "10", "-hls_list_size", "0", hlsOutput)
			if err := cmd.Run(); err != nil {
				return err
			}

			hlsFiles, err := filepath.Glob(filepath.Join(hlsDir, "*"))
			if err != nil {
				return err
			}

			for _, hlsFile := range hlsFiles {
				file, err := os.Open(hlsFile)
				if err != nil {
					return err
				}
				defer file.Close()

				key := strings.TrimPrefix(hlsFile, tmpDir+"/")
				_, err = s3Client.PutObject(&s3.PutObjectInput{
					Bucket: aws.String(bucket),
					Key:    aws.String(key),
					Body:   file,
				})
				if err != nil {
					return err
				}

				streamableURL := fmt.Sprintf("%s/%s/%s", endpoint, bucket, key)
				streamableURLs = append(streamableURLs, streamableURL)
			}
		}

		return c.Status(http.StatusOK).JSON(fiber.Map{"message": "success", "streamable_urls": streamableURLs})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Printf("Server is running on port %s\n", port)
	log.Fatal(app.Listen(":" + port))
}
