import React, { useEffect, useState } from 'react';
import classes from './AddGradeForm.module.css';
import Logo from '../../CommonApps/Logo';
import { addGradetoBatches, fetchEnrolledStudentsform } from '../../CommonApps/AllAPICalls'; 

function AddGradeForm(props) {
  const [courseId, setCourseId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  const [comments, setComments] = useState('');
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [examName, setExamName] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchEnrolledStudentsform(courseId)
        .then(data => {
          if (data.results && data.results.members) {
            setEnrolledStudents(data.results.members);
          }
        })
        .catch(error => {
          console.error('Error fetching enrolled students:', error);
        });
    }
  }, [courseId]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const gradeData = {
      name: examName,
      institute: props.selectedInstitute.id,
      course: courseId,
      batch: props.batchDetails.id,
      student: studentId,
      grade_value: gradeValue,
      comments: comments,
      added_by: props.userData.id
    };
    console.log("this is grade data ", gradeData);
    addGradetoBatches(props.userData.id, props.batchDetails.id, gradeData , props)
     
  };

  console.log(props);
  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div>
          <button className={classes.closeBtn} onClick={props.onBack}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              className="CreateCourseForm_closeButtonIcon__3mLN8"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
            </svg>
          </button>
        </div>

        <div className={classes.logo}>
          <Logo />
        </div>
        <div className={classes.heading}>Add Grade to Batch Course</div>

        <form onSubmit={handleSubmit}>
          <div className={classes.LeaveReasonConatainer}>
            <div className={classes.divSecond}>
              <div className={classes.course}>
                <span className={classes.redStar}>*</span>Select Course
              </div>
              <div className={classes.dropdownContainer}>
                <select
                  className={classes.dropdown}
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  required
                >
                  <option value="">Select a course</option>
                  {props.batchDetails.courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.courseShortName} ({course.courseGlobalCode})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={classes.divSecond}>
              <div className={classes.course}>
                <span className={classes.redStar}>*</span>Select Enrolled Student for selected Course
              </div>
              <div className={classes.dropdownContainer}>
                <select
                  className={classes.dropdown}
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                >
                  <option value="">Select a member</option>
                  {enrolledStudents.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.firstname} {member.lastname} ({member.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>
                <span className={classes.redStar}>*</span>Grade
              </label>
              <input
                className={classes.input}
                type="text"
                name="grade_value"
                value={gradeValue}
                onChange={(e) => setGradeValue(e.target.value)}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>
                <span className={classes.redStar}>*</span>Remarks
              </label>
              <input
                className={classes.input}
                type="text"
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>

            <div className={classes.formGroup}>
              <label className={classes.label}>
                <span className={classes.redStar}>*</span>Exam Name
              </label>
              <input
                className={classes.input}
                type="text"
                name="exam_name"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={classes.submitContainer}>
            <button className={classes.submitBtn} type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGradeForm;
