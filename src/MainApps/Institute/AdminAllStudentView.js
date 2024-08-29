import React, { useState, useEffect } from 'react';
import classes from './AdminAllStudentView.module.css';
import User from './UserTwo';
import StudentAttendanceDetail from './MemberAttendanceDetails';
import { BsChevronDoubleLeft, BsChevronDoubleRight, BsCalendar } from 'react-icons/bs';
import { fetchAttendanceFilter } from '../../CommonApps/AllAPICalls';
import { FaFilter } from 'react-icons/fa';
import RollwiseView from './RollwiseView';
import { DateField } from './Forms/FormInputObjects';

const AdminAllStudent = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('regular'); // 'regular' or 'rollwise'
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate, page]);

  const fetchAttendanceData = () => {
    fetchAttendanceFilter(props.instituteId, selectedDate, selectedDate, page)
      .then(data => {
        setAttendance(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch(error => console.error(error));
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate.toISOString().split('T')[0]);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleUserClick = (memberId) => {
    setSelectedStudentId(memberId);
    setViewMode('details');
  };

  const handleBack = () => {
    setSelectedStudentId(null);
    setViewMode('regular');
  };

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  const handleDatePickerChange = (event) => {
    setSelectedDate(event.target.value);
    setPage(1);
  };

  return (
    <div className={classes.container}>

      <div className={classes.dailyCheckinDiv}>


      <div className={classes.approvalLabel}>Daily Check-In</div>
      <div className={classes.btnFilter}>
        <button
          onClick={() => handleViewChange('regular')}
          className={`${classes.acBtnFirst} ${viewMode === 'regular' ? classes.activeButton : ''}`}
        >
          Daily Attendance
        </button>

        <button
          onClick={() => handleViewChange('rollwise')}
          className={`${classes.acBtnSecond} ${viewMode === 'rollwise' ? classes.activeButton : ''}`}
        >
          Select Roll <FaFilter className={classes.fi} />
        </button>

      </div>

      </div>
      {viewMode === 'regular' ? (
        <>
          <div className={classes.dateNavigation}>
            <button onClick={() => handleDateChange(-1)} className={classes.dateButton}>
              <BsChevronDoubleLeft /> Previous Day
            </button>
            <span className={classes.selectedDate}>{selectedDate}</span>
            <button onClick={() => handleDateChange(1)} className={classes.dateButton}>
              Next Day <BsChevronDoubleRight />
            </button>
            <div className={classes.datePickerContainer}> <label htmlFor="datePicker" className={classes.calendarIcon}>

            </label>
              <input
                id="datePicker"
                type="date"
                value={selectedDate}
                onChange={handleDatePickerChange}
                className={classes.datePicker}
              /></div>

          </div>
          <div className={classes.attendanceList}>
            <div className={classes.parentClass}>
              <div className={classes.dateContainer2}>Date</div>
              <div className={classes.nameContainer3}>Name</div>
              <div className={classes.nameContainer}>In-Time</div>
              <div className={classes.nameContainer}>Out-Time</div>
              <div className={classes.nameContainer}>A/P</div>
              <div className={classes.rolwContainer}>Status</div>
            </div>
            {attendance.map((record, index) => (
              <User key={index} attendance={record} isAdmin={true} onUserClick={() => handleUserClick(record.member.id)} />
            ))}
          </div>
          <div className={classes.pagination}>
            <BsChevronDoubleLeft
              className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled}
              onClick={handlePreviousPage}
            />
            <span className={classes.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
            <BsChevronDoubleRight
              className={page < totalPages ? classes.arrowIcon : classes.arrowIconDisabled}
              onClick={handleNextPage}
            />
          </div>
        </>
      ) : viewMode === 'details' ? (
        <StudentAttendanceDetail instituteId={props.instituteId} memberId={selectedStudentId} onBack={handleBack} />
      ) : viewMode === 'rollwise' ? (
        <RollwiseView instituteId={props.instituteId} onBack={() => handleViewChange('regular')} />
      ) : null

      }
    </div>
  );
};

export default AdminAllStudent;
