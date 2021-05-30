import { Chip } from "@material-ui/core";
import { ChipGalleryType } from "types/chipGalleryTypes";
import Link from "next/link";

/**
 * @name ChipGallery
 * @desc The chip gallery for tags/categories
 * @param arrChip: [ChipGalleryType]
 */
const ChipGallery = ({
  arrChip,
  highlight,
}: {
  arrChip: ChipGalleryType;
  highlight?: string;
}): JSX.Element => (
  <>
    {arrChip.length > 0 &&
      arrChip
        .sort((a, b) => b.count - a.count)
        .map((chip) => {
          const { title, count } = chip;
          return (
            <Link href={chip.link || "#"} passHref key={title}>
              <Chip
                key={title}
                size="small"
                color={chip.title === highlight ? "primary" : "default"}
                label={`${title} (${count})`}
              />
            </Link>
          );
        })}
  </>
);

export default ChipGallery;
