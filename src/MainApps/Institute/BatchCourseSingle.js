import { useEffect, useState, useRef } from "react";
import classes from "./BatchCourseSingle.module.css";
import { BiUnlink } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { delinkCourseFromBatch, getcoursesbyCourseId } from "../../CommonApps/AllAPICalls";

function BatchCourseSingle(props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [delinkState, setDelinkState] = useState("notDelinking"); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [rerender, setRerender] = useState(false);

  let history = useHistory();
  const initialLoad = useRef(true); // Track the initial load

  useEffect(() => {
    let courseId = props.course.id;

    if (initialLoad.current) {
      setLoading(true); // Start loading only on the initial load

      getcoursesbyCourseId({
        courseId,
        getCourseData: (courseData) => {
          setSelectedCourse(courseData);
          setLoading(false); // Stop loading after the initial data fetch
          initialLoad.current = false; // Set to false after initial load
        }
      });
    }

    return () => {
      setSelectedCourse(null);
    };
  }, [props.course.id]); // Only re-fetch when the course ID changes

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);  
    setDelinkState("notDelinking");  
  };

  const delinkCourseHandler = () => {
    setDelinkState("delinking"); 
    
    const batchId = props.batchTwo.id;
    const userId = props.userData.id;
    const courseId = props.course.id;

    delinkCourseFromBatch(batchId, userId, courseId, props, handleClose)
      .then(() => {
        setDelinkState("delinked"); 
        setTimeout(() => {
          handleClose(); 
        }, 1000);  
      })
      .catch((error) => {
        console.error("Error delinking course:", error);
        setDelinkState("notDelinking");  
      });
  };

  const courseSwitchHandler = () => {
    if (selectedCourse && selectedCourse.length > 0) {
      let isOwner = Number(selectedCourse[0].creater.id) === Number(props.userData.id);

      if (
        selectedCourse[0].association === "Teaching" || 
        selectedCourse[0].association === "Studying" || 
        selectedCourse[0].association === "Admin" || 
        isOwner
      ) {
        localStorage.setItem('preferredCourseId', selectedCourse[0].id);
        props.rerender();
        history.push('/course/summary');
      } else {
        alert("You are not enrolled in this course yet!");
      }
    }
  }



  console.log("course", props.course);
  return (
    <button className={classes.parentClass}>
      {loading ? (
        <div>Loading...</div> // Show loading indicator only during the initial load
      ) : selectedCourse && selectedCourse.length > 0 ? (
        <>
    <div className={classes.name} onClick={courseSwitchHandler}>{props.course.courseShortName}</div>
    <div className={classes.courseId}>{props.course.courseGlobalCode}</div>
    <div className={classes.ins}>{props.course.creator_name}</div>

          {props.isAdminOrOwner && (
            <div className={classes.sr}>
              <BiUnlink className={classes.unLinkIcon} onClick={handleDeleteConfirm} />
            </div>
          )}

          {showDeleteConfirm && (
            <div className={classes.overLay}>
              <div className={classes.confirmDialog}>
                <p className={classes.p}>Are you sure you want to delink this Course?</p>
                <div className={classes.div}>
                  <button className={classes.deleteNo} onClick={handleClose}>Cancel</button>
                  
                  {delinkState === "notDelinking" && (
                    <button className={classes.deleteYes} onClick={delinkCourseHandler}>Yes, Delink</button>
                  )}

                  {delinkState === "delinking" && (
                    <button className={classes.deleteYes} disabled>Delinking...</button>
                  )}

                  {delinkState === "delinked" && (
                    <button className={classes.deleteYes} disabled>Delinked</button>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Courses not available</div> // Show this message if no course data is available
      )}
    </button>
  );
}

export default BatchCourseSingle;
