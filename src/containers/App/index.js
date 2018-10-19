import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import HomePage from "../HomePage";

// Create custom theme for Material UI
const theme = createMuiTheme({
  // explicitly tells material ui to replace old variant with new variant
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: purple,
    secondary: {
      main: "#f44336"
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <HomePage />
  </MuiThemeProvider>
);

export default App;
