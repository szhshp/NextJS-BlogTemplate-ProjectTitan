/**
 * @name PostYaml
 * @description The yaml header for each post
 * @param title: title of the post
 * @param date: create date of the post, strictly in 11 digit format: YYYY-MM-DD
 * @param category: category of the post, only 1 category can be specfied
 * @param tags: tags of the post, for multiple tags, use array of string
 * @param color: default to grey, which may affect the badge in postList
 */
export type PostYaml = {
  title: string;
  date: string;
  category: string;
  tags?: string[];
  color?: "primary" | "secondary";
};

export type Post = {
  frontmatter: PostYaml;
  slug: string;
  markdownBody: string;
};
