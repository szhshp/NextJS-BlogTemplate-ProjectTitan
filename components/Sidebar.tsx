import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Collapse,
  Grid,
  Typography,
  AppBar,
  Tabs,
  useMediaQuery,
  Tooltip,
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import React, { Fragment, useEffect } from "react";
import { SideBarLink, SideBarSubLink, SideBarProps } from "types/sidebarTypes";
import { useStyles } from "styles/styles";
import Router from "next/router";
import TabPanel from "components/TabPanel";
import LinkTab from "components/LinkTab";
import * as tocbot from "tocbot";
import theme from "types/theme";
import { useTranslator } from "hooks/useTranslator";
import { logger } from "utils/logger";
import { useSiderBarData } from "hooks/useSiderBarData";
import Image from "next/image";

/**
 * @name allyProps
 * @description The wrapper for the sidebar tab
 * @param index The index of sidebar tab option
 */
const a11yProps = (
  index: number
): {
  id: string;
  "aria-controls": string;
} => ({
  id: `nav-tab-${index}`,
  "aria-controls": `nav-tabpanel-${index}`,
});

enum TabName {
  MenuTab,
  TOCTab,
}

/**
 * @name SideBar
 * @param {SideBarProps}
 */
const SideBar = ({
  drawerOpen,
  toggleDrawer,
  showTOC = false,
}: SideBarProps): JSX.Element => {
  const classes = useStyles();
  const [subMenuSelected, setSubMenuSelected] = React.useState("");
  const [isTOCReady, setIsTOCReady] = React.useState(false);
  const [tabSelected, setTabSelected] = React.useState<TabName>(
    showTOC ? TabName.TOCTab : TabName.MenuTab
  );
  const isScreenSmUp = useMediaQuery(theme.breakpoints.down("xs"));
  const { translate, locale } = useTranslator();
  const sidebarData = useSiderBarData();

  useEffect(() => {
    /* Only show TOC if props.showTOC is true */
    if (showTOC) {
      /* If TOC is not ready, init it */
      if (!isTOCReady) {
        /**
         * @desc Init the toc bot on the sidebar
         * @see https://github.com/tscanlin/tocbot
         */
        tocbot.init({
          tocSelector: ".sidebarMid-Toc",
          contentSelector: ".main",
          headingSelector: "h1, h2, h3",
          hasInnerContainers: true,
        });
        setIsTOCReady(true);
      } else if (tabSelected === TabName.TOCTab) {
        /* If TOC is ready and is visible, refresh it */
        tocbot.refresh();
      }
    }
  });

  const handleChange = (event, newValue: number): void => {
    setTabSelected(newValue);
  };
  const openSubLinkList = (subMenuTitle: string): void => {
    setSubMenuSelected(subMenuSelected === subMenuTitle ? "" : subMenuTitle);
  };

  /**
   * @name handleLinkOnClick
   * @desc redirect to specfic link
   * @important If not filepath specfied, open a new window
   */
  const handleLinkOnClick = ({
    filepath,
    link,
  }: {
    filepath?: string;
    link: string;
  }): void => {
    if (filepath) {
      Router.push(filepath, link);
    } else {
      window.open(link);
    }
  };

  const subMenuList = (
    <List component="nav" className={classes.sidebarMenu}>
      {sidebarData.links.map((link: SideBarLink) => (
        <Fragment key={link.title}>
          <ListItem
            button
            onClick={(): void => {
              if (link.link) {
                handleLinkOnClick({
                  filepath: link.filepath,
                  link: link.link,
                });
                if (link.subLinks) {
                  logger({
                    type: "warn",
                    message:
                      "Warning: Both link and subLink specfied for menu link, subLink will be ignored",
                  });
                }
              } else if (link.subLinks) {
                if (link.subLinks.length > 0) {
                  openSubLinkList(link.title);
                } else {
                  logger({
                    type: "error",
                    message: "No subLink found",
                  });
                }
              } else {
                logger({
                  type: "error",
                  message: "Error: No link or subLink found",
                });
              }
            }}
          >
            <ListItemIcon>
              <Icon>{link.icon}</Icon>
            </ListItemIcon>
            {link.desc ? (
              <Tooltip title={link.desc} placement="top">
                <ListItemText primary={link.title} />
              </Tooltip>
            ) : (
              <ListItemText primary={link.title} />
            )}
            {link.subLinks &&
              link.subLinks.length > 0 &&
              (subMenuSelected === link.title ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              ))}
          </ListItem>
          {link.subLinks && link.subLinks.length > 0 && (
            <Collapse in={subMenuSelected === link.title} timeout="auto">
              <List component="div" disablePadding>
                {link.subLinks.map((subLink: SideBarSubLink) => (
                  <ListItem
                    key={`${link.title}${subLink.textLeft}`}
                    button
                    className="sidebarMenu-SubLink"
                    onClick={(): void => {
                      if (subLink.link) {
                        handleLinkOnClick({
                          filepath: subLink.filepath,
                          link: subLink.link,
                        });
                      } else if (subLink.onClickSubLink) {
                        subLink.onClickSubLink();
                      } else {
                        logger(
                          "Error: No link or onClickEvent specfied for menu sub link"
                        );
                      }
                    }}
                  >
                    {subLink.desc ? (
                      <Tooltip title={subLink.desc} placement="top">
                        <ListItemText primary={subLink.textLeft} />
                      </Tooltip>
                    ) : (
                      <ListItemText primary={subLink.textLeft} />
                    )}
                    <ListItemText
                      primary={subLink.textRight}
                      className="sidebarMenu-SubLink-TextRight"
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Fragment>
      ))}
    </List>
  );

  return (
    <>
      {isScreenSmUp && (
        <>
          {/* For small screen */}
          <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={toggleDrawer}
            classes={{
              paper: classes.sideBarSm,
            }}
          >
            {subMenuList}
          </Drawer>
          <IconButton
            color="default"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <Icon>menu</Icon>
          </IconButton>
        </>
      )}
      {!isScreenSmUp && (
        <>
          {/* For large screen */}
          <Drawer
            transitionDuration={{
              enter: 195,
              exit: 375,
            }}
            variant="persistent"
            anchor="right"
            open={drawerOpen}
            classes={{
              paper: classes.sideBar,
            }}
          >
            <Grid className="sideBar-Header">
              <AppBar position="static" className="sideBar-Tab">
                <Tabs
                  value={tabSelected}
                  centered
                  onChange={handleChange}
                  aria-label="nav tabs"
                >
                  <LinkTab
                    label={translate(locale.homepage)}
                    {...a11yProps(0)}
                  />
                  {showTOC && (
                    <LinkTab
                      label={translate(locale.contentList)}
                      {...a11yProps(1)}
                    />
                  )}
                </Tabs>
              </AppBar>
            </Grid>

            <Grid className="sidebar-Mid">
              <TabPanel value={tabSelected} index={TabName.MenuTab}>
                <>
                  <img
                    height={90}
                    width={100}
                    src={sidebarData.headImage}
                    alt="szhshp"
                  />
                  <Typography display="block" gutterBottom color="secondary">
                    {sidebarData.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {sidebarData.motto}
                  </Typography>
                  {subMenuList}
                </>
              </TabPanel>
              {showTOC && (
                <TabPanel value={tabSelected} index={TabName.TOCTab}>
                  <div className="sidebarMid-Toc" />
                </TabPanel>
              )}
            </Grid>
          </Drawer>
          {/* Change the icon and color when draw is open */}
          {/* No need to move to style.ts because we need a variable: drawerOpen to control  */}
          <IconButton
            color="default"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <Icon>{drawerOpen ? "close" : "menu"}</Icon>
          </IconButton>
        </>
      )}
    </>
  );
};

export default SideBar;
