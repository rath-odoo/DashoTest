import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers'; // We'll create this shortly

//import registrationReducer from '../reducers/registrationReducer';

const store = createStore(
  rootReducer,
  //applyMiddleware(thunk) // Apply Redux Thunk middleware
  composeWithDevTools(applyMiddleware(thunk))
);

//const store = createStore(registrationReducer, applyMiddleware(thunk));


export default store;
