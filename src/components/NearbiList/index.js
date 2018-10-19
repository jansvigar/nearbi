import React, { Component } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import isEqual from "react-fast-compare";

const styles = theme => ({
  root: {
    display: "flex",
    flexFlow: "column nowrap",
    minWidth: "180px",
    backgroundColor: theme.palette.background.paper
  },
  formControl: {
    flexGrow: 1,
    margin: theme.spacing.unit
  }
});

class NearbiList extends Component {
  state = {
    category: "",
    labelWidth: 20
  };

  // create ref to the input DOM element
  InputLabelRef = React.createRef();

  componentDidMount() {
    // set the correct width for the category input label
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef.current).offsetWidth
    });
  }

  // only update when the locations and category data is different
  shouldComponentUpdate(nextProps, nextState) {
    if (
      !isEqual(nextProps.locations, this.props.locations) ||
      nextState.category !== this.state.category
    ) {
      return true;
    }
    return false;
  }

  // handle when a category is selected and pass the value to parent
  handleChange = e => {
    this.setState({ category: e.target.value });
    this.props.onSelectCategoryChange(e.target.value);
  };

  render() {
    const { locations, classes, categories } = this.props;
    return (
      <div className={classes.root}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel ref={this.InputLabelRef} htmlFor="select-category">
            Category
          </InputLabel>
          <Select
            value={this.state.category}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="category"
                id="select-category"
              />
            }
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {Array.from(categories).map(category => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <List>
          {locations.length > 0 ? (
            locations.map(location => (
              <React.Fragment key={location.place.venue.id}>
                <ListItem button onClick={this.props.onListItemClick(location)}>
                  <ListItemText primary={location.place.venue.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="subtitle1" align="center" gutterBottom>
              No places found.
            </Typography>
          )}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(NearbiList);
