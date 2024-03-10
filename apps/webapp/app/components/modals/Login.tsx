import { Google } from "~/components/icons/Google";
import { Discord } from "~/components/icons/Discord";
import { Button } from "~/components/ui/Button";
import { Divider } from "~/components/ui/Divider";
import { Text } from "~/components/ui/Text";
import { XLModalLayout } from "~/layouts/modals/XLModalLayout";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";

interface Props {
  zIndex?: number;
  onClose: (() => void) | (() => never);
}

const Login: React.FC<Props> = (props: Props) => (
  <XLModalLayout
    zIndex={props.zIndex}
    onClose={() => {
      localStorage.setItem("never-show-login-modal-again", "true");
      props.onClose();
    }}
    title="Log in to PokeTime"
  >
    <Button
      secondary
      className="w-full mb-4 inline-flex items-center justify-center"
    >
      <Google className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>

    <Button
      secondary
      className="w-full inline-flex items-center justify-center"
    >
      <Discord className="mr-2 h-5 w-5" />
      Continue with Discord
    </Button>

    <div className="flex items-center mt-12 px-2">
      <Divider />
      <Text className="mx-2">Or</Text>
      <Divider />
    </div>

    <div className="mt-4">
      <Button className="w-full mb-4 inline-flex items-center justify-center">
        <EnvelopeIcon className="mr-2 h-5 w-5" />
        Continue with email
      </Button>

      <Button className="w-full mb-4 inline-flex items-center justify-center">
        <UserIcon className="mr-2 h-5 w-5" />
        Continue as a Guest
      </Button>
    </div>

    <Text className="text-[12px] mt-2 mb-10">
      By continuing with an account located in{" "}
      <span className="underline font-bold">United States</span>, you agree to
      our <span className="underline font-semibold">Terms of Service</span> and
      acknowledge that you have read our{" "}
      <span className="underline font-semibold">Privacy Policy</span>.
    </Text>

    <Divider />
    <Text className="text-center mt-4 text-[12px]">
      The PokeTime Company Limited
    </Text>
  </XLModalLayout>
);

export default Login;
