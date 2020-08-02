import React, { useState } from "react";
import { NextPage } from "next";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Box,
  Link,
  Typography,
} from "@material-ui/core";
import ReactMarkdown from "react-markdown/with-html";
import Highlight from "react-highlight";
import { useStyles } from "styles/styles";
import Lightbox from "react-image-lightbox";

/**
 * @name MarkdownRenderer.tsx
 * @description Custom renderer for markdown
 * @see Customizable Node-types
 *  https://github.com/rexxars/react-markdown#node-types
 * @see Customization Example
 *  https://github.com/rexxars/commonmark-react-renderer#type-renderer-options
 *
 */

type BlockProps = {
  // nodeKey?: string;
  children: JSX.Element | string;
};

type ImageBlockProps = {
  src: string;
  title: string;
  alt: string;
} & BlockProps;

type LinkBlockProps = {
  href: string;
  title: string;
} & BlockProps;

type CodeBlockProps = {
  value: JSX.Element | string;
} & BlockProps;

type HeadingProps = {
  level: number;
} & BlockProps;

const flatten = (text: string, child): typeof child =>
  typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);

/**
 * @name code
 * @description Customized code block renderer
 */
const code: NextPage<CodeBlockProps> = ({
  value,
  children,
}: CodeBlockProps) => (
  <div>
    <Highlight>{children || value}</Highlight>
    <br />
  </div>
);

/**
 * @name image
 * @description Customized image renderer
 */
const image: NextPage<ImageBlockProps> = ({
  src,
  alt,
  title,
}: ImageBlockProps) => {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  return (
    <>
      <Container
        maxWidth="sm"
        onClick={(): void => {
          setLightBoxOpen(!lightBoxOpen);
        }}
      >
        <Box textAlign="center" m={1}>
          <img src={src} alt={alt} title={title} />
        </Box>
        <Box textAlign="center" m={1}>
          <Typography variant="caption">{alt}</Typography>
        </Box>
      </Container>
      {lightBoxOpen && (
        <Lightbox
          mainSrc={src}
          onCloseRequest={(): void => setLightBoxOpen(false)}
        />
      )}
    </>
  );
};

/**
 * @name heading
 * @description Heading custom render for markdown
 * @see https://github.com/rexxars/react-markdown/issues/404
 */
const heading: NextPage<HeadingProps> = ({ children, level }: HeadingProps) => {
  const childrenElems = React.Children.toArray(children);
  const text = childrenElems.reduce(flatten, "");
  const slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement(`h${level}`, { id: slug }, children);
};

/**
 * @name link
 * @description Customized link renderer
 */
const link: NextPage<LinkBlockProps> = ({
  href,
  // title,
  children,
}: LinkBlockProps) => (
  <Link href={href} rel="noopener">
    {children}
  </Link>
);

/**
 * @name table
 * @description Customized table renderer
 */
const table: NextPage<BlockProps> = ({ children }: BlockProps) => (
  <TableContainer component={Paper}>
    <Table size="small">{children}</Table>
  </TableContainer>
);

const tableHead: NextPage<BlockProps> = ({ children }: BlockProps) => (
  <TableHead>{children}</TableHead>
);

const tableRow: NextPage<BlockProps> = ({ children }: BlockProps) => (
  <TableRow>{children}</TableRow>
);

const tableCell: NextPage<BlockProps> = ({ children }: BlockProps) => (
  <TableCell>{children}</TableCell>
);
const tableBody: NextPage<BlockProps> = ({ children }: BlockProps) => (
  <TableBody>{children}</TableBody>
);
/**
 * @name MarkdownRenderer
 * @description Main markdown renderer
 * @see MarkdownRenderer-Options https://github.com/rexxars/react-markdown#options
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
      source={content}
      escapeHtml={false}
      renderers={{
        code,
        table,
        tableHead,
        tableRow,
        heading,
        tableCell,
        tableBody,
        image,
        link,
      }}
    />
  );
};
