// registrationActions.js

//import axios from 'axios';
import axiosInstance from '../axios';
export const GETCLASSDETAIL_USER_REQUEST = 'GETCLASSDETAIL_USER_REQUEST';
export const GETCLASSDETAIL_USER_SUCCESS = 'GETCLASSDETAIL_USER_SUCCESS';
export const GETCLASSDETAIL_USER_FAILURE = 'GETCLASSDETAIL_USER_FAILURE';



export const getUserRequest = () => {

   console.log('Action: GETCLASSDETAIL_USER_REQUEST');
   return {
      type: GETCLASSDETAIL_USER_REQUEST,
   };

};



export const getUserSuccess = (object) => {

   console.log('Action: GETCLASSDETAIL_USER_SUCCESS', object);
   return {
     type: GETCLASSDETAIL_USER_SUCCESS,
     payload: object,
   };	

};

export const getUserFailure = (error) => {

  console.log('Action: GETCLASSDETAIL_USER_FAILURE', error);
  return {
     type: GETCLASSDETAIL_USER_FAILURE,
     payload: error,
  };

};



export const getClassDetail = (classId, userTimeZone) => {

   console.log("classId: ", classId);	
 
   console.log("timeZone: ", userTimeZone);	

  return async (dispatch) => {
    try {
      dispatch(getUserRequest());

      //const response = await axios.post('http://127.0.0.1:8000/api/createaccount/', userData);
     
      const response = await axiosInstance.get(`class/getclassdetailsbyid/${classId}/${userTimeZone}/`);	    

      dispatch(getUserSuccess(response.data));
    } catch (error) {
      dispatch(getUserFailure(error));
    }
  };
};

