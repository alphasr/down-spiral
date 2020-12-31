import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import HtmlPrinter from "./pages/HtmlPrinter";
import Graph from './pages/Graph';
import TableLog from './pages/TablePrinterPage';
import Menu from './components/shared/Menu';
import HtmlPrinter from './pages/HtmlPrinter';
import SimplePrinter from './pages/SimplePrinterPage';

function App() {
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        {/* <Route exact path="/" component={Graph} /> */}
        {/* <Route path="/" component={Home} /> */}
        <Route path="/simple-printer" exact component={SimplePrinter} />
        <Route path="/html-printer" exact component={HtmlPrinter} />
        <Route path="/graph-printer" exact component={Graph} />
        <Route path="/table-printer" exact component={TableLog} />
        <Route path="/" exact component={TableLog} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
