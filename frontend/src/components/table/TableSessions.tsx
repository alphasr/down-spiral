import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, Fragment, useState } from "react";
import { ButtonGroup, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTableSession,
  ITableLogActions,
} from "../../store/actions/tableLogActions";
import { AppState } from "../../store/reducers";
import TableSessionData from "./TableSessionData";

const TableSessions = () => {
  const { sessionData } = useSelector((state: AppState) => state.tableLog);
  const [currentSession, setCurrentSession] = useState<string>();
  const tableLogDispatch = useDispatch<Dispatch<ITableLogActions>>();

  const handleSetCurrentSesssion = (sessionId: string) => {
    return setCurrentSession(sessionId);
  };
  const handleDeleteSession = (sessionId: string) => {
    return (
      tableLogDispatch(deleteTableSession(sessionId)),
      setCurrentSession(undefined)
    );
  };

  return (
    <Fragment>
      <div className="ml-5">
        <div>
          <h4>Available Table Log Sessions</h4>
        </div>
        <div className="row">
          {sessionData.map((session) => (
            <React.Fragment>
              <div
                style={{
                  border: "1px solid #2e2e2e",
                  borderRadius: 5,
                  padding: 2,
                  margin: 2,
                }}
              >
                <Button
                  key={session.sessionId}
                  variant="light"
                  onClick={() => handleSetCurrentSesssion(session.sessionId)}
                >
                  <span>
                    <Badge
                      pill
                      variant="dark"
                      className="font-thin pl-3 pr-3 pb-2 pt-2"
                    >
                      {session.sessionId}
                      <span style={{ marginRight: "20px" }}></span>
                    </Badge>
                  </span>
                </Button>
                <Button
                  variant="light"
                  onClick={() => handleDeleteSession(session.sessionId)}
                >
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              </div>
            </React.Fragment>
          ))}
        </div>
        {currentSession && <TableSessionData sessionId={currentSession} />}
        {sessionData.length === 0 && "No available sessions"}
      </div>
    </Fragment>
  );
};

export default TableSessions;
