interface IRoute {
  routeName: string;
  route: string;
}

export const routes: IRoute[] = [
  {
    routeName: 'HOME-PAGE',
    route: '/',
  },
  {
    routeName: 'TABLE-PRINTER',
    route: '/table-printer',
  },
  {
    routeName: 'HTML-PRINTER',
    route: '/html-printer',
  },
  {
    routeName: 'SIMPLE-PRINTER',
    route: '/simple-printer',
  },
  {
    routeName: 'GRAPH-PRINTER',
    route: '/graph-printer',
  },
];

export const routeNames = {
  TABLE_PRINTER: 'TABLE-PRINTER',
  HTML_PRINTER: 'HTML-PRINTER',
  SIMPLE_PRINTER: 'SIMPLE-PRINTER',
  GRAPH_PRINTER: 'GRAPH-PRINTER',
  HOME_PAGE: 'HOME-PAGE',
};
