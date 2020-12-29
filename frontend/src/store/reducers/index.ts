import { combineReducers } from 'redux';
import { tableLogReducer } from './tableLogsReducer';
import { graphLogReducer } from './graphReducer';
import { simplePrinterReducer } from './simplePrinterReducer';
import { htmlLogReducer } from './htmlReducer';
const rootReducer = combineReducers({
  tableLog: tableLogReducer,
  graphLog: graphLogReducer,
  simplePrinter: simplePrinterReducer,
  htmlPrinter: htmlLogReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
