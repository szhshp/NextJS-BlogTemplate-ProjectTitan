import * as React from "react";
import { Post } from "types/postTypes";
import { posts, getPostPath } from "utils/getPost";
import PostTemplate from "components/PostTemplate";
import { useRouter } from "next/router";
import { logger } from "utils/logger";

/**
 * @name [...slug].tsx
 * @description Main Post Route
 */

const DEBUG_MODE_SINGLE_PAGE = 0;

type PostProps = {
  props?: Post;
};

export const PostPage = ({ frontmatter, markdownBody }: Post): JSX.Element => {
  const router = useRouter();
  if (!frontmatter) router.push("/404");

  return (
    <PostTemplate
      title={frontmatter.title}
      date={frontmatter.date}
      category={frontmatter.category}
      tags={frontmatter.tags}
      content={markdownBody}
    />
  );
};

/**
 * @name getStaticProps
 * @description Determine which file to read per provided route
 */
export const getStaticProps: {
  ({ ...ctx }): Promise<PostProps>;
} = async ({ ...ctx }) => {
  /**
   * @example possible slug format:
   * - /tech/2015/12/12/dateformatinjekyll.html
   * - /tech/2015/12/12/dateformatinjekyll
   */

  const { slug }: { slug: string[] } = ctx.params;
  if (DEBUG_MODE_SINGLE_PAGE) logger("Slug By Requested Route", slug);

  /**
   * @example get final slug:
   * - dateformatinjekyll.html
   * - dateformatinjekyll
   */
  const finalRouteSlug = slug.pop();

  if (!slug || !finalRouteSlug) {
    return {
      props: undefined,
    };
  }

  /* remove the extension and find the md file */
  const pureSlug = finalRouteSlug.replace(".html", "");
  if (DEBUG_MODE_SINGLE_PAGE) {
    logger("FileName By Requested Route", pureSlug);
  }

  return {
    props: posts.find((e) => e.slug === pureSlug) || undefined,
  };
};

/**
 * @name getStaticPaths
 * @description Generate all valid route based on all posts yaml header
 */
export const getStaticPaths = async (): Promise<any> => {
  const paths: {
    params: {
      slug: string[];
    };
  }[] = posts
    /**
     * @return string[][]
     * @example [['/life/2018/08/12/postName'],['/tech/2020/08/12/postName'],...]
     */
    .map((post) => [getPostPath(post)])
    /**
     * @return string[]
     * @example ['/life/2018/08/12/postName','/tech/2020/08/12/postName',...]
     */
    .reduce((prev, curr) => [...prev, ...curr], [])
    /**
     * @return string[][]
     * @example [[life", "2018", "08", "12", "postName"],[...]]
     */
    .map((postPath) => postPath.split("/").filter((e) => e.length > 0))
    /**
     * @return string[][]
     * @example [{params: [life", "2018", "08", "12", "postName"]},{...}]
     */
    .map((postPath) => {
      if (DEBUG_MODE_SINGLE_PAGE) logger("Post Path Slug", postPath);
      return { params: { slug: postPath } };
    });

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
