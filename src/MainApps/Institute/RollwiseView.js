import React, { useState, useEffect } from 'react'; 
import classes from './AdminAllStudentView.module.css';
import User from './UserTwo';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { fetchAttendanceFilter2, fetchInstituteMembers } from '../../CommonApps/AllAPICalls';

const AdminAllStudent = (props) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userType, setUserType] = useState(''); 

  useEffect(() => {
    fetchInstituteMembers(props.instituteId, userType)
      .then(data => setStudents(data))
      .catch(error => console.error(error));
  }, [props.instituteId, userType]);  

  useEffect(() => {
    if (selectedStudent) {
      fetchAttendanceData();
    }
  }, [selectedStudent, page, startDate, endDate]);

  const fetchAttendanceData = () => {
    fetchAttendanceFilter2(props.instituteId, selectedStudent.user_id, startDate, endDate, page)
      .then(data => {
        setAttendance(data.results);
        setTotalPages(Math.ceil(data.count / 10));  
      })
      .catch(error => console.error(error));
  };

  const handleStudentChange = (event) => {
    const userId = event.target.value;
    const student = students.find(student => student.user_id === parseInt(userId));
    setSelectedStudent(student);
    setPage(1); 
  };

  const handleDateChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setSelectedStudent(null);
    setAttendance([]);
    setPage(1);
    setTotalPages(1);
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

  return (
    <div className={classes.container}>
      <div className={classes.filterContainer}>
        <div className={classes.divfirst}> 
        <label className={classes.selectRole}><span className={classes.span3}>*</span>Select Role</label>
        <select onChange={handleUserTypeChange} className={classes.dropdown}>
        <option  className={classes.all} value="">All</option>

          <option className={classes.all} value="Student">Student</option>
          <option className={classes.all} value="Staff">Staff</option>
          <option className={classes.all} value="Admin">Admin</option>
          <option className={classes.all} value="Owner">Owner</option>
          <option className={classes.all} value="Teacher">Teacher</option>
        </select>
        </div>
        
        <div className={classes.divfirst}> 
        <label className={classes.selectRole}><span className={classes.span3}>*</span>Select Member</label>
        
        <select onChange={handleStudentChange} className={classes.dropdown}>
          <option value="">Select {userType}</option>
          {students.map(student => (
            <option key={student.user_id} value={student.user_id}>
              {student.firstname} {student.lastname}
            </option>
          ))}
        </select>
        </div>


         <div className={classes.divfirst}> 
        <label className={classes.selectRole}>Start Date</label>

        <input type="date" name="startDate" value={startDate} onChange={handleDateChange} className={classes.dateInput} />
        </div>

        <div className={classes.divfirst}> 
        <label className={classes.selectRole}>End Date</label>

        <input type="date" name="endDate" value={endDate} onChange={handleDateChange} className={classes.dateInput} />
        </div>


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
          <User key={index} attendance={record} isAdmin={true} />
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

export default AdminAllStudent;
 