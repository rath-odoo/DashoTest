import classes from "./FeesTopBar.module.css";
import React, { useState } from "react";

import SingleFeesDetailView from "./SingleFeesDetailView";

import PayementSummery from "./PayementSummery";
import TransactionDetails from "./TransctionDetails";

import { BsCalendar2DateFill } from "react-icons/bs";

function FeesTopBar() {
  const [showPeopleDetails, setPeople] = useState(false);

  const showPeopleDetailsHandler = () => {
    setPeople(true);
  };

  return (
    <div className={classes.parentClassmain}>
      
      <div className={classes.topNavigationBar}>
        <button className={classes.schedule}>Schedule A Payment</button>
        <button className={classes.showSummary}>Show Summary</button>
      </div>

      <div className={classes.parentClass}>
        <div className={classes.b1}>Name & ID</div>
        <div className={classes.b2}>Amount</div>
        <div className={classes.b3}>Type</div>
        <div className={classes.b4}>Debited</div>
        <div className={classes.b5}>Credited</div>
        <div className={classes.b6}>Status</div>
        <div className={classes.b7}>Description</div>
      </div>


      <div className={classes.scrollContent}>

      <div className={classes.monthDetailContainer}>
        <div className={classes.mainIcon}>
          <BsCalendar2DateFill />
        </div>
        <div className={classes.monthTitle}>April</div>
      </div>

      <SingleFeesDetailView />
      <SingleFeesDetailView />
      <SingleFeesDetailView />
      <SingleFeesDetailView />
      <SingleFeesDetailView />

      <PayementSummery />
    </div>
    </div>
  );
}

export default FeesTopBar;
