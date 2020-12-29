import React, { Fragment } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

const TableMenu = () => {
  return (
    <Fragment>
      <div className="center p-4">
        <div
          className="p-4 card shadow col-md-6"
          style={{ backgroundColor: "#c6c6c6" }}
        >
          <ButtonGroup className="mb-2">
            <Button>Table</Button>
            <Button>Graph</Button>
            <Button>NextImplementation</Button>
          </ButtonGroup>
        </div>
      </div>
    </Fragment>
  );
};

export default TableMenu;
