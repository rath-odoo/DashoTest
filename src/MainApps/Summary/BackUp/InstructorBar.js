import React,{useState, useEffect} from 'react';
import classes from './InstructorBar.module.css';
import seema from './profSeema.png'
//import {MdStopCircle} from 'react-icons/md';
import {BsPeopleFill} from 'react-icons/bs'

import { getuserbyId} from '../../CommonApps/AllAPICalls';




const InstructorBar=(props)=>{


   //console.log("course: ", props.selectedCourse);

   const [userData, setUserData]= useState({
     usertitle:'',
     firstname:'',
     lastname:''
    });




   let teacherId = props.selectedCourse[0].teacher;

   useEffect(()=>{

     let userId = teacherId;
     getuserbyId({userId, setUserData});

     return ()=>{
      setUserData(userData=>({usertitle:'',firstname:'',lastname:''}));
      }

    },[teacherId]);





return (

<div className={classes.instructorBar}>

   <i > <span> INSTRUCTOR</span>  
	<span>  <BsPeopleFill className={classes.participantIcon}/> 
	   <span className={classes.numParticipant}>  
	      {props.selectedCourse.length>0 && props.selectedCourse[0].enrolledstudents.length}
	   </span> 
	   <span className={classes.statusSpan}>STATUS: 
	       <b  className={classes.cStatus}> 
	          {props.selectedCourse.length>0 && props.selectedCourse[0].courseStatus}
	       </b> 
	   </span>
	</span>  
   </i>
   <button >
	{props.selectedCourse.length>0 && ( userData.usertitle +" "+ userData.firstname +" "+ userData.lastname)}
	<img className={classes.instructorImage} src={seema} alt='edr Logo' /> 
   </button> 
  



</div>

);

}

export default InstructorBar;
