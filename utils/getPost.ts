import { Post } from "types/postTypes";
import matter from "gray-matter";
import moment from "moment";
import { logger } from "utils/logger";

const colorLabelOrder = ["primary", "secondary"];
const postDateFormatCandidate = ["YYYY-M-DD", "YYYY-M-D", "YYYY-MM-D", "YYYY-MM-DD"];
const postDateFormatFormal = "YYYY-MM-DD";
/**
 * getPost
 * @param context fileStream
 *
 * Read and progress the raw markdown from the file path
 */
export const getPost: {
  (context): Post[];
} = (context) => {
  const keys = context.keys();
  const values = keys.map(context);

  const data: Post[] = keys.map((key, index) => {
    // Create postRoute from filename
    const postRoute = key
      .replace(/^.*[\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".");
    const value: {
      default: string;
    } = values[index];
    // Parse yaml metadata & markdownbody in document
    const document = matter(value.default);
    const date = moment(document.data.date, postDateFormatCandidate, true);
    if (!date.isValid()) {
      logger({
        type: "error",
        message: `Invalid Date From Header: ${document.data.date}, PostRoute: ${postRoute}`,
      });
    }
    return {
      frontmatter: {
        ...document.data,
        date: date.format(postDateFormatFormal),
      },

      markdownBody: document.content,
      postRoute,
    };
  });
  return data;
};

/**
 * getLegacyPostPath
 * @param post
 *
 * Return the post path in legacy jekyll style
 *
 * 2015-03-02-postName -> 2015/03/02/postName
 */
export const getLegacyPostPath: {
  (post: Post): string;
} = (post) => {
  const {
    frontmatter: { date, category },
    postRoute,
  } = post;

  const legacyPostPath = [
    "",
    category ? category.toLocaleLowerCase() : undefined,
    ...date.split("-"),
    postRoute,
  ]
    .filter((e) => e !== undefined)
    .join("/");

  return legacyPostPath;
};


export const postSort = (a: Post, b: Post): number => {
  /* Sort: order by color, date */
  const colorA = a.frontmatter.color || "";
  const colorB = b.frontmatter.color || "";

  return (
    colorLabelOrder.indexOf(colorB) - colorLabelOrder.indexOf(colorA)
    || moment(b.frontmatter.date).diff(moment(a.frontmatter.date))
  );
};

/**
 * The directly ALL POST data, sort by date and color
 */
export const posts: Post[] = getPost(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (require as any).context("../posts", true, /\.md$/),
).sort(postSort);

/**
 * The posts data excluded hidden posts
 */
export const displayablePosts = posts.filter(
  (e) => e.frontmatter.hide !== true,
);

export const getPostByCategory = ({
  categories = [],
  tags = [],
}: {
  categories?: string[];
  tags?: string[];
}): Post[] => displayablePosts
  .filter((p) => (categories.length > 0 ? categories.includes(p.frontmatter.category) : true))
  .filter((p) => (tags.length > 0
    ? p.frontmatter.tags
          && p.frontmatter.tags.filter((t) => tags.includes(t)).length > 0
    : true));

export const getPostPath = getLegacyPostPath;
