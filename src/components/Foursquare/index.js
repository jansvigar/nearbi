import { Component } from "react";
import isEqual from "react-fast-compare";

class Foursquare extends Component {
  state = {
    places: [],
    categories: new Set()
  };

  // fetch places data from FourSquare API
  fetchData() {
    const { lng, lat } = this.props;

    fetch(
      `https://api.foursquare.com/v2/venues/explore?client_id=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET
      }&v=20180323&ll=${lat},${lng}&sortByDistance=1`
    )
      .then(res => res.json())
      .then(data => {
        const { groups } = data.response;
        this.setState({
          places: groups[0].items,
          categories: new Set(
            groups[0].items.map(item => item.venue.categories[0].name).sort()
          )
        });
      })
      .catch(error => {
        // if there is an error calling Foursquare API, pass the error to parent
        this.props.onError();
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevProps, this.props)) {
      this.fetchData();
    }
  }

  render() {
    const { children } = this.props;
    const { places, categories } = this.state;

    return children({
      places,
      categories
    });
  }
}

export default Foursquare;
