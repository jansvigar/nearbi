import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Header from '../../components/Header';
import Map from '../../components/Map';
import Grid from '@material-ui/core/Grid';
import SearchBox from '../../components/SearchBox';
import Foursquare from '../../components/Foursquare';

const styles = theme => ({
  layout: {
    width: '90%',
    maxWidth: '1100px',
    marginLeft: 'auto',
    marginRight: 'auto',
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
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <SearchBox onChange={this.handleChange} />
            </Grid>
            <Foursquare selectedItem={selectedItem}>
              {({places}) => {
                return <Map selectedAddress={selectedItem} places={places} />;
              }}
            </Foursquare>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
