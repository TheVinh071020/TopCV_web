import { combineReducers } from "redux";
import { jobReducer } from "./jobReducer";
import { userReducer } from "./userReducer";
import { companyReducer } from "./companyReducer";

export const rootReducer = combineReducers({
  jobReducer,
  userReducer,
  companyReducer,
});
