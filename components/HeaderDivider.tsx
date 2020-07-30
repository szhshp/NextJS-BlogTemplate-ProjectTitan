import {
  Grid, Typography, Divider, Box, Input,
} from "@material-ui/core";
import { Variant as ThemeVariant } from "@material-ui/core/styles/createTypography";
import { useStyles } from "styles/styles";

type Variant = ThemeVariant | "srOnly";

/**
 * @interface HeaderDividerProps
 * @param title
 * @param variant: Variant of title style, default to h5
 * @param filterEnable: Enable the search box
 * @param searchBoxOnChange: On change of the filter input
 */
interface HeaderDividerProps {
  title: string;
  variant?: Variant;
  count?: number;
  filterEnable?: boolean;
  searchBoxOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * @name HeaderDivider
 * @param {HeaderDividerProps}
 * @description Render a header divider with title and filter (optional)
 */
const HeaderDivider = ({
  title,
  variant = "h5",
  count,
  filterEnable = false,
  searchBoxOnChange,
}: HeaderDividerProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid container item alignItems="baseline">
        <Box flexGrow={1}>
          <Typography variant={variant} gutterBottom>
            {title}
            {" "}
            {count && `- ${count}`}
          </Typography>
        </Box>
        {filterEnable && searchBoxOnChange && (
        <Input
          placeholder="Search"
          onChange={searchBoxOnChange}
          className={classes.searchBox}
        />
        )}
      </Grid>

      <Divider className={classes.divider} />
    </>
  );
};
export default HeaderDivider;
