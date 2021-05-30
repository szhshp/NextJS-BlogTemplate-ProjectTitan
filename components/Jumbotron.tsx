import { useStyles } from "styles/styles";
import { Grid, Typography, ButtonGroup, Button, Box } from "@material-ui/core";
import { SITE_CONFIG } from "data/config";
import { useTranslator } from "hooks/useTranslator";
import { backgroundPicture, jumbotronButtonSet } from "data/jumbotron";
import Image from "next/image";

/**
 * @name Jumbotron
 * @description The cover of site
 */
const Jumbotron = (): JSX.Element => {
  const classes = useStyles();
  const { translate, locale } = useTranslator();

  return (
    <>
      <Image
        className={classes.backgroundCover}
        src={backgroundPicture}
        priority
        layout="fill"
        objectFit="cover"
      />
      <Grid container className={classes.jumbotron}>
        <Box id="blurBox" flexGrow="1">
          <Typography
            gutterBottom
            className="jumbotron-Title"
          >
            NextJS Blog Template by{" "}
            <a href="http://szhshp.org/" style={{ color: "#ff8c00" }}>
              Szhshp
            </a>
          </Typography>
          <Typography
            variant="h2"
            gutterBottom
            className="jumbotron-Title jumbotron-Title-Main"
          >
            <Box py={1}>{SITE_CONFIG.title.zh}</Box>
          </Typography>
          <Box>
            {jumbotronButtonSet.map(({ color, links }, index) => (
              <ButtonGroup
                className="jumbotron-buttonGroup"
                size="small"
                disableElevation
                key={`buttonSet${index}`}
                color={color}
                variant="contained"
              >
                {links.map(({ localeKey, link }) => (
                  <Button href={link} key={localeKey}>
                    {translate(locale[localeKey])}
                  </Button>
                ))}
              </ButtonGroup>
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Jumbotron;
