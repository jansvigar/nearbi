import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";
import Map from "../../components/Map";
import Grid from "@material-ui/core/Grid";
import SearchBox from "../../components/SearchBox";
import Foursquare from "../../components/Foursquare";

const styles = theme => ({
  layout: {
    width: "90%",
    maxWidth: "1100px",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class HomePage extends Component {
  state = {
    lng: "-122.108310",
    lat: "37.399720"
  };

  handleChange = selectedItem => {
    if (selectedItem.center.length > 0) {
      this.setState({
        lng: selectedItem.center[0],
        lat: selectedItem.center[1]
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { lng, lat } = this.state;
    return (
      <React.Fragment>
        <Header />
        <main className={classes.layout}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <SearchBox onChange={this.handleChange} />
            </Grid>
            <Foursquare lng={lng} lat={lat}>
              {({ places, categories }) => {
                return (
                  <Map
                    lng={lng}
                    lat={lat}
                    places={places}
                    categories={categories}
                  />
                );
              }}
            </Foursquare>
          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
