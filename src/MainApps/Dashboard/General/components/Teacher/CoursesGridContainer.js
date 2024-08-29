import React,{useState, memo, useEffect} from 'react';
import classes from './CoursesGridContainer.module.css';
import CourseViewDashboard from './CourseViewDashboard_v2';
import CreateCourseForm from './Forms/CreateCourseForm';
import AddCourseForm from './../Student/Forms/CreateCourseForm';
import welcomeimg from './welcome.png';
import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';

import CardMobile from './CardMobile';

const CoursesGridContainer =(props)=>{




   const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);
   const [showAddCourseForm, setShowAddCourseForm] = useState(false);


   const closecreateCourseForm =()=>{
        setShowCreateCourseForm(false);
        props.rerender();
    }

    const closeaddCourseForm =()=>{
        setShowAddCourseForm(false);
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




   const newCourseHandler=()=>{

     setShowNewCourseOptions(true)    

   }

   const [showNewCourseOptions, setShowNewCourseOptions] = useState(false);


   const showCreateNewCourseHandler=()=>{
      setShowCreateCourseForm(true);
      setShowNewCourseOptions(false);
   }

   const showAddNewCourseHandler=()=>{
     setShowAddCourseForm(true);
     setShowNewCourseOptions(false);
   }




   //()=>setShowCreateCourseForm(true)

return (


<>


    <div className={classes.switchBar}>

      <div className={classes.newCourseButtonDiv}>	
          <button className={classes.createCourseButton} type="button" onClick={showCreateNewCourseHandler}> 
	      +Create   new course
          </button>

	   <button className={classes.createCourseButton} type="button" onClick={showAddNewCourseHandler}>
             <b> +Enroll in new course</b>
          </button>
 
	   <span style={{color:"grey", marginLeft:"10px"}}>
	   All your courses
           </span>
          <OutsideAlerter setDropDown={setShowNewCourseOptions}>
	     <>
	     { showNewCourseOptions &&
               <div className={classes.dropDownOptionsNewCourseButtonDiv}>             
	           <button type="button" className={classes.newCourseRedirectButton} onClick={showCreateNewCourseHandler}> 
		           +Create new course 
		   </button>
                   <button type="button" className={classes.newCourseRedirectButton} onClick={showAddNewCourseHandler}> +Enroll in new course </button>
               </div>
	     }
	    </>
	  </OutsideAlerter>

      </div>


      {/*	
      <span className={classes.instructions}> Dashboard provides summary of all your courses at one place. Go inside the  courses to know more details about a single course </span>	
     */}
    </div>	

    {showCreateCourseForm && <CreateCourseForm onPress = {closecreateCourseForm} />}

    {showAddCourseForm && <AddCourseForm onPress = {closeaddCourseForm}

                                             userData={props.userData}

                                             />
    }






     <div className={classes.coursesGridContainer} style={gridContainerStyle}>

	{props.courseData.map((course,index)=>{

               return <CourseViewDashboard key={index} 
		                           Course={course} 
		                           rerender={props.rerender}
		                           userData={props.userData}
			                   />

           }

        )}

	{/*props.courseData.map((course,index)=>{

               return <CardMobile key={index}
                                           Course={course}
                                           rerender={props.rerender}
                                           userData={props.userData}
                                           />

           }

        )*/}

</div>






        {  props.courseData.length ===0 &&
                   <div className={classes.noCourseMessage}>
		       <img  src={welcomeimg} className={classes.welcomeImg}/> 
                        <span> There are no courses available in your dashboard.
                            Create a course and share the course code with your students to get started.
                        </span>
                   </div>
        }


</>	

);


}

export default memo(CoursesGridContainer);

