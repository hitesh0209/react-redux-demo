import { combineReducers } from "redux";
import records from "./recordReducer";

export default combineReducers({
  records: records,
});
