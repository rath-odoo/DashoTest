import React, { useState, memo } from 'react';
import classes from './ClassCardDropDown.module.css';
import OutsideAlerter from '../../../../CommonApps/OutsideAlerter';
import { deleteclassbyId } from '../../../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/BeatLoader";


import ClassEditForm from './Forms/ClassEditForm';


const ClassCardDropDown = (props) => {

   //console.log("drop down rendering")


   const [showEditForm, setShowEditForm] = useState(false);



   const editCourseCardButtonHandler = () => {

      setShowEditForm(true);

   }
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const handleDeleteConfirm = () => {
      setShowDeleteConfirm(true);

   };
   const [isDeleting, setIsDeleting] = useState(false); // New state for deletion process




   const closeEditClassFormHandler = () => {

      setShowEditForm(false);
      props.rerender();
   }




   const removeCourseHandler = () => {

   }
   const override = {
      display: "block",
      margin: "0 auto",
      borderColor: "red",
      fontSize: "10px",
   };

   let color = "white";


   const deleteCourseHandler = async () => {
      setIsDeleting(true);  // Set deleting state to true
      try {
         let classId = props.oneClass.id;
         await deleteclassbyId({ classId, props });
         console.log("Assignment deleted successfully");
         setShowDeleteConfirm(false);
         props.rerender();
      } catch (error) {
         console.error("Error deleting assignment:", error);
      } finally {
         setIsDeleting(false); // Reset deleting state after the deletion process
      }

   }
   let classId = props.oneClass.id;



   let canEdit = true;//props.teachers.some(teacher => teacher.id === props.userData.id);


   // console.log("teachers drop down: ", props.teachers);




   return (

      <OutsideAlerter setDropDown={props.setDropDown}>
         {canEdit &&

            <div className={classes.dropdownButtons}>

               <button type="button"
                  className={classes.dropdownButton}
                  onClick={editCourseCardButtonHandler}>
                  edit
               </button>


               <button type="button"
                  className={classes.dropdownButton}
                  onClick={handleDeleteConfirm}>
                  delete
               </button>
               {showDeleteConfirm && (
                  <div className={classes.overLay}>
                     <div className={classes.confirmDialog}>
                        <p className={classes.p}>
                           {isDeleting ? <div><p>"Are you sure you want to delete this class?"</p>  <div className={classes.div}>
                              <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                              <button className={classes.deleteYes} onClick={deleteCourseHandler}>Deleting.....</button>
                           </div> </div> : "Are you sure you want to delete this class?"}
                        </p>
                        {!isDeleting && (
                           <div className={classes.div}>
                              <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                              <button className={classes.deleteYes} onClick={deleteCourseHandler}>Yes, Delete</button>
                           </div>
                        )}
                     </div>
                  </div>
               )}



               {showEditForm && <ClassEditForm userData={props.userData}
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
