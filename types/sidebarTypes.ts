/**
 * @name SideBarDef Sidebar Definition
 * @param headImage: URL path of the head image
 * @param links: Defination of links in sidebar
 * @param name: Author Name
 * @param motto
 */
export type SideBarDef = {
  headImage: string;
  links: SideBarLink[];
  name: string;
  motto: string;
};

/**
 * @name SideBarLink Sidebar Links Defination
 * @param title: Link title
 * @param link: Link url
 * @param icon: Link icon
 *  @see Icons https://google.github.io/material-design-icons/#getting-icons
 * @param subLinks: Sub Links Defination
 */
export type SideBarLink = {
  title: string;
  link: string;
  icon: string;
  subLinks?: SideBarSubLink[];
};

/**
 * @name SideBarSubLink Sidebar Sub Links Defination
 * @param textLeft: Text float on left
 * @param textRight: Text float on right
 * @param link: Link url
 */
export type SideBarSubLink = {
  textLeft: string;
  textRight: string;
  link: string;
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
