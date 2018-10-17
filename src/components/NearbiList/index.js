import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import isEqual from 'react-fast-compare';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '320px',
    minWidth: '240px',
    backgroundColor: theme.palette.background.paper,
  },
});

class NearbiList extends Component {
  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps, this.props)) {
      return true;
    }
    return false;
  }

  render() {
    const {locations, classes} = this.props;
    return (
      <div className={classes.root}>
        <List>
          {locations.length > 0 ? (
            locations.map(location => (
              <React.Fragment key={location.place.venue.id}>
                <ListItem button onClick={this.props.onListItemClick(location)}>
                  <ListItemText primary={location.place.venue.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="subtitle1" align="center" gutterBottom>
              No places found.
            </Typography>
          )}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(NearbiList);
