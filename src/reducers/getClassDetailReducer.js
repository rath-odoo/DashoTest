// src/reducers/registrationReducer.js



import {
  GETCLASSDETAIL_USER_REQUEST,
  GETCLASSDETAIL_USER_SUCCESS,
  GETCLASSDETAIL_USER_FAILURE,
} from '../actions/getClassDetailActions';

const initialState = {
  object: null,
  loading: false,
  error: null,
};

const getClassDetailReducer = (state = initialState, action) => {

  console.log('Reducer Action:', action.type, 'Payload:', action.payload);

  switch (action.type) {
    case GETCLASSDETAIL_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case GETCLASSDETAIL_USER_SUCCESS:
      return { ...state, object: action.payload, loading: false };
    case GETCLASSDETAIL_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default getClassDetailReducer;

