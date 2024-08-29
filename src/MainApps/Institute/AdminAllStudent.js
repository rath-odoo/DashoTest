import React, { useState, useEffect } from 'react';
import classes from './AdminAllStudentView.module.css';
import User from './UserTwo';
import StudentAttendanceDetail from './MemberAttenanceDetails';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { fetchAttendanceFilter } from '../../CommonApps/AllAPICalls';
import { FaFilter } from 'react-icons/fa';

const AdminAllStudent = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAttendance, setShowAttendance] = useState(true);
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
    setPage(1); // Reset to the first page when changing dates
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
    setShowAttendance(false);
    console.log("jjj" , memberId);
  };

  const handleBack = () => {
    setSelectedStudentId(null);
    setShowAttendance(true);
  };

  return (
    <div className={classes.container}>
      <div className={classes.approvalLabel}>Check-In Check-Out</div>
      <div className={classes.btnFilter}><button className={classes.acBtn}>filter <FaFilter /></button></div>
      {showAttendance ? (
        <>
          <div className={classes.dateNavigation}>
            <button onClick={() => handleDateChange(-1)} className={classes.dateButton}>
              <BsChevronDoubleLeft /> Previous Day
            </button>
            <span className={classes.selectedDate}>{selectedDate}</span>
            <button onClick={() => handleDateChange(1)} className={classes.dateButton}>
              Next Day <BsChevronDoubleRight />
            </button>
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
            <BsChevronDoubleLeft className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handlePreviousPage} />
            <span className={classes.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
            <BsChevronDoubleRight className={page < totalPages ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handleNextPage} />
          </div>
        </>
      ) : (
        <StudentAttendanceDetail instituteId={props.instituteId} memberId={selectedStudentId} onBack={handleBack} />
      )}
    </div>
  );
};

export default AdminAllStudent;
