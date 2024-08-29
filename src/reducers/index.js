// reducers/index.js

import { combineReducers } from 'redux';
import registrationReducer from './registrationReducer';
import getClassDetailReducer from './getClassDetailReducer';


const rootReducer = combineReducers({
  onlineregistration: registrationReducer,
  getclassdetail: getClassDetailReducer,
  // Add other reducers here
});

export default rootReducer;

