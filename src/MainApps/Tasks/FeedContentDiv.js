import React from "react";
import classes from "./FeedContentDiv.module.css";
import base from "../CommonAppUtilities/AppContentDiv.module.css";

import FeedTitleDiv from "./ContactTitleDiv";



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

    
    </div>
  );
};

export default FeedContentDiv;
