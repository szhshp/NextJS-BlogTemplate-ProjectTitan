import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { footerColor, sidebarColor } from "constants/colors";
import { grey } from "@material-ui/core/colors";

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
  const drawerWidth = 300;

  /**
   * Override the body preset header styles with custom header styles from theme.ts
   * @file types\theme.ts
   */
  const headerSpread = ["h1", "h2", "h3", "h4", "h5", "h6"].reduce(
    (prev: { [key: string]: string }, cur) => ({
      ...prev,
      [`& ${cur}`]: theme.typography[cur],
    }),
    {}
  );
  const buildTransition = (
    attribute: string
  ): {
    transition: any;
  } => ({
    transition: [
      [
        theme.transitions.create(attribute, {
          easing: theme.transitions.easing.easeIn,
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
        minHeight: "60vh",
        paddingBottom: "4rem",
        "& .post-Content-Toc": {
          "& ul": {
            listStyle: "disc",
            paddingLeft: theme.spacing(3),
          },
          "& li": {
            textAlign: "left",
          },
        },
      },
      "& .post-Title": {
        color: theme.palette.primary.light,
      },
      "& .post-HeaderIcon": {
        paddingX: theme.spacing(4),
        color: [[theme.palette.grey["300"]], "!important"] as any,
      },
      ...headerSpread,
    },
    header: {
      padding: 0,
    },
    headerIcon: {
      padding: [["1px"], "!important"] as any,
      color: [[theme.palette.grey["300"]], "!important"] as any,
      borderRadius: "25%",
    },
    divider: {
      // marginRight: "1.5rem",
    },
    dividerSearch: {
      "& .MuiInputBase-input": {
        padding: "4px 8px",
      },
    },
    searchBox: {
      padding: "2px",
      height: "1.5rem",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    backgroundCover: {
      zIndex: -1,
      // background: `url(${backgroundPicture}) no-repeat center center scroll`,
      // backgroundSize: "100% 100%",
      // backgroundAttachment: "fixed",
    },
    jumbotron: {
      display: "flex",
      alignItems: "center",
      height: "100vh",
      [theme.breakpoints.up("md")]: {
        height: "110vh",
      },
      "& #blurBox": {
        background: "#00000099",
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
      /* Material UI have some issues that custom styles are overridden, use !important as temp fix */
      background: [[sidebarColor], "!important"] as any,
      overflowY: [["hidden"], "!important"] as any,
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
        "& .sidebarMid-Toc": {
          fontSize: theme.typography.caption.fontSize,
          color: theme.palette.grey.A100,
          overflowY: "auto",
          "& ol.toc-list": {
            listStyle: "none",
            paddingLeft: theme.spacing(1.5),
          },
          "& li.toc-list-item": {
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            "& a.toc-link": {
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
          color: "inherit",
        },
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
          // whiteSpace: "nowrap",
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
    image: {
      boxShadow: `1px 1px 3px ${theme.palette.grey["700"]} !important`,
      border: `2px solid ${theme.palette.grey["700"]}`,
      margin: "auto",
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
    showcaseContent: {
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
    },
    /* Main Markdown Container */
    markdownRenderer: {
      "& h1": {
        // "& h1, h2": {
        borderBottom: `solid 1px ${theme.palette.grey["400"]}`,
      },
      "& img": {
        maxWidth: "100%",
        cursor: "pointer",
      },
      "& blockquote": {
        opacity: 0.5,
        marginLeft: 0,
        paddingLeft: theme.spacing(2),
        borderLeft: `5px solid ${theme.palette.grey["400"]}`,
      },
      "& pre code": {
        fontSize: "0.9rem",
      },
      "& .ease": {
        /* black color, ease everything */
        background: "#000",
      },
      "& .hide": {
        display: "none",
      },
      "& code:not(.hljs)": {
        /* inline code, not the code block with highlights */
        fontSize: "90%",
        padding: "0.1rem 0.25em",
        fontFamily: "inherit",
        background: theme.palette.grey["300"],
        borderRadius: theme.typography.pxToRem(2),
      },
      "& p": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
      "& .todoItem": {
        "& .todoCheckbox": {
          padding: 0,
        },
      },
    },
    trips: {
      "& svg": {
        touchAction: "none",
        height: "400px",
        border: `1px solid ${theme.palette.grey["400"]}`,
      },
    },
    loadingProgress: {
      height: "2px",
      position: "sticky",
      top: "0",
      zIndex: 1300,
    },
    /**
     use '@global' tag to prevent JSS renaming class name, all below styles will be global
     @see https://cssinjs.org/jss-plugin-global/
     */
    "@global": {
      html: {
        fontSize: "15px",
      },
      a: {
        textDecoration: "none",
        color: theme.palette.primary.main,
        "&:hover": {
          textDecoration: "underline",
        },
      },
      body: {
        fontSize: "1rem",
        margin: 0,
      },
      /* override for lightbox */
      ".ril__toolbar": {
        bottom: 0,
        top: "unset",
      },
    },
  });
});
