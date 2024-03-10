import { useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  className?: string;
  onClick?: (() => void) | (() => never);
  children?: React.ReactNode;
  type?: "button" | "submit";
}

export const Button: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`p-2 duration-150 rounded-[10px] ${theme === Theme.DARK ? "text-white bg-[#343434] border-2 border-[#383838] hover:border-[#4b4b4b]" : "text-white bg-neutral-600 hover:bg-neutral-700 border-2"} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
