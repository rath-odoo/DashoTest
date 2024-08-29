import React, { useState, useEffect, memo } from 'react';
import classes from "./CourseCardSagar.module.css";
//import classes from "./test.module.css";
import p1 from "./teacher.jpg";
import p3 from "./add-user.png";
import p6 from "./movie.png";
import p7 from "./arrow.png";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import defaultImage from "./Knowledge.png";
import { useHistory } from "react-router-dom";
import { putcourseenroll, getuserbyId, deletedashboardcourses, deleteacourse } from '../../../../../CommonApps/AllAPICalls';
import CourseCardDropDown from './CourseCardDropDown';
import CourseEditForm from './Forms/CourseEditForm';
import CardImageUploadForm from './Forms/CourseImageUploadForm';
import AddStudentForm from './AddStudentForm';



const OneCourseCardSagar = (props) => {


  let history = useHistory();

  let selectedCourse = localStorage.getItem('preferredCourseId');

  const [statusBkgColor, setStatusBkgColor] = useState('#25D366');


  let enrolledstudents = props.Course.enrolled_students;


  const ApproveHandler = (userId) => {
    let enrollId = userId;
    let courseId = props.Course.id;
    // enrolledstudents.push(enrollId);
    // putcourseenroll({courseId, enrolledstudents});
  }


  console.log("Course : ", props);

  const courseSwitchHandler = () => {

    let isOwner = Number(props.Course.creater.id) === Number(props.userData.id) ? true : false;


    //console.log()

    if (props.Course.association === "Teaching" || props.Course.association === "Studying" || props.Course.association === "Admin" || isOwner) {
      localStorage.setItem('preferredCourseId', props.Course.id);
      //window.location.reload(false);
      props.rerender();
      history.push('/course/summary');
    } else {

      alert("You are not enrolled in this course yet!");
    }
  }

  const deleteCourseHandler = () => {
    console.log("delete handler recreated");

    let courseId = props.Course.id;
    deleteacourse({ courseId, props });

  }





  const [showDropDown, setShowDropDown] = useState(false);

  const showActionToolsHandler = () => {
    setShowDropDown(true);
  }

  const [showCourseEditForm, setShowCourseEditForm] = useState(false);
  const [showAddStudentForm, setshowAddStudentForm] = useState(false);

  const addStdHandler = () => {
    setshowAddStudentForm(true);
  }
  const closeAddStdForm = () => {
    setshowAddStudentForm(false);
  }


  const [showCourseCardImageUploadForm, setShowCourseCardImageUploadForm] = useState(false);


  const showCourseEditFormHandler = () => {
    setShowCourseEditForm(showCourseEditForm => true);
    setShowDropDown(showDropDown => false);
    //console.log("oho baby");           
  }


  //console.log("showDropDown: ", showDropDown);

  const closeCourseEditForm = () => {
    setShowCourseEditForm(false);
    props.rerender();
  }


  const showCourseCardImageUploadFormHandler = () => {
    setShowCourseCardImageUploadForm(true);
  }


  let styleTeaching = { color: "var(--themeColor)", borderStyle: "solid", borderWidth: "1px", borderRadius: "5px" }
  let styleStudying = { color: "black", borderStyle: "solid", borderWidth: "1px", borderRadius: "5px", borderColor: "black" }

  let styleGen = (props.Course.association === "Teaching" ? styleTeaching : styleStudying);

  const [showEnrollForm, setShowEnrollForm] = useState(false);

  const enrollFormHandler = () => {
    setShowEnrollForm(true);
  }

  const closeEnrollFormHandler = () => {
    setShowEnrollForm(false);
  }





  let isOwner = Number(props.Course.creater.id) === Number(props.userData.id) ? true : false;
  let isAdmin = props.Course.admins.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;











  return (
    <div className={classes.innerBox} >


      {showCourseEditForm &&
        <CourseEditForm onPress={closeCourseEditForm}
          Course={props.Course}
          userData={props.userData}
        />
      }


      {showCourseCardImageUploadForm && <CardImageUploadForm onPress={() => setShowCourseCardImageUploadForm(false)}
        Course={props.Course}
        rerender={props.rerender}
      />

      }







      {props.picture ? (
        <button className={classes.pic1} onClick={courseSwitchHandler}>
          <img src={props.picture} className={classes.img} alt="Course" />
        </button>
      ) : (
        <button className={classes.pic1}>
          <img src={defaultImage} className={classes.img} alt="Default Course" />
        </button>
      )}
      <div className={classes.child}>
        <div className={classes.text}>
          <div className={classes.Menu}>
            <div className={classes.Submenu}>
              <button className={classes.courseTitle} type="button" onClick={courseSwitchHandler}>
                {props.Course.courseLocalCode !== "N/A" && props.Course.courseLocalCode !== "" ? props.Course.courseLocalCode + ": " : ""}
                {props.courseTitle}
              </button>
              <div className={classes.arrow}>
                <button className={classes.btnarrow} type="button" onClick={courseSwitchHandler}>
                  <MdKeyboardDoubleArrowRight size={20} className={classes.rightArrowCourseTitle} />
                </button>
              </div>
            </div>


            <div className={classes.edit} >
              <BsThreeDotsVertical size={25} color="grey" onClick={showActionToolsHandler} className={classes.verticalDotsIcon} />
              {
                showDropDown &&
                <CourseCardDropDown setDropDown={setShowDropDown}
                  deleteCourseHandler={deleteCourseHandler}
                  showCourseEditFormHandler={showCourseEditFormHandler}
                  onPress={showCourseCardImageUploadFormHandler}
                  userData={props.userData}
                  Course={props.Course}
                  rerender={props.rerender}
                />
              }

            </div>

          </div>

          <button className={classes.instructor}>
            {props.Course.teachers !== null && props.Course.teachers.map((teacher, index) => {

              return <span key={index}> {teacher.firstname !== "" ? teacher.firstname + " " + teacher.lastname : teacher.username}{","}  </span>

            }
            )
            }
          </button>
          <button className={classes.info}>
            <div className={classes.class}>{props.Course.designedFor}</div>

            {props.Course.association === "N/A" && !props.Course.enrolled && props.Course.enrollementRequestSent &&
              <div className={classes.teachingBox} style={{ color: "red", borderColor: "red" }}> Request sent </div>
            }

            {props.Course.association !== "N/A" &&

              <div className={classes.teachingBox} style={styleGen}> {props.Course.association === "Studying" ? "Learning" : props.Course.association} </div>

            }


          </button>
        </div>
      </div>
      <div className={classes.para}>
        <div className={classes.code}>{100000 + Number(props.Course.id)}</div>

        <div className={classes.mediaContainer}>
          <button className={classes.videoButton}>
            <BsCameraVideo size={20} color="grey" />
          </button>
          {(isOwner || isAdmin) &&
            <button className={classes.img2} onClick={addStdHandler}>
              <AiOutlineUserAdd size={23} color="grey" />
            </button>
          }
        </div>
      </div>

      {
        showAddStudentForm &&
        <AddStudentForm Course={props.Course} rerender={props.rerender} onClose={closeAddStdForm} />
      }

    </div>

  );
};
export default OneCourseCardSagar;
