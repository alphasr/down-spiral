import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Dispatch, Fragment, useEffect, useState } from "react";
import { ButtonGroup, Button, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import GraphSession from "../components/graph/GraphSession";
import { AppState } from "../store/reducers";
import { faCoffee, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {
  deleteGraphSession,
  IGraphLogActions,
  setGraphLog,
} from "../store/actions/graphLogActions";
import { spiralGraphs } from "../api";
import { IGraphData } from "../store/reducers/graphReducer";

const Graph = () => {
  const { sessionData } = useSelector((state: AppState) => state.graphLog);
  const [currentSession, setCurrentSession] = useState<string>();
  const graphLogDispatch = useDispatch<Dispatch<IGraphLogActions>>();
  const [graphLayout, setGraphLayout] = useState<string>("1_graph"); // 1 graph, 2 graph, 3 graphs

  const handleSetGraphLayout = (payload: string) => {
    return setGraphLayout(payload);
  };

  const handleSetCurrentSesssion = (sessionId: string) => {
    return setCurrentSession(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    return (
      graphLogDispatch(deleteGraphSession(sessionId)),
      setCurrentSession(undefined)
    );
  };

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      console.log("setting graph data");
      const parsedPayload: any = JSON.parse(payload);
      if (
        parsedPayload.labels &&
        parsedPayload.datasets &&
        parsedPayload.sessionId
      ) {
        const data: IGraphData = {
          labels: parsedPayload.labels,
          datasets: parsedPayload.datasets,
          sessionId: parsedPayload.sessionId,
        };

        return graphLogDispatch(setGraphLog(data));
      }

      return null;
    };
    spiralGraphs((payload: string) => handleSetPayload(payload)); //working
  }, [graphLogDispatch]);

  return (
    <Fragment>
      <div className="ml-5">
        <div>
          <h4>Available Graph Sessions</h4>
        </div>
        <p>Select Layout</p>
        <div
          className="btn-group center m-2 new"
          role="group"
          aria-label="Basic outlined example"
        >
          <Button
            type="button"
            onClick={() => handleSetGraphLayout("1_graph")}
            className={`btn btn-outline-primary ${
              graphLayout === "1_graph" ? "active" : ""
            }`}
          >
            1 Graph
          </Button>
          <Button
            type="button"
            onClick={() => handleSetGraphLayout("2_graph")}
            className={`btn btn-outline-primary ${
              graphLayout === "2_graph" ? "active" : ""
            }`}
          >
            2 Graphs
          </Button>
          <Button
            type="button"
            onClick={() => handleSetGraphLayout("3_graph")}
            className={`btn btn-outline-primary ${
              graphLayout === "3_graph" ? "active" : ""
            }`}
          >
            3 Graphs
          </Button>
        </div>

        {graphLayout === "1_graph" && (
          <div className="row ml-2 scroll-y-allow">
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
        )}
        {graphLayout === "2_graph" && (
          <React.Fragment>
            <div className="row">
              <div className="row ml-2 col-lg-6 scroll-y-allow">
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
                        onClick={() =>
                          handleSetCurrentSesssion(session.sessionId)
                        }
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
              <div className="row ml-2 col-lg-6 scroll-y-allow">
                {sessionData.map((session) => (
                  <React.Fragment>
                    <div
                      className=""
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
                        onClick={() =>
                          handleSetCurrentSesssion(session.sessionId)
                        }
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
            </div>
          </React.Fragment>
        )}
        {graphLayout === "3_graph" && (
          <React.Fragment>
            <div className="row  ">
              <div className="row ml-2 col-lg-4 scroll-y-allow">
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
                        onClick={() =>
                          handleSetCurrentSesssion(session.sessionId)
                        }
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
              <div className="row ml-2 col-lg-4 scroll-y-allow">
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
                        onClick={() =>
                          handleSetCurrentSesssion(session.sessionId)
                        }
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
              <div className="row ml-2 col-lg-4 scroll-y-allow">
                {sessionData.map((session) => (
                  <React.Fragment>
                    <div
                      className=""
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
                        onClick={() =>
                          handleSetCurrentSesssion(session.sessionId)
                        }
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
            </div>
          </React.Fragment>
        )}
        {/* {graphLayout === "1_graph" && currentSession && (
          <GraphSession sessionId={currentSession} />
        )} */}
        {/* {graphLayout === "2_graph" && currentSession && (
          <React.Fragment>
            <div className="row">
              <div className="col-md-6">
                <GraphSession sessionId={currentSession} />
              </div>
              <div className="col-md-6">
                <GraphSession sessionId={currentSession} />
              </div>
            </div>
          </React.Fragment>
        )}
        {graphLayout === "3_graph" && currentSession && (
          <React.Fragment>
            <div className="row">
              <div className="col-md-4">
                <GraphSession sessionId={currentSession} />
              </div>
              <div className="col-md-4">
                <GraphSession sessionId={currentSession} />
              </div>
              <div className="col-md-4">
                <GraphSession sessionId={currentSession} />
              </div>
            </div>
          </React.Fragment>
        )} */}
        {sessionData.length === 0 && "No available sessions"}
        {/* <TableSessionData sessionId={currentSession} /> */}
      </div>
    </Fragment>
  );
};

export default Graph;
