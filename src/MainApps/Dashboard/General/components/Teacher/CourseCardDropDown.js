import React, { useState, memo, CSSProperties } from 'react';
import classes from './CourseViewDashboard_v2.module.css';
import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';
import { removecoursefromdashboard, publishcourse, unpublishcourse } from '../../../../../CommonApps/AllAPICalls';
import { FaCaretDown } from "react-icons/fa";
import FadeLoader from "react-spinners/BeatLoader";

import CardImageUploadForm from './Forms/CourseImageUploadForm';


import PublishingWindow from './PublishingWindow';
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize: "10px",
};


const isAdminCheck = ({ course, idToCheck }) => {


  // Check if the ID exists in the 'admins' array
  if (course.admins && course.admins.some(admin => admin.id === idToCheck)) {
    return true;
  }

  // Check if the ID exists in the 'creater' object
  //if (course.creater && course.creater.id === idToCheck) {
  //  return true;
  //}

  // ID not found
  return false;



};



const isTeacherCheck = ({ course, idToCheck }) => {


  // Check if the ID exists in the 'admins' array
  if (course.teachers && course.teachers.some(teacher => teacher.id === idToCheck)) {
    return true;
  }

  // Check if the ID exists in the 'creater' object
  //if (course.creater && course.creater.id === idToCheck) {
  //  return true;
  //}

  // ID not found
  return false;



};



const isStudentCheck = ({ course, idToCheck }) => {
  //console.log("course.enrolled_students: ", course.enrolled_students, idToCheck)	
  return course.enrolled_students.includes(idToCheck);
};




const CourseCardDropDown = (props) => {

  //console.log("drop down rendering")

  const editCourseCardButtonHandler = () => {
    props.showCourseEditFormHandler();
    //props.setDropDown(false);  	  
  }

  //<OutsideAlerter setDropDown={props.setDropDown}>	
  //let userRole = Number(props.userData.id) === Number(props.Course.creater.id) ? "creater" :""


  const showImageUploadFormHandler = () => {
    props.onPress();
  }


  const [publishStatus, setPublishStatus] = useState("notPublished");

  let color = "white";



  const publishCourseHandler = () => {
    setPublishStatus("publishing");
    let courseId = props.Course.id;
    publishcourse({ courseId, props, setPublishStatus });
  }

  const unPublishCourseHandler = () => {
    setPublishStatus("unpublishing");
    let courseId = props.Course.id;
    unpublishcourse({ courseId, props, setPublishStatus });

  }

  let course = props.Course;
  let idToCheck = Number(props.userData.id);
  let isAdmin = isAdminCheck({ course, idToCheck });
  let isTeacher = isTeacherCheck({ course, idToCheck });
  let isStudent = isStudentCheck({ course, idToCheck });
  let isOwner = Number(props.userData.id) === Number(props.Course.creater.id) ? true : false;

  console.log("isAdmin: ", isAdmin)
  console.log("Course: ", props.Course);
  console.log("isStudent: ", isStudent);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [removeState, setRemoveState] = useState("notRemoving");

  const [editState, setEditState] = useState("notRemove");
  const handleRemoveConfirm = () => {
    setShowRemoveConfirm(true);
    setRemoveState("notRemoving");

  };
  const removeCourseHandler = async () => {
    setRemoveState("Removing");
    setIsRemoving(true);
    try {
      await removecoursefromdashboard({ courseId: props.Course.id, props });
      setRemoveState("Removed");
      setShowRemoveConfirm(false);
    } catch (error) {
      console.error('Error removing course:', error);
      setRemoveState("notRemoving");
    } finally {
      setIsRemoving(false);
    }
  };


  const getButtonText = () => {
    switch (removeState) {
      case "Removing":
        return "Removing...";
      case "Removed":
        return "Removed";
      default:
        return "Yes, Remove";
    }
  };
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  }
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };


  return (

    <OutsideAlerter setDropDown={props.setDropDown}>

      <div className={classes.dropdownButtons}>

        {publishStatus === "publishing" &&
          <PublishingWindow statustext="Publishing" />
        }

        {publishStatus === "unpublishing" &&
          <PublishingWindow statustext="Unpublishing" />
        }




        {
          (isAdmin || isOwner) &&

          <>
            <button type="button"
              className={classes.dropdownButton}
              onClick={editCourseCardButtonHandler}>
              Edit
            </button>

            <button type="button"
              className={classes.dropdownButton}
              onClick={showImageUploadFormHandler}>
              Change pic
            </button>

            <button type="button"
              className={classes.dropdownButton}
              onClick={handleDeleteConfirm}>
              Delete
            </button>
            {showDeleteConfirm && (
              <div className={classes.overLay}>
                <div className={classes.confirmDialog}>
                  <p className={classes.p}>Are you sure you want to Delete this Course?</p>
                  <div className={classes.div1}>
                    <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    {editState === "Removing" &&
                      <button type="submit" className={classes.submit_button} disabled={true}>
                        <FadeLoader color={color} loading={true} css={override} size={10} />
                        Deleting...
                      </button>
                    }
                    {editState === "notRemove" &&
                      <button type="submit" className={classes.deleteYes} onClick={() => { props.deleteCourseHandler(); handleClose(); }}><b>
                        Yes,Delete </b>
                      </button>
                    }
                    {editState === "Removed" &&
                      <button type="submit" className={classes.deleteYes}><b>
                        Deleted</b>
                      </button>
                    }

                  </div>
                </div>
              </div>
            )}


            {!props.Course.published &&

              <button type="button"
                className={classes.dropdownButton}
                onClick={publishCourseHandler}
              >
                {publishStatus === "publishing" ? "publishing" : "Publish"}
              </button>

            }

            {props.Course.published &&

              <button type="button"
                className={classes.dropdownButton}
                onClick={unPublishCourseHandler}
              >
                {publishStatus === "unpublishing" ? "unpublishing" : "Unpublish"}
              </button>

            }



          </>
        }

        {
          (isStudent || isTeacher || props.Course.association === "N/A") && !isAdmin && !isOwner &&

          <button type="button"
            className={classes.dropdownButton}
            onClick={handleRemoveConfirm}
          >
            Remove
          </button>}
        {showRemoveConfirm && (
          <div className={classes.overLay}>
            <div className={classes.confirmDialog}>
              <p className={classes.p}>Are you sure you want to remove this Course?</p>
              <div className={classes.div1}>
                {removeState !== "Removing" && (
                  <button
                    className={classes.deleteNo}
                    onClick={() => setShowRemoveConfirm(false)}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className={classes.deleteYes}
                  onClick={removeCourseHandler}
                  disabled={removeState === "Removing"}
                >
                  {removeState === "Removing" ? (
                    <div>
                      {getButtonText()}</div>
                  ) : (
                    <b style={{ color: "red" }}>{getButtonText()}</b>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}







        {/*
                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             Archive
                                    </button> 
				    */}
      </div>
    </OutsideAlerter>


  );



}

export default memo(CourseCardDropDown);
