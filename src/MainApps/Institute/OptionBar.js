import React, { useState, useEffect } from 'react';
import classes from './OptionBar.module.css';
import { BsArrowLeft } from 'react-icons/bs';

import People from './BatchPeople';
import Courses from './BatchCourses';
import Attendance from './BatchAttendance';
import Grade from './BatchGrade';
import Notice from './BatchNotices';
import { fetchBatchDetails } from '../../CommonApps/AllAPICalls';

function OptionBar(props) {
  const [batchDetails, setBatchDetails] = useState(null);
  const [error, setError] = useState(null);

  const [showPeople, setShowPeople] = useState(false);
  const [showCourses, setShowCourses] = useState(true);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showGrade, setShowGrade] = useState(false);
  const [showNotice, setShowNotice] = useState(false);


  const fetchDetails = () => {
    fetchBatchDetails(props.batch.id)
      .then(data => setBatchDetails(data))
      .catch(error => setError(error));
  };

  useEffect(() => {
    fetchDetails();
  }, [props.batch.id]);


  const handleBack = () => {
    props.onBack();
  };

  const handleComponentChange = (component) => {
    setShowCourses(component === 'Courses');
    setShowPeople(component === 'People');
    setShowAttendance(component === 'Attendance');
    setShowGrade(component === 'Grade');
    setShowNotice(component === 'Notice');
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!batchDetails) {
    return <div>Loading...</div>;
  }

  console.log("batch details from the option bar", batchDetails);

  return (
    <div className={classes.Profile}>
      <div className={classes.profileInner}>
        <div className={classes.nameHeading}>Batch Name: {batchDetails[0].name}</div>
        <div className={classes.optionsOuter}>
          <button className={classes.gobackBtn} onClick={handleBack}>
            <BsArrowLeft />
          </button>
          <div className={classes.fourOption}>

            <div className={classes.divPeople}>
              <button
                className={`${classes.button} ${showCourses ? classes.active : ''}`}
                onClick={() => handleComponentChange('Courses')}
              >
                Courses
              </button>
            </div>
            <div>
              <button
                className={`${classes.button} ${showPeople ? classes.active : ''}`}
                onClick={() => handleComponentChange('People')}
              >
                People
              </button>
            </div>
            <div>
              <button
                className={`${classes.button} ${showAttendance ? classes.active : ''}`}
                onClick={() => handleComponentChange('Attendance')}
              >
                Attendance
              </button>
            </div>

            <div>
              <button
                className={`${classes.button} ${showNotice ? classes.active : ''}`}
                onClick={() => handleComponentChange('Notice')}
              >
                Exams
              </button>
            </div>
            <div>
              <button
                className={`${classes.button} ${showGrade ? classes.active : ''}`}
                onClick={() => handleComponentChange('Grade')}
              >
                Grade
              </button>
            </div>
          </div>
        </div>
        <div className={classes.componentContainer}>
          {showCourses && <Courses {...props} batchDetails={batchDetails[0]} fetchDetails={fetchDetails} />}
          {showPeople && <People {...props} batchDetails={batchDetails[0]} />}
          {showGrade && <Grade {...props} batchDetails={batchDetails[0]} />}
          {showAttendance && <Attendance {...props} batchDetails={batchDetails[0]} />}

          {showNotice && <Notice {...props} batchDetails={batchDetails[0]} />}
        </div>
      </div>
    </div>
  );
}

export default OptionBar;
