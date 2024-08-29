import React, { useEffect, useState } from 'react';
import classes from './StdAttendanceView.module.css';
import { BsArrowLeft } from 'react-icons/bs';
import { fetchAttendance } from '../../CommonApps/AllAPICalls'; 
import { CircularProgress } from '@material-ui/core';

function App(props) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const memberId = props.student.member.id;
    const batchId = props.batchId;

    fetchAttendance(memberId, batchId)
      .then((data) => {
        const attendanceData = data.results.map((item) => ({
          id: item.id,
          name: `${item.member.firstname} ${item.member.lastname}`,
          status: item.status,
          date: item.attendance_date,
          profile_image: item.member.profile_image,
        }));
        setAttendance(attendanceData);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching attendance:', error);
        setLoading(false); // Stop loading even if there is an error
      });
  }, [props.student.member.id, props.batchId]);

  const getStatusClass = (status) => {
    if (status === 'na') {
      return classes.notavailable;
    } else if (status === 'absent') {
      return classes.absent;
    } else if (status === 'present') {
      return classes.present;
    } else {
      return '';
    }
  };

  return (
    <div className={classes.Profile}>
      <div className={classes.profileInner}>
        <button className={classes.gobackBtn} onClick={props.onBack}>
          <BsArrowLeft />
        </button>
        <div className={classes.heading}>
          <h2>Attendance Details</h2>
        </div>
        <div className={classes.percentage}>Student Name: {props.student.member.firstname} {props.student.member.lastname}</div>
        <div className={classes.attendanceList}>
          {loading ? (
            <div className={classes.loadingContainer}>
              <CircularProgress /> 
            </div>
          ) : attendance.length === 0 ? (
            <div className={classes.noData}>
              Attendance not available
            </div>
          ) : (
            <div className={classes.div}>
              {attendance.map((student) => (
                <div className={classes.userBox} key={student.id}>
                  <img src={student.profile_image} className={classes.userImage} alt="User" />
                  <div className={classes.nameInfo}>
                    <div className={classes.name}>{student.name}</div>
                    <div className={classes.dateDiv}>{student.date}</div>
                  </div>
                  <div className={classes.btnAddStudentContainer}>
                    <div className={`${classes.apprAndRej} ${getStatusClass(student.status)}`}>
                      {student.status === "present" &&
                        <div className={classes.present}>
                          <span className={classes.pstyle}> P </span>
                        </div>
                      }
                      {student.status === "absent" &&
                        <div className={classes.absent}>
                          <span className={classes.astyle}> A </span>
                        </div>
                      }

                      {student.status === "na" &&
                        <div className={classes.notavailable}>
                          <span className={classes.nastyle}> na </span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
