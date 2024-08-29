import React,{useState} from 'react';
import classes from './CourseDashBoardView.module.css';
import {BsCheckCircleFill} from 'react-icons/bs';

const CourseDashBoardView =(props)=>{


  const [style,setStyle]=useState(props.Course);


 



return (

<div className={classes.courseDashBoardViewParent}>

<div className={classes.courseDashBoardView} style={{borderColor:style.borderColor,backgroundColor:style.boxBkgColor}}>

   <div className={classes.infoUnitBarParent}  style={{backgroundColor: style.infoBarBkgColor}}>	
   <div className={classes.infoUnitBar} style={{backgroundColor: style.infoBarBkgColor}}> 
       <i>Subject: <span className={classes.courseName}>
	       <b style={{color:style.courseNameColor}}>   {style.courseName}  </b> 
	       <BsCheckCircleFill className={classes.signupStatus} style={{color:style.courseSignUpstatusColor}}/> 
	 </span>
       </i>
       <i>Code name: <span className={classes.courseCodeName}>CLM 221 (342101)</span></i>

   </div>
   </div>
	

    <div className={classes.infoUnitBar}>
       <i>Instructor: <span className={classes.instructorName}>Prof. Seema Bahinipati</span></i>
       <i> Status: <span className={classes.cstatus}> <b>Ongoing</b></span> </i>	

    </div>	


    <div className={classes.infoUnitBar}>
       <i> Duration: 1st Jan 2022 - 30th June 2022</i>
       <i> Students enrolled: 27 </i>

    </div>


    <div className={classes.infoUnitBar}>
       <i> Upcoming class: 2 pm , 7th Jan</i>
       <i> Prerequisites for upcoming class: completed </i>

    </div>


    <div className={classes.infoUnitBar}>
       <i> Tasks from previous class: pending..</i>
       <i> Dues: cleared </i>

    </div>

    <div className={classes.infoUnitBar}>
	<i className={classes.courseProgress}> 
	    <span className={classes.cproTitle}> Course Progress: </span>  
	    <span className={classes.cproCont}>   <i className={classes.progressBar} style={{backgroundColor: style.progressBarColor}}> 30%  </i>   </span> 
	</i>

    </div>







    <div className={classes.redirecttools}>
       <button className={classes.detailViewButton}> <b>Detail View</b></button>
       <button className={classes.courseBelongButton}> <b style={{color: style.courseSwitchTextColor}}> {style.courseSwitchText} </b> </button>

       <button className={classes.deleteButton}> <b>Delete </b></button>

    </div>








</div>

</div>	
);

}

export default CourseDashBoardView;
