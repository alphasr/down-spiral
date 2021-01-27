import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Dispatch, Fragment, useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCustomPrinterSession,
  ICustomPrinterActions,
} from '../../store/actions/customPrinterActions';
import { AppState } from '../../store/reducers';
import { ISimplePrinterPayload } from '../../store/reducers/simplePrinterReducer';

export interface ICustomPrinterSessionsProps {
  callback: Function;
}

const CombinedPrinterSessions: React.FC<ICustomPrinterSessionsProps> = ({
  callback,
}) => {
  const { sessionData } = useSelector((state: AppState) => state.customPrinter);
  const customPrinterDispatch = useDispatch<Dispatch<ICustomPrinterActions>>();

  const handleSetCurrentSesssion = (sessionId: string) => {
    return callback(sessionId);
  };

  const handleDeleteSession = (sessionId: string) => {
    return (
      customPrinterDispatch(deleteCustomPrinterSession(sessionId)),
      callback(undefined)
    );
  };

  return (
    <Fragment>
      <div className="ml-5">
        <div>
          <h4>Available Custom Log Sessions</h4>
        </div>
        <div className="row ml-2">
          {sessionData.map((session: ISimplePrinterPayload) => (
            <React.Fragment key={session.sessionId}>
              <div
                style={{
                  border: '1px solid #2e2e2e',
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
                      <span style={{ marginRight: '20px' }}></span>
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
        {sessionData.length === 0 && 'No available sessions'}
      </div>
    </Fragment>
  );
};

export default CombinedPrinterSessions;
