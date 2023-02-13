import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeColorContext } from "../../context/ThemeColorWrapper";
import LanguageSelector from "../LanguageSelector";
import ThemeColorSelector from "../ThemeColorSelector";

const NavBar = () => {
  const { themeColor } = useContext(ThemeColorContext);

  return (
    <div className={`NavBar ${themeColor}`}>
      <NavLink to={"/"}>
        <img src={require("../../assets/podcaster.png")} alt="podcaster" />
        Podcaster
      </NavLink>
      <ThemeColorSelector />
      <LanguageSelector />
    </div>
  );
};

export default NavBar;
