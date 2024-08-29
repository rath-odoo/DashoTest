import React from "react";
import classes from "./TicketNavBar.module.css";
import SingleTicket from "./SingleTicket";
import { SiWechat } from "react-icons/si";

const TicketNavBar = (props) => {
  return (
    <div className={classes.chatNavBar}>
      <button className={classes.createButton}>
        {" "}
        <SiWechat className={classes.createIcon} />
        <div className={classes.buttonTitle}>Create Discussion</div>
      </button>

      <div className={classes.parentSearchDiv}>
        <input
          className={classes.discSearchBox}
          type="text"
          placeholder="Search Discussion ..."
        />
      </div>

      <div className={classes.TotalDisc}>Total no of Discussion is : 4</div>

      <div className={classes.line}></div>

      <div className={classes.topbar}>
        <div className={classes.openContainer}>
          <div className={classes.greenDot}></div>
          <div className={classes.openTitle}>Open</div>
        </div>

        <div className={classes.openContainer}>
          <div className={classes.blueDot}></div>
          <div className={classes.openTitle}>Running</div>
        </div>

        <div className={classes.openContainer}>
          <div className={classes.redDot}></div>
          <div className={classes.openTitle}>Close</div>
        </div>
      </div>

      <SingleTicket />
      <SingleTicket />
      <SingleTicket />
      <SingleTicket />
    </div>
  );
};

export default TicketNavBar;
