const MY_NAME = "szhshp";
const HEAD_IMAGE_URL = "/img/headshot.png";

export const SITE_CONFIG = {
  title: {
    zh: "Project Titan",
    en: "Project Titan",
  },
  keywords: "szhshp,project titan",
  headImageUrl: HEAD_IMAGE_URL,
  author: MY_NAME,
  motto: "6sheep, to be different. ",
  host: "https://szhshp.org",
  font: {
    active: false /* Disabled 2020-12 */,
    fontName: "Cascadia",
    fileExt: "woff2",
  },
  componentsConfig: {
    postContentTOC: {
      id: "post-Content-Toc",
    },
  },
};

const IS_DEV_ENV = process.env.NEXT_PUBLIC_ENV === "development";

/**
 * @name COMPONENT_CONFIG
 * @description set as true to show
 */
export const COMPONENT_CONFIG = {
  ROUTES: {
    POST: {
      LOGGER: IS_DEV_ENV,
    },
  },
  APP: {
    MAIN_CONTENT: {
      FOOTER: 1,
      POST: {
        POST_CONTENT: 1,
        POST_DESC: 1,
        COMMENTBOX: 1,
      },
      JUMBOTRON: 1,
      SHOWCASE: 1,
      POST_LIST: 1,
    },
  },
};
