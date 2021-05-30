import { createMuiTheme } from "@material-ui/core/styles";
import { grey, common } from "@material-ui/core/colors";
import { SITE_CONFIG } from "data/config";

/**
 * @name headerStyles
 * @description Loop to get the styles for h1-h6
 */
const headerStyles = {};

[
  /* [fontSize(rem), fontWeight, marginTop(rem), paddingBottom(rem), color] */
  [2, 500, 3, 1],
  [1.8, 500, 3, 1, "#7986cb"],
  [1.5, 500, 2, 0, "#7986cb"],
  [1.3, 500, 1.5, 0],
  [1.2, 300, 1.3, 0],
  [1.2, 300, 1, 0],
].forEach((e, index) => {
  headerStyles[`h${index + 1}`] = {
    margin: 0,
    fontSize: `${e[0]}rem`,
    fontWeight: e[1],
    marginTop: `${e[2]}rem`,
    paddingBottom: `${e[3]}rem`,
    color: e[4] ? [e[4], "!important"] : "inherit",
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
  overrides: {
    MuiCssBaseline: {
      "@global": SITE_CONFIG.font.active
        ? {
            "@font-face": {
              fontFamily: SITE_CONFIG.font.fontName,
              src: `url("/fonts/${SITE_CONFIG.font.fontName}.${SITE_CONFIG.font.fileExt}")`,
            },
          }
        : {},
    },
  },
  typography: {
    /* custom fonts weight */
    /* ...{
      fontWeightRegular: 300,
      fontWeightLight: 300,
    }, */
    fontSize: 14,
    fontFamily: [
      SITE_CONFIG.font.active ? SITE_CONFIG.font.fontName : undefined,
      "Hiragino Sans GB",
      "Heiti SC",
      "WenQuanYi Micro Hei",
      "Source Han Sans SC",
      "Noto Sans CJK SC",
      "HanHei SC",
      "PingFang SC",
      "Microsoft YaHei",
      "-apple-system",
      "BlinkMacSystemFont",
      "Helvetica Neue",
      "sans-serif",
      "Segoe UI",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Apple Color Emoji",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    ...headerStyles,
    caption: {
      fontSize: "0.8rem",
      color: "#9a9a9a",
    },
  },
  palette: {
    common,
    background: { paper: common.white, default: grey[50] },
    primary: {
      light: "#7986cb",
      main: "#3f51b5",
      dark: "#303f9f",
      contrastText: common.white,
    },
    secondary: {
      light: "rgba(248, 231, 28, 1)",
      main: "rgba(245, 166, 35, 1)",
      dark: "rgba(211, 139, 21, 1)",
      contrastText: common.white,
    },
    grey,
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: common.white,
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: grey[700],
    },
  },
});

export default theme;
