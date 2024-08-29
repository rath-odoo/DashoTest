import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
//import logo from './logo.svg';

import "./App.css";
import Header from "./HeaderSideBar/Header/Header";

//import HeaderNew from './components/Header/HeaderV2';

import SideNavBar from "./HeaderSideBar/SideNavBar/SideNavBar";
import SideToolBar from "./HeaderSideBar/SideNavBar/SideToolBar";
import SideBarDashboard from "./HeaderSideBar/SideNavBar/SideBarDashboard";

import UserProfile from "./MainApps/Account/UserProfile/UserProfile";
import Settings from "./MainApps/Account/Settings/Settings";
import Billing from "./MainApps/Account/Billing/Billing";

//Import Applications
import General from "./MainApps/Dashboard/General/General";
import Summary from "./MainApps/Summary/Summary";
//import News from './MainApps/Dashboard/News/News';
import Syllabus from "./MainApps/Syllabus/Summary";

import VATChat from "./MainApps/Chat/VATChat";
import EMail from "./MainApps/EMail/EMail";
import Tickets from "./MainApps/Discussion/Tickets";

import Calender from "./MainApps/Calender/Calender";

import ClassOverview from "./MainApps/Classes/Overview";
import Detail from "./MainApps/Classes/Detail/Detail";
import Specifics from "./MainApps/Classes/Specifics/Specifics";

import FindBook from "./MainApps/Books/Books";
import Read from "./MainApps/Books/Read/Read";
import Insights from "./MainApps/Books/Insights/Insights";

import AssignmentHome from "./MainApps/Assignments/Assignments.js";

import ExamsInCourse from "./MainApps/Exam/Exams";

import MeetingsOverview from "./MainApps/Meetings/Overview";
import MeetingsDetail from "./MainApps/Meetings/Detail/Detail";


import Meetings from "./MainApps/Meeting/General";


import People from "./MainApps/Students/Students";
import Teacher from "./MainApps/Teacher/Teacher";

import Grades from "./MainApps/Grades/Grades";
import Payments from "./MainApps/Payments/Payments";

import Contacts from "./MainApps/Contacts/Contacts";

import UsefullLinks from "./MainApps/UsefullLinks/UsefullLinks";
import Feed from "./MainApps/Feed/Feed";
import Utility from "./MainApps/Utility/Utility";
import Tasks from "./MainApps/Tasks/Tasks";

import Institute from "./MainApps/Institute/Institute";

import PaymentDetail from "./MainApps/Institute/PaymentDetail";
//import MeetingsOverview from './MainApps/Meetings/Overview';
//import MeetingsDetail from './MainApps/Meetings/Detail/Detail';
import ExamDetails from "./MainApps/Dashboard/General/components/Teacher/Exams/ExamDetails";

import HomeClasses from './MainApps/Dashboard/General/components/Teacher/Classes/Classes';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { useMediaPredicate } from "react-media-hook";


//import CentralSocketConnection from './CentralSocketConnection';
import {getcoursesbyCourseId, getuser, getcoursesbyCourseIdArray} from "./CommonApps/AllAPICalls";
import { doc, onSnapshot } from "firebase/firestore";
import { storage } from "./CommonApps/Reshwanth/firebase";



import AddNameForm from "./AddNameForm";
import DetailsViewAssignment from "./MainApps/Assignments/DetailsViewAssignment";
import TeacherView from "./MainApps/Assignments/TeacherView";



// import {generateToken, messaging} from './notifications/firebase'; 

// import {onMessage} from 'firebase/messaging';

{
  /*
function Connect (){

   let client;
   let isConnected;	

   function start () {
    
       client = new W3CWebSocket('wss://td7ru13iq4.execute-api.ca-central-1.amazonaws.com/production');

       client.onclose = () => {
         isConnected=false;
	 console.log("webSocket gets disconnected");      
         setTimeout(start, 3000);
       }

       client.onopen=()=>{
         isConnected=true;
	 console.log("webSocket gets connected");      
       }


     client.onmessage = (event)=>{
     const dataFromServer = JSON.parse(event.data);
     console.log("Message receved-3", event.data);
   }


   }

   start();

   return {
       getClient: () => client,
   }
}

const wcInstance = Connect().getClient();


*/
}

function App() {


  //const app = initializeApp(firebaseConfig);
  //const messaging = getMessaging(app);
  console.log(" Main App Page reredering-----------------");
  const [wcConnected, setWCConnected] = useState(false);
  let wcInstance;

  // wcInstance.onmessage = (event)=>{
  //  const dataFromServer = JSON.parse(event.data);
  //  console.log("Message receved-3", event.data);
  //}
  let sideBarBreakPoint = "850px";

  const smallerThan750px = useMediaPredicate("(max-width: 990px )");

  const [rerender, setRerender] = useState(false);

  const rerenderHandler = () => {
    setRerender(!rerender);
  };

  const [sideNavBarWidth, setWidth] = useState("var(--sideNavBarWidth)");

  const [contract, setContract] = useState(true);

  const expandHandler = () => {
    //console.log("expand handler called");
    contract && setWidth("var(--sideNavBarWidthOnContract)");
    !contract && setWidth("var(--sideNavBarWidth)");
    setContract(!contract);
  };

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
  //const [prepareMounted, setProgressMounted] = useState(false);
  //const [analyticsMounted, setAnalticsMounted] = useState(false);
  const [achievementsMounted, setAchievementsMounted] = useState(false);
  const [gradesMounted, setGradesMounted] = useState(false);

  const [paymentsMounted, setPaymentsMounted] = useState(false);

  const [calenderMounted, setCalenderMounted] = useState(false);
  //const [diaryMounted, setDiaryMounted] = useState(false);
  //const [helpcenterMounted, setHelpCenterMounted] = useState(false);

  const [meetMounted, setMeetMounted] = useState(false);

  const [generalChatMounted, setGeneralChatMounted] = useState(false);

  const [gotNotification, getGotNotification] = useState(false);

  const [selectedCourse, getCourseData] = useState(null);
  //const [courseData, getCourseData] = useState([]);
  const [profileMounted, setProfileMounted] = useState(false);
  const [settingsMounted, setSettingsMounted] = useState(false);
  const [billingMounted, setBillingMounted] = useState(false);

  const [meetingsMounted, setMeetingsMounted] = useState(false);


  const [showAddNameForm, setShowAddNameForm] = useState(false); 




  let selectedCourseId = localStorage.getItem("preferredCourseId");


  // useEffect(()=>{

  //   generateToken();
  //   onMessage(messaging,(payload)=>{
   
  //     console.log("payload: ", payload);

  //   });

  // },[]);



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

  //useEffect(() => {
  //  getuser({ setData });
  //}, [rerender]);


  useEffect(() => {
      if ( userData.id === null || !userData.phoneno) {
          return;
        }
        if (!storage) {
          return;
        }
    const unSub =  onSnapshot(doc(storage, "dashoo", userData.phoneno), (doc) => {
      doc.exists() && getGotNotification(doc.data().requestedList.length);
    });
    return () => {
      unSub();
    };
  },[userData]);

 






  useEffect(() => {
    //console.log("useEffect-2");
    //if(gotNotification>0){
      getuser({ setData });
    //}
  }, [rerender, gotNotification]);




  //console.log("userData: ", userData);

  useEffect(() => {
    smallerThan750px && setWidth("var(--sideNavBarWidthOnContract)");
    smallerThan750px && setContract(false);
    !smallerThan750px && setWidth("var(--sideNavBarWidth)");
    !smallerThan750px && setContract(true);
  }, [smallerThan750px]);

  const [dashboardCourses, getDashboardCourses] = useState([]);
  //useState(userData.id !==null? userData.dashboard_courses: []);

  console.log("dashboardMounted: ", dashboardMounted);

  console.log("selected Course: ", selectedCourse);


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

      {selectedCourseId !== null && (
        <>
	     {/* 
	     <SideToolBar
                 toolBarWidth={sideNavBarWidth}
                 toolBarBkgColor="var(--sideToolBarBkgColor2)"
                 />*/}

          <SideNavBar
            sideNavBarWidth={sideNavBarWidth}
            dashboardMounted={dashboardMounted}
            courseMounted={courseMounted}
            messagesMounted={messagesMounted}
            discussionMounted={discussionMounted}
            classMounted={classMounted}
            tasksMounted={tasksMounted}
            booksMounted={booksMounted}
            examMounted={examMounted}
            classmatesMounted={classmatesMounted}
            teacherMounted={teacherMounted}
            syllabusMounted={syllabusMounted}
            prepareMounted={false}
            analyticsMounted={false}
            achievementsMounted={achievementsMounted}
            goalsMounted={false}
            gradesMounted={gradesMounted}
            calenderMounted={false}
            diaryMounted={false}
            helpcenterMounted={false}
            rerender={rerenderHandler}
            userData={userData}
          />
        </>
      )}

      {selectedCourseId === null && (
        <>
	  {/*   
          <SideToolBar
            toolBarWidth={sideNavBarWidth}
            toolBarBkgColor="var(--sideToolBarBkgColor)"
          />*/}
          <SideBarDashboard
            sideNavBarWidth={sideNavBarWidth}
            generalChatMounted={generalChatMounted}
            homeMounted={dashboardMounted}
            emailMounted={emailMounted}
            feedMounted={feedMounted}
	    meetMounted = {meetingsMounted}
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


         

        <Route exact path="/account/userprofile">
          <UserProfile
            sideNavBarWidth={sideNavBarWidth}
            selectedCourse={selectedCourse}
            userData={userData}
            rerender={rerenderHandler}
          />
        </Route>

        <Route exact path="/account/settings">
          <Settings
            sideNavBarWidth={sideNavBarWidth}
            userData={userData}
            passMountInfo={setSettingsMounted}
            rerender={rerenderHandler}
          />
        </Route>

        <Route exact path="/account/billing">
          <Billing
            sideNavBarWidth={sideNavBarWidth}
            userData={userData}
            passMountInfo={setBillingMounted}
          />
        </Route>


        <Route exact path="/chat">
          <VATChat
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setGeneralChatMounted}
            selectedCourse={selectedCourse}
            userData={userData}
          />
        </Route>

       

        <Route exact path="/connect">
          <Feed
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setFeedMounted}
            userData={userData}
            rerender={rerenderHandler}
          />
        </Route>

        

        <Route exact path="/mail">
          <EMail
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setEmailMounted}
            selectedCourse={selectedCourse}
            userData={userData}
          />
        </Route>
        <Route exact path="/contacts">
          <Contacts
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setContactsMounted}
            userData={userData}
            rerender={rerenderHandler}
          />
        </Route>
        <Route exact path="/calender">
          <Calender
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setCalenderMounted}
            userData={userData}
          />
        </Route>
        <Route exact path="/utility">
          <Utility
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setUtilityMounted}
            userData={userData}
          />
        </Route>
        <Route exact path="/tasks">
          <Tasks
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setTasksMounted}
            userData={userData}
          />
        </Route>
         
        <Route exact path="/institute">
          <Institute
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setInstituteMounted}
            userData={userData}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
          />
        </Route>
	 

        <Route exact path="/links">
          <UsefullLinks
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setUsefullLinksMounted}
            userData={userData}
          />
        </Route>




        <Route path="/course/summary">
          <Summary
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setCourseMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            rerender={rerenderHandler}
          />
        </Route>


         <Route exact path="/course/syllabus">
          { selectedCourse !==null && selectedCourseId !== null  && (
            <Syllabus
              sideNavBarWidth={sideNavBarWidth}
              passMountInfo={setSyllabusMounted}
              selectedCourse={selectedCourse}
              userData={userData}
              rerender={rerenderHandler}
            />
          )}
        </Route>




        <Route exact path="/course/chat">
          <VATChat
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setMessagesMounted}
            selectedCourse={selectedCourse}
            userData={userData}
          />
        </Route>

        <Route path="/exams/Details">
          <ExamDetails
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setClassMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
          />
        </Route>
       
        <Route exact path="/course/discussion">
          <Tickets
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setDiscussionMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            rerender={rerenderHandler}
          />
        </Route>

        <Route path="/course/classes">
          <ClassOverview
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setClassMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
	    passOneCourseClassMountInfo={setClassMounted}
          />
        </Route>

        <Route exact path="/course/assignments/details">
          <DetailsViewAssignment
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setTasksMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
          />
        </Route>

        <Route exact path="/course/assignments/allstudents">
          <TeacherView
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setTasksMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
          />
        </Route>



        <Route exact path="/class/detail">
          <Detail
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setClassMounted}
            selectedCourse={selectedCourse}
            userData={userData}
          />
        </Route>
        <Route exact path="/class/specifics">
          <Specifics
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setClassMounted}
            selectedCourse={selectedCourse}
          />
        </Route>
        <Route exact path="/course/assignments">
          <AssignmentHome
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setTasksMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
            rerender={rerenderHandler}
          />
        </Route>
        <Route exact path="/books/findbook">
          <FindBook
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setBooksMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
          />
        </Route>
        <Route exact path="/books/read">
          <Read
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setBooksMounted}
            selectedCourse={selectedCourse}
            userData={userData}
          />
        </Route>
        <Route exact path="/books/insights">
          <Insights
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setBooksMounted}
            selectedCourse={selectedCourse}
          />
        </Route>
        <Route exact path="/course/people">
          <People
           sideNavBarWidth={sideNavBarWidth}
           passMountInfo={setClassmatesMounted}
           selectedCourse={selectedCourse}
           userData={userData}
           dashboardCourses={dashboardCourses}
           rerender={rerenderHandler}
          />
        </Route>
        <Route path="/course/exams">
          <ExamsInCourse
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setExamMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
          />
        </Route>


        <Route exact path="/course/grades">
          <Grades
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setGradesMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
          />
        </Route>
        <Route exact path="/course/payments">
          <Payments
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setPaymentsMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            dashboardCourses={dashboardCourses}
            onPress={rerenderHandler}
          />
        </Route>


         <Route path="/meetings">
          <Meetings
            sideNavBarWidth={sideNavBarWidth}
            passMountInfo={setMeetingsMounted}
            selectedCourse={selectedCourse}
            userData={userData}
            rerender={rerenderHandler}
            passOneMeetingMountInfo={setMeetingsMounted}
          />
        </Route>

      <Route  path="/">
          <General
              sideNavBarWidth={sideNavBarWidth}
              passMountInfo={setDashboardMounted}
              selectedCourse={selectedCourse}
              dashboardCourses={userData.dashboard_courses}
              userData={userData}
              socketObj={wcInstance}
              rerender={rerenderHandler}
              passMeetingMountInfo={setMeetMounted}
          />
      </Route>

      </Switch>

        { userData.id !==null && userData.firstname === "" &&
                <AddNameForm rerender={rerenderHandler}/>
        }
    
   


    </div>
  );

  return <div> </div>;
}

export default App;
