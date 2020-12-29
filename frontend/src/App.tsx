import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HtmlPrinter from './pages/HtmlPrinter';

function App() {
  return (
    <React.Fragment>
      <Switch>
        {/* <Route exact path="/" component={Graph} /> */}
        {/* <Route path="/" component={Home} /> */}
        <Route path="/" component={HtmlPrinter} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
