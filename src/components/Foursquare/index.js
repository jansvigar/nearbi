import React, {Component} from 'react';
import isEqual from 'react-fast-compare';

class Foursquare extends Component {
  state = {
    places: [],
  };

  fetchData() {
    const [lng, lat] = this.props.selectedItem.center;
    fetch(
      `https://api.foursquare.com/v2/venues/search?client_id=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
      }&v=20180323&ll=${lat},${lng}`,
    )
      .then(res => res.json())
      .then(data => {
        this.setState({places: data.response.venues});
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (this.props.selectedItem) {
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps, this.props)) {
      this.fetchData();
    }
  }

  render() {
    const {children} = this.props;
    const {places} = this.state;

    return children({
      places,
    });
  }
}

export default Foursquare;
