import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';
import Separator from "../CommonAppUtilities/Separator";



const  TopInfoBarVATChat =(props) =>  {

   //let history = useHistory();

   //const moveToEmail=()=>{
   //history.push('/messages/email');
   //}

   //const moveToTickets=()=>{
   //history.push('/messages/tickets');
   //}





   //console.log("props.selectedCourse.length: ", props.selectedCourse.length);




  return (

  <div className={classes.topInfoBar}>

        <Separator/>

	{ props.selectedCourse !==null && props.selectedCourse.length !==0 &&
            <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
        }
	  
       {/*       
          <TopInfoBarButton  styles={props.styles}  buttonName={'Chat'}/>

          <TopInfoBarButton onPress={moveToEmail}  buttonName={'Email'}/>

          <TopInfoBarButton onPress={moveToTickets}   buttonName={'Tickets'}/>
       */}	  




  </div>

);	
}

export default TopInfoBarVATChat;
