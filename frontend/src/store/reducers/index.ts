import { combineReducers } from 'redux';
import { tablePrinterReducer } from './tablePrinterReducer';
import { graphPrinterReducer } from './graphPrinterReducer';
import { simplePrinterReducer } from './simplePrinterReducer';
import { htmlPrinterReducer } from './htmlPrinterReducer';
import { combinedPrinterReducer } from './combinedPrinterReducer';
import { customPrinterReducer } from './customPrinterReducer';

const rootReducer = combineReducers({
  tablePrinter: tablePrinterReducer,
  graphPrinter: graphPrinterReducer,
  simplePrinter: simplePrinterReducer,
  htmlPrinter: htmlPrinterReducer,
  combinedPrinter: combinedPrinterReducer,
  customPrinter: customPrinterReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
