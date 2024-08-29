import React,{useState, memo, useEffect} from 'react';
import classes from './CoursesGridContainerSagar.module.css';
//import CourseViewDashboard from './CourseViewDashboard_v2Sagar';
import OneCourseCard from './CourseViewDashboard_v2';

import CreateCourseForm from './Forms/CreateCourseForm';
import AddCourseForm from './../Student/Forms/CreateCourseForm';
import welcomeimg from './welcome.png';
import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';
import p1 from "./teacher.jpg";
import CardMobile from './CardMobile';
import OneCourseCardBibhu from './OneCourseCardBibhu';
//import CourseCardSagar from "./CourseCardSagar";
import OneCourseCardSagar from './OneCourseCardSagar';
import { useMediaPredicate } from "react-media-hook";





const CoursesGridContainer =(props)=>{




   const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);
   const [showAddCourseForm, setShowAddCourseForm] = useState(false);


   const smallerThan1450px = useMediaPredicate("(max-width: 1500px )");


   const closecreateCourseForm =()=>{
        setShowCreateCourseForm(false);
        props.rerender();
    }

    const closeaddCourseForm =()=>{
        setShowAddCourseForm(false);
        props.rerender();
    }





   const [gridContainerStyle, setGridContainerStyle]=useState({
   gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'

   });

   useEffect(()=>{

     props.courseData.length === 1 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 400px))'


    });

     props.courseData.length === 2 && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px,400px ))'

     });


     props.courseData.length > 2 && !smallerThan1450px && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'

     });
	   

     props.courseData.length > 2 && smallerThan1450px && setGridContainerStyle({
     gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'

     });



   },[props.courseData.length, smallerThan1450px]);




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


    console.log("props.courseData: ", props.courseData);

   //()=>setShowCreateCourseForm(true)

return (


<>


    <div className={classes.switchBar}>

      <div className={classes.newCourseButtonDiv}>	

           {/*
              <b> <span style={{color:"lightgrey"}}>Teach:</span>
	   */}


          <button className={classes.createCourseButton} type="button" onClick={showCreateNewCourseHandler}> 
	       + Create a course
          </button>

	  <button className={classes.exploreCourseButton} type="button" onClick={showAddNewCourseHandler} style={{marginLeft:"10px"}}>
             <b> Explore courses</b>
          </button>




	  <span style={{color:"grey", marginLeft:"10px",fontFamily:"Roboto",fontSize:"15px"}}>
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







     
     <div className={classes.coursesGridContainer} style={gridContainerStyle} >

        {/*  props.courseData !==null && props.courseData.length !==0 &&
           <CourseCardSagar/>
        */}    

	{ props.courseData.map((course,index)=>{
               return <OneCourseCardSagar key={index} 
		                           Course={course} 
		                           rerender={props.rerender}
		                           userData={props.userData}
		                           picture={course.card_cover_image}  
		                           courseTitle={course.courseShortName} 
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
                            
                          Teach and Learn with just one account. 
                         
                   </div>
      }

</>	

);


}

export default memo(CoursesGridContainer);

