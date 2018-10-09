import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from '../../components/Header';
import Map from '../../components/Map';
import SearchBox from '../../components/SearchBox';

const styles = theme => ({
  layout: {
    width: '90%',
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  map: {
    height: '500px',
  },
});

const HomePage = props => {
  const {classes} = props;
  return (
    <React.Fragment>
      <Header />
      <main className={classes.layout}>
        <SearchBox />
        <Paper className={classes.map} elevation={1}>
          <Map />
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default withStyles(styles)(HomePage);
