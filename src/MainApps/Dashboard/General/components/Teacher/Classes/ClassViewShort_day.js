import React, { useState, useEffect } from "react";
import classes from "./ClassViewShort_v2.module.css";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import {
  BsFillTrashFill,
  BsPeopleFill,
  BsFillCameraVideoFill,
  BsLink45Deg,
  BsThreeDotsVertical,
  BsClockFill,
  BsCheck2,
} from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
//import {FiExternalLink} from 'react-icons/fi';
//import {getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';
import { deleteclassbyId } from '../../../../../../CommonApps/AllAPICalls';
import { MdDoubleArrow } from "react-icons/md";

import ClassCardDropDown from './ClassCardDropDown';










const formatLocalTime = ({ datetime }) => {

  //const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);        


  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDate = new Date(datetime);
  const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
  const formattedDate = localDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return `${formattedTime}`;
};















const ClassViewShort = (props) => {
  let history = useHistory();
  const [style, setStyle] = useState({
    primary: "lightgrey",
    secondary: "lightgrey",
    topBarBottomColor: "lightgrey",
    boxBkgColor: "white",
    rightButtonColor: "var(--themeColor)",
    codeColor: "grey",
    subjectColor: "grey",
    boxShadow: "grey 0px 3px 8px",
    fieldColor: "grey",
    fieldValueColor: "grey",
    borderColor: "lightgrey",
  });
  //let deepColor='#5177bd';
  //let lessDeep='#bbd2fa';
  //let lightColor='#e0ebff';

  //console.log("selected Class: ", props.Class);

  const courseSwitchHandler = () => {
    localStorage.setItem("selectedClassId", props.Class.id);
    props.rerender();
    history.push("/class/detail");
  };

  const [selectedClass, setSelectedClass] = useState(
    localStorage.getItem("selectedClassId")
  );

  //const [statusBkgColor, setStatusBkgColor] = useState('#25D366');

  const [showSelectScreen, setShowSelectScreen] = useState(false);

  const moveToSubject = () => {
    //   if(Number(props.Course.id) === Number(selectedCourse)){
    //   history.push('/class/detail');
    //  }
    //  if(Number(props.Course.id) !== Number(selectedCourse) ){
    //     setShowSelectScreen(true);
    // }
  };

  const closeSelectScreen = () => {
    setShowSelectScreen((showSelectScreen) => false);
  };

  //const ApproveHandler = (userId)=>{
  //let enrollId = userId;
  //let courseId = props.Course.id;
  //enrolledstudents.push(enrollId);
  //putcourseenroll({courseId, enrolledstudents});
  //showEnrollStatus(false);
  //}

  const courseSwitchAndMoveHandler = () => {
    //localStorage.setItem('preferredCourseId', props.Course.id);
    //setShowSelectScreen(showSelectScreen=>false);
    //localStorage.setItem('preferredCourseId', props.Course.id);
    // moveToSubject();
    props.rerender();
    history.push("/class/detail");
  };


  const deleteCourseHandler = () => { };

  const enrollInfoButtonHandler = () => { };

  //const [enrollRequests,setEnrollRequests] = useState(false);
  //const [enrollStatus, setEnrollStatus] = useState(false);

  let NumToMonth = [
    "N/A",
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const classcardHandler = () => {
    console.log("class card click");
  };

  const joinClassHandler = () => {
    console.log("join class handler");
  };

  const viewClassDetailHandler = () => {
    let classId = props.oneClass.id;
    props.classDetailHandler({ classId });
  };

  const openMeetingRoomHandler = () => {
    let meetingLink = props.oneClass.meetingLink;
    window.open(meetingLink, "_blank");
  };

  const deleteClassHandler = () => {

    let classid = 12;
    //deleteclassbyId({});

  }

  const [showDropDownButtons, setShowDropDownButtons] = useState(false);

  const DropDownButtonsHandler = () => {

    setShowDropDownButtons(showDropDownButtons => true);

  }


  const closeDropDownHandler = () => {


    setShowDropDownButtons(showDropDownButtons => false);

  }








  let datetime = props.oneClass.datetime;


  return (
    <div className={classes.courseViewDashboard} >
      <div className={classes.titleDiv}>
        <div className={classes.leftInfo}>
          <div className={classes.classInfo}>
            <div className={classes.classData}>
              <BsClockFill className={classes.clockIcon} />
              <div className={classes.time}>

                {formatLocalTime({ datetime })}
                {", " + props.oneClass.duration + " mins"}
              </div>
            </div>
          </div>
          <div className={classes.topicsTitle}>
            <div className={classes.classNum}>#{props.oneClass.id}</div>
            <span className={classes.todayTopic}>
              {" "}
              {props.oneClass.courseName}{" "}
            </span>

            <span
              className={classes.todayTopicDetail}
              style={{ color: "grey", fontStyle: "normal" }}
            >
              {" >> "}
              {props.oneClass.topics.map((topic, index) => {

                return <span key={index}> {topic.name} </span>
              })}

              {props.oneClass.topics.length === 0 &&
                <span style={{ color: "red" }}>

                  topics not set!!
                </span>
              }


            </span>
          </div>
        </div>
        <div className={classes.toprightBoxes}>
          {props.oneClass.status === "scheduled" &&
            <div className={classes.classStatus} style={{ color: "var(--themeColor)" }}>{props.oneClass.status}</div>
          }

          {props.oneClass.status === "postponed" &&
            <div className={classes.classStatus} style={{ color: "orange" }}>{props.oneClass.status}</div>
          }

          {props.oneClass.status === "cancelled" &&
            <div className={classes.classStatus} style={{ color: "red" }}>{props.oneClass.status}</div>
          }

          {props.oneClass.status === "completed" &&
            <div className={classes.classStatus} style={{ color: "green" }}>{props.oneClass.status} <BsCheck2 /></div>
          }




          <div className={classes.rightDotsDiv}>

            <button type="button" className={classes.dotsButton} onClick={DropDownButtonsHandler}>
              {" "}
              <BsThreeDotsVertical />{" "}
            </button>

            {showDropDownButtons &&
              <ClassCardDropDown userData={props.userData}
                setDropDown={closeDropDownHandler}
                teachers={props.oneClass.teachers}
                oneClass={props.oneClass}
                rerender={props.rerender}
              />

            }

          </div>

        </div>
      </div>

      <div className={classes.lowerDiv}>
        <div className={classes.leftLowerDiv}>
          <div className={classes.authorDiv}> by :

            {props.oneClass.teachers.map((teacher, index) => {

              return <span key={index}>

                {teacher.firstname + " " + teacher.lastname + ", "}

              </span>

            }
            )
            }

          </div>
          <div className={classes.addressDiv}>
            <span> Address : </span>
            <span className={classes.classTime}>
              {" "}{props.oneClass.address !== "" && <>

                {props.oneClass.address}
              </>

              }

              {(props.oneClass.address === null || props.oneClass.address === "") && <>

                {"N/A"}
              </>

              }

              {" "}
            </span>
            {/*props.Class.roomNo ===""? "N/A ": props.Class.roomNo*/}
          </div>
        </div>

        <div className={classes.rightLowerDiv}>
          <button
            type="button"
            className={classes.joinClassButton}
            onClick={openMeetingRoomHandler}
          >
            {" "}
            <BsFillCameraVideoFill />
            <div className={classes.joinText}>Join Class</div>{" "}
          </button>
          <button
            type="button"
            className={classes.viewClassButton}
            onClick={viewClassDetailHandler}
          >
            <span>View Detail</span>
            <MdDoubleArrow className={classes.viewdetailIcon} />
          </button>
        </div>
      </div>

      {/*
        <div className={classes.middleDiv}> 
	  <div className={classes.authorDiv}> by: Dr. Bibhuprasad Kuumaram Mahakud</div>
	  <div className={classes.redirButtons}>
	       
              <button type="button" className={classes.joinClassButton}>Join Class </button>
              <button type="button" className={classes.viewClassButton}> 
	            <span>View Detail</span> 
	            <MdDoubleArrow className={classes.viewdetailIcon}/> 
	      </button>
	      
	  </div>
	</div>
        
        <div className={classes.addressDiv}>Address: Room 23, H Section </div>
        */}
    </div>
  );
};

export default ClassViewShort;
