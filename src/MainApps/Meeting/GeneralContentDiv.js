import React,{useState,useEffect} from 'react';
import classes from './GeneralContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
//import TopToolBar from './components/Teacher/TopToolBarV1';



import Meetings from './Meetings';
import {Route,Switch, useHistory} from 'react-router-dom';
import { getdashboardnotice } from './../../CommonApps/AllAPICalls';



const GeneralContentDiv=(props)=>{

    const history = useHistory();

    const [showCourses, setShowCourses] = useState(true);
    const [showExams, setShowExams] = useState(false);
    const [showNoticeBoard, setShowNoticeBoard]= useState(false);
    const [showClasses, setShowClasses] = useState(false);
    const [showMeetings,setShowMeetings] = useState(false);
    const [showOneMeeting, setShowOneMeeting] = useState(false);	

    const [generalMeetingsMounted, setGeneralMeetingsMounted] = useState(false);
    const [generalCoursesMounted, setGeneralCoursesMounted] = useState(false);
    const [generalClassesMounted, setGeneralClassesMounted] = useState(false);
    const [generalExamsMounted, setGeneralExamsMounted] = useState(false);
    const [generalNoticesMounted, setGeneralNoticesMounted] = useState(false);

    const [generalOneMeetingMounted, setGeneralOneMeetingMounted] = useState(false);
    const [generalOneClassMounted, setGeneralOneClassMounted] = useState(false);

    const showCoursesHandler=()=>{
       setShowCourses(true);
       setShowNoticeBoard(false);	   
       setShowClasses(false);
       setShowExams(false);	   
       setShowMeetings(false);
       history.push("/");	   
    }

    const showNoticeBoardHandler=()=>{
        setShowNoticeBoard(true);
	setShowCourses(false);   
        setShowClasses(false); 
	setShowMeetings(false);
	setShowExams(false);
	history.push("/notices");

    }

    const closeNoticeBoardHandler=()=>{
       setShowNoticeBoard(false);
       setShowCourses(true);
       setShowClasses(false);
       setShowExams(false);	    
    }

    const showClassesHandler=()=>{
      setShowClasses(true);
      setShowNoticeBoard(false);	    
      setShowCourses(false);
      setShowExams(false);
      setShowMeetings(false);	    
      history.push("/classes");	    
    }


    const showMeetingsHandler=()=>{
     setShowClasses(false);
     setShowNoticeBoard(false);
     setShowCourses(false);
     setShowExams(false);
     setShowMeetings(true);
     history.push("/home/dashboard/meetings");

    }


    const showExamsHandler=()=>{

     setShowClasses(false);
     setShowNoticeBoard(false);
     setShowCourses(false);
     setShowExams(true);
     setShowMeetings(false);
     history.push("/exams");


    }


    const closeClassesHandler=()=>{


    }

   

    const [dashboardNotice, getDashboardNotice]=useState(null);
    let temp_notice=null;
     useEffect(()=>{
        getdashboardnotice({getDashboardNotice});

     },[props.dashboardCourses ]);




return (

<div className={base.appContentDiv}>
   <div className={classes.contentDiv}>
     
        <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> </i>   </div>    

	              {/*
	                       <Meetings
	                           userData={props.userData}
	                           passMeetingMountInfo={setGeneralMeetingsMounted}
                                   passOneMeetingMountInfo={setGeneralOneMeetingMounted}
	                           rerender={props.rerender}
	                           />   
	             */}

                     <Meetings
                                   userData={props.userData}
                                   passMeetingMountInfo={props.passMeetingMountInfo}
                                   passOneMeetingMountInfo={setGeneralOneMeetingMounted}
                                   rerender={props.rerender}
                             />   


   </div>
</div>	

);

}


export default GeneralContentDiv;
