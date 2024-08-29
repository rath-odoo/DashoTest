import React from 'react';
import classes from './CourseTitleBar.module.css';
import {BsCheckCircleFill} from 'react-icons/bs';



const CourseTitleBar=(props)=>{


//const [style,setStyle]=useState(props.Course);

let style = props.Course;


return(


  <div className={classes.infoUnitBarParent}  style={{backgroundColor: style.infoBarBkgColor}}>
     <div className={classes.infoUnitBar} style={{backgroundColor: style.infoBarBkgColor}}>
         <i>SUBJECT: <span className={classes.courseName}>
               <b style={{color:style.courseNameColor}}>   
	             { props.selectedCourse.length >0 &&  props.selectedCourse[0].subject}  
	       </b>
               <BsCheckCircleFill className={classes.signupStatus} style={{color:style.courseSignUpstatusColor}}/>
         </span>
         </i>
         <i>CODE: <span className={classes.courseCodeName}> 
	         {props.selectedCourse.length >0 && ( " "+props.selectedCourse[0].courseLocalCode+  " ("+props.selectedCourse[0].courseGlobalCode+")") }
	 </span></i>

     </div>
   </div>










);

}

export default CourseTitleBar;
