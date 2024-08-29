import classes from "./Teachers.module.css";
import { useState, useEffect, memo } from 'react';
import AddTeacherForm from "./AddTeacherForm";
import { deleteTeacher, getCourseAdmins } from "../../../../../CommonApps/AllAPICalls";
import { BsTrash } from "react-icons/bs";

function Teachers(props) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);



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

  if (!props.selectedCourse || !props.selectedCourse[0]?.teachers) {
    return <div className={classes.noTeacher}>No course selected</div>;
  }

  const handleAddStudent = (studentName) => {
    setShowAddForm(true);
    setSelectedStudents([...selectedStudents, studentName]);
  };

  const handleFormClose = () => {
    setShowAddForm(false);
    props.rerender();
  };

  const handleDeleteTeacher = async (teacherId) => {
    const courseId = props.selectedCourse[0].id;
    setIsDeleting(true);
    setShowDeleteConfirm(false);
    try {
      await deleteTeacher(courseId, teacherId);
      console.log("Teacher deleted successfully");
      props.rerender();
    } catch (error) {
      console.error("Error deleting teacher:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  const isCreator = props.selectedCourse[0].creater.id === props.userData.id;
  const isAdmin = admins.some(admin => admin.id === props.userData.id);
  const canManageTeachers = isCreator || isAdmin;

  return (
    <div>
      <div className={classes.addStudentDiv}>
        {/* <button className={classes.addTeacherButton} onClick={handleAddStudent}>Add Teacher</button> */}
        {showAddForm &&
          <AddTeacherForm onClose={handleFormClose} rerender={props.rerender} selectedCourse={props.selectedCourse} />
        }
      </div>
      <div className={classes.container}>
        <div className={classes.parentContainer}>
          {props.selectedCourse[0].teachers.map((teacher, index) => (
            <div className={classes.mainBox} key={index}>
              <div className={classes.picContainer}>
                <img alt="teacherImage" src={teacher.profile_image} className={classes.profilePic}></img>
              </div>

              <div className={classes.rightContainer}>
                <div className={classes.block1}>
                  <div className={classes.nameTitle}>Name :</div>
                  <div className={classes.userName}>{teacher.usertitle} {teacher.firstname} {teacher.lastname}</div>
                </div>

                <div className={classes.block3}>
                  <div className={classes.ExpTitle}>Status :</div>
                  <div className={classes.expYear}>Active</div>
                </div>

                <div className={classes.block3}>
                  <div className={classes.ExpTitle}>Achievements :</div>
                  <div className={classes.expYear}>10 Years</div>
                </div>
              </div>

              {canManageTeachers && (
                <button className={classes.deleteBtn}
                  // onClick={() => handleDeleteTeacher(teacher.id)}
                  onClick={() => deleterequest(teacher.id)}

                >
                  <BsTrash />
                </button>
              )}
              {showDeleteConfirm && studentToDelete === teacher.id && (
                <div className={classes.overLay}>
                  <div className={classes.confirmDialog}>
                    <p className={classes.p}>Are you sure you want to delete this Teacher?</p>
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
                        onClick={() => handleDeleteTeacher(teacher.id)}
                      >
                        {isDeleting ? (
                          <>

                            Deleting...
                          </>
                        ) : (
                          "Yes"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Teachers);
