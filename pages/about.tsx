import React from "react";
import PostTemplate from "components/PostTemplate";
import { translationString } from "components/Translation";
import { Box } from "@material-ui/core";

const DEBUG_MODE_SINGLE_PAGE = false;

const About = (): JSX.Element => (
  <PostTemplate
    title={`${translationString({
      textKey: "about",
    })}`}
    showFooter={!DEBUG_MODE_SINGLE_PAGE}
    showCommentBox={!DEBUG_MODE_SINGLE_PAGE}
    content={(
      <Box>
        <h2>About Me</h2>
        <Box>Custom Static Page Example</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Write something here</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
        <Box>Szhshp is cool!</Box>
      </Box>
    )}
  />
);

export default About;
