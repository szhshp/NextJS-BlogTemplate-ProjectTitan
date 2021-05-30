/**
 * @name SideBarSubLink Sidebar Sub Links Defination
 * @param textLeft: Text float on left
 * @param textRight: Text float on right
 * @param link: Direct URL
 * @param filepath: Sometimes you may need to set the filepath to prevent hard refresh
 */
export type SideBarSubLink = {
  textLeft: string;
  textRight?: string;
  desc?: string;
  link?: string;
  filepath?: string;
  onClickSubLink?: () => JSX.Element | void;
};

/**
 * @name SideBarLink Sidebar Links Defination
 * @param title: Link title
 * @param link: Link url
 * @param filepath: file path under '/page', you may need to set the filepath to prevent hard refresh
 *  if no filepath specfied, we may open link in new window
 * @param icon: Link icon
 * @param desc: Desc shows on the tooltip
 *  @see Icons https://google.github.io/material-design-icons/#getting-icons
 * @param subLinks: Sub Links Defination
 */
export type SideBarLink = {
  title: string;
  link?: string;
  filepath?: string;
  desc?: string;
  icon: string;
  subLinks?: SideBarSubLink[];
};

/**
 * @name SideBarData Sidebar Definition
 * @param headImage: URL path of the head image
 * @param links: Defination of links in sidebar
 * @param desc: Desc shows on the tooltip
 * @param name: Author Name
 * @param motto
 */
export type SideBarData = {
  headImage: string;
  links: SideBarLink[];
  desc?: string;
  name: string;
  motto: string;
};

/**
 * @name SideBarProps Sidebar Props
 * @param drawerOpen: Sidebar is open?
 * @param toggleDrawer: Event to toggle the sidebar
 * @param showTOC: Show TOC in sidebar?
 */
export interface SideBarProps {
  drawerOpen: boolean;
  toggleDrawer: (boolean) => void;
  showTOC?: boolean;
}
