import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";

import TableLog from "./pages/tableLog";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={TableLog} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
