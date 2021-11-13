import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import joblistingReducer from "./joblistingReducer";
import employerprofileReducer from "./employerprofileReducer";

export default combineReducers({
  auth: authReducer,
  joblistings: joblistingReducer,
  employerprofile: employerprofileReducer,
  errors: errorReducer,
});