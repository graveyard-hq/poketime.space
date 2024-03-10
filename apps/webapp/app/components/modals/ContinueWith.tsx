import { useState } from "react";
import { Google } from "~/components/icons/Google";
import { Discord } from "~/components/icons/Discord";
import { LeftArrow } from "~/components/icons/LeftArrow";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Divider } from "~/components/ui/Divider";
import { Text } from "~/components/ui/Text";
import { Modal } from "~/components/ui/Modal";

interface Props {
  zIndex?: number;
  onClose: (() => void) | (() => never);
}

const ContinueWith: React.FC<Props> = (props: Props) => {
  const [currentPage, setCurrentPage] = useState<"sign in" | "sign up">(
    "sign in",
  );

  const signin = () => {
    console.log("signin();");
  };

  const signup = () => {
    console.log("signup();");
  };

  return (
    <>
      {currentPage === "sign in" && (
        <Modal zIndex={props.zIndex} onClose={props.onClose} title="Sign in">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signin();
            }}
          >
            <div className="mb-2">
              <Input placeholder="Email" className="mb-2 w-full" />
              <Input
                placeholder="Password"
                type="password"
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <div className="flex items-center my-2">
              <Divider />
              <Text className="mx-2">or</Text>
              <Divider />
            </div>

            <Button className="w-full mb-2 inline-flex items-center justify-center">
              Continue with <Google className="ml-2 h-5 w-5" />
            </Button>
            <Button className="w-full mb-2 inline-flex items-center justify-center">
              Continue with <Discord className="ml-2 h-5 w-5" />
            </Button>
            <Button
              className="w-full"
              onClick={() => setCurrentPage("sign up")}
            >
              Create account
            </Button>
          </form>
        </Modal>
      )}

      {currentPage === "sign up" && (
        <Modal
          zIndex={props.zIndex}
          onClose={props.onClose}
          title="Sign up"
          className="w-[30%]"
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              signup();
            }}
          >
            <div className="mb-2">
              <Input placeholder="Email" type="email" className="w-full mb-2" />
              <Input placeholder="Username" className="w-full mb-2" />
              <Input
                placeholder="Password"
                type="password"
                className="w-full"
              />
            </div>

            <div className="flex">
              <Button
                className="mr-2"
                onClick={() => setCurrentPage("sign in")}
              >
                <LeftArrow className="text-invert" />
              </Button>

              <Button type="submit" className="w-full">
                Sign up
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default ContinueWith;
