import { XMarkIcon } from "@heroicons/react/24/outline";
import { PokeTime } from "~/components/icons/PokeTime";
import { Text } from "~/components/ui/Text";
import { useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  zIndex?: number;
  title?: string;
  onClose: (() => void) | (() => never);
  children?: React.ReactNode;
  className?: string;
}

export const BigModal: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  const [isClosing, setIsClosing] = useState(false);

  return (
    <div
      className={`absolute-center ${theme === Theme.DARK ? "bg-neutral-800" : "bg-neutral-200"} border-2 border-[#4B4B4B] rounded-lg px-16 py-8 max-w-[38rem] duration-150 transition-opacity ${isClosing ? "opacity-0" : ""} ${props.className || ""}`}
      style={{ zIndex: props.zIndex || 5 }}
    >
      <div className="flex justify-between mb-2">
        <div />

        <button
          onClick={() => {
            setIsClosing(true);
            setTimeout(() => props.onClose(), 150);
          }}
          className="cursor-pointer"
        >
          <XMarkIcon
            className={`size-5 ${theme === Theme.DARK ? "text-[#767676]" : "text-black"}`}
          />
        </button>
      </div>

      <div className="mb-12">
        <div className="flex justify-center">
          <PokeTime className="size-16 mb-10" />
        </div>

        <Text className="flex justify-center text-2xl">
          {props.title || "Big Modal"}
        </Text>
      </div>

      {props.children}
    </div>
  );
};

export default BigModal;
