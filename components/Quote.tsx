import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "styles/styles";

/**
 * @interface Quote
 * @param text: the main text to show in the center
 * @param references: The primary ref
 * @param referencesSecondary: The secondary ref, shows in grey color
 */
interface Quote {
  text: string;
  references?: string[];
  referencesSecondary?: string[];
}

/**
 * @name Quote
 * @param [Quote] .
 */
const Quote = ({
  text,
  references,
  referencesSecondary,
}: Quote): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12}>
      <blockquote className={classes.quote}>
        <Typography
          display="block"
          align="center"
          gutterBottom
          className="quote-Text"
          component="div"
        >
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Typography>
        {references &&
          references.map((ref) => (
            <Typography
              variant="subtitle2"
              display="block"
              align="right"
              gutterBottom
              key={ref}
              className="quote-Reference"
            >
              <div dangerouslySetInnerHTML={{ __html: ref }} />
            </Typography>
          ))}
        {referencesSecondary &&
          referencesSecondary.map((ref) => (
            <Typography
              variant="caption"
              display="block"
              align="right"
              gutterBottom
              key={ref}
              className="quote-Reference"
            >
              <div dangerouslySetInnerHTML={{ __html: ref }} />
            </Typography>
          ))}
      </blockquote>
    </Grid>
  );
};

export default Quote;
