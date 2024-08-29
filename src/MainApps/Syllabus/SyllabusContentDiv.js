import React,{useState} from 'react';
import classes from './SyllabusContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
//import TopToolBarTeacher from './components/Teacher/TopToolBarV1';


import SyllabusContainer from './SyllabusContainer';

//import StudentsContainer from './components/Teacher/StudentsContainer';




const StudentsContentDiv=(props)=>{


    const [generalMeetingsMounted, setGeneralMeetingsMounted] = useState(false);
    const [generalCoursesMounted, setGeneralCoursesMounted] = useState(false);
    const [generalClassesMounted, setGeneralClassesMounted] = useState(false);
    const [generalExamsMounted, setGeneralExamsMounted] = useState(false);
    const [generalNoticesMounted, setGeneralNoticesMounted] = useState(false);
    const [generalOneMeetingMounted, setGeneralOneMeetingMounted] = useState(false);




     const showNoticeBoardHandler=()=>{

     }


     const showClassesHandler=()=>{

     }

     const showCoursesHandler=()=>{


     }
    

     const showExamsHandler=()=>{

     }

     const showMeetingsHandler=()=>{


     }










return (

<div className={base.appContentDiv}>
 <div className={classes.contentDiv}>
 
   	
    <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> </i>   </div>
   

    {/*
    <TopToolBarTeacher 
	onPress= {props.rerender}
                               showNoticeBoard= {showNoticeBoardHandler}
                               showClasses = {showClassesHandler}
                               showCourses = {showCoursesHandler}
                               showExams={showExamsHandler}
                               showMeetings = {showMeetingsHandler}
                               dashboardCourses= {props.dashboardCourses}
                               dashboardNotice= {null}
                               userData = {props.userData}
                               generalMeetingsMounted={generalMeetingsMounted}
                               generalCoursesMounted={generalCoursesMounted}
                               generalClassesMounted={generalClassesMounted}
                               generalExamsMounted={generalExamsMounted}
                               generalNoticesMounted={generalNoticesMounted}
                               generalOneMeetingMounted={generalOneMeetingMounted}
	                       selectedCourse={props.selectedCourse}

	/>



    <StudentsContainer/>
   */}


  <SyllabusContainer selectedCourse={props.selectedCourse}/>



 </div>
</div>	

);

}


export default StudentsContentDiv;
