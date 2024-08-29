import React from 'react';
import classes from './CoursesGridContainer.module.css';
import CourseViewDashboard from './CourseViewDashboard';
//import {getteachercourses,getuser,getcoursesbyglobalCode, getcoursesbyglobalCodeArray} from '../../../../../CommonApps/AllAPICalls';
//import axiosInstance from '../../../../../axios';

const CoursesGridContainer =(props)=>{





      



return (


<div className={classes.coursesGridContainer}>
      

      {  props.courseData.length !==0 &&   props.courseData.map((course,index)=>{

               return <CourseViewDashboard key={index} Course={course}  data={props.userData} rerender={props.rerender}/>

           }

        )

      }



    {  props.courseData.length ===0 &&
                   <div className={classes.noCourseMessage}> <h1> There are no courses available in your dashboard. Get the course code from your teacher (e.g. 100003) and add a course here to get started.</h1> </div>

    }



</div>


);


}

export default CoursesGridContainer;

