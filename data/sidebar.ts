import { SideBarDef } from "types/sidebarTypes";
import { postSet } from "utils/getPost";
import { arrTags, arrCategories } from "utils/getTags";
import { SITE_CONFIG } from "data/config";

/**
 * @name sidebarDef
 * @description The defination of sidebar
 * @see Icons https://google.github.io/material-design-icons/#getting-icons
 */
export const sidebarDef: SideBarDef = {
  headImage: SITE_CONFIG.headImageUrl,
  name: SITE_CONFIG.author,
  motto: SITE_CONFIG.motto,
  links: [
    {
      title: "Home",
      link: "/",
      icon: "home",
    },
    {
      title: "Archives",
      link: "/#postList",
      icon: "archive",
      subLinks: [
        {
          textLeft: "Post",
          textRight: postSet.normal.length.toString(),
          link: "/#postList",
        },
        {
          textLeft: "Categories",
          textRight: arrCategories.length.toString(),
          link: "/categories",
        },
        {
          textLeft: "Tags",
          textRight: arrTags.length.toString(),
          link: "/categories",
        },
      ],
    },
    {
      title: "Life",
      link: "",
      icon: "videogame_asset",
      subLinks: [
        { textLeft: "Music", textRight: "", link: "/tech/2020/07/27/MainDocument" },
        { textLeft: "Game", textRight: "", link: "/tech/2020/07/27/MainDocument" },
      ],
    },
    {
      title: "About",
      link: "",
      icon: "person",
      subLinks: [
        { textLeft: "About Me", textRight: "", link: "/about" },
      ],
    },
    {
      title: "Messager",
      link: "/about",
      icon: "chat",
    },
  ],
};
