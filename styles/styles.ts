import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { footerColor, sidebarColor } from "constants/colors";
import { backgroundPicture } from "data/jumbotron";

/**
 * @name useStyles
 * @description Scoped styles for full sites, other global styles please check '_app.tsx'
 * @see API https://material-ui.com/zh/styles/api/#makestyles-styles-options-hook
 * @see Usage https://cssinjs.org/
 */
export const useStyles = makeStyles((theme: Theme) => {
  /**
   * @implements styles for fonts declared from fonts
   */
  const drawerWidth = 250;
  const musicPlayerHeight = 50;

  /**
   * reuse the header style from theme
   * @file types\theme.ts
   */
  const headerSpread = {};
  ["h1", "h2", "h3", "h4", "h5", "h6"].forEach((e) => {
    headerSpread[`& ${e}`] = theme.typography[e];
  });

  const buildTransition = (
    attribute,
  ): {
    transition: any;
  } => ({
    transition: [
      [
        theme.transitions.create(attribute, {
          // easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.leavingScreen,
        }),
      ],
      "!important",
    ],
  });

  const toggleButtonStyles = {
    "& .MuiIconButton-label": {
      color: theme.palette.grey["400"],
    },
    /* TODO: Temporary fixes with !important */
    borderRadius: "20% !important" as any,
    position: "fixed !important" as any,
    [theme.breakpoints.down("xs")]: {
      background: [["#eee"], "!important"],
    },
  };

  return createStyles({
    root: {
      display: "flex",
      "& blockquote": {
        marginBottom: "1rem",
        fontSize: theme.typography.caption.fontSize,
      },
    },
    post: {
      "& .post-Content": {
        minHeight: "40vh",
        paddingBottom: "4rem",
      },
      "& .post-Title": {
        color: theme.palette.primary.light,
      },
      ...headerSpread,
    },
    header: {
      padding: 0,
    },
    divider: {
      // marginRight: "1.5rem",
    },
    searchBox: {
      padding: "2px",
      height: "1.5rem",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    jumbotron: {
      display: "flex",
      alignItems: "center",
      height: "60vh",
      [theme.breakpoints.up("md")]: {
        height: "110vh",
      },
      background: `url(${backgroundPicture}) no-repeat center center scroll`,
      backgroundSize: "100% 100%",
      "& #blurBox": {
        background: "#00000090",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(3),
        flexGrow: 1,
        "& .jumbotron-Title": {
          color: theme.palette.common.white,
          margin: 0,
          "& a": {
            color: "#2196F3",
          },
        },
        "& .jumbotron-Title-Main": {
          marginBottom: theme.spacing(1),
        },
        "& .jumbotron-buttonGroup": {
          paddingRight: theme.spacing(2),
          paddingBottom: theme.spacing(1),
        },
      },
    },
    content: {
      flexGrow: 1,
      ...buildTransition("margin"),
      "& .MuiChip-root": {
        borderRadius: theme.typography.pxToRem(2),
        height: "1rem",
        margin: "0.2rem",
      },
    },
    contentShift: {
      ...buildTransition("margin"),
      marginRight: drawerWidth,
    },
    menuButton: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...toggleButtonStyles,
      right: theme.spacing(1),
      top: theme.spacing(1),
      zIndex: 1200,
    },
    sideBarSm: {
      width: drawerWidth,
    },
    sideBar: {
      width: drawerWidth,
      background: [[sidebarColor], "!important"] as any,
      overflowY: "hidden",
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root": {
        minWidth: "2rem",
      },
      "& .MuiIcon-root": {
        fontSize: theme.typography.body1.fontSize,
        color: theme.palette.common.white,
      },
      "& .MuiIconButton-root": {
        fontSize: theme.typography.body1.fontSize,
      },
      "& .MuiListItem-gutters": {
        padding: "0.1rem 1rem",
        "& .MuiListItemText-root": {
          margin: 0,
        },
      },
      "& .sideBar-Header": {
        display: "flex",
        alignItems: "center",
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        "& .MuiTab-root": {
          minWidth: drawerWidth / 3,
        },
      },
      "& .sideBar-Tab": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      "& .sidebar-Mid": {
        textAlign: "center",
        color: theme.palette.common.white,
        "& .sidebarMid-HeadImage": {
          width: 100,
          height: 95,
        },
        "& .sidebarMid-Toc": {
          fontSize: theme.typography.caption.fontSize,
          color: theme.palette.grey.A100,
          overflowY: "auto",
          "& ol.toc-list": {
            listStyle: "none",
          },
          "& li.toc-list-item": {
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            "& a.toc-link": {
              textDecoration: "none",
              "&:before": {
                backgroundColor: "transparent",
              },
              "&.is-active-link": {
                color: theme.palette.secondary.main,
              },
            },
          },
        },
      },
    },
    sidebarMenu: {
      /* wider screen */
      [theme.breakpoints.up("xs")]: {
        "& .MuiListItem-gutters": {
          "&:hover": {
            background: theme.palette.grey["800"],
          },
        },
        "& .sidebarMenu-SubLink": {
          background: theme.palette.text.primary,
          "&:hover": {
            background: theme.palette.grey["800"],
          },
        },
      },
      /* small screen */
      [theme.breakpoints.down("xs")]: {
        "& .MuiListItem-gutters": {
          paddingTop: 0,
          paddingBottom: 0,
          "&:hover": {
            background: theme.palette.grey["400"],
          },
        },
        "& .sidebarMenu-SubLink": {
          background: theme.palette.grey["200"],
          "&:hover": {
            background: theme.palette.grey["400"],
          },
        },
      },
      "& .sidebarMenu-SubLink-TextRight": {
        textAlign: "end",
      },
    },
    heading: {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
    },
    timeline: {
      padding: 0,
      "& .timeline-Link": {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textDecoration: "none",
        "& a": {
          textDecoration: "none",
        },
      },
      "& .MuiTimeline-root": {
        padding: 0,
      },
      "& .MuiTimelineItem-missingOppositeContent:before": {
        flex: 0,
        content: "",
        padding: 0,
      },
      "& .MuiTypography-root": {
        display: "inline",
      },
      "& .MuiTimelineItem-root": {
        minHeight: 0,
        "& .MuiTimelineContent-root": {
          display: "flex",
          alignItems: "center",
          padding: theme.spacing(0.25, 1, 1),
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      },
    },
    footer: {
      background: footerColor,
      "& .footer-Table": {
        width: "100%",
      },
      "& .footer-Title": {
        color: theme.palette.grey["700"],
      },
      "& .MuiTable-root": {
        background: footerColor,
        "& .MuiTableCell-sizeSmall": {
          padding: "2px",
          fontSize: theme.typography.caption,
          borderBottom: `1px solid ${theme.palette.grey["700"]}`,
        },
        "& .MuiTableCell-root": {
          color: theme.palette.grey["400"],
        },
      },
    },
    commentList: {
      "& .MuiListItem-root": {
        padding: 0,
      },
      "& .MuiTypography-root": {
        wordBreak: "break-all",
      },
    },
    quote: {
      color: theme.palette.grey["600"],
      borderLeft: `5px solid ${theme.palette.grey["400"]}`,
      "& .quote-Text": {
        color: theme.palette.error.dark,
        padding: theme.spacing(2),
      },
      "& .quote-Reference": {
        fontSize: "0.8rem",
      },
    },
    respectLyric: {
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
    },
    commentBox: {
      "& p": {
        padding: 0,
        margin: 0,
      },
      "& .commentBox-Card": {
        background: theme.palette.grey["50"],
        boxShadow: "none",
        border: `solid 1px ${theme.palette.grey["400"]}`,
        marginBottom: theme.spacing(2),
      },
      "& .MuiCardContent-root": {
        paddingTop: 0,
        paddingBottom: theme.spacing(2),
      },
    },
    markdownRenderer: {
      "& img": {
        maxWidth: "80vh",
        cursor: "pointer",
      },
      "& blockquote": {
        marginLeft: 0,
        paddingLeft: "1rem",
        borderLeft: `5px solid ${theme.palette.grey["400"]}`,
      },
      "& pre code": {
        fontSize: theme.typography.fontSize,
      },
      "& .hide": {
        /* black color, hide everything */
        background: "#000",
      },
      "& p,li": {
        /* inline code, not the code block with highlights */
        "& code:not(.hljs)": {
          fontSize: theme.typography.fontSize,
          padding: "0.1rem 0.2em",
          background: theme.palette.grey["400"],
          borderRadius: theme.typography.pxToRem(2),
        },
      },
    },
    trips: {
      "& svg": {
        touchAction: "none",
        height: "400px",
      },
    },
    loadingProgress: {
      height: "2px",
      position: "sticky",
      top: "0",
      zIndex: 1300,
    },
    musicPlayer: {
      ...buildTransition("bottom"),
      zIndex: 1000,
      position: "fixed",
      bottom: -musicPlayerHeight,
      maxHeight: musicPlayerHeight,
      width: "100%",
      boxShadow: "0px -2px 4px -1px rgba(0,0,0,0.20) !important",
      "& .MuiTypography-root": {
        whiteSpace: "nowrap",
        "& p": {
          margin: 0,
        },
      },
      "& .MuiCardActions-root ": {
        padding: "4px 0px 4px 8px",
      },
    },
    musicPlayerToggleButton: {
      ...buildTransition("bottom"),
      ...toggleButtonStyles,
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
    musicPlayerShift: {
      bottom: 0,
    },
    musicToggleButtonShift: {
      bottom: musicPlayerHeight,
    },
    /**
      use '@global' tag to prevent JSS renaming class name, all below styles will be global
      @see https://cssinjs.org/jss-plugin-global/
     */
    "@global": {
      body: {
        fontSize: "1rem",
      },
      /* override for lightbox */
      ".ril__toolbar": {
        bottom: 0,
        top: "unset",
      },
      /* override for jvector map */
      ".jvectormap-container": {
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
      },
      ".jvectormap-tip": {
        position: "absolute",
        display: "none",
        border: [1, "solid", theme.palette.grey["400"]],
        borderRadius: "3px",
        background: theme.palette.grey["900"],
        color: "white",
        // fontFamily: "sans-serif, Verdana",
        fontSize: "smaller",
        padding: "3px",
      },
      ".jvectormap-zoomin": {
        position: "absolute",
        left: "10px",
        borderRadius: "3px",
        background: theme.palette.grey["900"],
        padding: "3px",
        color: "white",
        cursor: "pointer",
        lineHeight: "10px",
        textAlign: "center",
        boxSizing: "content-box",
        width: "10px",
        height: "10px",
        top: "10px",
      },
      ".jvectormap-zoomout": {
        position: "absolute",
        left: "10px",
        borderRadius: "3px",
        background: theme.palette.grey["900"],
        padding: "3px",
        color: "white",
        cursor: "pointer",
        lineHeight: "10px",
        textAlign: "center",
        boxSizing: "content-box",
        width: "10px",
        height: "10px",
        top: "30px",
      },
    },
    ".jvectormap-goback": {
      position: "absolute",
      left: "10px",
      borderRadius: "3px",
      background: theme.palette.grey["900"],
      padding: "3px",
      color: "white",
      cursor: "pointer",
      lineHeight: "10px",
      textAlign: "center",
      boxSizing: "content-box",
      bottom: "10px",
      zIndex: 1000,
    },
    ".jvectormap-spinner": {
      position: "absolute",
      left: "0",
      top: "0",
      right: "0",
      bottom: "0",
      background:
        "center no-repeat url(data:image/gif',base64,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)",
    },
    ".jvectormap-legend-title": {
      fontWeight: "bold",
      fontSize: "14px",
      textAlign: "center",
    },
    ".jvectormap-legend-cnt": {
      position: "absolute",
    },
    ".jvectormap-legend-cnt-h": {
      bottom: 0,
      right: 0,
      ".jvectormap-legend": {
        float: "left",
        margin: "0 10px 10px 0",
        padding: "3px 3px 1px 3px",
        ".jvectormap-legend-tick": {
          float: "left",
        },
      },
      ".jvectormap-legend-tick": {
        width: "40px",
      },
      ".jvectormap-legend-tick-sample": {
        height: "15px",
      },
      ".jvectormap-legend-tick-text": {
        textAlign: "center",
      },
    },
    ".jvectormap-legend-cnt-v": {
      top: 0,
      right: 0,
      ".jvectormap-legend": {
        margin: "10px 10px 0 0",
        padding: "3px",
      },
      ".jvectormap-legend-tick-sample": {
        height: "20px",
        width: "20px",
        display: "inline-block",
        verticalAlign: "middle",
      },
      ".jvectormap-legend-tick-text": {
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: "20px",
        paddingLeft: "3px",
      },
    },
    ".jvectormap-legend": {
      background: "black",
      color: "white",
      borderRadius: "3px",
    },
    ".jvectormap-legend-tick-text": {
      fontSize: "12px",
    },
  });
});
