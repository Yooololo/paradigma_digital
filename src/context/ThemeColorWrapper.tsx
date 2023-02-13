import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useState,
} from "react";

export const ThemeColorContext = createContext({
  themeColor: "dark",
  setThyThemeColor: (themeColor: string) => {
    void themeColor;
  },
});

const ThemeColorWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const isBrowserDefaultDark = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getDefaultTheme = () => {
    const localStorageTheme =
      typeof window !== "undefined" &&
      localStorage.getItem("default-themeColor");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };
  const [themeColor, setThemeColor] = useState(getDefaultTheme());
  const setThyThemeColor = (themeColor: string) => {
    setThemeColor(themeColor === "dark" ? "light" : "dark");
    typeof window !== "undefined" &&
      localStorage.setItem(
        "default-themeColor",
        themeColor === "light" ? "dark" : "light"
      );
  };
  return (
    <ThemeColorContext.Provider value={{ themeColor, setThyThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};

export default ThemeColorWrapper;
