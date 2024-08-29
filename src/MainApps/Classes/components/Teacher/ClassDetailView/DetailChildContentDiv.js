import React from 'react';
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


const DetailChildContentDiv=(props)=>{



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

    <GoBackNavBar/>


    {  props.selectedCourse !==null && props.selectedCourse.length===0 &&

      <div className={classes.noCourseSelectedWarning}> <i> <h2>No Course Selected</h2></i> </div>
    }



   
     {
    props.selectedCourse !==null && props.selectedCourse.length>0 &&

    <>
    
    <ClassTitleBar Course={Course1} selectedCourse= {props.selectedCourse} />
    
    <InstructorBar selectedCourse={props.selectedCourse} />
    
    <PreRequisites/>		   

    <ChapterNTopics/>
    
    <ClassTimeNAddress selectedCourse={props.selectedCourse}/>   
    
    <VideoFiles/>
   
    <StudyMaterials/>		   
     
 
    <Homework/>		   
    

    <ChatNQuestion/>


   </>
     }






















</div>

);


}

export default DetailChildContentDiv;
