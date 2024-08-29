import React from "react";
import classes from "./SingleTicket.module.css";
import { SiWechat } from "react-icons/si";

const SingleTicket = (props) => {
  return (
    <div className={classes.SingleTicketParent}>
      <button className={classes.mainContainer}>
        <div className={classes.parentHeading}>
          <div className={classes.Heading}>
            <div className={classes.icon}>
              <SiWechat className={classes.mainicon} />
            </div>

            <div className={classes.Title}>Discussion : 100</div>
          </div>
          <div className={classes.iconContainer}>
            {/* <SiWechat className={classes.mainicon} /> */}
          </div>{" "}
        </div>

        <div className={classes.headingTopic}>What is Compound ?</div>

        <div className={classes.detail}>
          Today Topic Is What Is Compound ?,Today Topic Is What Is Compound
          ?,Today Topic Is
        </div>
      </button>
    </div>
  );
};

export default SingleTicket;
