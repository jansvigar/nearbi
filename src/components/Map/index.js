import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import isEqual from 'react-fast-compare';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.REACT_APP_MAP_GL;

const style = {
  maxHeight: '600px',
  minHeight: '300px',
  height: '100%',
};

class Map extends Component {
  state = {
    lng: 5,
    lat: 34,
    zoom: 1,
  };

  map;
  markers = [];

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

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(this.map);

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

      this.markers.push(marker);
    });
  }

  clearAllMarkers() {
    if (this.markers.length > 0) {
      this.markers.forEach(el => el.remove());
    }
  }

  render() {
    return (
      <React.Fragment>
        <div ref={el => (this.mapContainer = el)} style={style} />
      </React.Fragment>
    );
  }
}
export default Map;
