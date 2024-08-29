import classes from "./LeftSideMenu.module.css";

import {
  BsPeopleFill,
  BsReceipt,
  BsWallet2,
  BsMortarboardFill,
} from "react-icons/bs";

function LeftSideMenu() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.parentClass}>
        <div className={classes.menuTitle}>Menu</div>

        <button className={classes.peopleBtn}>
          <div className={classes.peopleIcon}>
            <BsPeopleFill />
          </div>
          <div className={classes.peopleSection}>People</div>
        </button>

        <button className={classes.AttendanceBtn}>
          <div className={classes.AttendanceIcon}>
            <BsReceipt />
          </div>
          <div className={classes.AttendanceSection}>Attendance</div>
        </button>

        <button className={classes.feesBtn}>
          <div className={classes.feesIcon}>
            <BsWallet2 />
          </div>
          <div className={classes.feesSection}>Fees And Payments</div>
        </button>

        <button className={classes.courseBtn}>
          <div className={classes.coursesIcon}>
            <BsMortarboardFill />
          </div>
          <div className={classes.coursesSection}>Courses</div>
        </button>
      </div>
    </div>
  );
}

export default LeftSideMenu;
