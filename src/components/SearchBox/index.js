import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBox extends Component {
  state = {
    searchText: ""
  }

  handleSearchChange = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  render(){
    return (
      <TextField
        id="search-address"
        label="Enter an address"
        variant="outlined"
        value={this.state.searchText}
        onChange={this.handleSearchChange}
        fullWidth
        margin="normal"
      >
      </TextField>
    );
  }
}

export default SearchBox;
