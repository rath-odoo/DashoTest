import React, { useState, useEffect } from 'react'
import classes from './ClassViewShort_v2.module.css';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import { BsFillTrashFill, BsPeopleFill, BsFillCameraVideoFill, BsLink45Deg, BsThreeDotsVertical } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
//import {FiExternalLink} from 'react-icons/fi';
//import {getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';

import { MdDoubleArrow } from 'react-icons/md';
import ClassCardDropDown from './ClassCardDropDown';


import SelectScreen from './SelectScreen';

const ClassViewShort = (props) => {



   let history = useHistory();
   const [style, setStyle] = useState({
      primary: 'lightgrey',
      secondary: 'lightgrey',
      topBarBottomColor: 'lightgrey',
      boxBkgColor: 'white',
      rightButtonColor: 'var(--themeColor)',
      codeColor: 'grey',
      subjectColor: 'grey',
      boxShadow: 'grey 0px 3px 8px',
      fieldColor: 'grey',
      fieldValueColor: 'grey',
      borderColor: 'lightgrey'

   });
   //let deepColor='#5177bd';
   //let lessDeep='#bbd2fa';
   //let lightColor='#e0ebff';


   //console.log("selected Class: ", props.Class);


   const courseSwitchHandler = () => {
      localStorage.setItem('selectedClassId', props.Class.id);
      props.rerender();
      history.push('/class/detail');
   }



   const [selectedClass, setSelectedClass] = useState(localStorage.getItem('selectedClassId'));

   //const [statusBkgColor, setStatusBkgColor] = useState('#25D366'); 


   const [showSelectScreen, setShowSelectScreen] = useState(false);

   const moveToSubject = () => {
      //   if(Number(props.Course.id) === Number(selectedCourse)){      
      //   history.push('/class/detail');
      //  }

      //  if(Number(props.Course.id) !== Number(selectedCourse) ){


      //     setShowSelectScreen(true);

      // }	    




   }


   const closeSelectScreen = () => {
      setShowSelectScreen(showSelectScreen => false);
   }




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
      history.push('/class/detail');


   }



   //selectedCourse !== null && Number(selectedCourse) === props.Course.id &&


   useEffect(() => {
      let deepColor = '#00AFF0';
      let lessDeep = '#9de2fc';
      let lightColor = 'white';


      if (selectedClass !== null && Number(selectedClass) === props.Class.id) {
         setStyle(style => ({
            primary: deepColor,
            secondary: lightColor,
            topBarBottomColor: lessDeep,
            boxBkgColor: lightColor,
            rightButtonColor: deepColor,
            codeColor: deepColor,
            subjectColor: deepColor,
            boxShadow: `grey 0px 3px 8px`,
            fieldColor: deepColor,
            fieldValueColor: deepColor,
            borderColor: lessDeep

         }));
      };

      //if(props.Course.courseStatus==="closed"){
      // setStatusBkgColor(statusBkgColor=>'grey');
      //}

      return () => {


      }


   }, [props.Class.id, selectedClass]);




   //const [userData, setUserData]= useState({
   //usertitle:'',
   //firstname:'',
   //lastname:''	    
   //});

   useEffect(() => {

      //let userId = props.selectedCourse[0].teacher;	    
      //getuserbyId({userId, setUserData});

   }, []);



   const deleteCourseHandler = () => {


   }


   const enrollInfoButtonHandler = () => { }


   //const [enrollRequests,setEnrollRequests] = useState(false);
   //const [enrollStatus, setEnrollStatus] = useState(false);

   let NumToMonth = ["N/A", "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]


   const classcardHandler = () => {

      console.log("class card click");
   }


   const joinClassHandler = () => {

      console.log("join class handler");
   }


   const viewClassDetailHandler = () => {

      let classId = props.Class.id;
      props.classDetailHandler({ classId });

      // history.push('/course/classes/1');

   }


   const commentTime = ({ datetime }) => {

      let DatetimeLocalFull = new Date(datetime);

      let DatetimeLocalFullStr = String(DatetimeLocalFull);

      let dayStr = DatetimeLocalFullStr.split(" ").at(0);
      let dateStr = DatetimeLocalFullStr.split(" ").at(2);
      let month = DatetimeLocalFullStr.split(" ").at(1);

      let year = DatetimeLocalFullStr.split(" ").at(3);

      let fullTimeLocal = DatetimeLocalFullStr.split(" ").at(4);

      let fullTimeLocalStr = String(fullTimeLocal);

      let localTimeHour = fullTimeLocalStr.split(":").at(0);
      let localTimeMin = fullTimeLocalStr.split(":").at(1);

      let ampm = "am";

      if (localTimeHour === 12) {
         ampm = 'pm';
      } else if (localTimeHour === 0) {
         localTimeHour = 12;
      } else if (localTimeHour > 12) {
         localTimeHour -= 12;
         ampm = 'pm';
      }

      let DateMonth = String(dateStr) + " " + String(month) + " " + year;

      let dayName = String(dayStr);

      let time = String(localTimeHour) + ":" + String(localTimeMin) + String(ampm);

      return [time, DateMonth];

   }


   let datetime = props.Class.datetime;

   let valuesTnD = commentTime({ datetime });
   let classTime = valuesTnD[0];
   let classDateMonthYear = valuesTnD[1];





   //console.log("class server DateTime:  ", classTime, classDateMonth);


   const openMeetingRoomHandler = () => {
      let meetingLink = props.Class.meetingLink;
      window.open(meetingLink, "_blank")



   }

   const [showDropDownButtons, setShowDropDownButtons] = useState(false);

   const DropDownButtonsHandler = () => {

      setShowDropDownButtons(showDropDownButtons => true);

   }


   const closeDropDownHandler = () => {


      setShowDropDownButtons(showDropDownButtons => false);

   }








   if (!props.selectedCourse || !props.selectedCourse[0]) {
      return <div>Loading...</div>;
   }

   let isOwner = Number(props.selectedCourse[0]?.creater?.id) === Number(props.userData.id) ? true : false;
   let isAdmin = props.selectedCourse[0]?.admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
   const teacherIds = (props.selectedCourse[0]?.teachers || []).map(teacher => teacher.id);
   const isTeacher = teacherIds.includes(props.userData.id);

   console.log("oneClass: ", props);






   return (



      <div className={classes.courseViewDashboard} onClick={classcardHandler}>




         {showSelectScreen && <SelectScreen onPress={closeSelectScreen} selectNMove={courseSwitchAndMoveHandler} />}


         <div className={classes.titleDiv}>

            <div className={classes.leftInfo}>

               <div className={classes.classInfo}>
                  <div className={classes.classData}>
                     {" "}
                     {/*" "+props.Class.classdate.split("-")[2]+" "*/}
                     {/*NumToMonth[Number(props.Class.classdate.split("-")[1])]*/}{" "}
                     {/*props.Class.classdate.split("-")[0]+" "*/}

                     {/*" "+props.Class.classtime.split(":")[0]*/}
                     {/*":"*/}
                     {/*props.Class.classtime.split(":")[1]*/}
                     {/*", "}{props.Class.duration}{" mins "*/}


                     {classDateMonthYear}

                  </div>
                  {/*
	          <div className={classes.classId}> {props.Class.id} </div>
		  */}
               </div>
               <div className={classes.topicsTitle}>
                  <b className={classes.classNum}>#{props.Class.serialNo}</b>
                  {props.Class.topics.length !== 0 && props.Class.topics.map((oneTopic, index) => {
                     return <span> {oneTopic.name}</span>
                  })}

                  {props.Class.topics.length === 0 &&

                     <span style={{ color: "red" }}> topics not set </span>
                  }


               </div>

            </div>
            <div className={classes.toprightBoxes}>
               <div className={classes.classStatus}>

                  {props.Class.status === "scheduled" && <span style={{ color: "green" }}> SCHEDULED </span>}
                  {props.Class.status === "postponed" && <span style={{ color: "var(--themeColor)" }}> POSTPONED </span>}
                  {props.Class.status === "cancelled" && <span style={{ color: "red" }}> CANCELLED </span>}
                  {props.Class.status === "completed" && <span style={{ color: "grey" }}> COMPLETED </span>}


               </div>
               {(isOwner || isAdmin || isTeacher) &&
                  <button type="button" className={classes.dotsButton} onClick={DropDownButtonsHandler}> <BsThreeDotsVertical /> </button>
               }

               {showDropDownButtons &&

                  <ClassCardDropDown userData={props.userData}
                     setDropDown={closeDropDownHandler}
                     oneClass={props.Class}
                     rerender={props.rerender}
                  />


               }



            </div>
         </div>



         <div className={classes.lowerDiv}>

            <div className={classes.leftLowerDiv}>

               {/*<div className={classes.authorDiv}> by Dr. Bibhuprasad  Mahakud</div>*/}
               <div className={classes.addressDiv}>
                  <span>Time & Address : </span>
                  <span className={classes.classTime}> <b>{" " + classTime + " , " + props.Class.duration + " mins"} </b></span>
                  {props.Class.roomNo === "" ? "N/A " : props.Class.roomNo}
               </div>
            </div>
            <div className={classes.rightLowerDiv}>
               <button type="button" className={classes.joinClassButton} onClick={openMeetingRoomHandler}> <b>Join Class</b> </button>
               <button type="button" className={classes.viewClassButton} onClick={viewClassDetailHandler}>
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

}

export default ClassViewShort;
