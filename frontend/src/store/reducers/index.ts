import { combineReducers } from "redux";
import { tableLogReducer } from "./tableLogsReducer";
import { graphLogReducer } from "./graphReducer";
import { simplePrinterReducer } from "./simplePrinterReducer";
const rootReducer = combineReducers({
  tableLog: tableLogReducer,
  graphLog: graphLogReducer,
  simplePrinter: simplePrinterReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
