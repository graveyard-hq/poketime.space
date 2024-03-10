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
      className={`p-2 duration-150 rounded-lg shadow-lg active:shadow-none shadow-neutral-600 ${theme === Theme.DARK ? "bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-300 text-black" : "bg-black hover:bg-neutral-800 active:bg-neutral-700 text-white"} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
