import { XMarkIcon } from "@heroicons/react/24/outline";
import { PokeTime } from "~/components/icons/PokeTime";
import { Divider } from "~/components/ui/Divider";
import { useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  zIndex?: number;
  title?: string;
  onClose: (() => void) | (() => never);
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const SmModalLayout: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <div
      className={`absolute-center ${theme === Theme.DARK ? "bg-neutral-800" : "bg-neutral-200"} rounded-lg p-3 ${props.className || ""}`}
      style={{ zIndex: props.zIndex || 5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className={`inline-flex ${theme === Theme.DARK ? "text-white" : "text-black"}`}
        >
          {props.icon || <PokeTime className="mr-1 size-5" />}
          <p>{props.title || "Modal"}</p>
        </div>

        <button onClick={props.onClose} className="cursor-pointer">
          <XMarkIcon
            className={`size-5 ${theme === Theme.DARK ? "text-white" : "text-black"}`}
          />
        </button>
      </div>

      <Divider className="mb-4" />

      {props.children}
    </div>
  );
};

export default SmModalLayout;
