/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "types/theme";
import dynamic from "next/dynamic";

/**
 * Global CSS, only put global css here, all global css will be rendered into single css
 * Those are small css files, not need to convert them into component level css
 * @see https://nextjs.org/docs/basic-features/built-in-css-support#adding-a-global-stylesheet
 */
import "highlight.js/styles/rainbow.css";
import "tocbot/src/scss/tocbot.scss";
import "react-image-lightbox/style.css";
import Footer from "components/Footer";
import { COMPONENT_CONFIG, SITE_CONFIG } from "data/config";

const SHOW_COMPONENT = COMPONENT_CONFIG.APP;

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    /* Remove the server-side injected CSS. */
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta name="keywords" content={SITE_CONFIG.keywords} />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        {SHOW_COMPONENT.MAIN_CONTENT.FOOTER && <Footer />}
      </ThemeProvider>
    </>
  );
};

export default App;
