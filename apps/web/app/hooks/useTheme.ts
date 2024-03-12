import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getTheme, Theme } from "~/utils/getTheme";

export const useTheme = (themeSetter: Dispatch<SetStateAction<Theme>>) => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  useEffect(() => {
    setInterval(() => {
      const newTheme = getTheme();

      if (theme !== newTheme) {
        setTheme(newTheme);
        themeSetter(newTheme);
      }
    });
  }, [theme, themeSetter]);
};

export default useTheme;
