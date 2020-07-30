import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

/**
 * @name headerStyles
 * @description Loop to get the styles for h1-h6
 */
const headerStyles = {};

[
  /** @example [fontSize(rem), fontWeight] */
  [2.2, 500],
  [1.6, 500],
  [1.5, 500],
  [1.2, 500],
  [1.2, 300],
  [1.2, 300],
].forEach((e, index) => {
  headerStyles[`h${index + 1}`] = {
    fontSize: `${e[0]}rem`,
    fontWeight: e[1],
    "&:focus": {
      outlineColor: "#ff98006e",
    },
  };
});

/**
 * @name theme
 * @description Reused theme object
 */
const theme = createMuiTheme({
  typography: {
    fontSize: 14,
    fontFamily: [
      "Source Han Sans SC",
      "Noto Sans CJK SC",
      "HanHei SC",
      "-apple-system",
      "BlinkMacSystemFont",
      "\"Segoe UI\"",
      "Roboto",
      "\"Helvetica Neue\"",
      "Arial",
      "sans-serif",
      "\"Apple Color Emoji\"",
      "\"Segoe UI Emoji\"",
      "\"Segoe UI Symbol\"",
    ].join(","),
    ...headerStyles,
    caption: {
      fontSize: "0.8rem",
      color: "#9a9a9a",
    },
  },
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(248, 231, 28, 1)",
      main: "rgba(245, 166, 35, 1)",
      dark: "rgba(211, 139, 21, 1)",
      contrastText: "#fff",
    },
    grey,
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "#555",
    },
  },
});

export default theme;
