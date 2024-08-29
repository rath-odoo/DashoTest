import classes from "./StudentFatherDetails.module.css";
import { BsFillHeartPulseFill,BsPersonStanding } from "react-icons/bs";

function StudentFatherDetails() {
  return (
    <div className={classes.mainContainer}>
      
      <div className={classes.topbar}>
        <div className={classes.leftdiv}>
          <div className={classes.icon}>
            <BsPersonStanding />
          </div>
          <div className={classes.studentTitle}>Father Details</div>
        </div>

        <button className={classes.edit}>EDIT</button>
      </div>

      <div className={classes.mainBox}>
        <div className={classes.leftSide}>
          <div className={classes.block1}>
            <div className={classes.admissionNo}>Name :</div>
            <div className={classes.AdmissionNO}>A+</div>
          </div>

          <div className={classes.block1}>
            <div className={classes.name}>Mobile No :</div>
            <div className={classes.Name}>+912929292299</div>
          </div>

          <div className={classes.block1}>
            <div className={classes.name}>Email :</div>
            <div className={classes.Name}>Sagar@gmail.com</div>
          </div>

        </div>

        <div className={classes.leftSide}>
          <div className={classes.block1}>
            <div className={classes.role}>Emergency No :</div>
            <div className={classes.Role}>+91 8855935799</div>
          </div>

          <div className={classes.block1}>
            <div className={classes.role}>Emergency No :</div>
            <div className={classes.Role}>+91 8855935799</div>
          </div>


          <div className={classes.block1}>
            <div className={classes.role}>Address :</div>
            <div className={classes.Role}>Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678</div>
          </div>



        </div>
      </div>
    </div>
  );
}

export default StudentFatherDetails;
