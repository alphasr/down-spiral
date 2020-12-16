import React, { Fragment } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Graph from "./Graph";
import TableLog from "./TableLogPage";

const Home = () => {
  const history = useHistory();
  const handleTableClicked = (e: any) => {
    e.preventDefault();
    history.push("/table-logs");
  };

  return (
    <Fragment>
      <Graph />
      <TableLog />
    </Fragment>
  );
};

export default Home;
