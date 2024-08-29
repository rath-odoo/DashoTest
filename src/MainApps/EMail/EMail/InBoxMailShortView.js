import React from "react";

import classes from "./InBoxMailShortView.module.css";

import { ImCheckboxUnchecked } from "react-icons/im";

import { AiOutlineStar } from "react-icons/ai";
import { BsEnvelopeOpen } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";

const InBoxMailShortView = (props) => {
  return (
    <div className={classes.inboxMailShortView}>
      <div className={classes.leftSec}>
        <div className={classes.flexDivLeft}>
          <div className={classes.checkbox}>
            <ImCheckboxUnchecked />
          </div>

          <div className={classes.star}>
            <AiOutlineStar />
          </div>

          <div className={classes.title}>
            <span> LinkedIn Job Alerts </span>
          </div>
        </div>
      </div>

      <div className={classes.middleSec}>
      The pricing for the following enquiries have been reduced. Respond now before someone else does.
      </div>

      <div className={classes.rightSec}>
        <div className={classes.rightSecFlexDiv}>
          
          <span className={classes.emailDisplayContent}>
            Hi Bibhuprasad, Its been a while since you joined Pioneer without
            completing the Fast Track application process
          </span>

          <span className={classes.dateText}>27th Sept 2022</span>

          <div className={classes.btnContainer}>
          <div className={classes.markAsRead}>
           
              <BsEnvelopeOpen />
            </div>

            <div className={classes.delete}>
              <BsTrash />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InBoxMailShortView;
