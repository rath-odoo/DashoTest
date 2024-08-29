import React, { useState, useEffect } from "react";
import classes from "./InstFeaturesContentDiv.module.css";
import { FaUsers } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

import { BsPlusLg } from "react-icons/bs";

import LeftSideMenu from "./LeftSideMenu";
import RightSideDetails from "./RightSideDetails";
import insIcon from "./instituteIICON.jpeg";

import Attednace from "./Attendance";

import CourseDetails from "./Course_details";
import Single_course_View from "./Single_course_View";
import SingleUser from "./singleUser";

import Assets from "./Assets";

import TimeTable from "./TimeTable";

import LeaveApplication from "./LeaveApplication";

import CreateInstituteForm from "./Forms/CreateInstituteForm";

import InstituteHeader from "./InstituteHeader";

import InstituteProfile from "./InstituteProfile";


import {getoneinstitutedetail} from '../../CommonApps/AllAPICalls';


import {
  BsPeopleFill,
  BsReceipt,
  BsWallet2,
  BsMortarboardFill,
  BsTable,
  BsWalletFill,
  BsJournalBookmarkFill,
  BsBank,
} from "react-icons/bs";

import FeesTopBar from "./FeesTopBar";

const UnitFriendsIcon = (props) => {
   const [showPeopleDetails, setPeople] = useState(false);
   const [showAttendanceDetails, setAttendance] = useState(false);
   const [showCourseDetails, setCourse] = useState(false);
   const [showFeesDetails, setFees] = useState(false);
   const [showAssetsDetails, setAssets] = useState(false);

   const [showTimeTableDetails, setTimeTable] = useState(false);
   const [showLeaveApplicationDetails, setLeaveApplication] = useState(false);

   const [showInstituteDetails, setInstitute] = useState(true);

   const [oneInstituteDetail, getOneInstituteDetail] = useState(false);


   useEffect(()=>{
     let instituteId = 1;
     getoneinstitutedetail({instituteId, getOneInstituteDetail}); 

   },[]);

  
   console.log("oneInstituteDetail: ", oneInstituteDetail);	


   const showInstituttteDetailshandler = () => {
     setAttendance(false);
     setCourse(false);
     setFees(false);
     setAssets(false);
     setTimeTable(false);
     setLeaveApplication(false);
     setPeople(false);
     setInstitute(true);
  };

  const showPeopleDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(false);
    setAssets(false);
    setTimeTable(false);
    setLeaveApplication(false);
    setPeople(true);
    setInstitute(false);
  };

  const showAttendanceDetailsHandler = () => {
    setAttendance(true);
    setCourse(false);
    setFees(false);
    setAssets(false);
    setPeople(false);
    setTimeTable(false);
    setLeaveApplication(false);
    setInstitute(false);
  };

  const showCourseDetailsHandler = () => {
    setAttendance(false);
    setCourse(true);
    setFees(false);
    setAssets(false);
    setPeople(false);
    setTimeTable(false);
    setLeaveApplication(false);
    setInstitute(false);
  };

  const showFeesDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(true);
    setPeople(false);
    setAssets(false);
    setTimeTable(false);
    setLeaveApplication(false);
    setInstitute(false);
  };

  const showAssetsDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(false);
    setPeople(false);
    setAssets(true);
    setTimeTable(false);
    setLeaveApplication(false);
    setInstitute(false);
  };

  const showTimeTableDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(false);
    setPeople(false);
    setAssets(false);
    setTimeTable(true);
    setLeaveApplication(false);
    setInstitute(false);
  };

  const showLeaveApplicationDetailsHandler = () => {
    setAttendance(false);
    setCourse(false);
    setFees(false);
    setPeople(false);
    setAssets(false);
    setTimeTable(false);
    setLeaveApplication(true);
    setInstitute(false);
  };




  return (
    <div className={classes.contactTitleDiv}>
      {/* <div className={classes.contactTitle}>
          Institute: manage your institute
        </div> */}

      <InstituteHeader />

      <div className={classes.mainContainer}>
        <div className={classes.mainContainer2}>
          <div className={classes.parentClass2}>
            <div className={classes.menuTitle}>Menu</div>

            <button
              className={classes.peopleBtn}
              type="button"
              onClick={showInstituttteDetailshandler}
            >
              <div className={classes.peopleIcon}>
                <BsBank />
              </div>
              <div className={classes.peopleSection}> Profile</div>
            </button>

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

            <button
              className={classes.courseBtn}
              onClick={showAssetsDetailsHandler}
            >
              <div className={classes.coursesIcon}>
                <BsWalletFill />
              </div>
              <div className={classes.coursesSection}>Assets Manager</div>
            </button>

            <button
              className={classes.courseBtn}
              onClick={showTimeTableDetailsHandler}
            >
              <div className={classes.coursesIcon}>
                <BsTable />
              </div>
              <div className={classes.coursesSection}>Time Table</div>
            </button>

            <button
              className={classes.courseBtn}
              onClick={showLeaveApplicationDetailsHandler}
            >
              <div className={classes.coursesIcon}>
                <BsJournalBookmarkFill />
              </div>
              <div className={classes.coursesSection}>Leave Application</div>
            </button>
          </div>
        </div>

        <div className={classes.parentClass}>

          {showInstituteDetails && <InstituteProfile />}

          {showPeopleDetails && <SingleUser />}

          {showAttendanceDetails && <Attednace />}

          {showFeesDetails && <FeesTopBar />}

          {showCourseDetails && <CourseDetails />}

          {showAssetsDetails && <Assets />}

          {showTimeTableDetails && <TimeTable />}

          {showLeaveApplicationDetails && <LeaveApplication />}

        </div>

        {/* 
          <LeftSideMenu />

          
          <RightSideDetails /> */}
      </div>
    </div>
  );
};
export default UnitFriendsIcon;
