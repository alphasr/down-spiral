import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import TableLogPage from "./pages/TableLogPage";
import React from "react";
import Graph from "./pages/Graph";

import TableLog from "./pages/TableLogPage";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import SimplePrinter from "./pages/SimplePrinter";

function App() {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route exact path="/" component={Graph} /> */}
        {/* <Route path="/" component={Home} /> */}
        <Route path="/" component={SimplePrinter} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
