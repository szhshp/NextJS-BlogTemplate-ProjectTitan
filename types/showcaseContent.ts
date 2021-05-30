/**
 * @name ShowcaseContentType
 * @description Show case content type
 * @param from: where the content selected from, album or book
 * @param creator: creator of the content
 * @param content: main content, use <br> for line break
 * @param title
 * @param desc: sometimes we may need a little desc
 */
export type ShowcaseContentType = {
  from: string;
  title?: string;
  creator?: string;
  content: string;
  desc?: string;
};
