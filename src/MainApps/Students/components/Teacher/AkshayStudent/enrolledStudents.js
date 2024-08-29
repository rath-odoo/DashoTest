import React, { useEffect, useState } from 'react';
import User from './User';
import { fetchEnrolledStudents, getCourseAdmins } from '../../../../../CommonApps/AllAPICalls';
// import { fetchEnrolledStudents } from '../../../../../CommonApps/AllAPICalls';

function EnrolledStudents(props) {
  const { selectedCourse , userData } = props;
  const [enrolledStudents, setEnrolledStudents] = useState([]);

 
  useEffect(() => {
    if (selectedCourse && selectedCourse.length > 0) {
      const courseId = selectedCourse[0].id;
      fetchEnrolledStudents(courseId)
        .then(data => {
          if (data.results && data.results.members) {
            setEnrolledStudents(data.results.members);
          }
        })
        .catch(error => {
          console.error('Error fetching enrolled students:', error);
        });
    }
  }, [props , selectedCourse]);

  // console.log("props enrolled student" ,enrolledStudents);

  return (
    <div>
      <h3>Enrolled Students</h3>
      {enrolledStudents.length > 0 ? (
        <User enrolledStudents={enrolledStudents} selectedCourse={props.selectedCourse} userData={props.userData} rerender={props.rerender}/>
      ) : (
        <div>No enrolled students</div>
      )}
    </div>
  );
}

export default EnrolledStudents;
