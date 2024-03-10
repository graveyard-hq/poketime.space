import { useState } from "react";
import { useTheme } from "~/hooks/useTheme";
import { Theme } from "~/utils/getTheme";

interface Props {
  className?: string;
}

export const Divider: React.FC<Props> = ({ className }: Props) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useTheme(setTheme);

  return (
    <div
      className={`border ${theme === Theme.DARK ? "border-white" : "border-black"} w-full ${className || ""}`}
    />
  );
};

export default Divider;
