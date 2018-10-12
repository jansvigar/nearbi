import {Component} from 'react';
import isEqual from 'react-fast-compare';
import MapboxClient from 'mapbox/lib/services/geocoding';

class Geocoder extends Component {
  mapboxGeocoder;

  state = {
    data: [],
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.mapboxGeocoder = new MapboxClient(process.env.REACT_APP_MAP_GL);
    this.fetchData();
  }

  componentDidUpdate({children: _, ...prevProps}) {
    const {children, ...props} = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }

  fetchData() {
    const {query} = this.props;

    this.setState({loading: true, data: [], error: false});

    this.mapboxGeocoder.geocodeForward(query).then(response => {
      this.setState({
        data: response.entity.features,
        loading: false,
        error: false,
      });
    });
  }

  render() {
    const {children} = this.props;
    const {data, loading, error} = this.state;

    return children({
      data,
      loading,
      error,
    });
  }
}

export default Geocoder;
