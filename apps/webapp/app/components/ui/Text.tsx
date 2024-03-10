import { useState } from "react";
import { useTheme } from "~/hooks/useTheme";
import { Theme } from "~/utils/getTheme";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const Text: React.FC<Props> = ({ className, children }: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <p
      className={`${theme === Theme.DARK ? "text-white" : "text-black"} ${className || ""}`}
    >
      {children}
    </p>
  );
};

export default Text;
