import React from 'react';
import classes from './MeetingsGridContainer.module.css';
import MeetingViewShort from './MeetingViewShort';
//import {getuser } from '../../../../../CommonApps/AllAPICalls';


const CoursesGridContainer =(props)=>{






console.log("selected Course: ", props.selectedCourse);



return (


<div className={classes.coursesGridContainer}>

	{  
	    props.selectedCourse !==null && props.selectedCourse.length > 0 && props.selectedCourse[0].meetings.map((meeting,index)=>{
               return <MeetingViewShort key={index} Meeting={meeting}  userData={props.userData} rerender={props.rerender} />
           }
          )
	}


        { props.selectedCourse !==null && props.selectedCourse.length > 0 && props.selectedCourse[0].meetings.length ===0 && <div className={classes.noCourseWarning}>

               <h2>This course does not have any meetings. You can start creating meetings now!.</h2>
               </div>

	}





        { props.selectedCourse !==null && props.selectedCourse.length===0 && 

			<div className={classes.noCourseWarning}> <h2> No Course is selected. You need to select a course before accessing related meetings.</h2> </div>


 	}









</div>


);


}

export default CoursesGridContainer;

