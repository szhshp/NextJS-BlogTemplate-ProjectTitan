import * as React from "react";
import { Post, PostRenderMode } from "types/postTypes";
import { posts, getPostPath } from "utils/getPost";
import PostTemplate from "components/PostTemplate";
import { useRouter } from "next/router";
import { logger } from "utils/logger";
import { COMPONENT_CONFIG } from "data/config";
import { GetStaticPaths, GetStaticProps } from "next";

/**
 * @name [...postRoute].tsx
 * @description Main Post Route
 *  Routes Pattern: /{category}/{year}/{month}/{day}/{fileName}
 */
export const PostRoute = ({ frontmatter, markdownBody }: Post): JSX.Element => {
  const router = useRouter();
  if (!frontmatter) router.push("/404");

  return (
    <PostTemplate
      title={frontmatter.title}
      date={frontmatter.date}
      category={frontmatter.category}
      tags={frontmatter.tags}
      content={markdownBody}
      postRenderMode={PostRenderMode.NormalMarkdownPost}
    />
  );
};

const Post404Props = {
  frontmatter: {
    title: "",
    date: "",
    category: "",
    hide: false,
  },
  postRoute: "",
  markdownBody: "",
} as Post;

/**
 * @name getStaticProps
 * @description Determine which file to read based on route in URL
 */
export const getStaticProps: GetStaticProps<Post, any> = async ({ params }) => {
  /**
   * @example possible route format:
   * - /tech/2015/12/12/dateformatinjekyll
   */

  const postRoute = params?.postRoute as string[];
  if (COMPONENT_CONFIG.ROUTES.POST.LOGGER) logger(`Pre Route: ${postRoute}`);

  /**
   * @example finalRoute: normal route + route with extension
   * - dateformatinjekyll
   */
  const routeWithExtension = postRoute[postRoute.length - 1];
  if (COMPONENT_CONFIG.ROUTES.POST.LOGGER)
    logger(`Route with extension: ${routeWithExtension}`);

  if (!postRoute || !routeWithExtension) {
    return {
      props: Post404Props,
    };
  }

  /**
   * user may access the legacy route with extension
   * remove the extension and find the md file
   */
  const finalRoute = routeWithExtension.replace(".html", "");
  if (COMPONENT_CONFIG.ROUTES.POST.LOGGER) {
    logger(`Final Route: ${finalRoute}`);
  }

  return {
    props: posts.find((e) => e.postRoute === finalRoute) || Post404Props,
  };
};

/**
 * @name getStaticPaths
 * @description Generate all valid route based on all posts yaml header
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = posts
    /**
     * @return string[]
     * @example ['/tech/2015/12/12/dateformatinjekyll','/tech/2020/08/12/postName',...]
     */
    .map((post) => getPostPath(post))
    /**
     * @return string[][]
     * @example [["tech", "2015", "12", "12", "dateformatinjekyll"],["tech", "2020", "08", "12", "postName"],...]
     */
    .map((postPath) => postPath.split("/").filter((e) => e.length > 0))
    /**
     * @description Add possible extension in final route
     * @return string[][]
     * @example
     * [
     *    [
     *      { params: { postRoute: ["tech", "2015", "12", "12", "dateformatinjekyll"] } },
     *    ],
     *    ...
     * ]
     */
    .map((routeElements) => [
      { params: { postRoute: routeElements } },
      /**
       * Routes with html extension are already handled in next.config.js
       * No need to do extra action here
       */
      // { params: { postRoute: routeElementsWithExtension } },
    ])
    .reduce((prev, curr) => [...prev, ...curr], []);

  return {
    paths,
    fallback: false,
  };
};

export default PostRoute;
