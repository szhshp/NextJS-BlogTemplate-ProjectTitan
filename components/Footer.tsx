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

const FooterTop = (): JSX.Element => (
  <>
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
                      (field) =>
                        row[field] && (
                          <TableCell scope="row" key={field}>
                            {row[field].link ? (
                              <Link href={row[field].link} color="secondary">
                                {row[field].text}
                              </Link>
                            ) : (
                              row[field].text
                            )}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    ))}
  </>
);

type FooterContent = {
  name: string;
  content: JSX.Element | string | FooterContent[];
};

const FooterBottom = (): JSX.Element => {
  const classes = useStyles();

  const footerContent: FooterContent[] = [
    {
      name: "line1",
      content: [
        {
          name: "designedBy",
          content: (
            <>
              Designed by{" "}
              <Link href={SITE_CONFIG.host} color="secondary">
                {SITE_CONFIG.author}
              </Link>
            </>
          ),
        },
        {
          name: "author",
          content: `Copyright © ${
            SITE_CONFIG.author
          } ${new Date().getFullYear()}`,
        },
      ],
    },
  ];

  const renderFooterContent = (_footerContent: FooterContent[]) =>
    _footerContent.map(({ name, content }, i) => (
      <Box display="flex" justifyContent="center" key={name}>
        {Array.isArray(content) ? (
          renderFooterContent(content)
        ) : (
          <>
            {i !== 0 && <Box mx={1}>|</Box>}
            <Box key={name}>{content}</Box>
          </>
        )}
      </Box>
    ));

  return (
    <Grid item md={12} className={classes.footer}>
      <Box m={3}>
        <Typography
          display="block"
          align="center"
          variant="caption"
          className="footer-Title"
        >
          {renderFooterContent(footerContent)}
        </Typography>
      </Box>
    </Grid>
  );
};

/**
 * @name Footer
 * @description Footer with static content
 */
const Footer = (): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.footer}>
        <FooterTop />
        <FooterBottom />
      </Grid>
    </>
  );
};

export default Footer;
