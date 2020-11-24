import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';

import TableLog from './pages/TableLog';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/table-logs" component={TableLog} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
