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
        background: "#0000004d",
        padding: theme.spacing(3),
        flexGrow: 1,
        "& .jumbotron-Title": {
          color: theme.palette.common.white,
          margin: 0,
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
        [theme.breakpoints.down("xs")]: {
          fontSize: "0.8rem",
        },
      },
      "& .MuiTimeline-root": {
        padding: [[0], "important"],
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
    loadingProgress: {
      height: "2px",
      position: "sticky",
      top: "0",
      zIndex: 1300,
    },
  });
});
