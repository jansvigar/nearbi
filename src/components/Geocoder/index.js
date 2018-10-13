import {Component} from 'react';
import isEqual from 'react-fast-compare';
import MapboxClient from 'mapbox/lib/services/geocoding';
import debounce from 'lodash/debounce';

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

  fetchData = debounce(() => {
    const {query} = this.props;

    this.setState({data: [], loading: true, error: false});

    if (!query) {
      this.setState({loading: false});
      return;
    }

    this.mapboxGeocoder.geocodeForward(query).then(response => {
      this.setState({
        data: response.entity.features,
        loading: false,
        error: false,
      });
    });
  }, 200);

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
