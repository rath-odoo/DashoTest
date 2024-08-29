import React, { useState, useEffect } from 'react';
import classes from './ActionItemsHead.module.css';
import { FaUsers } from "react-icons/fa";
import { storage } from '../../../../CommonApps/Reshwanth/firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';

//import GeneralDropDown from './GeneralDropDown';
//import UserHeadDropDown from '../UserHead/UserHeadDropDown';

import { BsPeople } from 'react-icons/bs';

import CourseEnrollmentRequest from './CourseEnrollmentRequest';

const ActionItemHead = (props) => {



  let notificationNum = props.userData.id !==null? props.userData.courseenrollment_requests.length:"0";

  // const [notificationNum, setNotificationNum] = useState("0");


  // useEffect(() => {
  //     if (!props.userData || !props.userData.username) {
  //         return;
  //       }
  //       if (!storage) {
  //         return;
  //       }
  //   const unSub =  onSnapshot(doc(storage, "dashoo", props.userData.username), (doc) => {
  //     doc.exists() && setNotificationNum(doc.data().requestedList.length);
  //   });
  //   return () => {
  //     unSub();
  //   };
  // }, [props.userData.username]);


  const [dropDown, setDropDown] = useState(false);

  const [styles, setStyles] = useState({ color: 'var(--headerRightIconsColor)', backgroundColor: 'var(--headerBkgColor)' });


  //const [showActionItems, setShowActionItems] = useState(true);	


  const onMouseEnterHandler = () => {
    setStyles({ color: 'var(--headerRightIconsColor)', backgroundColor: 'lightgrey' });
  }


  const onMouseLeaveHandler = () => {
    setStyles({ color: 'var(--headerRightIconsColor)', backgroundColor: 'var(--headerBkgColor)' });
  }


  const actionItemShowHandler = () => {
    //console.log("show action items");	    
    //setShowActionItems(true);
    setDropDown(true);
  }




  //props.dashboardCourses.forEach((course, index)=>{


  //});




  //console.log("enroll_requests: ", props.userData.id !==null? props.userData.courseenrollment_requests.length:"nulllllllllll");

  //console.log("notificationNum: ", typeof(notificationNum));


  return (

    <div className={classes.actionItemsParentDiv}>


      <button className={classes.ActionItemsButton}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        onClick={actionItemShowHandler}
        style={styles}
      >



        <BsPeople className={classes.UsersIcon} style={styles} />
        {notificationNum !== 0 &&
          <i className={classes.alertMessage}><b>{notificationNum}</b></i>
        }


      </button>



      {dropDown &&
        <CourseEnrollmentRequest setDropDown={setDropDown}
          userData={props.userData}
          rerender={props.rerender}
        />
      }



      { /*showActionItems && <GeneralDropDown setDropDown={actionItemShowHandler}/>*/}


      {/*<div className={classes.test}> Bibhuprasad mahakud is woring on a start up</div>*/}

    </div>


  );

}


export default ActionItemHead;

