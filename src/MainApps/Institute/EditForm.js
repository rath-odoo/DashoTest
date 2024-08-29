import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./EditExamBatched.module.css";
import { getAdminCourse, updateExam } from "../../CommonApps/AllAPICalls";

const EditForm = ({ batchId, selectedInstitute, userData, exam, onBack , rerender , batchDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    start_date: "",
    start_time: "",
    duration: "",
    total_marks: "",
    platform: "",
    courses: []
  });

  const [delinkState, setDelinkState] = useState("notEditing");

  const [adminCourses, setAdminCourses] = useState([]);
  useEffect(() => {
    if (exam) {
      setFormData({
        name: exam.name,
        start_date: exam.start_date,
        start_time: exam.start_time,
        duration: exam.duration,
        total_marks: exam.total_marks,
        platform: exam.platform,
        difficultylevel: exam.difficultylevel,
        courses: exam.courses.map(course => ({
          id: course.id,
          courseShortName: course.courseShortName,
          courseGlobalCode: course.courseGlobalCode,
          marks: course.marks || ""
        }))
      });
    }
  }, [exam]);

  useEffect(() => {  
    getAdminCourse({ getadminCourse: setAdminCourses });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const courseId = parseInt(e.target.value);
    const course = batchDetails.courses.find(c => c.id === courseId);
    if (e.target.checked) {
      setFormData(prevFormData => ({
        ...prevFormData,
        courses: [...prevFormData.courses, { id: course.id, courseShortName: course.courseShortName, courseGlobalCode: course.courseGlobalCode, marks: "" }]
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        courses: prevFormData.courses.filter(c => c.id !== courseId)
      }));
    }
  };

  const handleMarksChange = (e, courseId) => {
    const updatedCourses = formData.courses.map(course =>
      course.id === courseId ? { ...course, marks: e.target.value } : course
    );
    setFormData(prevFormData => ({
      ...prevFormData,
      courses: updatedCourses
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDelinkState("editing");
    const data = {
      name: formData.name,
      start_date: formData.start_date,
      start_time: formData.start_time,
      platform: formData.platform,
      duration: formData.duration,
      difficultylevel: formData.difficultylevel,
      total_marks: formData.total_marks,
      courses: formData.courses.map(course => course.id),
      institutes: [selectedInstitute.id],
      sub_exams: formData.courses.map(course => ({
        name: course.courseShortName,
        total_marks: course.marks,
        courses: [course.id],
        institutes: [selectedInstitute.id]
      }))
    };

    updateExam(exam.id, data  )
      .then(updatedExam => {
        console.log("Updated exam data:", updatedExam);
        setDelinkState("Edited");
        onBack();
      })
      .catch(error => { 
        console.error("Failed to update exam:", error);
      });
  };

  // console.log("",);

  return (
    <div className={classes.overLay}>

        <div className={classes.warningBlock}>

        <div className={classes.cancelBtn}>
                  <button className={classes.btnCrossMark} onClick={onBack}>
                    <svg className={classes.svg} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                    </svg>
                  </button>
                </div>


      <h2 className={classes.createExam}>Edit Exam</h2>
      <form onSubmit={handleSubmit}>

      <div className={classes.examTitleContainer}>
                    <div className={classes.examinerExamTitle}><span className={classes.star}>*</span>Exam Title</div>
                    <input
                      className={classes.selectExaminerCourse}
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className={classes.examinerContainer}>
                    <div className={classes.firstCo}> 
                    <div className={classes.firstDiv}> 
                    <div className={classes.examiner}><span className={classes.star}>*</span>Difficulty level</div>
                    <select
                      className={classes.selectExaminerCourse}
                      name="difficultylevel"
                      value={formData.difficultylevel}
                      onChange={handleInputChange}
                      required
                    >
                      {/* <option value="easy">Easy</option> */}
                      <option value="difficult">Hard</option>
                      <option value="medium">Medium</option>
                    </select>
                    </div>

                    <div className={classes.secondDiv3}>
                        <label className={classes.txtHeading} htmlFor="duration"><span className={classes.star}>*</span>Duration:</label>
                        {/* <select
                          className={classes.selectExaminer}
                          id="duration"
                          name="duration"
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="00:10:00">10 min</option>
                          <option value="00:20:00">20 min</option>
                          <option value="00:30:00">30 min</option>
                          <option value="01:00:00">1 hour</option>
                        </select> */}

<input 
   type="time"
   name="duration"
   id="duration"
   value={formData.duration}
   onChange={handleInputChange}
   className={classes.inputDiv} 
                         
                        />
                      </div>
                      </div>

                      <div className={classes.thirdDiv}>

                      <div className={classes.timeDiv}>
                      <label className={classes.txtHeadingPlatform} htmlFor="Start Time"><span className={classes.star}>*</span>Start Time</label>
                        <input
                             type="time"
                             name="start_time"
                             id="start_time"
                             value={formData.start_time}
                             onChange={handleInputChange}
                          className={classes.inputDiv}
                           
                        />
                    </div>

                        <div className={classes.platformDiv}>
                      <label className={classes.txtHeading} htmlFor="Platform"><span className={classes.star}>*</span>Platform</label>
                        <select
                            type="text"
                            name="platform"
                            id="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                          className={classes.inputDiv}
                           
                          required
                        >
                          <option value="">Select Platform</option>
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                          {/* <option value="msteam">MS Teams</option> */}
                          {/* <option value="test">Test Platform</option> */}
                        </select>
                      </div>
                        </div>

                    </div>
                    <div className={classes.dateContainer}>
                        <label className={classes.txtHeading} htmlFor="start_date"><span className={classes.star}>*</span>Date:</label>
                        <input
                          className={classes.selectExaminerTwo}
                          type="date"
                          name="start_date"
                          id="start_date"
                          value={formData.start_date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    


        {/* <div className={classes.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="start_time">Start Time:</label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            value={formData.start_time}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="duration">Duration:</label>
          <input
            type="text"
            name="duration"
            id="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div> */}
        {/* <div className={classes.formGroup}>
          <label htmlFor="total_marks">Total Marks:</label>
          <input
            type="number"
            name="total_marks"
            id="total_marks"
            value={formData.total_marks}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="platform">Platform:</label>
          <input
            type="text"
            name="platform"
            id="platform"
            value={formData.platform}
            onChange={handleInputChange}
            className={classes.input}
          />
        </div> */}
        <div className={classes.checkBoxCourse}>

            <div className={classes.div}> 
        <label className={classes.txtHeading2} htmlFor="start_date"><span className={classes.star}>*</span>Select Courses:</label>
        </div>
          {batchDetails.courses.map((course) => {
            const selectedCourse = formData.courses.find(c => c.id === course.id);
            return (
              <div key={course.id} className={classes.adminContainer}>
                <label className={classes.labelCourses}>
                  <input
                    type="checkbox"
                    value={course.id}
                    checked={!!selectedCourse}
                    onChange={handleCheckboxChange}
                    className={classes.checkBox}
                  />
                  {course.courseShortName}
                </label>
                {selectedCourse && (
                  <input
                    type="number"
                    placeholder="Enter total marks"
                    value={selectedCourse.marks}
                    onChange={(e) => handleMarksChange(e, course.id)}
                    className={classes.inputMarks}
                    required
                  />
                )}
              </div>
            );
          })}
        </div>
        {/* <div className={classes.submitContainer}>
          <button type="submit" className={classes.submitButton}>Submit</button> 
        </div> */}

        <div className={classes.submitContainer}>
                    {/* <button  className={classes.submitButton}>
                      Create Exam
                    </button> */}
                    {delinkState === "notEditing" && (
                <button className={classes.submitButton} type="submit" >Edit Exam</button>
              )}

              {delinkState === "editing" && (
                <button className={classes.submitButton} disabled>editing...</button>
              )}

              {delinkState === "Edited" && (
                <button className={classes.submitButton} disabled>edited</button>
              )}
                  </div>
      </form>

      </div>
    </div>
  );
};

export default EditForm;
