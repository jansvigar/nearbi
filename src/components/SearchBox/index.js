import React, {Component} from 'react';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Geocoder from '../Geocoder';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  loader: {
    margin: theme.spacing.unit * 2,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
});

function renderInput(inputProps) {
  const {InputProps, ...other} = inputProps;

  return (
    <TextField
      InputProps={{
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected =
    ((selectedItem && selectedItem.place_name) || '').indexOf(
      suggestion.place_name,
    ) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}>
      {suggestion.place_name}
    </MenuItem>
  );
}

class SearchBox extends Component {
  state = {
    inputValue:
      '2465 Latham Street, Mountain View, California 94040, United States',
  };
  handleInputChange = e => {
    e.preventDefault();
    this.setState({inputValue: e.target.value});
  };
  handleChange = selectedItem => {
    this.setState({inputValue: selectedItem.place_name});
    this.props.onChange(selectedItem);
  };
  handleClearInput = () => {
    this.setState({inputValue: ''});
  };
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Downshift
          id="nearbi-address-search-box"
          onChange={this.handleChange}
          itemToString={selectedItem =>
            selectedItem ? selectedItem.place_name : ''
          }
          inputValue={this.state.inputValue}>
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            highlightedIndex,
            inputValue,
            isOpen,
            selectedItem,
          }) => (
            <div className={classes.container}>
              {renderInput({
                fullWidth: true,
                margin: 'normal',
                label: 'Enter an address',
                variant: 'outlined',
                InputProps: getInputProps({
                  id: 'search-address',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clear input text"
                        onClick={this.handleClearInput}>
                        <ClearIcon className={classes.icon} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  onChange: this.handleInputChange,
                }),
              })}
              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    <Geocoder query={inputValue}>
                      {({data, loading, error}) => {
                        if (loading) {
                          return (
                            <MenuItem>
                              <CircularProgress
                                size={20}
                                className={classes.loader}
                              />{' '}
                              <Typography variant="inherit">
                                Loading...
                              </Typography>
                            </MenuItem>
                          );
                        }

                        if (error) {
                          return (
                            <MenuItem>
                              <Typography variant="inherit">
                                There is an error loading data
                              </Typography>
                            </MenuItem>
                          );
                        }

                        if (!data.length) {
                          return <MenuItem>No result</MenuItem>;
                        }

                        return data.map((suggestion, index) =>
                          renderSuggestion({
                            suggestion,
                            index,
                            itemProps: getItemProps({
                              item: suggestion,
                            }),
                            highlightedIndex,
                            selectedItem,
                          }),
                        );
                      }}
                    </Geocoder>
                  </Paper>
                ) : null}
              </div>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default withStyles(styles)(SearchBox);
