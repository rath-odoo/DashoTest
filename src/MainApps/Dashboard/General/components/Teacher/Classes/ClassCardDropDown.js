import React,{useState, memo} from 'react';
import classes from '../CourseViewDashboard_v2.module.css';
import OutsideAlerter from '../../../../../../CommonApps/OutsideAlerter'; 
import {deleteclassbyId} from '../../../../../../CommonApps/AllAPICalls';

import ClassEditForm from './Forms/ClassEditForm';


const ClassCardDropDown=(props)=>{

   //console.log("drop down rendering")


   const [showEditForm, setShowEditForm] = useState(false);



   const editCourseCardButtonHandler=()=>{

      setShowEditForm(true);
     
   }


   const closeEditClassFormHandler=()=>{

    setShowEditForm(false);
    props.rerender();
   }




   const removeCourseHandler=()=>{

   }


  const deleteCourseHandler=()=>{


    let classId = props.oneClass.id;
    deleteclassbyId({classId, props});

  }


  let canEdit = props.teachers.some(teacher => teacher.id === props.userData.id);


  console.log("teachers drop down: ", props.teachers);




return (

<OutsideAlerter setDropDown={props.setDropDown}>
	{ canEdit &&

<div className={classes.dropdownButtons}>

                                    <button type="button" 
	                                    className={classes.dropdownButton} 
	                                    onClick={editCourseCardButtonHandler}> 
	                                    edit
                                    </button>
				    	    	                            

                                    <button type="button" 
	                                    className={classes.dropdownButton} 
	                                    onClick={deleteCourseHandler}> 
	                                     delete
                                    </button>
	


             {  showEditForm &&  <ClassEditForm userData={props.userData} 
		                                onPress={closeEditClassFormHandler}
		                                oneClass={props.oneClass}
		                                />

	     }





	                            {/*     
                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             publish
                                    </button>
                                    */}

                                </div>
	}


</OutsideAlerter>


);



}

export default memo(ClassCardDropDown);
