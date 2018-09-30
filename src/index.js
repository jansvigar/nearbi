import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./configureStore";
import "semantic-ui-css/semantic.min.css";

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
registerServiceWorker();
