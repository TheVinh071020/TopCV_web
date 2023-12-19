import { combineReducers } from "redux";
import { jobReducer } from "./jobReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  jobReducer,
  userReducer
});
