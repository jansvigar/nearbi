import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken =
  'pk.eyJ1IjoiamFuc3ZpZ2FyIiwiYSI6ImNqbW9sNXM0bDE1cXIzdXFjNzY2dG0zb3MifQ.gRjATaFIQkgpCcQ0vKDJ-A';

const style = {
  maxHeight: '600px',
  minHeight: '300px',
  height: '100%',
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
    };
  }

  componentDidMount() {
    const {lng, lat, zoom} = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      const {lng, lat} = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
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
