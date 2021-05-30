/**
 * @type ChipGalleryType
 * @param title: Title of the chip on the left side
 * @param number: The number on the right side
 * @param link: the route to redirect on click of the chip
 */
export type ChipGalleryType = {
  title: string;
  count: number;
  link?: string;
}[];
