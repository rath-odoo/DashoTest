import React, { useEffect, useState } from 'react';
import classes from './BatchNotices.module.css';
import { deleteNotice, getbatchNotice, getAdminCourse, createExam, fetchBatchDetails } from '../../CommonApps/AllAPICalls';
import { BsCheckCircle, BsPencilSquare, BsPersonCircle } from 'react-icons/bs';
import Logo from '../../CommonApps/Logo';
import axios from 'axios';
import OneExamShortView from '../Dashboard/General/components/Teacher/Exams/OneExamShortView';

function BatchNotices(props) {
  const [batchNotices, setBatchNotices] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [borderColor, setBorderColor] = useState('#ffc107');
  const [adminCourses, setAdminCourses] = useState([]);
  const [error, setError] = useState(null);

  const [batchDetails, setBatchDetails] = useState(null);

    const [delinkState, setDelinkState] = useState("notCreating");
  const [formData, setFormData] = useState({
    name: '',
    difficultylevel: '',
    start_date: '',
    start_time: '',
    platform: '',
    duration: '',
    courses: [],
    institutes: [],
    batches: [props.batchDetails.id],
    sub_exams: []
  });

 console.log("propssjasdansdjo",props.batchDetails.courses);

  const deleteNoticeHandler = (noticeId) => {
    const userId = props.userData.id;
    deleteNotice({ noticeId, userId, props });
  };

  const toggleWarning = () => {
    setShowWarning(!showWarning);
    setDelinkState("notDelinking");
  };

  const closeExamBlock = () => {
    setShowWarning(false);
    setDelinkState("notDelinking");
  };

  const handleBlockClick = (event) => {
    if (event.target === event.currentTarget) {
      closeExamBlock();
    }
  };


  
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'start_time') {
      const time = value + ':00'; 
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: time
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const courseId = parseInt(value);
    const courseShortName = props.batchDetails.courses.find(course => course.id === courseId)?.courseShortName || '';


 
    setFormData((prevFormData) => {
      const updatedCourses = checked
        ? [...prevFormData.courses, courseId]
        : prevFormData.courses.filter((id) => id !== courseId);

      const updatedSubExams = checked
        ? [...prevFormData.sub_exams, { name: courseShortName, courses: [courseId], institutes: [props.selectedInstitute.id], total_marks: '' }]
        : prevFormData.sub_exams.filter((exam) => exam.courses[0] !== courseId);

      return {
        ...prevFormData,
        courses: updatedCourses,
        sub_exams: updatedSubExams
      };
    });
  };

  const handleMarksChange = (e, courseId) => {
    const { value } = e.target;
    setFormData((prevFormData) => {
      const updatedSubExams = prevFormData.sub_exams.map((exam) => {
        if (exam.courses[0] === courseId) {
          return { ...exam, total_marks: value };
        }
        return exam;
      });

      return {
        ...prevFormData,
        sub_exams: updatedSubExams
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDelinkState("creating");

    if (formData.courses.length === 0) {
      return alert("please select at least one course"); 
    }
    const payload = {
      ...formData,
      institutes: [props.selectedInstitute.id]
    };
    console.log(payload);

    createExam(props.userData.id, payload , props)
      .then(data => { 
        setDelinkState("Created");
        closeExamBlock();
      })
      .catch(error => {
        console.error("Error creating exam:", error);
      });
  };

 


  console.log("props",props);

  return (
    <div className={classes.noticeMain}>
      <div className={classes.switchBar}>
        <div className={classes.outerDiv}> 

        { props.isAdminOrOwner && (
          <div> 
        <button className={classes.createCourseButton} type="button" onClick={toggleWarning}>
          +Create an exam
        </button>
        </div>
        )}

          <div className={classes.oneExamDiv}>               	  
          <OneExamShortView 
          batchDetails={props.batchDetails}
          isAdminOrOwner={props.isAdminOrOwner}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          rerender={props.rerender}
          />
           </div>
   
     </div>
        {showWarning && (
          <div className={classes.overlay} onClick={handleBlockClick}>
            <div className={classes.warningBlock} style={{ borderColor }}>
              <div>
                <div className={classes.cancelBtn}>
                  <button className={classes.btnCrossMark} onClick={closeExamBlock}>
                    <svg className={classes.svg} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                    </svg>
                  </button>
                </div>
                <div className={classes.createExam}>Create an Exam</div>
                <form className={classes.formContainer} onSubmit={handleSubmit}>
                  <div className={classes.examTitleContainer}>
                    <div className={classes.examinerExamTitle}><span className={classes.star}>*</span>Exam Title</div>
                    <input
                      className={classes.selectExaminerCourse}
                      name="name"
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
                       <option value=''>Select difficulty level </option>
                      <option value='easy'>easy</option>
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
                          className={classes.inputDiv}
                          value={formData.duration.slice(0, 5)} 
                          onChange={handleInputChange}
                          required
                        />

                        
                      </div>
                      </div>

                      <div className={classes.thirdDiv}>

                      <div className={classes.timeDiv}>
                      <label className={classes.txtHeadingPlatform} htmlFor="Start Time"><span className={classes.star}>*</span>Start Time</label>
                        <input
                          type="time"
                          name="start_time"
                          className={classes.inputDiv}
                          value={formData.start_time.slice(0, 5)} 
                          onChange={handleInputChange}
                          required
                        />
                    </div>

                        <div className={classes.platformDiv}>
                      <label className={classes.txtHeading} htmlFor="Platform"><span className={classes.star}>*</span>Platform</label>
                        <select
                          id="platform"
                          name="platform"
                          className={classes.inputDiv}
                          value={formData.platform}
                          onChange={handleInputChange}
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
                          id="start_date"
                          name="start_date"
                          value={formData.start_date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    
                  
                  <div className={classes.examinerCourseContainer}>
                  <label className={classes.txtHeading} htmlFor="start_date"><span className={classes.star}>*</span>Select Courses:</label>

                    <div className={classes.checkBoxCourse}>
                      {props.batchDetails.courses.map((course) => (
                        <div key={course.id} className={classes.adminContainer}>
                          <label className={classes.labelCourses}>
                            <input
                              type="checkbox"
                              value={course.id}
                              checked={formData.courses.includes(course.id)}
                              onChange={handleCheckboxChange}
                              className={classes.checkBox}
                            />
                            {course.courseShortName}
                          </label>
                          {formData.courses.includes(course.id) && (
                            <input
                              type="number"
                              placeholder="Enter total marks"
                              value={formData.sub_exams.find((exam) => exam.courses[0] === course.id)?.total_marks || ''}
                              onChange={(e) => handleMarksChange(e, course.id)}
                              className={classes.inputMarks}
                              
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={classes.submitContainer}>
                    {/* <button  className={classes.submitButton}>
                      Create Exam
                    </button> */}
                    {delinkState === "notDelinking" && (
                <button className={classes.submitButton} type="submit" >Create Exam</button>
              )}

              {delinkState === "creating" && (
                <button className={classes.submitButton} disabled>Creating...</button>
              )}

              {delinkState === "Created" && (
                <button className={classes.submitButton} disabled>Created</button>
              )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* <div className={classes.noticeContainer}>
        {batchNotices && batchNotices.map((notice, index) => (
          <div key={notice.id} className={classes.noticeBlock}>
            <div className={classes.noticeInfo}>
              <Logo style={{ width: '50px', height: '50px' }} />
              <div className={classes.noticeDetails}>
                <div className={classes.noticeTitle}>{notice.title}</div>
                <div className={classes.noticeDate}>{notice.date}</div>
              </div>
            </div>
            <button
              className={classes.deleteButton}
              onClick={() => deleteNoticeHandler(notice.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default BatchNotices;
