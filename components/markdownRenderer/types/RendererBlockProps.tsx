export type BlockProps = {
  // nodeKey?: string;
  children: JSX.Element | string;
};

export type ListItemBlockProps = {
  checked?: boolean;
} & BlockProps;

export type ImageBlockProps = {
  src: string;
  title: string;
  alt: string;
} & BlockProps;

export type LinkBlockProps = {
  href: string;
  title: string;
} & BlockProps;

export type CodeBlockProps = {
  value: JSX.Element | string;
} & BlockProps;

export type HeadingProps = {
  level: number;
} & BlockProps;

export type FootNoteBlockProps = {
  identifier: string;
  label: string;
} & BlockProps;
