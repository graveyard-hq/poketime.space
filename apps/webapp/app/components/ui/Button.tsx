import { useEffect, useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  className?: string;
  onClick?: (() => void) | (() => never);
  children?: React.ReactNode;
  type?: "button" | "submit";
  primary?: boolean;
  secondary?: boolean;
  destructive?: boolean;
  outline?: boolean;
  ghost?: boolean;
}

export const Button: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  const [className, setClassName] = useState("");

  useEffect(() => {
    if (
      (!props.primary &&
        !props.secondary &&
        !props.destructive &&
        !props.outline &&
        !props.ghost) ||
      props.primary
    )
      setClassName(
        `${theme === Theme.DARK ? "text-white bg-[#343434] hover:bg-[#494949] border-2 border-transparent" : "text-white bg-neutral-600 hover:bg-neutral-700 border-2 border-transparent"}`,
      );

    if (props.secondary)
      setClassName(
        `${theme === Theme.DARK ? "text-black bg-neutral-200 hover:bg-neutral-300 border-2 border-transparent" : "text-white bg-neutral-800 hover:bg-neutral-700 border-2 border-transparent"}`,
      );

    if (props.destructive)
      setClassName(
        `${theme === Theme.DARK ? "text-[#FFE2E2] hover:text-[#FF7373] bg-[#F34949] hover:bg-[#AF3232] border-2 border-transparent" : "text-[#FFE2E2] hover:text-[#FF7373] bg-[#F34949] hover:bg-[#AF3232] border-2 border-transparent"}`,
      );

    if (props.outline)
      setClassName(
        `${theme === Theme.DARK ? "text-white bg-[#343434] border-2 border-[#3e3e3e] hover:border-[#505050]" : "text-white bg-neutral-600 border-2 border-neutral-700 hover:border-neutral-800"}`,
      );

    if (props.ghost)
      setClassName(
        `${theme === Theme.DARK ? "text-white bg-[#131313] border-2 border-[#2B2B2B] hover:border-[#666666] hover:bg-[#666666]" : "text-black bg-white border-2 border-neutral-600 hover:bg-neutral-600 hover:text-white"}`,
      );
  }, [
    props.primary,
    props.secondary,
    props.destructive,
    props.outline,
    props.ghost,
    theme,
  ]);

  return (
    <button
      type={props.type || "button"}
      onClick={props.onClick}
      className={`p-2 rounded-[10px] select-none transition ${className} ${props.className || ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
