import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@material-ui/lab";
import { useStyles } from "styles/styles";
import { Chip, Typography, useMediaQuery } from "@material-ui/core";
import { Post } from "types/postTypes";
import { getPostPath } from "utils/getPost";
import HeaderDivider from "components/HeaderDivider";
import Link from "next/link";
import theme from "types/theme";
import { useTranslator } from "hooks/useTranslator"; 
import PaginationContainer from "components/PaginationContainer";
import { useState } from "react";

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
  pageLength?: number;
  showDateChip?: boolean;
  title: string;
  showFilter?: boolean;
}

/**
 * @name PostList
 * @param {PostListProps}
 * @description Render a post list with timeline style, order by date on default
 */
const PostList = ({
  posts,
  paginationEnable = false,
  pageLength = 2000,
  showDateChip = true,
  title,
  showFilter = false,
}: PostListProps): JSX.Element => {
  const { translate, locale } = useTranslator();
  const classes = useStyles();
  const widerScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const [keyword, setKeyword] = useState("");
  const filteredPost = posts.filter((post) =>
    post.frontmatter.title
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase())
  );

  return (
    <>
      <HeaderDivider
        title={title}
        count={posts.length}
        keyword={keyword}
        setKeyword={(_keyword) => setKeyword(_keyword)}
        showFilter={showFilter}
      />
      <Timeline align="left" className={classes.timeline}>
        {filteredPost.length > 0 ? (
          <PaginationContainer
            pageLength={paginationEnable ? pageLength : 2000}
            itemRenderer={(e): JSX.Element => {
              const { color, date, title: postTitle } = e.frontmatter;

              return (
                <TimelineItem key={postTitle}>
                  <TimelineSeparator>
                    <TimelineDot color={color} variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {showDateChip && widerScreen && (
                      <Chip color={color} label={date} />
                    )}
                    <Typography color={color} className="timeline-Link">
                      <Link
                        href="/[...postRoute]"
                        as={getPostPath(e)}
                        prefetch={false}
                      >
                        <a>{postTitle}</a>
                      </Link>
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            }}
            data={filteredPost}
          />
        ) : (
          translate(locale.noDataFound)
        )}
      </Timeline>
    </>
  );
};

export default PostList;
