import React, { useState, useEffect, useRef } from "react";
import classes from "./OneExamShortView.module.css";
import { BsFillCalendarDateFill, BsThreeDotsVertical } from "react-icons/bs";
import { deleteExam, fetchExamDetails } from "../../../../../../CommonApps/AllAPICalls";
import EditForm from "../../../../../Institute/EditForm";

const OneExamShortView = (props) => {
  const [examToDelete, setExamToDelete] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(""); // New state for delete button status
  const [examDetails, setExamDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showWarning, setShowWarning] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const menuRef = useRef(null);

  const loadExamDetails = () => {
    fetchExamDetails(props.selectedInstitute.id, props.batchDetails.id, currentPage)
      .then((data) => {
        setExamDetails(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch((error) => {
        console.error("Error loading exam details:", error);
      });
  };

  useEffect(() => {
    loadExamDetails();
  }, [props, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenuHandler = (examId) => {
    setShowMenu((prev) => (prev === examId ? null : examId));
  };

  const cancelDeleteHandler = () => {
    setShowConfirm(false);
    setExamToDelete(null);
    setDeleteStatus(""); // Reset delete status
  };

  const deleteCourseHandler = (examId) => {
    setExamToDelete(examId);
    setShowConfirm(true);
  };

  const confirmDeleteHandler = () => {
    setDeleteStatus("Deleting..."); // Set status to "Deleting..."
    deleteExam(examToDelete)
      .then(() => {
        setDeleteStatus("Deleted"); // Set status to "Deleted"
        setTimeout(() => {
          setShowConfirm(false);
          loadExamDetails();
          setDeleteStatus(""); // Reset status after deletion
        }, 1000); // Delay to show the "Deleted" state for a moment
      })
      .catch((error) => {
        console.error("Error confirming exam deletion:", error);
        setDeleteStatus(""); // Reset status on error
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openEditForm = (exam) => {
    setSelectedExam(exam);
    setShowWarning(true);
  };

  const closeEditForm = () => {
    setShowWarning(false);
    setSelectedExam(null);
    props.rerender();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (timeStr) => {
    const time = new Date(`1970-01-01T${timeStr}Z`);
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    return time.toLocaleTimeString(undefined, options);
  };

  const formatDuration = (duration) => {
    const [hours, minutes] = duration.split(":").map(Number);
    let result = "";
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? "s" : ""} `;
    }
    if (minutes > 0) {
      result += `${minutes} minute${minutes > 1 ? "s" : ""} `;
    }
    return result.trim();
  };

  if (examDetails.length === 0) {
    return <div className={classes.name}>Exams Not available</div>;
  }

  return (
    <>
      {examDetails.map((exam) => (
        <div key={exam.id} className={classes.courseViewDashboard}>
          <div className={classes.titleDiv}>
            <div className={classes.leftInfo}>
              <div className={classes.classInfo}>
                <BsFillCalendarDateFill className={classes.clockIcon} />
                <div className={classes.classData}>
                  {formatDate(exam.start_date)} | {formatTime(exam.start_time)} | {formatDuration(exam.duration)} || #{exam.id}
                </div>
              </div>
              <div className={classes.topicsTitle}>
                <div className={classes.classNum}>Maximum Marks: {exam.total_marks}</div>
              </div>
            </div>
            <div className={classes.toprightBoxes}>
              <div className={classes.classStatus}>{exam.platform}</div>
              {props.isAdminOrOwner && (
                <button
                  type="button"
                  className={classes.dotsButton}
                  onClick={() => toggleMenuHandler(exam.id)}
                >
                  <BsThreeDotsVertical />
                </button>
              )}
              {showMenu === exam.id && (
                <div ref={menuRef} className={classes.menu}>
                  {/* <button className={classes.menuItem} onClick={() => openEditForm(exam)}>Edit</button> */}
                  <button
                    className={classes.menuItem}
                    onClick={() => deleteCourseHandler(exam.id)}
                    disabled={deleteStatus === "Deleting..."} // Disable button during deletion
                  >
                    {deleteStatus === "Deleting..." ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className={classes.lowerDiv}>
            <div className={classes.leftLowerDiv}>
              <div className={classes.todayTopic}>{exam.name}</div>
              <div className={classes.addressDiv}>
                Associated Course:
                {exam.courses.map((course) => (
                  <div key={course.id} className={classes.classTime}>
                    {course.courseShortName} ({course.courseGlobalCode})
                  </div>
                ))}
              </div>
            </div>
          </div>
          {showWarning && selectedExam?.id === exam.id && (
            <EditForm 
              batchId={props.batchDetails.id}
              selectedInstitute={props.selectedInstitute}
              userData={props.userData}
              exam={selectedExam}
              onBack={closeEditForm}
              rerender={props.rerender}
              batchDetails={props.batchDetails}
            />
          )}
          {showConfirm && examToDelete === exam.id && (
            <div className={classes.overLay}>
              <div className={classes.confirmDialog}>
                <p className={classes.p}>Are you sure you want to delete this exam?</p>
                <div className={classes.div}>
                  <button className={classes.deleteNo} onClick={cancelDeleteHandler}>Cancel</button>
                  <button 
                    className={classes.deleteYes} 
                    onClick={confirmDeleteHandler}
                    disabled={deleteStatus === "Deleting..."}  
                  >
                    {deleteStatus || "Yes, Delete"} 
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className={classes.pagination}>
        <button
          className={classes.pageButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className={classes.pageButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default OneExamShortView;
