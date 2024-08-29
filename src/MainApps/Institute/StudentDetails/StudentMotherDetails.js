import classes from "./StudentMotherDetails.module.css";
import { BsPersonStandingDress } from "react-icons/bs";

function StudentMotherDetails() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.topbar}>
        <div className={classes.leftdiv}>
          <div className={classes.icon}>
            <BsPersonStandingDress />
          </div>
          <div className={classes.studentTitle}>Mother Details</div>
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
            <div className={classes.Role}>
              Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentMotherDetails;
