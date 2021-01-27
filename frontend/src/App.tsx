import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import HtmlPrinter from "./pages/HtmlPrinter";
import GraphPrinter from './pages/Graph';
import TablePrinter from './pages/TablePrinterPage';
import Menu from './components/shared/Menu';
import HtmlPrinter from './pages/HtmlPrinter';
import SimplePrinter from './pages/SimplePrinterPage';
import CombinedPrinter from './pages/CombinedPrinterPage';
import CustomPrinter from './pages/CustomPrinter';

function App() {
  return (
    <React.Fragment>
      <Menu />
      <Switch>
        {/* <Route exact path="/" component={Graph} /> */}
        {/* <Route path="/" component={Home} /> */}
        <Route path="/simple-printer" exact component={SimplePrinter} />
        <Route path="/html-printer" exact component={HtmlPrinter} />
        <Route path="/graph-printer" exact component={GraphPrinter} />
        <Route path="/table-printer" exact component={TablePrinter} />
        <Route path="/combined-printer" exact component={CombinedPrinter} />
        <Route path="/custom-printer" exact component={CustomPrinter} />
        <Route path="/" exact component={TablePrinter} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
