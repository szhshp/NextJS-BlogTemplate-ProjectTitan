import {
  Tab, withStyles, Theme, createStyles,
} from "@material-ui/core";

interface StyledTabProps {
  label: string;
  onChange?: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const LinkTab = withStyles((theme: Theme) => createStyles({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props: StyledTabProps) => <Tab disableRipple {...props} />);

export default LinkTab;
