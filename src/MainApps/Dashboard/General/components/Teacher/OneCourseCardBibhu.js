

import React,{useState,useEffect, memo} from 'react';

import classes from './OneCourseCardBibhu.module.css';
import CourseEditForm from './Forms/CourseEditForm';


const OneCourseCardBibhu=(props)=>{

  const [showCourseEditForm, setShowCourseEditForm] = useState(false);

 const editButtonHandler=()=>{

  setShowCourseEditForm(true);

 }	

  const closeCourseEditForm=()=>{
   setShowCourseEditForm(false);

  }



return <div className={classes.oneCourseCardBibhu}>


   <button type="button" onClick={editButtonHandler}> Edit</button> 


     {  showCourseEditForm &&
                                      <CourseEditForm onPress={closeCourseEditForm}
                                                            Course={props.Course}
                                                            userData={props.userData}
                                            />

                            }





</div>

}


export default OneCourseCardBibhu;
