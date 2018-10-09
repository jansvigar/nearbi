import React from 'react';
import {Router} from '@reach/router';
import HomePage from '../HomePage';

const App = () => (
  <Router>
    <HomePage path="/" />
  </Router>
);

export default App;
