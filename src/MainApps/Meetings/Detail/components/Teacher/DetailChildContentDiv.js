import React,{useState,useEffect} from 'react';
import classes from './DetailChildContentDiv.module.css';
import ClassTitleBar from './ClassTitleBar';
import InstructorBar from './InstructorBar';
import ClassTimeNAddress from './ClassTimeNAddress';
import ChapterNTopics from './ChapterNTopics';
import VideoFiles from './VideoFiles';
import StudyMaterials from './StudyMaterials';
import PreRequisites from './PreRequisites';
import Homework from './Homework';
import ChatNQuestion from './ChatNQuestion';
import GoBackNavBar from './GoBackNavBar';

import Presentations from './Presentations';


import {getmeetingobjectbyId} from '../../../../../CommonApps/AllAPICalls.js';




const DetailChildContentDiv=(props)=>{



   let meetingId = localStorage.getItem('selectedMeetingId');	

   const [meetingObject, setMeetingObject] =useState(null);

   const [rerender,setRerender]= useState(false);

   useEffect(()=>{

      getmeetingobjectbyId({meetingId, setMeetingObject});	

   },[meetingId, rerender ]);


   const rerenderHandler=()=>{

     //setRerender(rerender=>!rerender);

   }





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
    {/*
       <GoBackNavBar/>
    */}

    { props.selectedCourse !==null && props.selectedCourse.length===0 &&

       <div className={classes.noCourseSelectedWarning}> <i> <h2>No Course Selected</h2></i> </div>
    }


    {
      props.selectedCourse !==null && props.selectedCourse.length>0 && meetingObject !==null &&
    <>
    
    <ClassTitleBar Course={Course1} selectedCourse= {props.selectedCourse} selectedMeeting={meetingObject} />
    { 
    <InstructorBar selectedCourse={props.selectedCourse} 
	           selectedMeeting={meetingObject} 
	           userData={props.userData}
	           rerender={()=>setRerender(rerender=>!rerender)}
	           />
    }



    {/*		   
    <PreRequisites/>		   
     
    <ChapterNTopics/>
     */}
    
    <ClassTimeNAddress selectedCourse={props.selectedCourse} 
	               selectedMeeting={meetingObject} 
	               rerender={()=>setRerender(rerender=>!rerender)}
		       userData={props.userData}
		       />   
    

    {/*
    <VideoFiles/>
    */}

    {/*	   
    <StudyMaterials/>		   
     */}


    <Presentations selectedMeeting={meetingObject} 
	           rerendermeeting={rerenderHandler}
	           userData={props.userData}/>
    {/*
    <Homework/>		   
    

    <ChatNQuestion/>
    */}


   </>
  }

  {
   props.selectedCourse !==null &&  props.selectedCourse.length>0 && meetingObject ===null &&

		  <>
                   No Meeting Selected
		  </>
  }	





</div>

);


}

export default DetailChildContentDiv;
