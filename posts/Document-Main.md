---
category: Tech
title: 'Project Titan - Document'
date : '2021-05-30'
tags: ['Project','Gaia']
color: 'primary'
---

## Project Titan

![](/github/logo.png)


## Try it out

Github: [Project Titan](https://github.com/szhielelp/NextJS-BlogTemplate-ProjectTitan)

1. Fork and STAR it, please. 
2. Go to [Vercel Official Site](https://vercel.com/), Login and click 'New Project'
3. Import your forked repo
4. Click `Continue` without any modification on configs.
5. Finger crossed and wait it to deploy

Then you can add/update the post and push to github. Vercel will handle all CI/CD works for you. 

## Dev

1. Fork and STAR it, please.
2. Clone it locally
3. `npm install` or `yarn`
4. `npm run dev` or `yarn dev`

## What's New

### Random Homepage Background 

You can set your favourite homepage background on [data\jumbotron.ts](../data/jumbotron.ts):

``` JS
const backgroundPictureLib = [
  "https://i.picsum.photos/id/311/1600/900.jpg?hmac=yUS02Bgwg81GbTpDuG813r871akJWNv-_Oem7a6PtWY",
  "https://i.picsum.photos/id/83/1600/900.jpg?hmac=R9BQdLAPaGw27suOHRBe6G6xb7m1XzQlbsx7as1N7-s",
  "https://i.picsum.photos/id/667/1600/900.jpg?hmac=JScRHUs-2c2rX10nkdYL8sWamAcZM0ax0n18X_N4s0Y",
  "https://i.picsum.photos/id/888/1600/900.jpg?hmac=hw_TgE4fAZhZAjM5W_sTVY3_SpRrZU7vKw42ZtQt6mo",
  "https://i.picsum.photos/id/649/1600/900.jpg?hmac=MfwiBIOCS7_7zBii3bCvlKJIUO7rxdhOtDPhgvnn8tk",
];

```

> Before you add background picture, add the pic host into config, see: [WebP Pictures Integration](#WebP-Pictures-Integration)


In order to reduce the picture size, pictures are serves as webP and may display randomly on **each build.**


![](/demo/homepage.png)


> You may see different homepage background on each `git push` to your site. 

### Showcase Content

You can set your favourite quotation on [data\showcaseContent.ts](../data/showcaseContent.ts):

Quotations are displayed randomly on **each visit.**


![](/demo/showCase.png)


> You may see different show case content on each access to your site. 

## Post

### Post Header 

> Header is required for all posts.

For post file `posts/jekyllmarkdowntoc.md` with below YAML Header:

```
  ---
  title: 'Post Title' // (Required)
  categories: 'Life'  // (Optional)
  date : '2017-05-19' // (Required) 
  tags: ['A', 'B'] // (Optional, array of string) 
  color?: "primary" | "secondary" // (Optional) Determines the color in post list, default to grey 
  hide: true | false // (Optional as false, hide the post in Post List?) 
  ---
```

Will be routed as

```
  /Life/2017/05/19/jekyllmarkdowntoc
  /Life/2017/05/19/jekyllmarkdowntoc.html  // Auto-redirect to above one
```

### Post Content

Check the files in `/posts` then you may understand everything.

#### WebP Pictures Integration 

All images in posts will be progressed and serve as webP picture.

You may need to put the image hosts into [next.config.js](../next.config.js)

``` JS
  images: {
    domains: [
      "szhshp.org",
      "titan.szhshp.org",
      // "yourImageDomain.com",
      "i.picsum.photos",
      "i.imgur.com",
    ],
  },
```


#### Lightbox

You don't need to care about it, at all.

It may show the lightbox on click of a image in any post.

![Lightbox Example](/demo/lightbox.png)

Implements with [react-image-lightbox](https://github.com/frontend-collective/react-image-lightbox)

#### Code Highlighter

You don't need to care about it, at all.

Example: 

```js
  const a = 100;
  console.log(a);
  const f = (v) => v + 5;
  f(a);
```

Implements with [highlight.js](https://github.com/highlightjs/highlight.js)

##### Highlighter Theme

Change the css in `_app.tsx`:

```js
import "highlight.js/styles/monokai.css";
```

#### Table of Content

You don't need to care about it, at all.

##### Sidebar Content

A responsive TOC will be automatically rendered in the sidebar.

![Responsive TOC](/demo/toc.png)

##### Post Content

An extra TOC will be automatically rendered at the top of each post.

![Responsive TOC](/demo/toc2.png)

##### TOC Customization

Check the attributes in `Sidebar.tsx`:

```js
  tocbot.init({
    tocSelector: ".sidebarMid-Toc",
    contentSelector: ".main",
    headingSelector: "h1, h2, h3, h4, h5",
    hasInnerContainers: true,
  });
```

### Internationalization/i18n

#### Locale Strings

You can add translation set in `locale.ts`

```js
  export const locale = {
    siteTitle: {
      zh: "泰坦計劃",
      en: "Project Titan",
    },
  }
```

#### Display Translation

Usage with translate function `translationString`:


```js
console.log(translationString({
  textKey: "siteTitle",
}))
```

Usage with hook `useTranslator`:

```jsx
const Example = (): JSX.Element => {
  const { translate, locale } = useTranslator();

  return <div>{`${translate(locale.siteTitle)}`}</div>;
};
```

#### Set Language

```jsx
const Example = (): JSX.Element => {
  const { setLanguage } = useTranslator();

  return <div onClick={() => setLanguage("zh")}>Change Language</div>;
};
```


### Static Pages

#### Static Pages with React Component

Here is an example of a static page with **React components** as content:

```jsx
const About = (): JSX.Element => (
  <PostTemplate
    title={`${translationString({
      textKey: "about",
    })}`}
    showFooter={!DEBUG_MODE_SINGLE_PAGE}
    content={(
      <Box>
        <Box>JSX Here</Box>
      </Box>
    )}
  />
);

export default About;
```

Put these snippets to `/pages/about.tsx` then NextJS will route it as `/about` ([example](/about)) 

>See more about [Dynamic Routes](https://nextjs.org/docs/routing/dynamic-routes)

#### Static Pages With Markdown

Here is an example of a static page with **pure markdown** as content:

```jsx
const markdown = `
## Title

## Title?

### Title!

### Title~

#### Title-
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


## Migrate From **Project Gaia** to **Project Titan**

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


## Thanks

- Vercel
- NextJS
- Material UI
- tocbot
- react-markdown
- react-image-lightbox
- Doctor Jones
