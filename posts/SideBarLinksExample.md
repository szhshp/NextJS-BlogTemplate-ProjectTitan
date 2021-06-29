---
category: Tech
title: 'Sidebar links Example'
date : '2021-05-25'
tags: ['Project', 'Titan']
---

# Sidebar links Example

You can link any post to a sidebar button on `data\staticPageRoutes.ts` .


```jsx
export const staticPageRoutes = {
  home: {
    link: "/",
    filepath: "/",
  },
  posts: {
    link: "/#postList",
    filepath: "/index",
  },
  aboutMe: {
    link: "/tech/2021/05/25/SideBarLinksExample",   // HERE !!!
    filepath: "/[...postRoute]",
  },
  index: {
    link: "/#postList",
    filepath: "/index",
  },
  categories: {
    link: "/categories",
    filepath: "/categories",
  },
  projects: {
    link: "/projects",
    filepath: "/projects",
  },
};

```

## Static Routes

For example: current page route is `/tech/2021/05/25/SideBarLinksExample` which assigned to `staticPageRoutes.aboutMe`.

Then you can use it in sidebar or somewhere else.


`hooks/useSiderBarData.ts`:

```
...
     {
        title: "About",
        icon: "person",
        desc: translate(locale.about),
        ...staticPageRoutes.aboutMe,
      },
...
```

