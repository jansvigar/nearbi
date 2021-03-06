import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import mapboxgl from "mapbox-gl";
import isEqual from "react-fast-compare";
import "mapbox-gl/dist/mapbox-gl.css";
import NearbiList from "../../components/NearbiList";

mapboxgl.accessToken = process.env.REACT_APP_MAP_GL;

const styles = theme => ({
  map: {
    height: "100%"
  },
  mapPaper: {
    [theme.breakpoints.up("xs")]: {
      height: "250px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "550px"
    }
  },
  listPaper: {
    [theme.breakpoints.up("xs")]: {
      height: "300px"
    },
    [theme.breakpoints.up("sm")]: {
      height: "550px"
    },
    overflowY: "scroll"
  }
});

class Map extends Component {
  state = {
    markers: [],
    category: ""
  };

  map;
  currentMarker;

  componentDidMount() {
    const { lng, lat } = this.props;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [lng, lat],
      zoom: 14
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // Check if the current props is not equal to previous props, then we need to update Map location
    if (!isEqual(prevProps, this.props)) {
      const { lng, lat } = this.props;
      this.map.flyTo({
        center: [lng, lat],
        zoom: 14
      });
      // also, clear the selected category
      this.setState({ category: "" });
    }

    // only when the places data and category data is different, we re-render the markers
    if (
      (!isEqual(prevProps.places, this.props.places) &&
        this.props.places.length > 0) ||
      prevState.category !== this.state.category
    ) {
      this.renderMarkers();
    }
  }

  renderMarkers() {
    const { places, lng, lat } = this.props;
    const { category } = this.state;

    this.clearAllMarkers();

    this.currentMarker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);

    let markers = [];
    let _places = places;

    // filter the places data based on the category selected
    if (category) {
      _places = places.filter(
        place => place.venue.categories[0].name === category
      );
    }

    _places.forEach(place => {
      // construct popup with place information
      let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p>
          <em>${place.venue.categories[0].name}</em><br>
          <strong>${place.venue.name}</strong><br>
          ${place.venue.location.formattedAddress[0]}<br>
          ${place.venue.location.formattedAddress[1]}<br>
          ${place.venue.location.formattedAddress[2]} 
        </p>`
      );

      // style the marker element
      let divEl = document.createElement("div");
      divEl.style.backgroundImage = `url(${
        place.venue.categories[0].icon.prefix
      }32${place.venue.categories[0].icon.suffix})`;
      divEl.style.width = "32px";
      divEl.style.height = "32px";
      divEl.style.backgroundColor = "#4283f4";
      divEl.style.borderRadius = "10px";
      divEl.style.border = "1px solid #ddd";
      divEl.setAttribute("tabindex", 0);

      let marker = new mapboxgl.Marker(divEl)
        .setLngLat([place.venue.location.lng, place.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map);

      markers.push({ place, marker });
    });
    this.setState({ markers });
  }

  clearAllMarkers() {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }
    if (this.state.markers.length > 0) {
      this.state.markers.forEach(el => {
        el.marker.remove();
      });
    }
  }

  clearAllPopups() {
    if (this.state.markers.length > 0) {
      this.state.markers.forEach(
        el => el.marker.getPopup().isOpen() && el.marker.togglePopup()
      );
    }
  }

  // handle click event for a list item
  handleListItemClick = location => () => {
    this.clearAllPopups();
    location.marker.togglePopup();
    this.map.flyTo({
      center: [
        location.place.venue.location.lng,
        location.place.venue.location.lat
      ],
      zoom: 16
    });
  };

  // handle event for when a category has been changed
  onSelectCategoryChange = category => {
    this.setState({ category });
  };

  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} sm={3}>
          <Paper className={this.props.classes.listPaper} elevation={1}>
            <NearbiList
              locations={this.state.markers}
              categories={this.props.categories}
              onListItemClick={this.handleListItemClick}
              onSelectCategoryChange={this.onSelectCategoryChange}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={this.props.classes.mapPaper} elevation={1}>
            <div
              ref={el => (this.mapContainer = el)}
              className={this.props.classes.map}
            />
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(Map);
