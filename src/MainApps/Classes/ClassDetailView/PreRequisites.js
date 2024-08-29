import classes from "./PreRequisites.module.css";

import { BiEdit } from "react-icons/bi";

import { BsListColumnsReverse, BsPencilSquare } from "react-icons/bs";

function PreRequisites() {
  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topContainer}>
          <div className={classes.leftContainer}>
            
            <div className={classes.preIcon}>
              <BsListColumnsReverse />
            </div>

            <div className={classes.preTitle}>PreRequisites :</div>
            <div className={classes.notSetTitle}>No Set</div>
          </div>

          <button className={classes.editBtnContainer}>
            <BsPencilSquare className={classes.editbutton} />

            <div className={classes.editText}>Edit</div>
          </button>
        </div>

        <div className={classes.bottomContainer}>
          <div className={classes.title}>Scalar And Vector</div>
          <div className={classes.desc}>
            Newton's laws of motion are three basic laws of classical mechanics
            that describe the relationship between
          </div>
        </div>
      </div>
    </div>
  );
}
export default PreRequisites;
