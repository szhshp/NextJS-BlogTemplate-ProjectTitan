import { Grid, Box } from "@material-ui/core";
import PostList from "components/PostList";
import HeaderDivider from "components/HeaderDivider";
import React from "react";
import ChipGallery from "components/ChipGallery";
import Jumbotron from "components/Jumbotron";
import Content from "components/Content";
import { postSet } from "utils/getPost";
import Head from "next/head";
import { arrCategories } from "utils/getTags";
import { useTranslator } from "hooks/useTranslator";

const DEBUG_MODE_SINGLE_PAGE = 0;

const Home = (): JSX.Element => {
  const { translate, locale } = useTranslator();

  return (
    <Content>
      <Head>
        <title>{translate(locale.siteTitle)}</title>
      </Head>
      <>
        {DEBUG_MODE_SINGLE_PAGE >= 0 && <Jumbotron />}
      </>
      <Grid container item xs={12} spacing={3}>
        <Grid item xs={12} md={7} id="postList">
          <Box m={3}>
            <PostList
              title={translate(locale.posts)}
              posts={postSet.normal}
              paginationEnable
              filterEnable
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Box m={3}>
            <HeaderDivider title={translate(locale.categories)} />
            <ChipGallery arrChip={arrCategories} />
          </Box>
        </Grid>
      </Grid>
    </Content>
  );
};

export default Home;
