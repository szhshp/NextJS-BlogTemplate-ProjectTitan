import { useStyles } from "styles/styles";
import {
  Grid, Typography, ButtonGroup, Button, Box,
} from "@material-ui/core";
import { SITE_CONFIG } from "data/config";
import { useTranslater } from "hooks/useTranslator";
import { buttonSet } from "data/jumbotron";

/**
 * @name Jumbotron
 * @description The cover of site
 */
const Jumbotron = (): JSX.Element => {
  const classes = useStyles();
  const { translate, locale } = useTranslater();

  return (
    <Grid container className={classes.jumbotron}>
      <Box id="blurBox">
        <Typography variant="caption" gutterBottom className="jumbotron-Title">
          NextJS Blog Template by
          {" "}
          <a href="http://szhshp.org/">Szhshp</a>
        </Typography>
        <Typography
          variant="h1"
          gutterBottom
          className="jumbotron-Title jumbotron-Title-Main"
        >
          {SITE_CONFIG.title}
        </Typography>
        <Typography variant="caption" gutterBottom className="jumbotron-Title">
          Powered by NextJS, Material UI
        </Typography>
        <Box mt={2}>
          <ButtonGroup
            size="small"
            disableElevation
            variant="contained"
            className="jumbotron-buttonGroup"
            color="primary"
          >
            <Button href="/tech/2020/07/27/Document-Main">
              {`${translate(locale.documents)}`}
            </Button>
          </ButtonGroup>
          {buttonSet.map((set, index) => (
            <ButtonGroup
              className="jumbotron-buttonGroup"
              size="small"
              disableElevation
              key={`buttonSet${index}`}
              variant="contained"
            >
              {set.map(({ label, link }) => (
                <Button href={link} key={label}>
                  {label}
                </Button>
              ))}
            </ButtonGroup>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};

export default Jumbotron;
