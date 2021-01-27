import React, { Dispatch, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { spiralCustom } from '../api';
import CustomPrinterSessions from '../components/customPrinter/CustomPrinterSessions';
import {
  ICustomPrinterActions,
  setCustomPrinterLog,
} from '../store/actions/customPrinterActions';
import { AppState } from '../store/reducers';

/* this will be the state for reducer */
export interface ICustomPrinterState {
  sessionData: ICustomPrinterPayload[];
}

/* 
- define your payload for the json object here
- this object will be the expected payload by reducer
- Unique sessionId is required for every new session
- expand data property of the interface to define your json object
- **example:- data: {id: string; date: Date; name: string;}[]
- above example is defining data to be an array of {id: string; date: Date; name: string;}
*/
export interface ICustomPrinterPayload {
  sessionId: string; //unique id for every session
  data: any[]; // each object must have unique key id: string
}

const CustomPrinter = () => {
  const customPrinterDispatch = useDispatch<Dispatch<ICustomPrinterActions>>();
  const { sessionData } = useSelector((state: AppState) => state.customPrinter);
  const [currentSession, setCurrentSession] = useState('');
  const [
    currentSessionData,
    setCurrentSessionData,
  ] = useState<ICustomPrinterPayload>();

  const handleSetCurrentSession = (sessionId: string) => {
    return setCurrentSession(sessionId);
  };

  const temp = typeof handleSetCurrentSession;

  useEffect(() => {
    const handleSetPayload = (payload: string) => {
      console.log('setting graph data');
      const parsedPayload: any = JSON.parse(payload);
      if (parsedPayload.sessionId) {
        const data: ICustomPrinterPayload = {
          sessionId: parsedPayload.sessionId,
          data: parsedPayload.data,
        };

        return customPrinterDispatch(setCustomPrinterLog(data));
      }

      return null;
    };
    spiralCustom((payload: string) => handleSetPayload(payload)); //working
  }, [customPrinterDispatch]);

  const sessionIndex = (session: ICustomPrinterPayload) =>
    session.sessionId === currentSession ? true : false;

  useEffect(() => {
    const sessionIndexNew = sessionData.findIndex(sessionIndex);
    console.log('log is = ', JSON.stringify(sessionData[sessionIndexNew])); //working

    const payload: ICustomPrinterPayload = sessionData[sessionIndexNew]; // not-working
    setCurrentSessionData(payload);

    console.log('current session = ');
  }, [customPrinterDispatch, currentSession]);

  const getData = (payload: any) => {
    let data: any[] = [];
    for (const key in payload) {
      if (key !== 'id') data.push(<p key={key}>{payload[key].toString()}</p>);
    }

    return data.map((datum) => datum);
  };

  return (
    <Fragment>
      <React.Fragment>
        <CustomPrinterSessions callback={handleSetCurrentSession} />
      </React.Fragment>
      <React.Fragment>
        <p>
          {currentSessionData?.data.map(
            (datum: any) =>
              datum.id && (
                <React.Fragment key={datum.id}>
                  <div>{getData(datum)}</div>
                </React.Fragment>
              )
          )}
        </p>
      </React.Fragment>
    </Fragment>
  );
};

export default CustomPrinter;
