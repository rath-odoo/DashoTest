// registrationActions.js

//import axios from 'axios';
import axiosInstance from '../axios';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';



export const registerUserRequest = () => {

  console.log('Action: REGISTER_USER_REQUEST');
  return {
    type: REGISTER_USER_REQUEST,
  };

};



export const registerUserSuccess = (user) => {

  console.log('Action: REGISTER_USER_SUCCESS', user);
  return {
    type: REGISTER_USER_SUCCESS,
    payload: user,
  };	

};

export const registerUserFailure = (error) => {

  console.log('Action: REGISTER_USER_FAILURE', error);
  return {
    type: REGISTER_USER_FAILURE,
    payload: error,
  };

};



export const registerUser = (userData) => {

   console.log("userData: ", userData);	
  return async (dispatch) => {
    try {
      dispatch(registerUserRequest());

      //const response = await axios.post('http://127.0.0.1:8000/api/createaccount/', userData);
     
      const response = await axiosInstance.post('createaccount/', userData);	    

      dispatch(registerUserSuccess(response.data));
    } catch (error) {
      dispatch(registerUserFailure(error));
    }
  };
};

