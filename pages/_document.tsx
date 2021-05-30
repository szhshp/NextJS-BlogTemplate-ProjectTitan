import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "types/theme";
import { ServerStyleSheets } from "@material-ui/core";
import React from "react";
import { SITE_CONFIG } from "data/config";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render = (): JSX.Element => (
    <Html>
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
        {/* Do not put title here, title is managed per page */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles/materialIcon.css" />

        {/* DNS Prefetch */}
        {[
          "titan.szhshp.org",
          "i.picsum.photos",
          "i.imgur.com",
        ].map((e) => (
          <link rel="dns-prefetch" href={e} key={e} />
        ))}

        {SITE_CONFIG.font.active === true && (
          <link
            rel="preload"
            href={`/fonts/${SITE_CONFIG.font.fontName}.${SITE_CONFIG.font.fileExt}`}
            as="font"
            crossOrigin=""
          />
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
