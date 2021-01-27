import React, { Fragment } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { routes, routeNames } from './MenuRoutes';

const Menu = () => {
  const history = useHistory();
  const changeRoute = (routeName: string) => {
    const route = routes.find((route) => route.routeName === routeName);
    return history.push(route ? route.route : '');
  };
  return (
    <Fragment>
      <div className="center p-4">
        <div
          className="p-4 card shadow col-md-6"
          style={{ backgroundColor: '#c6c6c6' }}
        >
          <ButtonGroup className="mb-2">
            <Button onClick={() => changeRoute(routeNames.HOME_PAGE)}>
              Home
            </Button>
            <Button onClick={() => changeRoute(routeNames.SIMPLE_PRINTER)}>
              Simple Printer
            </Button>
            <Button onClick={() => changeRoute(routeNames.HTML_PRINTER)}>
              HTML Printer
            </Button>
            <Button onClick={() => changeRoute(routeNames.GRAPH_PRINTER)}>
              Graph Printer
            </Button>
            <Button onClick={() => changeRoute(routeNames.TABLE_PRINTER)}>
              Table Printer
            </Button>
            <Button onClick={() => changeRoute(routeNames.COMBINED_PRINTER)}>
              Combined Printer
            </Button>
            <Button onClick={() => changeRoute(routeNames.CUSTOM_PRINTER)}>
              Custom Printer
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
