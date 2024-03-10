import { XMark } from "~/components/icons/XMark";
import { PokeTime } from "~/components/icons/PokeTime";
import { useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  zIndex?: number;
  title?: string;
  onClose: (() => void) | (() => never);
  children?: React.ReactNode;
}

export const Modal: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <div
      className={`absolute-center border-2 ${theme === Theme.DARK ? "border-white" : "border-black"} rounded-lg p-3`}
      style={{ zIndex: props.zIndex || 5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <div
          className={`inline-flex ${theme === Theme.DARK ? "text-white" : "text-black"}`}
        >
          <PokeTime className="mr-1" />
          <p>{props.title || "Modal"}</p>
        </div>

        <button onClick={props.onClose} className="cursor-pointer">
          <XMark
            className={theme === Theme.DARK ? "text-white" : "text-black"}
          />
        </button>
      </div>
      <div
        className={`border ${theme === Theme.DARK ? "border-white" : "border-black"} w-full mb-4`}
      />

      {props.children}
    </div>
  );
};

export default Modal;
