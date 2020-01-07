import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages/home/index';
import { Detail } from './pages/detail/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/detail">
          <Detail />
        </Route>
        <Route extra path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
