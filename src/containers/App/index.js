import React from 'react';
import {Router} from '@reach/router';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import HomePage from '../HomePage';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: purple,
    secondary: {
      main: '#f44336',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <HomePage path="/" />
    </Router>
  </MuiThemeProvider>
);

export default App;
