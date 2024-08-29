import classes from "./student.module.css";
import { FiCopy } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import AddStudentForm from "../AddStudentForm";
import EnrolledStudents from "./enrolledStudents";
import RequestedStudents from "./requestedStudents";
import { useHistory } from "react-router-dom";
import AddTeacherForm from "./AddTeacherForm";
import AddAdminCourse from "../AddAdminCourse";
import Teachers from "./Teachers";
import Admin from "./Admin";
import { fetchEnrolledStudents, getCourseAdmins } from "../../../../../CommonApps/AllAPICalls";

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedSection, setSelectedSection] = useState('enrolled');
  const [showAddFormStd, setShowAddFormStd] = useState(false);
  const [showAddFormAdmin, setShowAddFormAdmin] = useState(false);
  const [showAddFormTeacher, setShowAddTeacher] = useState(false);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const checkUserLoggedIn = () => { 
      return true;  
    };

    const isLoggedIn = checkUserLoggedIn();
    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn && props.selectedCourse) {
      sendEnrollmentRequest(props.selectedCourse);  
    }
  }, [props.selectedCourse]);

  // const [enrolledStudents, setEnrolledStudents] = useState([]);


  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const courseId = props.selectedCourse[0].id;
        const data = await getCourseAdmins(courseId);
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };
  
    fetchAdmins();
  }, []);

 
  console.log("props from people section " ,props);


  
  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleAddTeacher = (teacherName) => {
    setShowAddTeacher(true);
    setSelectedStudents([...selectedStudents, teacherName]);
  };

  const handleFormCloseStd = () => {
    setShowAddFormStd(false);
    props.rerender();
  };

  const handleFormCloseAdmin = () => {
    setShowAddFormAdmin(false);
    props.rerender();
  };

  const handleAddStudent = (studentName) => {
    setShowAddFormStd(true);
    setSelectedStudents([...selectedStudents, studentName]);
  };

  const handleAddAdmin = (adminName) => {
    setShowAddFormAdmin(true);
    setSelectedStudents([...selectedStudents, adminName]);
  };

  const handleFormCloseTeacher = () => {
    setShowAddTeacher(false);
    props.rerender();
  };

  const checkUserLoggedIn = () => {
    return true;
  };

  const sendEnrollmentRequest = () => {
    console.log('Automatic enrollment request sent');
  };

  const generatePublicLink = () => {
    if (!props.selectedCourse || !props.selectedCourse[0]) {
      console.error('No course selected');
      return;
    }

    console.log('Generating public link for course:', props.selectedCourse[0].courseGlobalCode);

    const publicLink = `/sharedlink/${props.selectedCourse[0].courseGlobalCode}`;

    navigator.clipboard.writeText(publicLink)
      .then(() => {
        console.log('Public link copied to clipboard');
        history.push(publicLink, { state: { courseGlobalCode: props.selectedCourse[0] } });
      })
      .catch((error) => {
        console.error('Failed to copy link to clipboard', error);
      });
  };

  if (!props.selectedCourse || !props.selectedCourse[0]) {
    return <div>Loading...</div>;
  }

  const isCreator = props.selectedCourse[0].creater.id === props.userData.id;
  const isAdmin = admins.some(admin => admin.id === props.userData.id); 
  const isEnrolledStudent = props.selectedCourse[0].enrolled_students.includes(props.userData.id);
  const canAddStudents = isCreator || isAdmin;

  const teacherIds = (props.selectedCourse[0].teachers || []).map(teacher => teacher.id);
  const isTeacher = teacherIds.includes(props.userData.id);


  console.log("teachers" , props.selectedCourse[0]);

  return (
    <div className={classes.parentDiv}>
      <div className={classes.mainCon}>
        <div className={classes.titlecreater}> <span style={{color:"grey",fontSize:"18px"}}>Creator: </span> {props.selectedCourse[0].creater.firstname}  {props.selectedCourse[0].creater.lastname}</div>
        <div className={classes.topCard}>
          <div className={classes.mainTitle}>
            Invite Students to Join Your Course
          </div>

          <div className={classes.shareCodeContainer}>
            <div className={classes.shareCodeText}>Share the Course Code:</div>
          </div>

          <div className={classes.shareLinkContainer}>
            <div className={classes.shareLinkDetails}>
              <div className={classes.shareLinkText}>
                Share the Course Link:
              </div>
              <button className={classes.shareLink} onClick={generatePublicLink}>
                Copy Link Public Link: {"dashoApp.com"}
              </button>
            </div>

            <button className={classes.buttonContainer}>
              <FiCopy className={classes.btnIcon} />
            </button>
          </div>

          <div className={classes.addStudentbtnContainer}>


          {(isCreator || isAdmin || (!isTeacher && !isEnrolledStudent)) && (
              <button className={classes.addTeacherButton} onClick={handleAddTeacher}>Add Teacher</button>
            )}
            {showAddFormTeacher &&
              <AddTeacherForm onClose={handleFormCloseTeacher} rerender={props.rerender} selectedCourse={props.selectedCourse} />
            }

            {canAddStudents && (
              <>
                <button className={classes.addTeacherButton} onClick={handleAddStudent}>Add Student</button>
                {showAddFormStd &&
                  <AddStudentForm selectedCourse={props.selectedCourse} rerender={props.rerender} onClose={handleFormCloseStd} />
                }
              </>
            )}

            {isCreator && (
              <button className={classes.addTeacherButton} onClick={handleAddAdmin}>Add Admin</button>
            )}
            {showAddFormAdmin &&
              <AddAdminCourse selectedCourse={props.selectedCourse} rerender={props.rerender} onClose={handleFormCloseAdmin} />
            }
          </div>
        </div>
      </div>

      <div className={classes.titleTeachers}>Teachers</div>
      <Teachers selectedCourse={props.selectedCourse} userData={props.userData} rerender={props.rerender} />

      <div className={classes.titleTeachers}>Admins</div>
      <Admin selectedCourse={props.selectedCourse} userData={props.userData} rerender={props.rerender} />

      <div className={classes.mainCon}>
        <div className={classes.stdHeading}>Students</div>
      </div>

      <div className={classes.mainContainer}>
        <div className={classes.topMainContainerDIv}>
          <div className={classes.leftContainer}>
            <div className={classes.icon}>
              <BsFillPeopleFill className={classes.btnIcon2} />
            </div>
            <div className={classes.allStudentText}>All Students</div>
            <div className={classes.parentSearchDiv}>
              <input
                className={classes.discSearchBox}
                type="text"
                placeholder="Search Phone Or Email Or Name ..."
              />
            </div>
          </div>
          <div className={classes.rightSidebutton}>
            <button
              className={`${classes.firstBtn} ${selectedSection === 'enrolled' ? classes.active : ''}`}
              onClick={() => handleSectionChange('enrolled')}
            >
              <div className={classes.textbtn1}>Enrolled</div>
            </button>
            <button
              className={`${classes.secBtn} ${selectedSection === 'requested' ? classes.active : ''}`}
              onClick={() => handleSectionChange('requested')}
            >
              <div className={classes.textbtn1}>Request</div>
            </button>
            <button className={classes.thirdBtn}>
              <div className={classes.textbtn1}>Statistics</div>
            </button>
          </div>
        </div>

        <div className={classes.userGridContainer}>
          {selectedSection === 'enrolled' ? (
            <EnrolledStudents selectedCourse={props.selectedCourse} userData={props.userData} rerender={props.rerender} />
          ) : (
            <RequestedStudents selectedCourse={props.selectedCourse} isAdmin={props.isAdmin} userData={props.userData} rerender={props.rerender} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
