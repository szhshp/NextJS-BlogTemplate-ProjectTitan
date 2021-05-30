import { NextPage } from "next";
import { FootNoteBlockProps } from "components/markdownRenderer/types/RendererBlockProps";

/**
 * @name generateFootnoteID
 * @description Generate the footnote element id
 * @param identifier: Original id of the footnote
 * @param type: Type of the footnote ID (Definition within the content or Reference on the end of the posts)
 */
const generateFootnoteID = ({
  identifier,
  type,
}: {
  identifier: string;
  type: "footnoteReference" | "footnoteDefinition";
}) => `fn-${type === "footnoteReference" ? "ref" : "def"}-${identifier}`;

/**
 * @name footnoteReference
 * @description Generate the footnote reference Link
 */
const footnoteReference: NextPage<FootNoteBlockProps> = ({ identifier, label }) => (
  <sup id={generateFootnoteID({ identifier, type: "footnoteReference" })}>
    <a
      href={`#${generateFootnoteID({
        identifier,
        type: "footnoteDefinition",
      })}`}
    >
      {label}
    </a>
  </sup>
);

/**
 * @name footnoteDefinition
 * @description Generate the footnote Definition Link
 */
const footnoteDefinition: NextPage<FootNoteBlockProps> = ({ identifier, children }) => (
  <>
    <a
      id={generateFootnoteID({
        identifier,
        type: "footnoteDefinition",
      })}
      href={`#${generateFootnoteID({
        identifier,
        type: "footnoteReference",
      })}`}
    >
      {children}
    </a>
  </>
);

export const FootnoteRenderer = {
  footnoteDefinition,
  footnoteReference,
};
