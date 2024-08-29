import React, { useEffect, useState } from 'react';
import classes from './BatchCourse.module.css';
import Logo from '../../CommonApps/Logo';
import BatchCourseSingle from './BatchCourseSingle';
import { getAdminCourse, linkCoursesToBatch, createNewCourse, getclassobjectbyId, getclassrank, getuser, getsubjectsfromclassandboard } from '../../CommonApps/AllAPICalls';
import { OptionField, OptionFieldSecondaryObjs, OptionFieldSubmitValue } from '../Dashboard/General/components/Teacher/Forms/FormInputObjects';
import LinkCouseBatch from './LinkCourseBatch';
// import { OptionField, OptionFieldSecondaryObjs, OptionFieldSubmitValue } from './Forms/FormInputObjects';
// import { createNewCourse } from '../../CommonApps/CourseAPICalls';

function BatchCourses(props) {
  console.log("from Batch Courses", props);

  const [showWarning, setShowWarning] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState([]);
  const [adminCourse, getadminCourse] = useState(null);
  const [rerender, setRerender] = useState(false);
  const [createState, setCreateState] = useState("notCreating");

  const [newCourseData, setNewCourseData] = useState({
    courseShortName: '',
    courseLocalCode: '',
    courseStartDate: '',
    courseEndDate: '',
    educationboard: '',
    classname: null,
    subject: ''
  });

  useEffect(() => {
    getAdminCourse({ getadminCourse });
  }, [rerender, props]);

  console.log("batch id after rendering ", props.batchDetails);

  const applyLeaveHandler = () => {
    setShowWarning(true);
  };

  const closeWarningHandler = () => {
    setShowWarning(false);

  };

  const openCreateCourseHandler = () => {
    setShowCreateCourse(true);
    setCreateState("notCreating");
  };

  const closeCreateCourseHandler = () => {
    setShowCreateCourse(false);
    setNewCourseData({
      courseShortName: '',
      courseLocalCode: '',
      courseStartDate: '',
      courseEndDate: '',
  
    });
    setCreateState("notCreating");
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourseData({ ...newCourseData, [name]: value });
  };

  const createCourseHandler = async () => {
    if (!newCourseData.classname || !newCourseData.subject || !newCourseData.educationboard || !newCourseData.courseShortName) {
      alert("Please fill out all required fields");
      return;
    }
  
    setCreateState("creating");
  
    const courseData = {
      creater: props.userData.id,
      designedFor: newCourseData.classname,
      courseShortName: newCourseData.courseShortName,
      courseLocalCode: newCourseData.courseLocalCode,
      educationboard: newCourseData.educationboard,
      subject: newCourseData.subject,
      institutes: [props.selectedInstitute.id],
      batch: props.batchDetails.id,
    };
   
    if (newCourseData.courseStartDate) {
      courseData.courseStartDate = newCourseData.courseStartDate;
    }
    if (newCourseData.courseEndDate) {
      courseData.courseEndDate = newCourseData.courseEndDate;
    }
  
    try {
      await createNewCourse(courseData, props);
      closeCreateCourseHandler();
      setCreateState("created");
    } catch (error) {
      console.error("Error creating new course:", error);
    }
  };
  


  const [data, setData] = useState({});
  const [classId, setClassId] = useState(0);
  const [classObject, setClassObject] = useState({
    "id": 1,
    "name": "",
    "boardofeducation": []
  });


  const [classRank, setClassRank] = useState([{ "id": 99999999, "name": "Unable to fetch ticket category" }]);
  const [selectedBoardName, setSelectedBoardName] = useState("");
  const [subjectsObject, setSubjectsObject] = useState([{ name: null }]); 

  useEffect(() => {
    getclassobjectbyId({ classId, setClassObject });
  }, [classId]);


  useEffect(() => {
    getclassrank({ setClassRank });
  }, [])


  useEffect(() => {
    getuser({ setData });
  }, []);

  useEffect(() => {

    let boardId = selectedBoardName;
    //console.log("classId:  ",classId);
    //console.log("boardname: ", boardId);	 
    getsubjectsfromclassandboard({ classId, boardId, setSubjectsObject });
  }, [classId, selectedBoardName]);


  const handleChange1 = (e) => {
    //console.log('classname', e.target.value);
    setClassId(classId => e.target.value);
    setNewCourseData({
      ...newCourseData,
      [e.target.name]: e.target.value.trim(),
    });
  };




  const handleChange2 = (e) => {
    setSelectedBoardName(e.target.value);
    setNewCourseData({
      ...newCourseData,
      [e.target.name]: e.target.value.trim(),
    });

  }

  return (
    <div>

      {props.isAdminOrOwner && (
        <button className={classes.schedule} onClick={applyLeaveHandler}>
          Link Courses to Batch
        </button>
      )}

      {props.isAdminOrOwner && (
        <button className={classes.createCourse} onClick={openCreateCourseHandler}>
          Create Course
        </button>
      )}

      <div className={classes.parentClass}>
        <div className={classes.name}>Course Name</div>
        <div className={classes.courseId}>Course Id</div>
        <div className={classes.ins}>Creater</div>

        {props.isAdminOrOwner && (
          <div className={classes.sr}>Delink</div>
        )}
      </div>

      <div className={classes.scrollContent}>
        {props.batchDetails.courses.map(course => (
          <BatchCourseSingle key={course.id} course={course} batch={props.batch} batchTwo={props.batchDetails} userData={props.userData} fetchDetails={props.fetchDetails} rerender={props.onPress} isAdminOrOwner={props.isAdminOrOwner} />
        ))}
      </div>

      {showWarning && (

        <LinkCouseBatch batchTwo={props.batchDetails} userData={props.userData} rerender={props.onPress} rerenderTwo={props.rerender} fetchDetails={props.fetchDetails} onBack={closeWarningHandler} />

      )}

      {showCreateCourse && (
        <div className={classes.overlay}>
          <div className={classes.warningBlock2}>
            <div>
              <button className={classes.closeBtn} onClick={closeCreateCourseHandler}>
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
            <div className={classes.heading}>Create New Course</div>

            <form>
              <div className={classes.courseFormContainer}>
                <div className={classes.formGroup}>
                  <label className={classes.label}><span className={classes.redStar}>*</span>Name</label>
                  <input
                    className={classes.input}
                    type="text"
                    name="courseShortName"
                    value={newCourseData.courseShortName}
                    onChange={handleInputChange} 
                  />
                </div>

                <div className={classes.divOne}>
                  <OptionField
                    label="Class"
                    name="classname"
                    options={classRank}
                    requirement="*"
                    handleChange={handleChange1}
                  />

                  <OptionFieldSecondaryObjs
                    label="Board"
                    name="educationboard"
                    options={classObject.boardofeducation}
                    requirement="*"
                    handleChange={handleChange2}
                  />

                  <OptionFieldSubmitValue
                    label="Subject"
                    name="subject"
                    options={subjectsObject}
                    requirement="*"
                    handleChange={handleInputChange}
                  />
                </div>

            
                <div className={classes.dates}>
                  <div className={classes.formGroupDate}>
                    <label className={classes.label}>Start Date</label>
                    <input
                      className={classes.input}
                      type="date"
                      name="courseStartDate"
                      value={newCourseData.courseStartDate}
                      onChange={handleInputChange} 
                    />
                  </div>
                  <div className={classes.formGroupDate}>
                    <label className={classes.label}>End Date</label>
                    <input
                      className={classes.input}
                      type="date"
                      name="courseEndDate"
                      value={newCourseData.courseEndDate}
                      onChange={handleInputChange} 
                    />
                  </div>
                </div>

              

                <div className={classes.formGroup}>
                  <label className={classes.label}><span className={classes.redStar}></span>Institute course code</label>
                  <input
                    className={classes.input}
                    type="text"
                    name="courseLocalCode"
                    value={newCourseData.courseLocalCode}
                    onChange={handleInputChange}
                    
                  />
                </div>
              </div>
              {/* <div className={classes.submitContainer}>
                <button className={classes.submitBtn} type="button" onClick={createCourseHandler}>Create </button>
              </div> */}

              <div className={classes.submitContainer}>
                <button
                  className={classes.submitBtn}
                  type="button"
                  onClick={createCourseHandler}
                  disabled={createState === "creating"}
                >
                  {createState === "creating" ? "Creating..." : createState === "created" ? "Created!" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BatchCourses;
