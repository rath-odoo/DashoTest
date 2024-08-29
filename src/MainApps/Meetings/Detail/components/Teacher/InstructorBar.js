import React,{useState, useEffect} from 'react';
import classes from './InstructorBar.module.css';
//import seema from './profSeema.png'
//import {MdStopCircle} from 'react-icons/md';
import {BsPeopleFill} from 'react-icons/bs'
import { getuserbyId} from '../../../../../CommonApps/AllAPICalls';
import MeetingEditForm from '../../../../Dashboard/General/Meetings/Forms/EditMeetingForm_v1';



let buttonStyle = { borderStyle:"none" ,
		   padding:"10px",
	           paddingLeft:"20px",
	           paddingRight:"20px",
	           backgroundColor:"var(--bodyBkgColor)",
	           borderRadius:"5px",
	           color:"grey",
	           textDecoration:"none"
                   		   
                }





const InstructorBar=(props)=>{

   const [showEditForm, setShowEditForm] = useState(false);

   console.log(" userData ( instructor) : ", props.userData);

   const showMeetingEditFormHandler=()=>{

     setShowEditForm(true);

   }


   const closeEditFormHandler=()=>{
     setShowEditForm(false);
     //props.rerender();
   }


   






return (

<div className={classes.instructorBar}>

   <i> 
	<span> HOST :</span>  
	{/*
	<span>  <BsPeopleFill className={classes.participantIcon}/> 
	   <span className={classes.numParticipant}>  
	      props.selectedCourse.length>0 && props.selectedCourse[0].enrolledstudents.length
	   </span> 
	</span>  
	*/}

          <button type="button" style={buttonStyle } onClick={showMeetingEditFormHandler}>
            edit
          </button>


           { showEditForm && <MeetingEditForm onPress={closeEditFormHandler}
                                              userData={props.userData}
                                              oneMeeting={props.selectedMeeting} />
	                              }
	      



   </i>
   <button >
	{ ( props.selectedMeeting.creater.firstname +" "+ props.selectedMeeting.creater.lastname)}
	{/*<img className={classes.instructorImage} src={seema} alt='edr Logo' />*/}
   </button> 


</div>

);

}

export default InstructorBar;
