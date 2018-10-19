import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Header from "../../components/Header";
import Map from "../../components/Map";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import SearchBox from "../../components/SearchBox";
import Foursquare from "../../components/Foursquare";
import Footer from "../../components/Footer";

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
    lat: "37.399720",
    snackbarOpen: false
  };

  // Handle search box autocomplete value selection change
  handleChange = selectedItem => {
    // if center coordinate exists
    if (selectedItem.center.length > 0) {
      this.setState({
        lng: selectedItem.center[0],
        lat: selectedItem.center[1]
      });
    }
  };

  // handle if there is an error loading data from API
  handleError = () => {
    this.setState({ snackbarOpen: true });
  };

  // handle snackbar close event
  handleClose = event => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { lng, lat, snackbarOpen } = this.state;
    return (
      <React.Fragment>
        <Header />
        <main className={classes.layout}>
          <Grid container spacing={8}>
            <Grid item xs={12}>
              <SearchBox
                onChange={this.handleChange}
                onError={this.handleError}
              />
            </Grid>
            <Foursquare lng={lng} lat={lat} onError={this.handleError}>
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={this.handleClose}
            ContentProps={{ "aria-describedby": "error-message-id" }}
            message={
              <span id="error-message-id">There is an error loading data</span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
