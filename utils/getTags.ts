import { ChipGalleryType } from "types/chipGalleryTypes";
import { posts } from "utils/getPost";

/* Tags/Categories Data */
/* TODO: ChipGalleryType is not good naming */
export const arrTags: ChipGalleryType = [];
export const arrCategories: ChipGalleryType = [];

posts.forEach((e) => {
  if (e.frontmatter.tags) {
    e.frontmatter.tags.forEach((tag) => {
      if (!tag || tag.length === 0) return;
      const index = arrTags.findIndex((t) => t.title === tag);
      if (index > -1) {
        arrTags[index].count += 1;
      } else {
        arrTags.push({
          title: tag,
          count: 1,
        });
      }
    });
  }
  if (e.frontmatter.category) {
    const { category } = e.frontmatter;
    if (!category || category.length === 0) return;
    const index = arrCategories.findIndex((c) => c.title === category);
    if (index > -1) {
      arrCategories[index].count += 1;
    } else {
      arrCategories.push({
        title: category,
        count: 1,
      });
    }
  }
});
