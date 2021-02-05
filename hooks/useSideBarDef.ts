import { SideBarDef } from "types/sidebarTypes";
import { postSet } from "utils/getPost";
import { arrTags, arrCategories } from "utils/getTags";
import { SITE_CONFIG } from "data/config";
import { useTranslator } from "hooks/useTranslator";

/**
 * @name useSidebarDef
 * @description A hook to get the sidebar defination
 */
export const useSidebarDef = (): SideBarDef => {
  const { setLanguage } = useTranslator();

  return {
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
        icon: "videogame_asset",
        subLinks: [
          { textLeft: "Music", link: "/tech/2020/07/27/MainDocument" },
          { textLeft: "Game", link: "/tech/2020/07/27/MainDocument" },
        ],
      },
      {
        title: "About",
        icon: "person",
        subLinks: [{ textLeft: "About Me", link: "/about" }],
      },
      {
        title: "Language",
        icon: "translate",
        subLinks: [
          {
            textLeft: "Chinese",
            onClickSubLink: (): void => setLanguage("zh"),
          },
          {
            textLeft: "English",
            onClickSubLink: (): void => setLanguage("en"),
          },
        ],
      },
      {
        title: "Messager",
        link: "/about",
        icon: "chat",
      },
    ],
  };
};
