import {
  Grid,
  Typography,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from "@material-ui/core";
import { useStyles } from "styles/styles";
import React from "react";
import { footerDef } from "data/footer";
import { SITE_CONFIG } from "data/config";

/**
 * @name Footer
 * @description Footer with static content
 */
const Footer = (): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.footer}>
        {Object.keys(footerDef).map((key) => (
          <Grid item sm={12} md={6} className="footer-Table" key={key}>
            <Box pl={4} pt={4} pr={4}>
              <Typography display="block" gutterBottom className="footer-Title">
                {key}
              </Typography>
            </Box>
            <Box pl={4} pr={4} pt={0} m={0}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {footerDef[key].map((row) => (
                      <TableRow key={row.attr.text}>
                        {["attr", "value"].map(
                          (field) => row[field] && (
                          <TableCell scope="row">
                            {row[field].link ? (
                              <Link
                                href={row[field].link}
                                color="secondary"
                              >
                                {row[field].text}
                              </Link>
                            ) : (
                              row[field].text
                            )}
                          </TableCell>
                          ),
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        ))}
        <Grid item md={12} className={classes.footer}>
          <Box m={3}>
            <Typography
              display="block"
              align="center"
              gutterBottom
              className="footer-Title"
            >
              Copyright &copy;
              {" "}
              {`${SITE_CONFIG.author} ${new Date().getFullYear()} `}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Footer;
