import { useStyles } from "styles/styles";
import { useRouter } from "next/router";
import Head from "next/head";
import { Container, Box, Grid, Chip } from "@material-ui/core";
import { displayablePosts, getPostPath } from "utils/getPost";
import Content from "components/Content";
import HeaderDivider from "components/HeaderDivider";
import { MarkdownRenderer } from "components/markdownRenderer/MarkdownRenderer";
import { useTranslator } from "hooks/useTranslator";
import Link from "next/link";
import dj from "doctor-jones";
import React, { useEffect } from "react";
import ReactMarkdownHeading from "react-markdown-heading";
import { COMPONENT_CONFIG, SITE_CONFIG } from "data/config";
import { PostRenderMode, PostTemplateProps } from "types/postTypes";

/**
 * @name PostTemplate
 * @param {PostTemplateProps}
 */
const PostTemplate = ({
  title,
  redirectTo,
  date,
  content,
  showTitle = true,
  showPostDesc = true,
  showCommentBox = true,
  showTOC = true,
  category,
  tags,
  postRenderMode = PostRenderMode.PureHTML,
}: PostTemplateProps): JSX.Element => {
  const { translate, locale } = useTranslator();
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) router.push(redirectTo);
  }, []);

  return (
    <Content showTOC={showTOC}>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxWidth="md" className={classes.post}>
        {showTitle && (
          <Grid item sm={12}>
            <Box>
              <h1 className="post-Title">{title}</h1>
              <Box mb={1}>{date}</Box>
            </Box>
          </Grid>
        )}
        {COMPONENT_CONFIG.APP.MAIN_CONTENT.POST.POST_CONTENT && (
          <Grid item sm={12}>
            {postRenderMode === PostRenderMode.PureHTML && (
              <Box className="post-Content">{content}</Box>
            )}
            {postRenderMode === PostRenderMode.NormalMarkdownPost &&
              typeof content === "string" && (
                <Box className="post-Content">
                  <Box
                    id={SITE_CONFIG.componentsConfig.postContentTOC.id}
                    className="post-Content-Toc"
                    margin={2}
                  >
                    {/**
                      @desc TOC on the top of the content
                      @see https://www.npmjs.com/package/react-markdown-heading
                    */}
                    <ReactMarkdownHeading markdown={content} hyperlink />
                  </Box>
                  <Box>
                    <MarkdownRenderer content={dj(content)} />
                  </Box>
                </Box>
              )}
          </Grid>
        )}
        {COMPONENT_CONFIG.APP.MAIN_CONTENT.POST.POST_DESC && showPostDesc && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <HeaderDivider
                title={translate(locale.aboutThisArticle)}
                variant="h6"
              />
              <ul>
                <li>
                  {translate(locale.postTitle)}
                  {": "}
                  <Link href={router.asPath}>
                    <a>{title}</a>
                  </Link>
                </li>
                <li>
                  {translate(locale.postDate)}
                  {": "}
                  {date}
                </li>
                <li>
                  {translate(locale.postCategory)}
                  {": "}
                  <Link href={`/categories?category=${category}`} passHref>
                    <Chip label={category} />
                  </Link>
                </li>
                <li>
                  {translate(locale.postTags)}
                  {": "}
                  {tags?.map((e) => (
                    <Link key={e} href={`/categories?tag=${e}`} passHref>
                      <Chip label={e} />
                    </Link>
                  ))}
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={6}>
              <HeaderDivider
                title={translate(locale.recentPosts)}
                variant="h6"
              />
              <ul>
                {displayablePosts.slice(0, 10).map((post) => (
                  <li key={post.postRoute}>
                    <Link href="/[...postRoute]" as={getPostPath(post)}>
                      <a>{post.frontmatter.title}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        )}
      </Container>
    </Content>
  );
};

export default PostTemplate;
