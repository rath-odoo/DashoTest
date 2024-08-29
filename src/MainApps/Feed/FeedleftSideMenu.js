import classes from "./FeedleftSideMenu.module.css";
import React, { useState, useEffect } from 'react';
import {
  BsFillImageFill,
  BsCameraVideoFill,
  BsCalendar2DayFill,
  BsPostcardFill,
  BsFillChatSquareDotsFill,
  BsGearFill,
  BsFillPeopleFill,
  BsDiagram3Fill,
  BsPersonFill,
  BsCalendarPlusFill,
  BsFillFileEarmarkTextFill,
  BsPeopleFill,
  BsPatchQuestionFill,
  BsInfoCircleFill,
  BsFillFileRuledFill,
  BsShieldFill,
  BsFillFileRichtextFill,
  BsSearch,
  BsFillSuitHeartFill,
  BsHospitalFill,
  BsCardImage,
  BsXCircle,
} from "react-icons/bs";
import p1 from "./fashion.png";
import AddContactForm from './../Contacts/Forms/AddContactForm';
import Single_user from "./Single_user_latest_post";
import AllFriends from "./AllFriends";
// import AllFriends from "../Contacts/AllFriends";

function FeedleftSidemenu(props) {



  const [showAddContactForm, setShowAddContactForm] = useState(false);


  const showContactFormHandler = () => {
    setShowAddContactForm(true);

  }

  const handleClose = () => {

    setShowAddContactForm(false);

  };

  return (
    <div className={classes.rightBox}>
      {/* <div className={classes.Child}>
        <div className={classes.title}>Manage</div>

        <button className={classes.container1}>
          <BsSearch className={classes.iconBg} />

          <div className={classes.heading1}>Search</div>
        </button>

        <div className={classes.horiLine}></div>

        <button className={classes.container1}>
          <BsFillFileRichtextFill className={classes.iconBg} />

          <div className={classes.heading1}>All Posts</div>
        </button>

        <div className={classes.horiLine}></div>

        <button className={classes.container1}>
          <BsHospitalFill className={classes.iconBg} />

          <div className={classes.heading1}>Institute</div>
        </button>

        <div className={classes.horiLine}></div>

        <Single_user />
        <div className={classes.horiLine}></div>

        <Single_user />
        <div className={classes.horiLine}></div>

        <Single_user />

        <div className={classes.horiLine}></div>
      </div> */}

      <div className={classes.LeftSide}>
        <div className={classes.Child1}>
          <div className={classes.AddContacts}>
            <button className={classes.AddButton} onClick={showContactFormHandler}>Add Contacts</button>
          </div>



          {showAddContactForm && <AddContactForm userData={props.userData}
            onPress={handleClose}
            rerender={props.rerender}
          />
          }





          <div className={classes.Contacts}>My Contacts</div>
          <div className={classes.MyContacts}>
            <AllFriends userData={props.userData} rerender={props.rerender} />

            {/* <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>John</div>
            </div>
            <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>Alice</div>
            </div>
            <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>Bob</div>
            </div>
            <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>Emma</div>
            </div>

            <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>Michael</div>
            </div>
            <div className={classes.ContactBox}>
              <img src={p1} className={classes.img} alt="Fashion" />
              <div className={classes.Name}>Sarah</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeedleftSidemenu;
