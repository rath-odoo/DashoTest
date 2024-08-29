import React, { useEffect, useState } from 'react';
import classes from './LinkCourseBatch.module.css';
import Logo from '../../CommonApps/Logo';
import BatchCourseSingle from './BatchCourseSingle';
import { getAdminCourse, linkCoursesToBatch } from '../../CommonApps/AllAPICalls';
import { OptionField, OptionFieldSecondaryObjs, OptionFieldSubmitValue } from '../Dashboard/General/components/Teacher/Forms/FormInputObjects';

function LinkCourseBatch(props) {
  console.log("from Batch Courses", props);

  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [adminCourse, getadminCourse] = useState([]);
  const [submitState, setSubmitState] = useState("notSubmitting");
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getAdminCourse({ getadminCourse });

    // Comment out initial selected course setting
    // const initialSelectedCourseIds = props.batchTwo.courses.map(course => course.id);
    // setSelectedCourseIds(initialSelectedCourseIds);
  }, [rerender, props]);

  console.log("adminCourse ", adminCourse);


  const linkCoursesHandler = () => {
    if (selectedCourseIds.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    setSubmitState("submitting");

    const batchId = props.batchTwo.id;
    const userId = props.userData.id;

    linkCoursesToBatch(batchId, userId, selectedCourseIds, props)
      .then(() => {
        setSubmitState("submitted");
        props.onBack();
      })
      .catch(error => {
        setSubmitState("notSubmitting"); 
        console.error("Error linking courses:", error);
      });
  };

  const toggleCourseSelection = (courseId) => {
    if (selectedCourseIds.includes(courseId)) {
      setSelectedCourseIds(selectedCourseIds.filter(id => id !== courseId));
    } else {
      setSelectedCourseIds([...selectedCourseIds, courseId]);
    }
  };

  // Filter out initially selected courses from adminCourse list
  const initialSelectedCourseIds = props.batchTwo.courses.map(course => course.id);
  const filteredAdminCourses = adminCourse.filter(course => !initialSelectedCourseIds.includes(course.id));

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
        <div className={classes.heading}>Link Courses to Batch</div>

        <form className={classes.formContainer}>
          <div className={classes.LeaveReasonConatainer}>
            <div className={classes.course}>
              <span className={classes.redStar}>*</span>Select Courses
            </div>

            <div className={classes.checkboxContainer}>
              {filteredAdminCourses.map(course => (
                <div key={course.id} className={classes.checkboxItem}>
                  <input
                    className={classes.checkBoxDiv}
                    type="checkbox"
                    id={course.id}
                    value={course.id}
                    checked={selectedCourseIds.includes(course.id)}
                    onChange={() => toggleCourseSelection(course.id)}
                  />
                  <label htmlFor={course.id}>
                    {course.courseShortName} ({course.courseGlobalCode})
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={classes.submitContainer}>
            {submitState === "submitting" && (
              <button className={classes.submitBtn} type="button" disabled>
                Submitting...
              </button>
            )}

            {submitState === "notSubmitting" && (
              <button className={classes.submitBtn} type="button" onClick={linkCoursesHandler}>
                Submit
              </button>
            )}

            {submitState === "submitted" && (
              <button className={classes.submitBtn} type="button" disabled>
                Submitted
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LinkCourseBatch;
