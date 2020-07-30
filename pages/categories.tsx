import PostTemplate from "components/PostTemplate";
import HeaderDivider from "components/HeaderDivider";
import { Grid, Box } from "@material-ui/core";
import { arrTags, arrCategories } from "utils/getTags";
import ChipGallery from "components/ChipGallery";
import { useTranslater } from "hooks/translator";

const Categories = (): JSX.Element => {
  const { translate, locale } = useTranslater();

  return (
    <PostTemplate
      showFooter
      showCommentBox={false}
      showTitle={false}
      title={`${translate(locale.categories)}/${translate(locale.tags)}`}
      content={(
        <Grid container>
          <Grid item xs={12}>
            <Box mb={6} mt={6}>
              <HeaderDivider title={`${translate(locale.categories)}`} variant="h5" />
              <ChipGallery arrChip={arrCategories} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box mb={6} mt={6}>
              <HeaderDivider title={`${translate(locale.tags)}`} variant="h5" />
              <ChipGallery arrChip={arrTags} />
            </Box>
          </Grid>
        </Grid>
    )}
    />
  );
};

export default Categories;
