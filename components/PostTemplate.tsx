import { useStyles } from "styles/styles";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  Container, Box, Divider, Grid, Chip,
} from "@material-ui/core";
import { posts, getPostPath } from "utils/getPost";
import Content from "components/Content";
import HeaderDivider from "components/HeaderDivider";
import CommentBox from "components/CommentBox";
import { MarkdownRenderer } from "components/MarkdownRenderer";
import { useTranslator } from "hooks/useTranslator";
import Link from "next/link";
import dj from "doctor-jones";
import { useEffect } from "react";

const DEBUG_MODE_SINGLE_PAGE = 0;

/**
 * @name PostTemplateProps
 * @param redirectTo: The url to redirect once post loaded
 * @param date: Post date
 * @param content: Post content, string or JSX
 * @param showTitle
 * @param showFooter
 * @param showCommentBox
 * @param pureMarkdown: pure markdown?
 *  if yes we may format it with doctor-jones
 * @param showTOC
 * @param category: category as string
 * @param tags: tags in array of string
 */
interface PostTemplateProps {
  title?: string;
  redirectTo?: string;
  date?: string;
  content: string | JSX.Element;
  showTitle?: boolean;
  showFooter?: boolean;
  showCommentBox?: boolean;
  pureMarkdown?: boolean;
  showTOC?: boolean;
  category?: string;
  tags?: string[];
}

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
  showFooter = true,
  showCommentBox = true,
  pureMarkdown = true,
  showTOC = true,
  category,
  tags,
}: PostTemplateProps): JSX.Element => {
  const { translate, locale } = useTranslator();
  const classes = useStyles();
  const router = useRouter();

  useEffect(() => {
    if (redirectTo) router.push(redirectTo);
  }, []);

  return (
    <Content showTOC={showTOC} showFooter={showFooter}>
      <Head>
        <title>
          {title}
          {" "}
          -
          {translate(locale.siteTitle)}
        </title>
      </Head>
      <Container maxWidth="md" className={classes.post}>
        {showTitle && (
          <Box>
            <h1 className="post-Title">{title}</h1>
            <Box mb={1}>{date}</Box>
          </Box>
        )}
        <Divider />
        {DEBUG_MODE_SINGLE_PAGE >= 0 && (
          <Box className="post-Content">
            {pureMarkdown && typeof content === "string" ? (
              <Box>
                <MarkdownRenderer content={dj(content)} />
              </Box>
            ) : (
              content
            )}
          </Box>
        )}
        {DEBUG_MODE_SINGLE_PAGE >= 0 && (
          <Grid container spacing={3}>
            <Grid item sm={12} md={6}>
              <HeaderDivider
                title={translate(locale.aboutThisArticle)}
                variant="h6"
              />
              <ul>
                <li>
                  {translate(locale.postTitle)}
                  {": "}
                  {/* TODO: Redirection? */}
                  <Link href={router.asPath}>{title}</Link>
                </li>
                <li>
                  {translate(locale.postCategory)}
                  {": "}
                  {category}
                </li>
                <li>
                  {translate(locale.postDate)}
                  {": "}
                  {date}
                </li>
                <li>
                  {translate(locale.postTags)}
                  {": "}
                  {tags?.map((e) => (
                    <Chip label={e} key={e} />
                  ))}
                </li>
              </ul>
            </Grid>
            <Grid item sm={12} md={6}>
              <HeaderDivider
                title={translate(locale.recentPosts)}
                variant="h6"
              />
              <ul>
                {posts.slice(0, 10).map((post) => (
                  <li key={post.slug}>
                    <Link href="/[...slug]" as={getPostPath(post)}>
                      {post.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          </Grid>
        )}
        {DEBUG_MODE_SINGLE_PAGE >= 0 && showCommentBox && (
          <Grid container>
            <Grid item xs={12} spacing={3}>
              <HeaderDivider
                title={translate(locale.messager)}
                variant="h6"
              />
              <CommentBox />
            </Grid>
          </Grid>
        )}
      </Container>
    </Content>
  );
};

export default PostTemplate;
