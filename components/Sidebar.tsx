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
} from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import React, { useEffect } from "react";
import { SideBarLink, SideBarSubLink, SideBarProps } from "types/sidebarTypes";
import { useStyles } from "styles/styles";
import { useRouter } from "next/router";
import { SITE_CONFIG } from "data/config";
import TabPanel from "components/TabPanel";
import LinkTab from "components/LinkTab";
import * as tocbot from "tocbot";
import theme from "types/theme";
import { useTranslater } from "hooks/useTranslator";
import { logger } from "utils/logger";
import { useSiderBarDef } from "hooks/useSideBarDef";

/**
 * @name allyProps
 * @description The wrapper for the sidebar tab
 * @param index The index of sidebar tab option
 */
const a11yProps = (
  index: number,
): {
  id: string;
  "aria-controls": string;
} => ({
  id: `nav-tab-${index}`,
  "aria-controls": `nav-tabpanel-${index}`,
});

/**
 * @name SideBar
 * @param {PostListProps}
 */
const SideBar = ({
  drawerOpen,
  toggleDrawer,
  showTOC = false,
}: SideBarProps): JSX.Element => {
  const classes = useStyles();
  const [subMenuSelected, setSubMenuSelected] = React.useState("");
  const [tabSelected, setTabSelected] = React.useState<number>(showTOC ? 1 : 0);
  const router = useRouter();
  const isScreenSmUp = useMediaQuery(theme.breakpoints.down("xs"));
  const { translate, locale } = useTranslater();
  const sidebarDef = useSiderBarDef();
  useEffect(() => {
    setTimeout(() => {
      if (showTOC) {
        tocbot.init({
          tocSelector: ".sidebarMid-Toc",
          contentSelector: ".main",
          headingSelector: "h1, h2, h3",
          hasInnerContainers: true,
        });
      }
    }, 0);
  }, []);

  const handleChange = (event, newValue: number): void => {
    setTabSelected(newValue);
  };
  const openSubLinkList = (subMenuTitle: string): void => {
    setSubMenuSelected(subMenuSelected === subMenuTitle ? "" : subMenuTitle);
  };
  const handleLinkOnClick = (path: string): void => {
    router.push(path);
  };

  const subMenuList = (
    <List component="nav" className={classes.sidebarMenu}>
      {sidebarDef.links.map((link: SideBarLink) => (
        <>
          <ListItem
            button
            key={link.link}
            onClick={(): void => {
              if (link.link) {
                handleLinkOnClick(link.link);
              } else if (link.subLinks) {
                if (link.subLinks.length > 0) {
                  openSubLinkList(link.title);
                } else {
                  logger("Error: No subLink found");
                }
              } else {
                logger("Error: No link or subLink specfied for menu link");
              }
            }}
          >
            <ListItemIcon>
              <Icon>{link.icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={link.title} />
            {link.subLinks
              && link.subLinks.length > 0
              && (subMenuSelected === link.title ? (
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
                    key={`${link.link}${subLink.link}`}
                    button
                    className="sidebarMenu-SubLink"
                    onClick={(): void => {
                      if (subLink.link) {
                        handleLinkOnClick(subLink.link);
                      } else if (subLink.onClickSubLink) {
                        subLink.onClickSubLink();
                      } else {
                        logger(
                          "Error: No link or onClickEvent specfied for menu sub link",
                        );
                      }
                    }}
                  >
                    <ListItemText primary={subLink.textLeft} />
                    <ListItemText
                      primary={subLink.textRight}
                      className="sidebarMenu-SubLink-TextRight"
                    />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </>
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
                  action={(): void => {
                    /* Required, otherwise toc may destroy when change tab */
                    tocbot.refresh();
                  }}
                  aria-label="nav tabs"
                >
                  <LinkTab label="Home" {...a11yProps(0)} />
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
              <TabPanel value={tabSelected} index={0}>
                <>
                  <img
                    className="sidebarMid-HeadImage"
                    src={sidebarDef.headImage}
                    alt={SITE_CONFIG.author}
                  />
                  <Typography display="block" gutterBottom color="secondary">
                    {sidebarDef.name}
                  </Typography>
                  <Typography variant="subtitle2">
                    {sidebarDef.motto}
                  </Typography>
                  {subMenuList}
                </>
              </TabPanel>
              {showTOC && (
                <TabPanel value={tabSelected} index={1}>
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
