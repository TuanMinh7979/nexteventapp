import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContextProvider";

const ToggleThemeBtn = () => {
  const { active, changeTheme } = useContext(ThemeContext);

  const hdlChangeTheme = () => {
    if (active === "light") {
      changeTheme("dark");
    } else if (active === "dark") {
      changeTheme("light");
    }
  };

  return (
    <label className="switch">
      <input id="themeCb" type="checkbox" onChange={hdlChangeTheme} />
      <div className="slider"></div>
    </label>
  );
};

export default ToggleThemeBtn;
