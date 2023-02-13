import { useContext } from "react";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";
import { LanguageContext } from "../../context/LanguageWrapper";

export default function LanguageSelector() {
  const { themeColor } = useContext(ThemeColorContext);
  const { selectLanguage } = useContext(LanguageContext);

  return (
    <div className={`LanguageSelector ${themeColor}`}>
      <img
        className={`flag ${themeColor}`}
        onClick={() => selectLanguage("en")}
        alt="en"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg"
      />
      <img
        className={`flag ${themeColor}`}
        onClick={() => selectLanguage("es")}
        alt="es"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg"
      />
      <img
        className={`flag ${themeColor}`}
        onClick={() => selectLanguage("zh")}
        alt="zh"
        src="http://purecatamphetamine.github.io/country-flag-icons/3x2/CN.svg"
      />
    </div>
  );
}
