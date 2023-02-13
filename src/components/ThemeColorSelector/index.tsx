import { useContext } from "react";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";

export default function ThemeColorSelector() {
  const { themeColor, setThyThemeColor } = useContext(ThemeColorContext);

  return (
    <div className="ThemeColorSelector">
      <label htmlFor="themeColor" className={themeColor}>
        <span className="theme__toggle__wrap">
          <input
            type="checkbox"
            className={`theme__toggle ${themeColor}`}
            id="themeColor"
            role="switch"
            name="themeColor"
            value={themeColor}
            onChange={() => setThyThemeColor(themeColor)}
            checked={themeColor === "dark"}
          />
          <span className={`theme__fill ${themeColor}`} />
          <span className={`theme__icon ${themeColor}`}>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
            <span className={`theme__icon__part ${themeColor}`}></span>
          </span>
        </span>
      </label>
    </div>
  );
}
