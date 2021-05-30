import { Grid, Box, useMediaQuery } from "@material-ui/core";
import { useStyles } from "styles/styles";
import PostList from "components/PostList";
import React from "react";
import Jumbotron from "components/Jumbotron";
import Content from "components/Content";
import Quote from "components/Quote";
import { useShowcaseContent } from "hooks/useShowcaseContent";
import { displayablePosts } from "utils/getPost";
import Head from "next/head";
import { useTranslator } from "hooks/useTranslator";
import theme from "types/theme";
import { COMPONENT_CONFIG } from "data/config";

const SHOW_COMPONENT = COMPONENT_CONFIG.APP.MAIN_CONTENT;

const Home = (): JSX.Element => {
  const classes = useStyles();
  const showcaseContent = useShowcaseContent();
  const { translate, locale } = useTranslator();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <Content>
      <Head>
        <title>{translate(locale.siteTitle)}</title>
      </Head>
      <>
        {SHOW_COMPONENT.JUMBOTRON && <Jumbotron />}
        {SHOW_COMPONENT.SHOWCASE && showcaseContent !== undefined && (
          <Box className={classes.showcaseContent}>
            <Quote
              text={showcaseContent.content}
              references={[`${showcaseContent.title || ""}`]}
              referencesSecondary={[
                `${showcaseContent.creator} -『${showcaseContent.from}』`,
                showcaseContent.desc || "",
              ]}
            />
          </Box>
        )}
      </>
      <Grid container item xs={12}>
        {SHOW_COMPONENT.POST_LIST && (
          <Grid item xs={12} id="postList">
            <Box m={isSmallScreen ? 1 : 3}>
              <PostList
                title={translate(locale.posts)}
                posts={displayablePosts}
                paginationEnable
                pageLength={30}
                showFilter
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Content>
  );
};

export default Home;
