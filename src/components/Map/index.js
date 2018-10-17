import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import mapboxgl from 'mapbox-gl';
import isEqual from 'react-fast-compare';
import 'mapbox-gl/dist/mapbox-gl.css';
import NearbiList from '../../components/NearbiList';

mapboxgl.accessToken = process.env.REACT_APP_MAP_GL;

const styles = theme => ({
  map: {
    height: '100%',
  },
  paper: {
    height: '550px',
    overflowY: 'scroll',
  },
});

class Map extends Component {
  state = {
    lng: 5,
    lat: 34,
    zoom: 1,
    markers: [],
  };

  map;
  currentMarker;

  componentDidMount() {
    const {lng, lat, zoom} = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom,
    });

    this.map.on('move', () => {
      const {lng, lat} = this.map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: this.map.getZoom().toFixed(2),
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps.selectedAddress, this.props.selectedAddress)) {
      const [lng, lat] = this.props.selectedAddress.center;
      this.map.flyTo({
        center: [lng, lat],
        zoom: 12,
      });
    }

    if (
      !isEqual(prevProps.places, this.props.places) &&
      this.props.places.length > 0
    ) {
      this.renderMarkers();
    }
  }

  renderMarkers() {
    const {places} = this.props;
    const [lng, lat] = this.props.selectedAddress.center;

    this.clearAllMarkers();

    this.currentMarker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(this.map);

    let markers = [];
    places.forEach(place => {
      let popup = new mapboxgl.Popup({offset: 25}).setText(place.venue.name);

      let divEl = document.createElement('div');
      divEl.style.backgroundImage = `url(${
        place.venue.categories[0].icon.prefix
      }32${place.venue.categories[0].icon.suffix})`;
      divEl.style.width = '32px';
      divEl.style.height = '32px';
      divEl.style.backgroundColor = '#4283f4';
      divEl.style.borderRadius = '10px';
      divEl.style.border = '1px solid #ddd';

      let marker = new mapboxgl.Marker(divEl)
        .setLngLat([place.venue.location.lng, place.venue.location.lat])
        .setPopup(popup)
        .addTo(this.map);

      markers.push({place, marker});
    });
    this.setState({markers});
  }

  clearAllMarkers() {
    if (this.currentMarker) {
      this.currentMarker.remove();
    }
    if (this.state.markers.length > 0) {
      this.state.markers.forEach(el => el.marker.remove());
    }
  }

  clearAllPopups() {
    if (this.state.markers.length > 0) {
      this.state.markers.forEach(
        el => el.marker.getPopup().isOpen() && el.marker.togglePopup(),
      );
    }
  }

  handleListItemClick = location => () => {
    this.clearAllPopups();
    location.marker.togglePopup();
    this.map.flyTo({
      center: [
        location.place.venue.location.lng,
        location.place.venue.location.lat,
      ],
      zoom: 16,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Grid item xs={3}>
          <Paper className={this.props.classes.paper} elevation={1}>
            <NearbiList
              locations={this.state.markers}
              onListItemClick={this.handleListItemClick}
            />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper className={this.props.classes.paper} elevation={1}>
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
