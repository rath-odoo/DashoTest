import React, { useEffect, useState } from 'react';
import classes from './GradeDetails.module.css';
import { fetchStudentGrades } from '../../CommonApps/AllAPICalls';

const GradeDetails = ({ batchId, student, course, onClose }) => {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentGrades(batchId, student.id, course.id)
      .then(results => {
        setGrades(results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching grades:', error);
        setLoading(false);
      });
  }, [batchId, student.id, course.id]);

  console.log(course);

  return (
    <div className={classes.gradeBlock}>
      <div className={classes.warningBlock}>

        <div>
           <button className={classes.closebtn} onClick={onClose}>×</button>
        </div>
        <h2>Batch Name: {batchId}</h2>
        <h3> {student.firstname} {student.lastname}</h3>

        <p><strong></strong> {course.courseShortName} {course.courseGlobalCode}</p>

        <h3>Grade Details for {student.firstname} {student.lastname}</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          grades.length > 0 ? (
            grades.map(grade => (
              <div key={grade.course.id} className={classes.gradeentry}>
                <p><strong>Exam Name:</strong> {grade.name}</p>
                <p><strong>Grade:</strong> {grade.grade_value}</p>
                <p><strong>Remarks:</strong> {grade.comments}</p>
              </div>
            ))
          ) : (
            <p>No grades available for this course.</p>
          )
        )}
      </div>
    </div>
  );
};

export default GradeDetails;
