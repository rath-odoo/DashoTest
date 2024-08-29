import { useState } from "react";
import classes from "./Single_course_View.module.css";
import { BiUnlink } from "react-icons/bi";
import { delinkCourse } from "../../CommonApps/AllAPICalls";

function Single_course_View(props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDelinking, setIsDelinking] = useState(false);
  const [delinkState, setDelinkState] = useState("notDelinking"); 

  const deleterequest = () => {
    setShowDeleteConfirm(true);
    setDelinkState("notDelinking");
  };

  const handleDelink = () => {
    setDelinkState("delinking");
    setIsDelinking(true);
    delinkCourse(props.courseId, props.userData.id, props.selectedInstitute.id)
      .then(() => {
        props.onDelink();
        setDelinkState("delinked");
        setShowDeleteConfirm(false);
      })
      .catch((error) => {
        console.error('Error delinking course:', error);
        setDelinkState("notDelinking"); 
      })
      .finally(() => {
        setIsDelinking(false);
      });
  };
  const getButtonText = () => {
    switch (delinkState) {
      case "delinking":
        return "Delinking...";
      case "delinked":
        return "Delinked";
      default:
        return "Yes, Delete";
    }
  };

  console.log("this are the props",props);
  
  return (
    <button className={classes.parentClass}>
      <div className={classes.name}>{props.course.course_short_name}</div>
      <div className={classes.courseId}>{props.course.course_global_code}</div>
      <div className={classes.startdate}>{props.course.designed_for.name}</div>
      <div className={classes.status}>{props.course.status}</div>

      {props.isAdminOrOwner && (
        <div className={classes.sr}>
          <BiUnlink className={classes.unLinkIcon} onClick={deleterequest} />
        </div>
      )}

      {showDeleteConfirm && (
        <div className={classes.overLay}>
          <div className={classes.confirmDialog}>
            <p className={classes.p}>Are you sure you want to remove this Course?</p>
            <div className={classes.div}>
              {delinkState !== "delinking" && (
                <button
                  className={classes.deleteNo}
                  onClick={() => {
                    setShowDeleteConfirm(false);
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                className={classes.deleteYes}
                onClick={handleDelink}
                disabled={delinkState === "delinking"}
              >
                {getButtonText()}
              </button>
            </div>
          </div>
        </div>
      )}
    </button>
  );
}

export default Single_course_View;
