import React from "react";
import { displayablePosts, getPostPath } from "utils/getPost";
import { SITE_CONFIG } from "data/config";
import { Post } from "types/postTypes";
import moment from "moment";

const { host } = SITE_CONFIG;

/**
 * @name createSitemap
 * @description
 *  Generates sitemap based on the specfied routes
 * @param links
 */
const createSitemap = (
  links: {
    loc: string;
    lastmod: Date;
  }[]
): string =>
  [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">",
    ...links.map(
      ({ loc, lastmod }) => `
    <url>
      <loc>${host}${loc}</loc>
      <lastmod>${lastmod}</lastmod>
    </url>`
    ),
    "</urlset>",
  ].join("");

/**
 * @name SiteMap
 * Do not change it to FC Components
 * To make it working we need to delete 'next export' in build script in package.json
 *
 * @description The sitemap component
 *  Collect all routes (dynamic routes for posts + static route for other pages)
 */
class SiteMap extends React.Component {
  static async getInitialProps({ res }): Promise<void> {
    const postRoutes = Object.keys(displayablePosts)
      .map((category) =>
        displayablePosts[category].map((post: Post) => ({
          loc: getPostPath(post),
          lastmod: post.frontmatter.date,
        }))
      )
      .flat();

    const pageRoutes = ["/about", "/categories"].map((e) => ({
      loc: e,
      lastmod: moment().format("YYYY-MM-DD"),
    }));

    res.setHeader("Content-Type", "text/xml");
    /* Generate xml and write to response */
    res.write(createSitemap([...postRoutes, ...pageRoutes]));
    res.end();
  }
}

export default SiteMap;
