import React,{useState, useEffect} from 'react';
import classes from './CoursesGridContainer.module.css';
import CourseViewDashboard from './CourseViewDashboard_v3';
import CreateCourseForm from './Forms/CreateCourseForm';
import welcomeimg from '../Teacher/welcome.png';


const CoursesGridContainer =(props)=>{




   const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);



   const closecreateCourseForm =()=>{
        setShowCreateCourseForm(false);
        props.rerender();
    }

     const [gridContainerStyle, setGridContainerStyle]=useState({
   gridTemplateColumns: 'repeat(auto-fit, minmax( calc( 9 * var(--headerHeight) ), calc( 9 * var(--headerHeight)) )'

   });

   useEffect(()=>{

    props.courseData.length === 1 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax( calc( 9 * var(--headerHeight) ), calc( 10 * var(--headerHeight))) )'


    });

   props.courseData.length > 1 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax( calc( 9 * var(--headerHeight) ), 1fr) )'

     });



   },[props.courseData.length]);















return (


<>


<div className={classes.switchBar}>

   <button className={classes.createCourseButton} type="button" onClick={()=>setShowCreateCourseForm(true)}> 
	<b>+Add a course</b>
   </button>

</div>	

  {showCreateCourseForm && <CreateCourseForm onPress = {closecreateCourseForm} 
	                                     userData={props.userData}
	                                     
	                                     />
  }


<div className={classes.coursesGridContainer} style={gridContainerStyle}>

	{props.courseData.map((course,index)=>{

               return <CourseViewDashboard key={index} Course={course} userData={props.userData} rerender={props.rerender} />

           }

        )}





</div>

   {  props.courseData.length ===0 &&
 

                 <div className={classes.noCourseMessage}>
                       <img  src={welcomeimg} className={classes.welcomeImg}/>
                       <span> There are no courses available in your dashboard.
                            Add a course and send enrollment request to your teacher to get started.
                        </span>
      

	         </div>





   }







</>	

);


}

export default CoursesGridContainer;

