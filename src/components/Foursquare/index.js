import {Component} from 'react';
import isEqual from 'react-fast-compare';

class Foursquare extends Component {
  state = {
    places: [],
    suggestedBounds: [],
  };

  fetchData() {
    const [lng, lat] = this.props.selectedItem.center;
    fetch(
      `https://api.foursquare.com/v2/venues/explore?client_id=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
      }&v=20180323&ll=${lat},${lng}&sortByDistance=1`,
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const {groups} = data.response;
        this.setState({places: groups[0].items});
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
