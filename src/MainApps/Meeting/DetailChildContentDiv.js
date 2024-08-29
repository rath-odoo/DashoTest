import React,{useState,useEffect} from 'react';
import classes from '../Meetings/Detail/components/Teacher/DetailChildContentDiv.module.css';
import ClassTitleBar from '../Meetings/Detail/components/Teacher/ClassTitleBar';
import InstructorBar from '../Meetings/Detail/components/Teacher/InstructorBar';
import ClassTimeNAddress from '../Meetings/Detail/components/Teacher/ClassTimeNAddress';
import ChapterNTopics from '../Meetings/Detail/components/Teacher/ChapterNTopics';
import VideoFiles from '../Meetings/Detail/components/Teacher/VideoFiles';
import StudyMaterials from '../Meetings/Detail/components/Teacher/StudyMaterials';
import PreRequisites from '../Meetings/Detail/components/Teacher/PreRequisites';
import Homework from '../Meetings/Detail/components/Teacher/Homework';
import ChatNQuestion from '../Meetings/Detail/components/Teacher/ChatNQuestion';
import GoBackNavBar from '../Meetings/Detail/components/Teacher/GoBackNavBar';

import Presentations from '../Meetings/Detail/components/Teacher/Presentations';


import {getmeetingobjectbyId} from '../../CommonApps/AllAPICalls.js';




const DetailChildContentDiv=(props)=>{



  let meetingId = props.meetingId;	

  const [meetingObject, setMeetingObject] =useState(null);


  const [rerender, setRerender]= useState(false);


  useEffect(()=>{

      getmeetingobjectbyId({meetingId, setMeetingObject});	

  },[meetingId, rerender]);



  const rerendermeeting=()=>{

   setRerender(rerender=>!rerender);

  }



  //console.log("meetingObject: ",meetingObject);




const  Course1={courseName:"QM",
         courseNameColor:"var(--themeColor)",
         borderColor:"var(--headerRightIconsColor)",
         infoBarBkgColor:"white",
         boxBkgColor:"white",
         courseSignUpstatusColor:"green",
         courseSwitchText:"You are in this course",
         courseSwitchTextColor:"var(--themeColor)",
         progressBarColor:"#50C878",
        }




return (

<div className={classes.detailChildContentDiv}>

    { meetingObject !==null &&

    <GoBackNavBar/>
    
    }

   { /*props.selectedCourse.length===0 &&

    <div className={classes.noCourseSelectedWarning}> <i> <h2>No Course Selected</h2></i> </div>
    */}

   {

     meetingObject !==null &&

    <>
         		   
    <ClassTitleBar Course={Course1} selectedCourse= {props.selectedCourse} selectedMeeting={meetingObject} />
		   
    <InstructorBar selectedCourse={props.selectedCourse} 
	           selectedMeeting={meetingObject} 
	           userData={props.userData}
		   />
    
    {/*		   
    <PreRequisites/>		   
     
    <ChapterNTopics/>
    */}  
    
     	   
    <ClassTimeNAddress selectedCourse={props.selectedCourse} 
	   selectedMeeting={meetingObject} 
	   rerender={rerendermeeting}
	   userData={props.userData}
		   />   
   
    {/*
    <VideoFiles/>
    */}

    {/*	   
    <StudyMaterials/>		   
     */}

     
    <Presentations selectedMeeting={meetingObject} rerendermeeting={rerendermeeting} userData={props.userData}/>
     {/*
    <Homework/>		   
    
    <ChatNQuestion/>
    */}

   </>
  }

  {
  props.selectedCourse.length>0 && meetingObject ===null &&

		  <>
                   No Meeting Selected
		  </>
  }	



</div>

);


}

export default DetailChildContentDiv;
