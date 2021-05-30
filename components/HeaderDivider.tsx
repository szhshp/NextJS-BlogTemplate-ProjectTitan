import {
  Grid,
  Typography,
  Divider,
  Box,
  TextField,
  Icon,
  IconButton,
} from "@material-ui/core";
import { Variant as ThemeVariant } from "@material-ui/core/styles/createTypography";
import React, { useState } from "react";
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
  keyword?: string;
  setKeyword?: (string) => void;
  showFilter?: boolean;
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
  keyword,
  setKeyword,
  showFilter = false,
}: HeaderDividerProps): JSX.Element => {
  const classes = useStyles();
  const [showFilterInput, setShowFilterInput] = useState(false);

  const toggleFilterInput = () => {
    if (showFilterInput && setKeyword) {
      setKeyword("");
    }
    setShowFilterInput(!showFilterInput);
  };
  return (
    <>
      <Grid container item>
        <Box
          flexGrow={1}
          display="flex"
          justifyContent="space-between"
          alignItems="baseline"
        >
          <Typography variant={variant} gutterBottom>
            {title} {count && `- ${count}`}
          </Typography>
          {showFilter && (
            <Box>
              {showFilterInput && setKeyword && (
                <TextField
                  placeholder="keyword"
                  className={classes.dividerSearch}
                  value={keyword}
                  variant="outlined"
                  onChange={(e) => setKeyword(e.target.value)}
                  size="small"
                />
              )}
              <IconButton
                onClick={toggleFilterInput}
                className={classes.headerIcon}
              >
                {showFilterInput ? <Icon>close</Icon> : <Icon>search</Icon>}
              </IconButton>
            </Box>
          )}
        </Box>
      </Grid>

      <Divider className={classes.divider} />
    </>
  );
};
export default HeaderDivider;
