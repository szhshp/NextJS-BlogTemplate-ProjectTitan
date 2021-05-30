import {
  Box,
  Checkbox,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { SITE_CONFIG } from "data/config";
import { useTranslator } from "hooks/useTranslator";
import { NextPage } from "next";
import React from "react";
import {
  ImageBlockProps,
  HeadingProps,
  LinkBlockProps,
  BlockProps,
  ListItemBlockProps,
} from "components/markdownRenderer/types/RendererBlockProps";
import { LightBoxImage } from "components/Image";
import { VerticalAlignTop, Link as LinkIcon } from "@material-ui/icons";

/**
 * @name flatten
 * @description Recursively to convert the react components as string
 */
// eslint-disable-next-line no-confusing-arrow
const flatten = (text: string, child): typeof child => {
  if (typeof child === "string") {
    return text + child;
  }
  return React.Children.toArray(child.props.children).reduce(flatten, text);
};

/**
 * @name image
 * @description Customized image renderer
 */
const image: NextPage<ImageBlockProps> = ({ src, alt, title }) => (
  <LightBoxImage src={src} alt={alt} title={title} activeLightBox />
);

/**
 * @name heading
 * @description Heading custom render for markdown
 * @see TOCImplementation: https://github.com/rexxars/react-markdown/issues/404
 */
const heading: NextPage<HeadingProps> = ({ children, level }: HeadingProps) => {
  const childrenElements = React.Children.toArray(children);
  const text = childrenElements.reduce(flatten, "");
  const slug = text.replace(/[ ]+/g, "-");
  const { translate, locale } = useTranslator();

  const scrollToTOC = () => {
    document
      .getElementById(SITE_CONFIG.componentsConfig.postContentTOC.id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return React.createElement(
    `h${level}`,
    { id: slug },
    <Box padding={0} margin={0} display="flex">
      <Box flex="1000">
        {/* <Link href={`#${slug}`} rel="noopener" color="inherit"> */}
        {/* Do not put any more text within headers, it may rendered to TOC unexpectedly */}
        {children}
        <Link
          href={`#${slug}`}
          rel="noopener"
          color="inherit"
          className="post-HeaderTitle"
        >
          <IconButton size="small" className="post-HeaderIcon">
            <LinkIcon fontSize="small" />
          </IconButton>
        </Link>
      </Box>
      <Box flex="1">
        {level === 2 && (
          <Tooltip title={translate(locale.jumpToTOC)}>
            <IconButton
              size="small"
              onClick={scrollToTOC}
              className="post-HeaderIcon"
            >
              <VerticalAlignTop fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

/**
 * @name link
 * @description Customized link renderer
 */
const link: NextPage<LinkBlockProps> = ({
  href,
  // title,
  children,
}) => (
  <Link href={href} rel="noopener">
    {children}
  </Link>
);

/**
 * @name table
 * @description Customized table renderer
 */
const table: NextPage<BlockProps> = ({ children }) => (
  <Box pt={2}>
    <TableContainer component={Paper}>
      <Table size="small">{children}</Table>
    </TableContainer>
  </Box>
);

const tableHead: NextPage<BlockProps> = ({ children }) => (
  <TableHead>{children}</TableHead>
);

const tableRow: NextPage<BlockProps> = ({ children }) => (
  <TableRow>{children}</TableRow>
);

const tableCell: NextPage<BlockProps> = ({ children }) => (
  <TableCell>{children}</TableCell>
);
const tableBody: NextPage<BlockProps> = ({ children }) => (
  <TableBody>{children}</TableBody>
);

const listItem: NextPage<ListItemBlockProps> = ({ checked, children }) => {
  const isTodo = checked !== null && checked !== undefined;

  return (
    <li className={isTodo ? "todoItem" : ""}>
      {isTodo && (
        <Checkbox
          className="todoCheckbox"
          checked={checked}
          color="primary"
          size="small"
          readOnly
        />
      )}
      {children}
    </li>
  );
};

export const CommonRenderer = {
  table,
  tableHead,
  tableRow,
  heading,
  tableCell,
  tableBody,
  image,
  link,
  listItem,
};
