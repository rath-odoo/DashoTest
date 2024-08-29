import React, { useState } from "react";
import classes from "./ContactTitleDiv.module.css";
import { FaUsers } from "react-icons/fa";
import { BsPlusCircle } from "react-icons/bs";

const UnitFriendsIcon = (props) => {
  return (
    <div className={classes.contactTitleDiv}>
      <div className={classes.contactTitle}> Connect with Teachers and Learners</div>

    </div>
  );
};
export default UnitFriendsIcon;
