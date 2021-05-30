import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { Box } from "@material-ui/core";

/**
 * @interface PaginationProps
 * @param data: the array of data to be rendered as pagination
 * @param itemRenderer: the renderer function for each item
 * @param pageLength: length of a single page
 */
interface PaginationProps<T> {
  data: T[];
  itemRenderer: (e: T, i?: number) => JSX.Element;
  pageLength?: number;
}

/**
 * @name PaginationContainer
 * @param [PaginationProps]
 */
const PaginationContainer = ({
  data,
  itemRenderer,
  pageLength = 10,
}: PaginationProps<typeof data[0]>): JSX.Element => {
  type ElementType = typeof data[0];
  const [page, setPage] = useState(1);

  /* OnChange event for pagination buttons */
  const pageOnChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => setPage(value);

  return (
    <>
      {data.length > pageLength ? (
        <>
          {data.map((e: ElementType, i) => (Math.floor(i / pageLength) === page - 1 ? itemRenderer(e, i) : null))}
          <Box my={2}>
            <Pagination
              count={Math.ceil(data.length / pageLength)}
              color="primary"
              page={page}
              onChange={pageOnChange}
            />
          </Box>
        </>
      ) : (
        data.map((e: ElementType) => itemRenderer(e))
      )}
    </>
  );
};

export default PaginationContainer;
