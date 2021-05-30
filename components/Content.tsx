import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStyles } from "styles/styles";
import React from "react";
import SideBar from "components/Sidebar";

/**
 * @interface ContentProps
 * @param children: The children elements to show as the main content
 * @param showSidebar
 * @param showTOC
 *
 */
interface ContentProps {
  children: JSX.Element[] | JSX.Element;
  showSidebar?: boolean;
  showTOC?: boolean;
}

/**
 * @name Content
 * @description Content Skeleton, controls the display of sidebar and footer
 * @param {ContentProps}
 */
const Content = ({
  children,
  showSidebar = true,
  showTOC = false,
}: ContentProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  /* If we need to show the TOC and is not small screen, set sidebar open by default */
  const [drawerOpen, setDrawerOpen] = React.useState(showTOC && isSmallScreen);

  const toggleDrawer = (): void => setDrawerOpen(!drawerOpen);

  return (
    <Grid container>
      <Grid item xs={12}>
        {/* shift the body if screen size in sm up and drawer toggled */}
        <main
          className={clsx("main", classes.content, {
            [classes.contentShift]: !isSmallScreen && drawerOpen,
          })}
        >
          <>
            {children}
          </>
        </main>
      </Grid>
      {showSidebar && (
        <SideBar
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
          showTOC={showTOC}
        />
      )}
    </Grid>
  );
};

export default Content;
