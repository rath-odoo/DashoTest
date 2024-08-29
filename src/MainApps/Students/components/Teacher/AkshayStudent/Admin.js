import React, { useState, useEffect } from 'react';
import classes from "./Admin.module.css";
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsTrash } from "react-icons/bs";
import { deleteAdmin, deleteTeacher, getCourseAdmins } from "../../../../../CommonApps/AllAPICalls";

function Admin(props) {
  const { selectedCourse , userData } = props;
  const [admins, setAdmins] = useState([]);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const deleterequest = (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteConfirm(true);
  };


  useEffect(() => {
    const fetchAdmins = async () => {
      if (selectedCourse && selectedCourse.length > 0) {
        try {
          const courseId = selectedCourse[0].id;
          const data = await getCourseAdmins(courseId);
          setAdmins(data);
        } catch (error) {
          console.error("Error fetching admins:", error);
        }
      }
    };

    fetchAdmins();
  }, [selectedCourse]);

  const handleDeleteAdmin = (teacherId) => {
    const courseId = selectedCourse[0].id;
    deleteAdmin(courseId, teacherId)
      .then(() => {
        props.rerender();  
      })
      .catch(error => {
      });
  };

  const isCreator = selectedCourse[0].creater.id ===  userData.id;
  const isAdmin = admins.some(admin => admin.id ===  userData.id);
  const canAdd = isCreator || isAdmin;

  return (
    <div>
      <div className={classes.addStudentDiv}></div>
      {admins.length > 0 ? (
        <div className={classes.container}>
          <div className={classes.parentContainer}>
            {admins.map((admin, index) => (
              <div className={classes.mainBox} key={index}>
                <div className={classes.picContainer}>
                  <img
                    alt="adminImage"
                    src={admin.profile_image}
                    className={classes.profilePic}
                  />
                </div>
                <div className={classes.rightContainer}>
                  <div className={classes.block1}>
                    <div className={classes.nameTitle}>Name :</div>
                    <div className={classes.userName}>{admin.firstname} {admin.lastname}</div>
                  </div>
                  <div className={classes.block3}>
                    <div className={classes.ExpTitle}>Username :</div>
                    <div className={classes.expYear}>{admin.username}</div>
                  </div>
                </div>
                {canAdd && (
                  <>
                    <button className={classes.deleteBtn} 
                    // onClick={() => handleDeleteAdmin(admin.id)}
                    onClick={() => deleterequest(admin.id)}
                    >
                    <BsTrash /></button>
                  </>
                )}

{showDeleteConfirm && studentToDelete === admin.id && (
            <div className={classes.overLay}>
              <div className={classes.confirmDialog}>
                <p className={classes.p}>Are you sure you want to remove this Admin?</p>
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
                    // onClick={() => handleRemoveStudent(teacher.id)}
                      onClick={() => handleDeleteAdmin(admin.id)}


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
        </div>
      ) : (
        <div className={classes.noAdmin}>No admins available</div>
      )}
    </div>
  );
}

export default Admin;
