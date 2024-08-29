import React, { useEffect, useState } from 'react';
import User from './userR';
import { fetchRequestedStudents } from '../../../../../CommonApps/AllAPICalls';

function RequestedStudents(props) {
  const { selectedCourse, userData } = props;
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [approveState, setApproveState] = useState("notLoading");

  useEffect(() => {
    if (selectedCourse && selectedCourse.length > 0) {
      const courseId = selectedCourse[0].id;
      fetchRequestedStudents(courseId)
        .then(data => {
          setEnrolledStudents(data.results.course.enrolement_requests);
        })
        .catch(error => {
          console.error('Error fetching enrolled students:', error);
        });
    }
  }, [props, selectedCourse]);

  const rerender = () => {
    const courseId = selectedCourse[0].id;
    fetchRequestedStudents(courseId)
      .then(data => {
        setEnrolledStudents(data.results.course.enrolement_requests);
      })
      .catch(error => {
        console.error('Error fetching enrolled students:', error);
      });
  };

  return (
    <div>
      <h3>Requested Students</h3>
      <User
        enrolledStudents={enrolledStudents}
        selectedCourse={selectedCourse}
        rerender={rerender}
        setApproveState={setApproveState}
        userData={userData}
      />
    </div>
  );
}

export default RequestedStudents;
