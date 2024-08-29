import React,{useState, useEffect} from 'react';
import classes from './InstructorBar.module.css';
//import seema from './profSeema.png'
//import {MdStopCircle} from 'react-icons/md';
import {BsPeopleFill} from 'react-icons/bs'

import { getuserbyId} from '../../../../../CommonApps/AllAPICalls';




const InstructorBar=(props)=>{






return (

<div className={classes.instructorBar}>

   <i > <span> INSTRUCTOR</span>  
	<span>  <BsPeopleFill className={classes.participantIcon}/> 
	   <span className={classes.numParticipant}>  
	      {props.selectedCourse !==null && props.selectedCourse.length>0 && props.selectedCourse[0].enrolled_students.length}
	   </span> 
	</span>  
   </i>
   <button >
	{props.selectedCourse !==null && props.selectedCourse.length>0 && (  props.selectedCourse[0].teacher.firstname +" "+ props.selectedCourse[0].teacher.lastname)}
	{/*<img className={classes.instructorImage} src={seema} alt='edr Logo' />*/}
   </button> 
  



</div>

);

}

export default InstructorBar;
