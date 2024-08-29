import React from "react";
import classes from "./FeedContentDiv.module.css";
import base from "../CommonAppUtilities/AppContentDiv.module.css";

import FeedTitleDiv from "./ContactTitleDiv";

import BibhuImg from "./Bibhu.jpeg";

import OnePost from "./OnePost";
import Single_user from "./Single_user_latest_post";

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
} from "react-icons/bs";

const FeedContentDiv = () => {
  return (
    <div className={base.appContentDiv}>
      <FeedTitleDiv />

      {/*  
      <div className={classes.scrollDiv}>
        <div className={classes.rightBox}>
          <div className={classes.title}>Manage</div>

          <div className={classes.container1}>
            <BsFillChatSquareDotsFill className={classes.iconBg} />

            <div className={classes.heading1}>Latest Post</div>
          </div>

<div className={classes.horiLine}></div>
          <Single_user />
          <Single_user />
          <Single_user />
          <Single_user />
          <Single_user />


          <div className={classes.title}>Details</div>

          <div className={classes.container1}>
            <BsInfoCircleFill className={classes.iconBg} />

            <div className={classes.heading1}>About</div>
          </div>
          <div className={classes.container1}>
            <BsFillFileRuledFill className={classes.iconBg} />

            <div className={classes.heading1}>Policy</div>
          </div>
          <div className={classes.container1}>
            <BsShieldFill className={classes.iconBg} />

            <div className={classes.heading1}>Term and Condition</div>
          </div>

          <div className={classes.container1}>
            <BsPatchQuestionFill className={classes.iconBg} />

            <div className={classes.heading1}>Help Center</div>
          </div>

          <div className={classes.container1}>
            <BsGearFill className={classes.iconBg} />

            <div className={classes.heading1}>Setting</div>
          </div>
        </div>

        <div className={classes.leftBox}>
          <div className={classes.startPost}>
            <div className={classes.startPost_MarginDiv}>
              <img src={BibhuImg} className={classes.PosterImage} />
              <button type="button" className={classes.postbtn}>
                Write Post...
              </button>
            </div>

          </div>

          <div className={classes.allpost}>
            <OnePost />
            <OnePost />
            <OnePost />
            <OnePost />
            <OnePost />
          </div>
        </div>
      </div>
      */}
    </div>
  );
};

export default FeedContentDiv;
