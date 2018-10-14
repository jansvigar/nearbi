import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Header from '../../components/Header';
import Map from '../../components/Map';
import SearchBox from '../../components/SearchBox';
import Foursquare from '../../components/Foursquare';

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

class HomePage extends Component {
  state = {
    selectedItem: null,
  };

  handleChange = selectedItem => {
    this.setState({
      selectedItem,
    });
  };

  render() {
    const {classes} = this.props;
    const {selectedItem} = this.state;
    return (
      <React.Fragment>
        <Header />
        <main className={classes.layout}>
          <SearchBox onChange={this.handleChange} />
          <Paper className={classes.map} elevation={1}>
            <Foursquare selectedItem={selectedItem}>
              {({places}) => {
                return <Map selectedAddress={selectedItem} places={places} />;
              }}
            </Foursquare>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
