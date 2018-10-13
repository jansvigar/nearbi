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
    if (!isEqual(prevProps, this.props)) {
      const [lng, lat] = this.props.selectedAddress.center;
      this.setState(
        {
          lng,
          lat,
          zoom: 13,
        },
        () => {
          this.map.flyTo({
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom,
          });
        },
      );
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
