/**
 * @name PostYaml
 * @description Type of the yaml header for each post
 * @param title: title of the post
 * @param date: create date of the post, strictly in 11 digit format: YYYY-MM-DD
 * @param category: category of the post, only 1 category can be specfied
 * @param tags: tags of the post, for multiple tags, use array of string
 * @param color: default to grey, which may affect the badge in postList
 * @param hide: hide in post list?
 */
export type PostYaml = {
  title: string;
  date: string;
  category: string;
  tags?: string[];
  color?: "primary" | "secondary";
  hide: boolean
};

/**
 * @name Post
 * @description Type of the Post
 * @param frontmatter: yaml header of the post
 * @param postRoute: the post route
 * @param markdownBody: markdown content
 */
export type Post = {
  frontmatter: PostYaml;
  postRoute: string;
  markdownBody: string;
};

export enum PostRenderMode {
  NormalMarkdownPost,
  PureHTML,
}

/**
 * @interface PostTemplateProps
 * @param redirectTo: The url to redirect once post loaded
 * @param date: Post date
 * @param content: Post content, string or JSX
 * @param showTitle
 * @param showFooter
 * @param showCommentBox
 * @param showTOC
 * @param category: category as string
 * @param tags: tags in array of string
 */
export interface PostTemplateProps {
  title?: string;
  redirectTo?: string;
  date?: string;
  content: string | JSX.Element;
  showTitle?: boolean;
  showPostDesc?: boolean;
  showCommentBox?: boolean;
  showTOC?: boolean;
  category?: string;
  tags?: string[];
  postRenderMode?: PostRenderMode;
}