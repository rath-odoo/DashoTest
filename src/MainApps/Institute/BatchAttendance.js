import React, { useState, useEffect } from 'react';
import classes from './BatchAttendance.module.css';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import SingleUserAttendance from './SingleUserAttendance';
import { fetchBatchAttendance, fetchBatchStudentsAttendance } from '../../CommonApps/AllAPICalls';
import SingleStudentrAttendance from './SingleStudentrAttendance';

const BatchAttendance = (props) => {
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);
  const [studentsAtt, setStudentsAtt] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [totalPages, setTotalPages] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const batchId = props.batchDetails.id;

  const fetchData = () => {
    setLoading(true); 
    fetchBatchAttendance(batchId, date, page)
      .then(data => {
        setAttendance(data.results);
        setHasNextPage(data.next !== null);
        setHasPreviousPage(data.previous !== null);
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false); 
      });
  };

  useEffect(() => {
    fetchData();
  }, [date, page, batchId , props]);

  useEffect(() => {
    const memberId = props.userData.id;

    fetchBatchStudentsAttendance({ batchId, memberId, setStudentsAtt, page })
      .then(() => {
        console.log('Attendance data fetched successfully');
      })
      .catch(error => {
        console.error('Error fetching attendance:', error);
      });
  }, [batchId, props, page]);

  const handleDateChange = (direction) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + direction);
    setSelectedDate(newDate.toISOString().split('T')[0]);
    setDate(newDate);
  };

  const handleDatePickerChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(event.target.value); 
    setDate(newDate);  
    setPage(1); 
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  console.log("attendance", attendance);
  return (
    <div>
      {props.isAdminOrOwner && (
        <div className={classes.timeLine}>
          Showing Attendance on
          <i className={classes.infoText_i}>
            <button type="button" className={classes.navButton} onClick={() => handleDateChange(-1)}>
              <BsChevronDoubleLeft />
            </button>
            <span className={classes.dateText}>{selectedDate}</span>
            <button type="button" className={classes.navButton} onClick={() => handleDateChange(1)}>
              <BsChevronDoubleRight />
            </button>
            <div className={classes.datePickerContainer}>
              <label htmlFor="datePicker" className={classes.calendarIcon}></label>
              <input
                id="datePicker"
                type="date"
                value={selectedDate}
                onChange={handleDatePickerChange}
                className={classes.datePicker}
              />
            </div>
          </i>
        </div>
      )}

      <div className={classes.pagination}>
        <div className={classes.paginationDiv}>
          <button
            type="button"
            className={classes.navButton}
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPreviousPage}
          >
            <BsChevronDoubleLeft /> Previous
          </button>
        </div>
        <div className={classes.paginationDiv1}>
          <button
            type="button"
            className={classes.navButton}
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage}
          >
            Next <BsChevronDoubleRight />
          </button>
        </div>
      </div>

      <div className={classes.parentClass}>
        {!props.isAdminOrOwner && <div className={classes.dateContainermain}>Date</div>}
        <div className={classes.nameContainer}>Name</div>
        <div className={classes.rolwContainer}>Status</div>
        {props.isAdminOrOwner && <div className={classes.statusContainer}>Mark</div>}
      </div>

      {attendance.length === 0 ? (
        <div className={classes.noDataMessage}>No attendance data available.</div>  
      ) : (
        <div className={classes.scrollContent}>
          {props.isAdminOrOwner ? (
            attendance.map(student => (
              <SingleUserAttendance
                key={student.id}
                student={student}
                userId={props.userData.id}
                batchId={props.batchDetails.id}
                rerender={props.rerender}
              />
            ))
          ) : (
            studentsAtt.map(student => (
              <SingleStudentrAttendance
                key={student.id}
                student={student}
                userId={props.userData.id}
                batchId={props.batchDetails.id}
                rerender={props.rerender}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BatchAttendance;
