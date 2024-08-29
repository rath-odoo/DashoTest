import classes from "./StudentHealthDetails.module.css";

import { BsFillHeartPulseFill } from "react-icons/bs";

function StudentHealthDetails() {
  return (
 
      <div className={classes.mainContainer}>
        <div className={classes.topbar}>
          <div className={classes.leftdiv}>
            <div className={classes.icon}>
              <BsFillHeartPulseFill />
            </div>
            <div className={classes.studentTitle}>Health Details</div>
          </div>

          <button className={classes.edit}>EDIT</button>
        </div>

        <div className={classes.mainBox}>
          <div className={classes.leftSide}>
            <div className={classes.block1}>
              <div className={classes.admissionNo}>Blood Group :</div>
              <div className={classes.AdmissionNO}>A+</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.name}>Emergency Name :</div>
              <div className={classes.Name}>Sagar Patra</div>
            </div>
          </div>

          <div className={classes.leftSide}>
            <div className={classes.block1}>
              <div className={classes.role}>Emergency No 1 :</div>
              <div className={classes.Role}>+91 8855935799</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.role}>Emergency No 2 :</div>
              <div className={classes.Role}>+91 8855935799</div>
            </div>
          </div>
        </div>
      </div>
  
  );
}
export default StudentHealthDetails;
