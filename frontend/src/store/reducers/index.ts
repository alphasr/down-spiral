import { combineReducers } from "redux";
import { tableLogReducer } from "./tableLogsReducer";
import { graphLogReducer } from "./graphReducer";
const rootReducer = combineReducers({
  tableLog: tableLogReducer,
  graphLog: graphLogReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
