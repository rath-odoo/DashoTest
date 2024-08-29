import { useEffect, useState } from "react";
import { getCourseAdmins, removeStudentFromCourse } from "../../../../../CommonApps/AllAPICalls";
import classes from "./User.module.css";
import Poster from "./men.png";
import { FaTimes } from "react-icons/fa"; // Import cross icon from react-icons library

function User(props) {
  const [admins, setAdmins] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleRemoveStudent = (studentId) => {
    const courseId = props.selectedCourse[0].id;
    removeStudentFromCourse(courseId, studentId, props)
      .then(() => {
        // Remove the student from the enrolled students list
        props.onStudentRemoved(studentId);
        setShowDeleteConfirm(false);
        setStudentToDelete(null);
      })
      .catch((error) => {
        console.error("Error removing student:", error);
      });
  };

  const deleterequest = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirm(true);
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const courseId = props.selectedCourse[0].id;
        const data = await getCourseAdmins(courseId);
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, [props.selectedCourse]);

  const isCreator = props.selectedCourse[0].creater.id === props.userData.id;
  const isAdmin = admins.some(admin => admin.id === props.userData.id);
  const canAdd = isCreator || isAdmin;

  return (
    <div className={classes.mainDiv}>
      {props.enrolledStudents.map((student, index) => (
        <div className={classes.userMainDiv} key={index}>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={student.profile_image || Poster}
              alt="Profile"
            />
            {canAdd && (
              <>
                <button
                  className={classes.deleteButton}
                  onClick={() => deleterequest(student.id)}
                >
                  <FaTimes />
                </button>
              </>
            )}
          </div>
          <div className={classes.userName}>
            {student.firstname} {student.lastname}
          </div>
          {showDeleteConfirm && studentToDelete === student.id && (
            <div className={classes.overLay}>
              <div className={classes.confirmDialog}>
                <p className={classes.p}>Are you sure you want to delete this student?</p>
                <div className={classes.div}>
                  <button
                    className={classes.deleteNo}
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setStudentToDelete(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={classes.deleteYes}
                    onClick={() => handleRemoveStudent(student.id)}
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default User;