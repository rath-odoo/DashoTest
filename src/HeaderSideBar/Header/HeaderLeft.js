import React,{useState} from 'react'; 
import classes from './HeaderLeft.module.css';
import companyLogo from './img/logoBlueWhite.PNG'
//import {Link} from 'react-router-dom';
import {BsList, BsChevronRight} from 'react-icons/bs';
import CourseDropDown from './CourseDropDown';
import { useHistory } from "react-router-dom";

import {IoMdArrowRoundBack } from 'react-icons/io';


import {SiRedux} from 'react-icons/si';

//import {Typography} from '@material-ui/core';


function HeaderLeft(props){

    let history = useHistory();
    const [courseDropDown, setCourseDropDown]=useState(false);


    const showCourses=()=>{
       setCourseDropDown(true);
    }
    const homehandler=()=>{
    history.push("/");
    }


    const hideCourses=()=>{
      setCourseDropDown(false);
    }


   const dashClickHandler=()=>{
   
   history.push("../../home/dashboard/courses");	   

   }


   const backToDashboard=()=>{
     localStorage.removeItem('preferredCourseId');
     history.push('../../');



   }	



   console.log("props.feedMounted: ", props.feedMounted);



return (

 <div className={classes.headerLeft} > 

       { localStorage.getItem('preferredCourseId') !=null && 
          <button type="button" className={classes.backButton} onClick={backToDashboard}> 
	        <IoMdArrowRoundBack className={classes.BackIcon}/> 
	  </button>
       }

       {/*
         <img className={classes.logo} src={companyLogo} alt='edr Logo' />
       */}

       <div  onClick={homehandler} className={classes.logoText}>
	  <b>D</b> 
    
	  <div className={classes.styleBar}> </div>
    
       </div>
       

      <button className={classes.ExpConButton} onClick={props.onPress}> 
	  <BsList className={classes.ExpConIcon} />
      </button>	

      {/*
      <i onClick={dashClickHandler} className={classes.clickDash}> { props.selectedCourse ===null &&  <span><b> Home </b></span>} </i>
      */}
      <div className={classes.courseNameButton}  onMouseOver={showCourses} onMouseLeave={hideCourses} >
	{  
 	 <i> <h2> {    props.selectedCourse !==null  && 
		      props.selectedCourse[0].courseLocalCode !=="N/A" && 
		      props.selectedCourse[0].courseLocalCode !==""? props.selectedCourse[0].courseLocalCode+": ":""}
	         {    props.selectedCourse !==null  &&  props.selectedCourse[0].courseShortName}
	     </h2>
	     <BsChevronRight size={12} style={{marginLeft:"10px", marginRight:"10px"}}/> 
             <span style={{color:"grey"}}> {props.summaryMounted &&  " Summary"} </span>
             <span style={{color:"grey"}}> {props.syllabusMounted &&  " Syllabus"} </span>
	     <span style={{color:"grey"}}> {props.dashboardMounted &&  " Dashboard"} </span>	     
	     <span style={{color:"grey"}}> {props.generalChatMounted &&  " Chat"} </span>

             <span style={{color:"grey"}}> {props.emailMounted &&  " Mail"} </span>

             <span style={{color:"grey"}}> {props.contactsMounted &&  " Contacts"} </span>
             <span style={{color:"grey"}}> {props.calenderMounted &&  " Calender"} </span>            
	     <span style={{color:"grey"}}> {props.usefullLinksMounted &&  " Links"} </span>
             <span style={{color:"grey"}}> {props.messagesMounted &&  " Course Chat"} </span>
	     <span style={{color:"grey"}}> {props.discussionMounted &&  " Discussion"} </span>
	     <span style={{color:"grey"}}> {props.classMounted &&  " Classes"} </span>
	     <span style={{color:"grey"}}> {props.tasksMounted &&  " Tasks"} </span>             
	     <span style={{color:"grey"}}> {props.booksMounted &&  " Books"} </span>
             <span style={{color:"grey"}}> {props.examMounted &&  " Exams"} </span>  
	     <span style={{color:"grey"}}> {props.classmatesMounted &&  " People"} </span>
             <span style={{color:"grey"}}> {props.feedMounted &&  " Timeline"} </span>
	     <span style={{color:"grey"}}> {props.instituteMounted &&  " Institute"} </span>
 
	</i>
        }        

	 { props.selectedCourse !==null && <sup className={classes.superScript}>@ {props.selectedCourse[0].designedFor} </sup> }

         { courseDropDown && props.selectedCourse !==null && <CourseDropDown userData={props.userData} selectedCourse={props.selectedCourse[0]} dashboardCourses={props.dashboardCourses} />}

      </div>	


  </div>

);


}

export default HeaderLeft;

