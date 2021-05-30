import React from "react";
import gfm from "remark-gfm";
import footnotes from "remark-footnotes";

import ReactMarkdown from "react-markdown/with-html";
import { useStyles } from "styles/styles";
import { FootnoteRenderer } from "components/markdownRenderer/renderers/FootnoteRenderer";
import { CommonRenderer } from "components/markdownRenderer/renderers/CommonRenderer";
import { CodeRenderer } from "components/markdownRenderer/renderers/CodeRenderer";

/**
 * @name MarkdownRenderer.tsx
 * @description Custom renderer for markdown
 * @see MarkdownRenderer-Options
 *  https://github.com/rexxars/react-markdown#options
 * @see Customizable Node-types
 *  https://github.com/rexxars/react-markdown#node-types
 * @see Customization Example
 *  https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
 *
 */
export const MarkdownRenderer = ({
  content,
}: {
  content: string;
}): JSX.Element => {
  const classes = useStyles();

  return (
    <ReactMarkdown
      className={classes.markdownRenderer}
      plugins={[gfm, footnotes]}
      source={content}
      escapeHtml={false}
      renderers={{
        ...FootnoteRenderer,
        ...CommonRenderer,
        ...CodeRenderer,
      }}
    />
  );
};
