import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
//import logo from './logo.svg';

import "./App.css";
import Header from "./HeaderSideBar/Header/Header";
import SideNavBar from "./HeaderSideBar/SideNavBar/SideNavBar";
import SideToolBar from "./HeaderSideBar/SideNavBar/SideToolBar";
import SideBarDashboard from "./HeaderSideBar/SideNavBar/SideBarDashboard";
import { useMediaPredicate } from "react-media-hook";
import {getcoursesbyCourseId, getuser, getcoursesbyCourseIdArray} from "./CommonApps/AllAPICalls";

import General from "./MainApps/Dashboard/General/General";


const AppNew=()=>{

  const smallerThan750px = useMediaPredicate("(max-width: 990px )");

  const [rerender, setRerender] = useState(false);

  const rerenderHandler = () => {
    setRerender(!rerender);
  };

  const [sideNavBarWidth, setWidth] = useState("var(--sideNavBarWidth)");

  const expandHandler = () => {
    //console.log("expand handler called");
    contract && setWidth("var(--sideNavBarWidthOnContract)");
    !contract && setWidth("var(--sideNavBarWidth)");
    setContract(!contract);
  };

  const [contract, setContract] = useState(true);

  const [dashboardMounted, setDashboardMounted] = useState(false);
  const [courseMounted, setCourseMounted] = useState(false);
  const [messagesMounted, setMessagesMounted] = useState(false);
  const [emailMounted, setEmailMounted] = useState(false);
  const [contactsMounted, setContactsMounted] = useState(false);

  const [feedMounted, setFeedMounted] = useState(false);
  const [usefullLinksMounted, setUsefullLinksMounted] = useState(false);
  const [syllabusMounted, setSyllabusMounted] = useState(false);
  const [discussionMounted, setDiscussionMounted] = useState(false);
  const [classMounted, setClassMounted] = useState(false);
  const [tasksMounted, setTasksMounted] = useState(false);
  const [utilityMounted, setUtilityMounted] = useState(false);

  const [instituteMounted, setInstituteMounted] = useState(false);

  const [booksMounted, setBooksMounted] = useState(false);
  const [examMounted, setExamMounted] = useState(false);
  const [classmatesMounted, setClassmatesMounted] = useState(false);
  const [teacherMounted, setTeacherMounted] = useState(false);
  const [achievementsMounted, setAchievementsMounted] = useState(false);
  const [gradesMounted, setGradesMounted] = useState(false);
  const [calenderMounted, setCalenderMounted] = useState(false);
  //const [diaryMounted, setDiaryMounted] = useState(false);
  //const [helpcenterMounted, setHelpCenterMounted] = useState(false);

  const [meetMounted, setMeetMounted] = useState(false);
  const [generalChatMounted, setGeneralChatMounted] = useState(false);
  const [selectedCourse, getCourseData] = useState(null);
  //const [courseData, getCourseData] = useState([]);
  const [profileMounted, setProfileMounted] = useState(false);
  const [settingsMounted, setSettingsMounted] = useState(false);
  const [billingMounted, setBillingMounted] = useState(false);


   let selectedCourseId = localStorage.getItem("preferredCourseId");


  useEffect(() => {
    //console.log("useEffect-1");
    let courseId = selectedCourseId;

    getcoursesbyCourseId({ courseId, getCourseData });
    return () => {
      getCourseData((selectedCourse) => null);
    };
  }, [selectedCourseId, rerender]);

  const [userData, setData] = useState({
    id: null,
    dashboardcourses: [],
    dashboard_courses: [],
    usertype: 1,
    noticeids: [],
  });

  //const [userData,setData] =useState(null);

  useEffect(() => {
    //console.log("useEffect-2");
    getuser({ setData });
  }, [rerender]);

  useEffect(() => {
    smallerThan750px && setWidth("var(--sideNavBarWidthOnContract)");
    smallerThan750px && setContract(false);
    !smallerThan750px && setWidth("var(--sideNavBarWidth)");
    !smallerThan750px && setContract(true);
  }, [smallerThan750px]);

  const [dashboardCourses, getDashboardCourses] = useState([]);






return (
       <div className="edrapp">
         <Header
        onPress={expandHandler}
        selectedCourse={selectedCourse}
        userData={userData}
        dashboardCourses={userData.dashboard_courses}
        rerender={rerenderHandler}
        summaryMounted={courseMounted}
        syllabusMounted={syllabusMounted}
        homeMounted ={dashboardMounted}
        messagesMounted={messagesMounted}
        emailMounted={emailMounted}
        feedMounted={feedMounted}
        contactsMounted={contactsMounted}
        utilityMounted={utilityMounted}
        tasksMounted={tasksMounted}
        instituteMounted={instituteMounted}
        usefullLinksMounted={usefullLinksMounted}
        discussionMounted={discussionMounted}
        classMounted={classMounted}
        tasksMounted={tasksMounted}
        booksMounted={booksMounted}
        examMounted={examMounted}
        classmatesMounted={classmatesMounted}
        teacherMounted={teacherMounted}
        generalChatMounted={generalChatMounted}
        calenderMounted={calenderMounted}
      />

       {selectedCourseId === null && (
        <>
          <SideToolBar
            toolBarWidth={sideNavBarWidth}
            toolBarBkgColor="var(--sideToolBarBkgColor)"
          />
          <SideBarDashboard
            sideNavBarWidth={sideNavBarWidth}
            generalChatMounted={generalChatMounted}
            homeMounted={dashboardMounted}
            emailMounted={emailMounted}
            feedMounted={feedMounted}
            meetMounted = {meetMounted}
            contactsMounted={contactsMounted}
            utilityMounted={utilityMounted}
            tasksMounted={tasksMounted}
            instituteMounted={instituteMounted}
            calenderMounted={calenderMounted}
            usefullinksMounted={usefullLinksMounted}
            userData={userData}
            setWidth={setWidth}
            setContract={setContract}
          />
        </>
      )}

       <Switch>

        <Route  path="/">
          <General
              sideNavBarWidth={sideNavBarWidth}
              passMountInfo={setDashboardMounted}
              selectedCourse={selectedCourse}
              dashboardCourses={userData.dashboard_courses}
              userData={userData}
              rerender={rerenderHandler}
              passMeetingMountInfo={setMeetMounted}
              />
       </Route>

      </Switch>


      </div>
      );
 
}

export default AppNew;
