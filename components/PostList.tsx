import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  Pagination,
} from "@material-ui/lab";
import { useStyles } from "styles/styles";
import { Chip, Typography, useMediaQuery } from "@material-ui/core";
import { Post } from "types/postTypes";
import { getPostPath } from "utils/getPost";
import { useState } from "react";
import HeaderDivider from "components/HeaderDivider";
import Link from "next/link";
import theme from "types/theme";
import { useTranslater } from "hooks/translator";

/**
 * @interface PostListProps
 * @param posts: the post array
 * @param paginationEnable: Enable the pagination on the bottom of the post list
 * @param showDateChip: Show the date chip on the left side of post links
 * @param title: title of the post list section
 * @param filterEnable: Show the filter beside the title header
 */
interface PostListProps {
  posts: Post[];
  paginationEnable?: boolean;
  showDateChip?: boolean;
  filterEnable?: boolean;
  title: string;
}

/**
 * @name PostList
 * @param {PostListProps}
 * @description Render a post list with timeline style, order by date on default
 */
const PostList = ({
  posts,
  paginationEnable = false,
  showDateChip = true,
  filterEnable = false,
  title,
}: PostListProps): JSX.Element => {
  const { translate, locale } = useTranslater();
  const classes = useStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  /* Pagination index,start from 1 */
  const [page, setPage] = useState(1);

  /* Filter keyword, reflect on frontend only when filterEnable = true */
  const [keyword, setKeyword] = useState("");

  const pageLength = 30;

  /* OnChange event for pagination buttons */
  const pageOnChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  /* OnChange event for filter search box */
  const searchBoxOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setPage(1); // reset to first page
    setKeyword(event.target.value);
  };

  /* Filter the posts */
  const filteredPosts: Post[] = posts.filter((post) => {
    /* Filter by keyword if keyword applied  */
    if (filterEnable && keyword.length > 0) {
      const { date, title: postTitle } = post.frontmatter;
      return (
        postTitle.toLowerCase().indexOf(keyword.toLowerCase())
          > -1 || date.indexOf(keyword) > -1
      );
    }
    return true;
  });

  return (
    <>
      <HeaderDivider
        title={title}
        count={posts.length}
        filterEnable={filterEnable}
        searchBoxOnChange={searchBoxOnChange}
      />
      <Timeline align="left" className={classes.timeline}>
        {filteredPosts.length > 0
          ? filteredPosts.map((post, index) => {
            const { color, date, title: postTitle } = post.frontmatter;
            /* show post when:
              1. pagination not enable
              2. Pagination enabled and post is in currect page
            */
            const showPost = !paginationEnable
                || (paginationEnable
                  && Math.floor(index / pageLength) === page - 1);
            return (
              showPost && (
              <TimelineItem key={postTitle}>
                <TimelineSeparator>
                  <TimelineDot color={color} variant="outlined" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  {showDateChip && !isSmallScreen && (
                  <Chip color={color} label={date} />
                  )}
                  <Typography color={color} className="timeline-Link">
                    <Link href="/[...slug]" as={getPostPath(post)}>
                      {postTitle}
                    </Link>
                  </Typography>
                </TimelineContent>
              </TimelineItem>
              )
            );
          })
          : translate(locale.noDataFound)}
      </Timeline>
      {paginationEnable && (
        <Pagination
          count={Math.ceil(filteredPosts.length / pageLength)}
          color="primary"
          page={page}
          onChange={pageOnChange}
        />
      )}
    </>
  );
};

export default PostList;
