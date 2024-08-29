// src/reducers/registrationReducer.js





import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from '../actions/registrationActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const registrationReducer = (state = initialState, action) => {

  console.log('Reducer Action:', action.type, 'Payload:', action.payload);

  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case REGISTER_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case REGISTER_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default registrationReducer;

