import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarTickets =(props) =>  {
   /*
   let history = useHistory();

   const moveToVATChat=()=>{
   history.push('/messages/chat');
   }

   const moveToEMail=()=>{
   history.push('/messages/email');
   }
   */









  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>

       {/*	  
       <TopInfoBarButton  onPress={moveToVATChat}  buttonName={'VATChat'}/>

       <TopInfoBarButton onPress={moveToEMail}  buttonName={'Email'}/>

       <TopInfoBarButton styles={props.styles}   buttonName={'Tickets'}/>
       */}	  




  </div>

);	
}

export default TopInfoBarTickets;
