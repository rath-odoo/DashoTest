import React from 'react';
import classes from './SubjectContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';

import CourseTitleBar from './CourseTitleBar';
import InstructorBar from './InstructorBar';
import InstituteBar from './InstituteBar'
import CourseDurationBar from './CourseDurationBar';
import DesignedFor from './DesignedFor';
import AboutTheCourse from './AboutTheCourse';
//import MessagesInfo from './MessagesInfo';
//import ClassInfo from './ClassInfo';
//import CourseProgressBar from './CourseProgressBar';
//import Participants from './Participants';
import CourseSecToggleBar from './CourseSecToggleBar';

//import MaterialUIContainer  from './MaterialUICode/MaterialUIContainer';






const SubjectContentDiv=(props)=>{




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

<div className={base.appContentDiv}>
 <div className={classes.contentDiv}>
   {/*
  <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}>Dashboard / Subject </i>   </div>
   */}
   {/*props.selectedCourse.length===0 && 

    <div className={classes.noCourseSelectedWarning}> <i> <h2>No Course Selected</h2></i> </div>
   */}
  
   {/*

    props.selectedCourse.length>0 &&

    <>		   
    <CourseTitleBar Course={Course1} selectedCourse= {props.selectedCourse} /> 
  
    <InstructorBar selectedCourse={props.selectedCourse} />

    <InstituteBar  selectedCourse={props.selectedCourse} />

    <CourseDurationBar selectedCourse={props.selectedCourse} /> 

    <DesignedFor selectedCourse={props.selectedCourse} /> 

    <AboutTheCourse selectedCourse={props.selectedCourse} /> 
  
    <CourseSecToggleBar selectedCourse={props.selectedCourse} /> 
   
   </>
  */}







 </div>
</div>	

);

}


export default SubjectContentDiv;
