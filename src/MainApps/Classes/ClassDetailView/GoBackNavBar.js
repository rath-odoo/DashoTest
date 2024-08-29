import classes from "./GoBackNavBar.module.css";

import { FaArrowLeft } from "react-icons/fa";

function GoBackNavBar() {
  return (
    <div className={classes.parentConatiner}>
      <div className={classes.goBackNavBar}>
        <button className={classes.backButton}>
          <FaArrowLeft className={classes.backIcon} /> Classes /
        </button>

        <button className={classes.currentWindowButton}>DetailView</button>
      </div>
    </div>
  );
}
export default GoBackNavBar;
