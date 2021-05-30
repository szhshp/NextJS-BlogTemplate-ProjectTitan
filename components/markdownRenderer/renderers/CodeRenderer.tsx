import { NextPage } from "next";
import React from "react";
import { CodeBlockProps } from "components/markdownRenderer/types/RendererBlockProps";
import Highlight from "react-highlight";

/**
 * @name code
 * @description Customized code block renderer
 * @see 
 *  Highlight theme demo: https://highlightjs.org/
 *  Highlight theme file: https://github.com/highlightjs/highlight.js/tree/main/src/styles
 *  Select a theme and import from _app.tsx
 */
const code: NextPage<CodeBlockProps> = ({ value, children }) => (
  <div>
    <Highlight>{children || value}</Highlight>
  </div>
);

export const CodeRenderer = {
  code,
};
