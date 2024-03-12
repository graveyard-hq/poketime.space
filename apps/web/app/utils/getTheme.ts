export enum Theme {
  LIGHT,
  DARK,
}

export const getTheme = () =>
  localStorage.getItem("theme") === "dark" ? Theme.DARK : Theme.LIGHT;
