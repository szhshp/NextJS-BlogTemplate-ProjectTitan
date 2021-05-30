import PostTemplate from "components/PostTemplate";
import { MarkdownRenderer } from "components/MarkdownRenderer";

const markdown = `
# 404

`;

const Custom404 = (): JSX.Element => (
  <PostTemplate
    title="404"
    showTOC={false}
    content={
      <>
        <MarkdownRenderer content={markdown} />
      </>
    }
  />
);

export default Custom404;
