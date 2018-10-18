import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  h1: {
    textAlign: "center",
    fontWeight: 500,
    marginTop: 20,
    [theme.breakpoints.up("xs")]: {
      fontSize: 32
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 64
    }
  },
  h2: {
    textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: 14
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 24
    }
  }
});

const SiteHeader = props => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="h1" color="inherit" className={classes.h1}>
        Nearbi
      </Typography>
      <Typography variant="h6" color="inherit" className={classes.h2}>
        Explore recommended places nearby
      </Typography>
    </React.Fragment>
  );
};

export default withStyles(styles)(SiteHeader);
