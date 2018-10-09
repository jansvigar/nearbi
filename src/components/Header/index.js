import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const SiteHeader = props => {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            NEARBI
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default SiteHeader;
