import { Chip } from "@material-ui/core";
import { ChipGalleryType } from "types/chipGalleryTypes";

const ChipGallery = ({ arrChip }: { arrChip: ChipGalleryType }): JSX.Element => (
  <>
    {arrChip.length > 0
        && arrChip
          .sort((a, b) => b.count - a.count)
          .map((chip) => {
            const { title, count } = chip;
            return (
              <Chip key={title} size="small" label={`${title} (${count})`} />
            );
          })}
  </>
);

export default ChipGallery;
