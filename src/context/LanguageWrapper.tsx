import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";
import Spanish from "../languages/es.json";
import Chinese from "../languages/zh.json";

export type LanguageJson = typeof English;

export const LanguageContext = createContext({
  language: "",
  selectLanguage: (lang: string) => {
    void lang;
  },
});

const globalNavigatorLanguage = global.navigator?.language;
const getDefaultLanguage = () => {
  const localStorageLanguage = localStorage.getItem("default-language");
  return localStorageLanguage || globalNavigatorLanguage;
};

const language = getDefaultLanguage();

const LanguageWrapper: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [locale, setLocale] = useState(getDefaultLanguage());
  const defaultLocale = "en";

  function selectLanguage(lang: string) {
    setLocale(lang);
    typeof window !== "undefined" &&
      localStorage.setItem("default-language", lang);
  }

  const messages = useMemo(() => {
    switch (locale) {
      case "en":
        return English;
      case "es":
        return Spanish;
      case "zh":
        return Chinese;
      default:
        return English;
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      <IntlProvider
        messages={messages as Record<string, string>}
        locale={locale || "en"}
        defaultLocale={defaultLocale}
      >
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export default LanguageWrapper;
