import React, { useState } from 'react';
import classes from "./SingleUserAttendance.module.css";
import SingleStdAttendance from './StdAttendanceView';
import { markAttendance } from '../../CommonApps/AllAPICalls';
import { CircularProgress } from '@material-ui/core';

const SingleUserAttendance = ({ student, userId, batchId, rerender }) => {
  const [showPeopleProfile, setShowPeopleProfile] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleClick = () => {
    setShowPeopleProfile(true);
  };

  const handleBackFromPeopleDetails = () => {
    setShowPeopleProfile(false);
  };

  const handleAttendanceClick = (status) => {
    setLoading(true); // Set loading to true when marking attendance

    const attendanceData = {
      status,
      in_time: student.in_time || null,
      out_time: student.out_time || null,
      remarks: student.remarks || '',
    };

    markAttendance(userId, batchId, student.id, attendanceData, rerender)
      .then((data) => {
        console.log('Attendance marked successfully:', data);
      })
      .catch((error) => {
        console.error('Error marking attendance:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API call
      });
  };

  return (
    <>
      {!showPeopleProfile && (
        <div className={classes.parentDiv}>
          <button className={classes.parentClass}>
            <div className={classes.userContainer} onClick={handleClick}>
              <div className={classes.namenimagediv}>
                <img src={student.member.profile_image || 'default-image-url'} className={classes.pic} alt="User" />
                <div className={classes.nameContainer}>{student.member.firstname} {student.member.lastname}</div>
              </div>
            </div>
            <div className={classes.rolwContainer}>
              {student.status === "present" &&
                <div className={classes.present}>
                  <span className={classes.pstyle}>P</span>
                </div>
              }
              {student.status === "absent" &&
                <div className={classes.absent}>
                  <span className={classes.astyle}>A</span>
                </div>
              }
              {student.status === "na" &&
                <div className={classes.notavailable}>
                  <span className={classes.nastyle}>na</span>
                </div>
              }
            </div>
            <div className={classes.statusContainer}>
              <div className={classes.apprAndRej}> 
                {loading ? (
                  <div className={classes.loadingSpinner}>    <CircularProgress size={18}/> </div>
                ) : (
                  <>
                    <button className={classes.approveButton} onClick={() => handleAttendanceClick('present')}>Present</button>
                    <button className={classes.rejectButton} onClick={() => handleAttendanceClick('absent')}>Absent</button>
                  </>
                )}
              </div>
            </div>
          </button>
        </div>
      )}

      {showPeopleProfile && (
        <SingleStdAttendance
          onBack={handleBackFromPeopleDetails}
          student={student}
          batchId={batchId}
        />
      )}
    </>
  );
};

export default SingleUserAttendance;
