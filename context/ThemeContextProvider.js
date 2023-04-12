import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [state, setState] = useState({
    light: {
      headerColor: "#E3DFFD",
      bodyColor: "#EEEEEE",

      todoColor: "white",

      tableColor: "white",

      headerTextColor: "black",
      bodyTextColor: "black",
    },
    dark: {
      headerColor: "#13005A",
      bodyColor: "#00337C",

      todoColor: "#01316e",
      tableColor: "#01316e",

      headerTextColor: "white",
      bodyTextColor: "white",
    },
    active: "dark",
  });

  const changeTheme = (theme) => {
    setState({ ...state, active: theme });
  };

  return (
    <ThemeContext.Provider value={{ ...state, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;