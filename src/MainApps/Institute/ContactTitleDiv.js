import React, { useState } from "react";
import classes from "./ContactTitleDiv.module.css";
import { FaUsers } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

import LeftSideMenu from "./LeftSideMenu";
import RightSideDetails from "./RightSideDetails";
import insIcon from "./instituteIICON.jpeg";

import Attednace from "./Attendance";

import CourseDetails from "./Course_details";
import Single_course_View from "./Single_course_View";
import SingleUser from "./singleUser";

import {
  BsPeopleFill,
  BsReceipt,
  BsWallet2,
  BsMortarboardFill,
} from "react-icons/bs";

import FeesTopBar from "./FeesTopBar";

const UnitFriendsIcon = (props) => {
  // const [showQrForm, setQrForm] = useState(false);

  // const showQrFormHandler = () => {
  //   setQrForm(true);
  //   setUpiForm(false);
  //   setNetBankingForm(false);
  //   setCardFrom(false);
  // };

  const [showPeopleDetails, setPeople] = useState(true);
  const [showAttendanceDetails, setAttendance] = useState(false);
  const [showCourseDetails, setCourse] = useState(false);
  const [showFeesDetails, setFees] = useState(false);

  const showPeopleDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(false);
    setPeople(true);
  };

  const showAttendanceDetailsHandler = () => {
    setAttendance(true);
    setCourse(false);
    setFees(false);
    setPeople(false);
  };

  const showCourseDetailsHandler = () => {
    setAttendance(false);
    setCourse(true);
    setFees(false);
    setPeople(false);
  };

  const showFeesDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(true);
    setPeople(false);
  };

  return (
    <div className={classes.contactTitleDiv}>
      {/* <div className={classes.contactTitle}>
          Institute: manage your institute
        </div> */}

      <div className={classes.topbox}>
        <img src={insIcon} className={classes.insLogo} />

        <div className={classes.insName}>
          NIT, Naresh IT Institute, Hydreabaad, 4444444
        </div>
      </div>

      <div className={classes.mainContainer}>
        <div className={classes.mainContainer2}>
          <div className={classes.parentClass2}>
            <div className={classes.menuTitle}>Menu</div>

            <button
              className={classes.peopleBtn}
              onClick={showPeopleDetailsHandler}
            >
              <div className={classes.peopleIcon}>
                <BsPeopleFill />
              </div>
              <div className={classes.peopleSection}>People</div>
            </button>

            <button
              className={classes.AttendanceBtn}
              onClick={showAttendanceDetailsHandler}
            >
              <div className={classes.AttendanceIcon}>
                <BsReceipt />
              </div>
              <div className={classes.AttendanceSection}>Attendance</div>
            </button>

            <button
              className={classes.feesBtn}
              onClick={showFeesDetailsHandler}
            >
              <div className={classes.feesIcon}>
                <BsWallet2 />
              </div>
              <div className={classes.feesSection}>Fees And Payments</div>
            </button>

            <button
              className={classes.courseBtn}
              onClick={showCourseDetailsHandler}
            >
              <div className={classes.coursesIcon}>
                <BsMortarboardFill />
              </div>
              <div className={classes.coursesSection}>Courses</div>
            </button>
          </div>
        </div>

        <div className={classes.parentClass}>
          {showPeopleDetails && <SingleUser />}

          {showAttendanceDetails && <Attednace />}

          {showFeesDetails && <FeesTopBar />}

          {showCourseDetails && <CourseDetails />}
        </div>

        {/* 
          <LeftSideMenu />

          
          <RightSideDetails /> */}
      </div>
    </div>
  );
};
export default UnitFriendsIcon;
