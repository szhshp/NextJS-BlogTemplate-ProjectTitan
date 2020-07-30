import { Post } from "types/postTypes";
import matter from "gray-matter";
import moment from "moment";

const colorLabelOrder = ["primary", "secondary"];

/**
 * formatPostDate
 * @param dateString: raw date string
 *
 * Original Date Format:
 *  2015-3-2 (Legacy)
 *  2015-08-2 (Legacy)
 *  2015-08-03 (Standard)
 * Split with '-' and format all to at least 2 digits
 *  2015-3-2 -> 2015-03-02
 */
export const formatPostDate = (dateString: string): string => {
  const date = new Date(dateString);
  return [
    date.getFullYear(),
    (date.getMonth() + 1).toString().padStart(2, "0"),
    date.getDate().toString().padStart(2, "0"),
  ].join("-");
};

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
    // Create slug from filename
    const slug = key
      .replace(/^.*[\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".");
    const value: {
      default: string;
    } = values[index];
    // Parse yaml metadata & markdownbody in document
    const document = matter(value.default);

    // console.log("document.data.date: ", document.data.date);
    // console.log(formatPostDate(document.data.date));
    return {
      frontmatter: {
        ...document.data,
        date: formatPostDate(
          document.data.date,
        ) /* Format the date, see the formatPostDate() */,
      },

      markdownBody: document.content,
      slug,
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
    slug,
  } = post;

  const legacyPostPath = [
    "",
    category ? category.toLocaleLowerCase() : undefined,
    ...date.split("-"),
    slug,
  ].filter((e) => e !== undefined).join("/");

  return legacyPostPath;
};

/**
 * The directly post data, sort by date and color
 */
export const posts: Post[] = getPost(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (require as any).context("../posts", true, /\.md$/),
).sort((a, b) => {
  /* Sort: order by color, date */
  const colorA = a.frontmatter.color || "";
  const colorB = b.frontmatter.color || "";

  return (
    colorLabelOrder.indexOf(colorB) - colorLabelOrder.indexOf(colorA)
    || moment(b.frontmatter.date).diff(moment(a.frontmatter.date))
  );
});

/**
 * The filtered post data
 */
export const postSet: {
  normal: Post[];
  life: Post[];
  comic: Post[];
} = {
  normal: posts.filter(
    (e) => ["Life", "Comic"].indexOf(e.frontmatter.category) === -1,
  ),
  life: posts.filter((e) => e.frontmatter.category === "Life"),
  comic: posts.filter((e) => e.frontmatter.category === "Comic"),
};

export const getPostPath = getLegacyPostPath;
