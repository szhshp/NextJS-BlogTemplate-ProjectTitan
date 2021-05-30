import PostTemplate from "components/PostTemplate";
import HeaderDivider from "components/HeaderDivider";
import { Grid, Box } from "@material-ui/core";
import { arrTags, arrCategories } from "utils/getTags";
import ChipGallery from "components/ChipGallery";
import { useTranslator } from "hooks/useTranslator";
import { useRouter } from "next/router";
import PostList from "components/PostList";
import { getPostByCategory } from "utils/getPost";

const Categories = (): JSX.Element => {
  const { translate, locale } = useTranslator();
  const router = useRouter();
  const { category, tag } = router.query;

  return (
    <PostTemplate
      showPostDesc={false}
      showCommentBox={false}
      showTitle={false}
      showTOC={false}
      title={`${translate(locale.categories)}/${translate(locale.tags)}`}
      content={(
        <Grid container>
          <Grid item xs={12}>
            <Box mt={6}>
              <HeaderDivider title={`${translate(locale.tags)}`} variant="h5" />
              <ChipGallery
                arrChip={arrTags}
                highlight={typeof tag === "string" ? tag : undefined}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={6}>
              <HeaderDivider
                title={`${translate(locale.categories)}`}
                variant="h5"
              />
              <ChipGallery
                arrChip={arrCategories}
                highlight={typeof category === "string" ? category : undefined}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mt={6}>
              {(tag || category) && (
                <PostList
                  posts={getPostByCategory({
                    tags: typeof tag === "string" ? [tag] : undefined,
                    categories:
                      typeof category === "string" ? [category] : undefined,
                  })}
                  paginationEnable
                  pageLength={20}
                  showDateChip
                  title={translate(locale.related)}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      )}
    />
  );
};

export default Categories;
