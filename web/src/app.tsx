import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Home = lazy(() => import(/* webpackChunkName: "home" */ './pages/home/home'));
const Detail = lazy(() => import(/* webpackChunkName: "detail" */ './pages/detail/detail'));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
}

export default App;
