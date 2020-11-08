import { combineReducers } from "redux";
import { tableLogReducer } from "./tableLogsReducer";
const rootReducer = combineReducers({
  tableLog: tableLogReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
