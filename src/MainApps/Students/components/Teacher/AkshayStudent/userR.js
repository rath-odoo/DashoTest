import React, { useEffect, useState } from 'react';
import classes from "./User.module.css";
import { FiCopy } from "react-icons/fi";
import Poster from "./men.png";
import { putcourseenroll, courseenrollrequestreject, getCourseAdmins } from '../../../../../CommonApps/AllAPICalls';

function User(props) {

  // const { selectedCourse, userData, enrolledStudents, setApproveState } = props;

 

  const [admins, setAdmins] = useState([]);
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
  }, []);


  console.log("props from user Request ",props);
  console.log("creater id ",props.selectedCourse[0].creater.id);
  console.log("UserId ",props.userData.id);


  const handleApprove = (student) => {
    props.setApproveState("loading");
    putcourseenroll({
      courseId: props.selectedCourse[0].id,
      requesterId: student.id,
      setApproveState: props.setApproveState,
      props: props
    });
  };

  const handleReject = (student) => {
    props.setApproveState("loading");
    courseenrollrequestreject({
      courseId: props.selectedCourse[0].id,
      requesterId: student.id,
      setApproveState: props.setApproveState,
      props: props
    });
  };

  const isCreator = props.selectedCourse[0].creater.id === props.userData.id;
  const isAdmin = admins.some(admin => admin.id === props.userData.id);
  const canApproveReject = isCreator || isAdmin;

  return (
    <div className={classes.mainCOntainer}>
      {props.enrolledStudents.map((student, index) => (
        <div className={classes.userMainDiv} key={index}>
          <div className={classes.imageContainer}>
            <img
              className={classes.image}
              src={student.profile_image || Poster}
              alt="Profile"
            />
          </div>
          <div className={classes.userName}>
            {student.firstname} {student.lastname}
          </div>

          {canApproveReject && (
            <div className={classes.apprAndRej}>
              <button
                className={classes.approveButton}
                onClick={() => handleApprove(student)}
                disabled={props.approveState === "loading"}
              >
                Approve
              </button>
              <button
                className={classes.rejectButton}
                onClick={() => handleReject(student)}
                disabled={props.approveState === "loading"}
              >
                Reject
              </button>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default User;
