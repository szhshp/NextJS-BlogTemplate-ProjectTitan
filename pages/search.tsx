import React, { useState } from "react";
import PostTemplate from "components/PostTemplate";
import {
  Paper,
  IconButton,
  InputBase,
  Divider,
  Icon,
  Grid,
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  CircularProgress,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { translationString } from "components/Translation";
import { logger } from "utils/logger";
import { useStyles } from "styles/styles";
import { useTranslator } from "hooks/useTranslator";
import { Skeleton } from "@material-ui/lab";
import Link from "next/link";
import PaginationContainer from "components/PaginationContainer";
import { GetStaticProps } from "next";
import { pushToAlgoliaSearch } from "utils/algoliaSearch";
import { COMPONENT_CONFIG } from "data/config";

type SearchResult = {
  hits: {
    title: string;
    link: string;
    _highlightResult: {
      content: {
        fullyHighlighted: boolean;
        matchLevel: string;
        matchedWords: string[];
        value: string;
      };
    };
  }[];
};

const SearchPanel = (): JSX.Element => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<SearchResult>();
  const [loading, setLoading] = useState(false);
  const { translate, locale } = useTranslator();

  const search = async () => {
    setLoading(true);
    const { getAlgoliaSearchInstance } = await import("utils/algoliaSearch");
    getAlgoliaSearchInstance()
      .search(keyword)
      .then((res): void => {
        setResult(res as any);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        logger(err);
      });
  };

  return (
    <Grid container className={classes.searchPage}>
      <Grid item xs={12}>
        <Box my={2}>
          <Paper className="searchBox">
            {/* TODO: translation */}
            <InputBase
              className="input"
              placeholder={translate(locale.searchHints)}
              value={keyword}
              disabled={loading}
              onChange={(event): void => {
                setKeyword(event.target.value);
              }}
              onKeyUp={(e): void => {
                if (e.keyCode === 13) {
                  search();
                }
              }}
            />
            <Divider className="divider" orientation="vertical" />
            <IconButton
              type="submit"
              className="iconButton"
              aria-label="search"
              disabled={loading}
              onClick={search}
            >
              {loading ? (
                <CircularProgress size="1.5rem" />
              ) : (
                <Icon>search</Icon>
              )}
            </IconButton>
          </Paper>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Divider />
        <Box my={2}>
          {loading && (
            <>
              {Array(16)
                .fill(undefined)
                .map(() => Math.random() * 80)
                .map((e) => (
                  <Skeleton key={e} width={`${20 + e}%`} height="2rem" />
                ))}
            </>
          )}
          {!loading && result?.hits && (
            <>
              <PaginationContainer
                pageLength={20}
                itemRenderer={(e): JSX.Element => (
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="body2">
                        <Link href={e.link}>{e.title}</Link>
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{
                          // eslint-disable-next-line no-underscore-dangle
                          __html: e._highlightResult.content.value,
                        }}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
                data={result.hits}
              />
            </>
          )}
          {!loading &&
            result &&
            result.hits.length === 0 &&
            translate(locale.noDataFound)}
        </Box>
      </Grid>
    </Grid>
  );
};

/**
 * @name getStaticProps
 * @description Push to algolia only on build
 */
export const getStaticProps: GetStaticProps = async () => {
  if (COMPONENT_CONFIG.APP.SEARCH.PUSH_TO_ALGOLIA) {
    pushToAlgoliaSearch();
  }
  return {
    props: {}, // will be passed to the page component as props}
  };
};

const Search = (): JSX.Element => (
  <PostTemplate
    title={`${translationString({ textKey: "search" })}`}
    showPostDesc={false}
    showTOC={false}
    showCommentBox={false}
    content={<SearchPanel />}
  />
);

export default Search;
