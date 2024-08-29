import classes from "./Course_details.module.css";
import { useState, useEffect, useRef } from 'react';
import Single_course_View from "./Single_course_View";
import InvoiceFormat from "./invoiceFormat";
import Logo from "../../CommonApps/Logo";
import { TextInput } from "../../CommonApps/FormInputObjects";
import { getAdminCourse, getCourses, getoneinstitutedetail, linkCourse } from "../../CommonApps/AllAPICalls";
import { BiUnlink } from "react-icons/bi";

const Course_details = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  const [showWarning, setShowWarning] = useState(false);
  const [adminCourse, getadminCourse] = useState([]);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [courses, setCourses] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [oneInstituteDetail, getOneInstituteDetail] = useState(null);
  const [submitState, setSubmitState] = useState("notSubmitting");
  const [loadingState, setLoadingState] = useState("loading"); // loading, loaded, error

  const applyLeaveHandler = () => {
    setShowWarning(true);
    setSubmitState("notSubmitting");
    setSelectedCourseIds([]);
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
  };

  const linkCourseHandler = (e) => {
    e.preventDefault();
  
    if (selectedCourseIds.length === 0) {
      alert("Please select at least one course to link.");
      return;
    }
  
    setSubmitState("submitting");
    const userId = props.userData.id;
    const instituteId = props.selectedInstitute.id;
  
    linkCourse(selectedCourseIds, userId, instituteId, props, setSubmitState)
      .then(() => {
        setShowWarning(false);
        setSubmitState("submitted");
      })
      .catch((error) => {
        setShowWarning(false);
        props.rerender();
        setSubmitState("notSubmitting");
      });
  };

  useEffect(() => {
    const fetchCourses = async () => {
      setLoadingState("loading");
      try {
        const instituteid = props.selectedInstitute.id;
        const data = await getCourses(instituteid, props);
        setCourses(data.courses);
        setLoadingState("loaded");
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoadingState("error");
      }
    };

    fetchCourses();
  }, [rerender, props.selectedInstitute.id, props]);

  useEffect(() => {
    let instituteId = localStorage.getItem('selectedInstituteId');
    getoneinstitutedetail({ instituteId, getOneInstituteDetail });
  }, [rerender]);

  useEffect(() => {
    getAdminCourse({ getadminCourse });
  }, [rerender, props]);

  const handleCheckboxChange = (courseId) => {
    setSelectedCourseIds((prevSelectedCourseIds) =>
      prevSelectedCourseIds.includes(courseId)
        ? prevSelectedCourseIds.filter(id => id !== courseId)
        : [...prevSelectedCourseIds, courseId]
    );
  };

  const reloadCourses = async () => {
    const instituteId = props.selectedInstitute.id;
    try {
      const data = await getCourses(instituteId, props);
      setCourses(data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  console.log("adminCourse",adminCourse);

  return (
    <div className={classes.parentClassmain}>
      {showWarning && (
        <div className={classes.overlay}>
          <div className={classes.warningBlock}>
            <div>
              <button className={classes.closeBtn} onClick={closeWarningHandler}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
              </button>
            </div>
            <div className={classes.logo}>
              <Logo />
            </div>
            <div className={classes.heading}>
              Link Course
            </div>
            {/* <form className={classes.forml} >
              <div className={classes.LeaveReasonConatainer}>
                <div className={classes.course}><span className={classes.redStar}>*</span>Course ID</div>
                <div className={classes.selectContainer}>
                  {adminCourse
                    .filter(course => !courses.find(linkedCourse => linkedCourse.course_id === course.id))
                    .map(course => (
                      <div key={course.id} className={classes.innerInput}>
                        <label className={classes.label}>
                          <input
                            type="checkbox"
                            value={course.id}
                            onChange={() => handleCheckboxChange(course.id)}
                            className={classes.checkBoxDiv}
                          />
                          {course.id}, {course.courseShortName}
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </form> */}

            <form className={classes.formContainer}>
          <div className={classes.LeaveReasonConatainer}>
            <div className={classes.course}>
              <span className={classes.redStar}>*</span>Select Courses
            </div>

            <div className={classes.checkboxContainer}>
            {adminCourse
                    .filter(course => !courses.find(linkedCourse => linkedCourse.course_id === course.id))
                    .map(course => (
                      <div key={course.id} className={classes.innerInput}>
                        <label className={classes.label}>
                          <input
                            type="checkbox"
                            value={course.id}
                            onChange={() => handleCheckboxChange(course.id)}
                            className={classes.checkBoxDiv}
                          />
                          {course.id}, {course.courseShortName}
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
              <button className={classes.submitBtn} type="submit"onClick={linkCourseHandler}>
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
{/* 
            <div className={classes.submitContainer}>
              {submitState === "submitting" && (
                <button className={classes.submitBtn} type="submit" disabled>
                  Submitting...
                </button>
              )}

              {submitState === "notSubmitting" && (
                <button className={classes.submitBtn} type="submit" onClick={linkCourseHandler}>
                  Submit
                </button>
              )}

              {submitState === "submitted" && (
                <button className={classes.submitBtn} type="submit" disabled>
                  Submitted
                </button>
              )}
            </div> */} 
          </div>
        </div>
      )}

      <div className={classes.topNavigationBar}>
        {props.isAdminOrOwner && (
          <button className={classes.schedule} onClick={applyLeaveHandler}>Link Course</button>
        )}
        <button className={classes.showSummary}>Show Summary</button>
      </div>

      <div className={classes.parentClass}>
        <div className={classes.name}>Course Name</div>
        <div className={classes.courseId}>Course Id</div>
        <div className={classes.startdate}>Class</div>
        <div className={classes.status}>Status</div>
        {props.isAdminOrOwner && (
          <div className={classes.sr}>Delink</div>
        )}
      </div>

      <div className={classes.scrollContent}>
        {loadingState === "loading" && <div className={classes.div}>Loading courses...</div>}
        {loadingState === "error" && <div>Error loading courses. Please try again.</div>}
        {loadingState === "loaded" && (
          courses.map((course, index) => (
            <Single_course_View key={index} courseId={course.course_id}
              selectedInstitute={oneInstituteDetail}
              course={course}
              userData={props.userData}
              isAdminOrOwner={props.isAdminOrOwner}
              onDelink={reloadCourses}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Course_details;
