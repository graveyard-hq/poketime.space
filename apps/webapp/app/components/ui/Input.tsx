import { useState } from "react";
import { Theme } from "~/utils/getTheme";
import { useTheme } from "~/hooks/useTheme";

interface Props {
  className?: string;
  value?: string;
  type?: "text" | "email" | "password";
  placeholder?: string;
  valueBinder?: ((newValue: string) => void) | ((newValue: string) => never);
}

export const Input: React.FC<Props> = (props: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <input
      type={props.type || "text"}
      placeholder={props.placeholder}
      className={`p-2 duration-150 rounded-lg ${theme === Theme.DARK ? "bg-neutral-200 hover:bg-neutral-100 active:bg-neutral-300 text-black" : "bg-black hover:bg-neutral-800 active:bg-neutral-700 text-white"} ${props.className || ""}`}
      onInput={(event) => {
        if (props.valueBinder) props.valueBinder(event.currentTarget.value);
      }}
    />
  );
};

export default Input;
