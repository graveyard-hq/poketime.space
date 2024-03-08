import * as crypto from 'crypto';
import { CONSTANTS } from '../config/config';

class CryptoUtil {
    private static secretKey: string = CONSTANTS.AES_SECRET_KEY;

    encryptAES(text: string, iv: string): string {
        const cipher = crypto.createCipheriv('aes-256-cbc', CryptoUtil.secretKey, iv);
        return Buffer.from(cipher.update(text, 'utf8', 'hex') + cipher.final('hex')).toString(
            'base64',
        );
    }

    decryptAES(encryptedText: string, iv: string): string {
        const decipher = crypto.createDecipheriv('aes-256-cbc', CryptoUtil.secretKey, iv);
        return decipher.update(encryptedText, 'base64', 'utf8') + decipher.final('utf8');
    }

    generateHMAC(message: string, secretKey: string): string {
        const hmac = crypto.createHmac('sha256', secretKey);
        hmac.update(message);
        return hmac.digest('hex');
    }

    validateHMAC(message: string, secretKey: string, expectedHMAC: string): boolean {
        const generatedHMAC = this.generateHMAC(message, secretKey);
        return generatedHMAC === expectedHMAC;
    }

    generateRandomIV() {
        return crypto.randomBytes(16);
    }

    generateRandomKey(length: number = 32): string {
        return crypto.randomBytes(length).toString('base64');
    }

    generateRandomToken(length: number = 32): string {
        return crypto.randomBytes(length).toString('hex');
    }

    generateRandomUUID(): string {
        return crypto.randomUUID();
    }

    signData(data: string, privateKey: string): string {
        const sign = crypto.createSign('SHA256');
        sign.update(data);
        return sign.sign(privateKey, 'base64');
    }

    verifySignature(data: string, signature: string, publicKey: string): boolean {
        const verify = crypto.createVerify('SHA256');
        verify.update(data);
        return verify.verify(publicKey, signature, 'base64');
    }

    hashData(data: string, algorithm: string = 'sha256'): string {
        const hash = crypto.createHash(algorithm);
        hash.update(data);
        return hash.digest('hex');
    }

    validateHash(data: string, expectedHash: string, algorithm: string = 'sha256'): boolean {
        const calculatedHash = this.hashData(data, algorithm);
        return calculatedHash === expectedHash;
    }
}

const cryptoUtil = new CryptoUtil();

export { cryptoUtil };
