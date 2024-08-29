import React, { useState, useEffect } from 'react';
import classes from './MemberAttendanceDetails.module.css';
import { fetchAttendanceFilter } from '../../CommonApps/AllAPICalls';
import { BsArrowLeft, BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';

const MemberAttendanceDetails = ({ instituteId, memberId, onBack }) => {
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAttendanceData();
  }, [page]);

  const fetchAttendanceData = () => {
    fetchAttendanceFilter(instituteId, '', '', page, memberId)
      .then(data => {
        setAttendance(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch(error => console.error(error));
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

  const getStatusClass = (status) => {
    if (status === 'pending') return classes.pending;
    if (status === 'approved') return classes.approved;
    if (status === 'rejected') return classes.rejected;
    return '';
  };

  return (
    <div className={classes.container}>
      <button onClick={onBack} className={classes.backButton}><BsArrowLeft /></button>
      <div className={classes.attendanceList}>
        <div className={classes.parentClass}>
          <div className={classes.dateContainer2}>Date</div>
          <div className={classes.nameContainer3}>Name</div>
          <div className={classes.nameContainer}>In-Time</div>
          <div className={classes.nameContainer}>Out-Time</div>
          <div className={classes.nameContainer}>A/P</div>
          <div className={classes.rolwContainer}>Status</div>
          <div className={classes.statusContainer}></div>
        </div>
        {attendance.map((record, index) => (
          <div key={index} className={classes.mainData}>
            <div className={classes.name}>{record.attendance_date}</div>
            <div className={classes.name}>
              <img alt='a' src={record.member.profile_image} className={classes.imgContainer} />
              <div className={classes.dte}>{record.member.firstname} {record.member.lastname}</div>
            </div>
            <div className={classes.c}>{record.in_time}</div>
            <div className={classes.c}>{record.out_time}</div>
            <div className={classes.c}>{record.status}</div>
            <div className={`${classes.c} ${getStatusClass(record.approver_status)}`}>
              {record.approver_status}
            </div>
          </div>
        ))}
      </div>
      <div className={classes.pagination}>
        <BsChevronDoubleLeft className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handlePreviousPage} />
        <span className={classes.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
        <BsChevronDoubleRight className={page < totalPages ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handleNextPage} />
      </div>
    </div>
  );
};

export default MemberAttendanceDetails;
