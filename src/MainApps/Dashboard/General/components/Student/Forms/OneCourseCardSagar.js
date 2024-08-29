import React, { useState, useEffect, memo } from 'react';
import classes from "./CourseCardSagar.module.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BsCameraVideo } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { putcourseenroll, putcourseenrollrequest, getuserbyId, deletedashboardcourses, deleteacourse } from '../../../../../../CommonApps/AllAPICalls';
import { storage } from '../../../../../../CommonApps/Reshwanth/firebase';
import {
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";


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

  // const courseSwitchHandler = () => {

  //   //localStorage.setItem('preferredCourseId', props.Course.id);
  //   //window.location.reload(false);
  //   //props.rerender();
  //   //history.push('/course/summary');
  // }

  // const courseSwitchHandler = () => {
  //   const courseId = props.Course.id; 
  //   history.push(`/${courseId}/CourseDetails`);
  // }
  const courseId = props.Course.id; 
  const courseSwitchHandler = () => {
    history.push({
      
      pathname: `/${courseId}/CourseDetail`,
      state: { userData: props }
    });
  };


  const courseSwitchAndMoveHandler = () => {
    //localStorage.setItem('preferredCourseId', props.Course.id);                  
    //setShowSelectScreen(showSelectScreen=>false);
    localStorage.setItem('preferredCourseId', props.Course.id);
    props.rerender();
    history.push('/course/summary');


  }



  const deleteCourseHandler = () => {
    console.log("delete handler recreated");
    alert("Are you sure you want to delete the course?");
    let courseId = props.Course.id;
    deleteacourse({ courseId, props });
  }


  const [showDropDown, setShowDropDown] = useState(false);

  const showActionToolsHandler = () => {
    setShowDropDown(true);
  }

  const [showCourseEditForm, setShowCourseEditForm] = useState(false);


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




  console.log("props.Course   asdasd: ", props.Course.id);

  const [enrollStatus, setEnrollStatus] = useState("notSent");
  const createNotificationInFirebase = async ({ teacherUserId, courseId, setEnrollStatus }) => {
    try {
      await updateDoc(doc(storage, "dashoo", teacherUserId), {
        requestedList: arrayUnion({
          requestTime: new Date().toISOString(),
          courseId: courseId,

        }),
      });
      console.log("request sent");
    }
    catch (err) {
      console.log("request not sent",err);
    }

  }

  // Enrollment request sent
  const enrollHandler = (e) => {
    e.preventDefault();
    let courseId = props.Course.id;
    let userId = props.userData.id;
    setEnrollStatus("sending");
    putcourseenrollrequest({ courseId, setEnrollStatus });
    {/*
      props.Course.admins !== null && props.Course.admins.map((teacher, index) => {
        const teacherUserId = teacher.username;
        createNotificationInFirebase({ teacherUserId, courseId, setEnrollStatus });
      }
      )
    */}
  }










  return (
    <div className={classes.innerBox} >
	  

      <button className={classes.pic1} type="button" onClick={courseSwitchHandler}>
        <img src={props.Course.card_cover_image} className={classes.img} alt="Course" />
      </button>


      <div className={classes.child}>
        <div className={classes.text}>
          <div className={classes.Menu}>
            <div className={classes.Submenu}>
              <button className={classes.courseTitle} type="button" onClick={courseSwitchHandler}>
                {props.Course.courseLocalCode !== "N/A" && props.Course.courseLocalCode !== "" ? props.Course.courseLocalCode + ": " : ""}
                {props.Course.courseShortName}
              </button>
              <div className={classes.arrow}>
                <button className={classes.btnarrow} type="button" onClick={courseSwitchHandler}>
                  <MdKeyboardDoubleArrowRight size={20} className={classes.rightArrowCourseTitle} />
                </button>
              </div>
            </div>

            <div className={classes.edit} >
              {/*
                  <BsThreeDotsVertical size={25} color="grey" onClick={showActionToolsHandler} className={classes.verticalDotsIcon}  />
	        */}
            </div>
          </div>

          <button className={classes.instructor}>
            {props.Course.teachers !== null && props.Course.teachers.map((teacher, index) => {

              return <span key={index}> {teacher.firstname !== "" ? teacher.firstname + " " + teacher.lastname : teacher.username}{","}  </span>


            }
            )
            }

            {props.Course.teachers === null &&

              <span> Instructor: N/A</span>

            }


          </button>
          <div className={classes.info} >
            <div className={classes.class}>{props.Course.designedFor}</div>

            { /*props.Course.association === "N/A" && !props.Course.enrolled && props.Course.enrollementRequestSent &&
                 <div className={classes.teachingBox} style={styleGen}> pending </div>
            */}

            {/* props.Course.association === "N/A" && !props.Course.enrolled && !props.Course.enrollementRequestSent &&
                 <div className={classes.teachingBox} style={styleGen}> Enroll </div>
            */}





            {/* props.Course.association !=="N/A" && 

                <div className={classes.teachingBox} style={styleGen}> { props.Course.association ==="Studying"? "Learning" : props.Course.association} </div>

            */}
            {props.Course.association === "Teaching" &&
              <button className={classes.teachingBoxEnroll}
                type="button" disabled={true}
                style={{ backgroundColor: "white", color: "var(--themeColor)", borderStyle: "solid", borderWidth: "1px", borderColor: "var(--themeColor)" }}>
                {props.Course.association}
              </button>
            }




            {props.Course.association === "Learning" &&
              <button className={classes.teachingBoxEnroll}
                type="button"
                disabled={true}
                style={{ backgroundColor: "white", color: "black", borderStyle: "solid", borderWidth: "1px", borderColor: "black" }}
              >
                {props.Course.association}
              </button>
            }

            {props.Course.association === "Enroll" && enrollStatus === "notSent" &&
              <button className={classes.teachingBoxEnroll} type="button" disabled={false} onClick={enrollHandler}> {props.Course.association}</button>
            }

            {props.Course.association === "EnrollRequestSent" &&
              <button className={classes.teachingBoxEnroll}
                type="button"
                disabled={true}
                style={{ width: "150px", backgroundColor: "white", color: "red", borderColor: "red", borderStyle: "solid" }}
                onClick={enrollHandler}
              > Request Sent</button>
            }




            {props.Course.association === "Enroll" && !props.Course.enrolled && enrollStatus === "sending" &&

              <button className={classes.teachingBoxEnroll}
                type="button" disabled={true}
                onClick={enrollHandler}
                style={{ width: "150px" }}
              >
                sending request ...
              </button>
            }


            {props.Course.association === "Enroll" && !props.Course.enrolled && enrollStatus === "sent" &&

              <button className={classes.teachingBoxEnroll} type="button" disabled={true} onClick={enrollHandler}> Request sent!</button>
            }




          </div>
        </div>
      </div>
      <div className={classes.para}>
        <div className={classes.code}>{100000 + Number(props.Course.id)}</div>
        <div className={classes.mediaContainer}>
          {/*
          <button className={classes.videoButton}>
            <BsCameraVideo size={20} color="grey" />
          </button>
	  
          <button className={classes.img2}>
            <AiOutlineUserAdd size={23} color="grey" />
          </button>
	  */}
        </div>
      </div>



    </div>

  );
};
export default OneCourseCardSagar;
