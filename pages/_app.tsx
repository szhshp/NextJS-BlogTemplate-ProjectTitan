/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "types/theme";

/**
 * Global CSS, only put global css here, all global css will be rendered into single css
 * Those are small css files, not need to convert them into component level css
 * @see https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet
 */
import "highlight.js/styles/monokai.css";
import "emoji-mart/css/emoji-mart.css";
import "tocbot/src/scss/tocbot.scss";
import "react-image-lightbox/style.css";
import { useStyles } from "styles/styles";
import { Router } from "next/router";
import { LinearProgress } from "@material-ui/core";

const DEBUG_MODE_SINGLE_PAGE = 0;

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  React.useEffect(() => {
    /* Remove the server-side injected CSS. */
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    /* Route change events */
    Router.events.on("routeChangeStart", () => setLoading(true));
    Router.events.on("routeChangeComplete", () => setLoading(false));
    Router.events.on("routeChangeError", () => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* Show loading progress bar when changing route */}
      {loading && <LinearProgress className={classes.loadingProgress} />}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {DEBUG_MODE_SINGLE_PAGE >= 0 && <Component {...pageProps} />}
      </ThemeProvider>
    </>
  );
};

export default App;
