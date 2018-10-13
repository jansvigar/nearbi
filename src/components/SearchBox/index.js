import React from 'react';
import Downshift from 'downshift';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

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

const SearchBox = props => {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <Downshift id="nearbi-address-search-box">
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
                            item: suggestion.place_name,
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
};

export default withStyles(styles)(SearchBox);
