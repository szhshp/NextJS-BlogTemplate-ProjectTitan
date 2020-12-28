---
category: Tech
title: 'Project Titan 😃 Document'
date : '2020-07-27'
tags: ['Project','Gaia']
---

- [Feature/TODO](#featuretodo)
- [Dev](#dev)
- [Post](#post)
  - [Post Header](#post-header)
  - [Post Content](#post-content)
    - [Lightbox](#lightbox)
    - [Code Highlighter](#code-highlighter)
      - [Highlighter Theme](#highlighter-theme)
    - [Table of Content](#table-of-content)
      - [TOC Customization](#toc-customization)
  - [Internationalization/i18n](#internationalizationi18n)
    - [Add Locale Strings](#add-locale-strings)
    - [Display Translation](#display-translation)
    - [Set Language](#set-language)
  - [Static Pages](#static-pages)
    - [Static Pages with React Component](#static-pages-with-react-component)
    - [Static Pages With Markdown](#static-pages-with-markdown)
- [Migrate From **Project Gaia** to **Project Titan**](#migrate-from-project-gaia-to-project-titan)
- [Thanks](#thanks)


Github: [Project Titan](https://github.com/szhielelp/NextJS-BlogTemplate-ProjectTitan)

# Feature/TODO

- [ ] Custom Post Route
- [ ] Post Translation
- [x] Language Selector

# Dev

1. Fork and STAR it, please.
2. Clone it locally
3. `npm install` or `yarn`
4. `npm run dev` or `yarn dev`


# Post

## Post Header 

> Similar to YAML Header in Karmdown
> 
> YAML Header is required for all posts.

For post file `posts/jekyllmarkdowntoc.md` with below YAML Header:

```
---
title: 'Post Title' // (Required)
categories: 'Life'  // (Optional)
date : '2017-05-19' // (Required) 
tags: ['A', 'B'] // (Optional) 
color?: "primary" | "secondary" // (Optional) Determines the color in post list, default to grey 
---
```

Will be routed as

```
/Life/2017/05/19/jekyllmarkdowntoc
/Life/2017/05/19/jekyllmarkdowntoc.html  // Avaiable on prod only
```

## Post Content

Check the files in `/posts` then you may understand everything.

Implements with [react-markdown](https://github.com/rexxars/react-markdown)

You can custom the renderer in file `components\MarkdownRenderer.tsx`

### Lightbox

You don't need to care about it, at all.

It may show the lightbox on click of a image in any post.

![Lightbox Example](/demo/lightbox.png)

Implements with [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox)

### Code Highlighter

You don't need to care about it, at all.

Example: 

  ```js
    const a = 100;
    console.log(a);
    const f = (v) => v + 5;
    f(a);
  ```

Implements with [highlight.js](https://github.com/highlightjs/highlight.js)

#### Highlighter Theme

Change the css in `_app.tsx`:

```js
import "highlight.js/styles/monokai.css";
```

### Table of Content

You don't need to care about it, at all.

A responsive TOC will be automatically rendered in the sidebar.

![Responsive TOC](/demo/toc.png)

Implements with [tocbot](https://github.com/tscanlin/tocbot)

#### TOC Customization

Check the attributes in `Sidebar.tsx`:

```js
tocbot.init({
  tocSelector: ".sidebarMid-Toc",
  contentSelector: ".main",
  headingSelector: "h1, h2, h3, h4, h5",
  hasInnerContainers: true,
});
```

## Internationalization/i18n

### Add Locale Strings

You can add translation set in `locale.ts`

```js
export const locale = {
  siteTitle: {
    zh: "泰坦計劃",
    en: "Project Titan",
  },
}
```

### Display Translation

Usage with translate function `translationString`:

```js
console.log(translationString({
  textKey: "siteTitle",
}))
```

Usage with hooks `useTranslator`:

```jsx
const Example = (): JSX.Element => {
  const { translate, locale } = useTranslator();

  return <div>{`${translate(locale.siteTitle)}`}</div>;
};
```

### Set Language

```jsx
const Example = (): JSX.Element => {
  const { setLanguage } = useTranslator();

  return <div onClick={() => setLanguage("zh")}>Change Language</div>;
};
```


## Static Pages

### Static Pages with React Component

Here is an example of a static page with **React components** as content:

```jsx
const About = (): JSX.Element => (
  <PostTemplate
    title={`${translationString({
      textKey: "about",
    })}`}
    showFooter={!DEBUG_MODE_SINGLE_PAGE}
    showCommentBox={!DEBUG_MODE_SINGLE_PAGE}
    content={(
      <Box>
        <Box>JSX Here</Box>
      </Box>
    )}
  />
);

export default About;
```

Put these code to `/pages/about.tsx` then NextJS will route it as `/about` ([example](/about)) 

>See more about [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)

### Static Pages With Markdown

Here is an example of a static page with **pure markdown** as content:

```jsx
const markdown = `
# Title

# Title?

## Title!

## Title~

### Title-
`;

const CustomPage = (): JSX.Element => (
  <PostTemplate
    title="404"
    showFooter={false}
    showTOC={false}
    content={(
      <>
        <MarkdownRenderer content={markdown} />
      </>
      )}
  />
);

export default CustomPage;
```


# Migrate From **Project Gaia** to **Project Titan**

>That is easy to migrate

1. Provide all posts with valid date in the post header

    ```js
    ---
    title: 'Post Title' // You already have this in Jekyll 
    categories: 'Life' 
    date : '2017-05-19' // Make sure you have this attribute, date should be in format YYYY-MM-DD
    tags: ['A', 'B'] 
    ---
    ```

2. NextJS is different from Jekyll, you may need to build before deploy. 
   - Run `yarn run build` or `npm run build` to create a production version
   - Upload to your pages service
3. (You can use **Github Action**, **Jenkins** for CI/CD or **Vercel** to simplify the build process)


# Thanks

- Vercel
- NextJS
- Material UI
- tocbot
- react-markdown
- react-image-lightbox
- Doctor Jones
