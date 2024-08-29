import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarButton from '../CommonAppUtilities/TopInfoBarButton.js';
import { useHistory } from 'react-router-dom';


const  TopInfoBarEMail =(props) =>  {

   let history = useHistory();

   const moveToVATChat=()=>{
   history.push('/messages/chat');
   }

   const moveToTickets=()=>{
   history.push('/messages/tickets');
   }










  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
      
	  




  </div>

);	
}

export default TopInfoBarEMail;
