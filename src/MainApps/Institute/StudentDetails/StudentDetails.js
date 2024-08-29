import classes from "./StudentDetails.module.css";

import { BsFillFileRichtextFill } from "react-icons/bs";

function StudentDetails() {
  return (
    <div className={classes.parents}>
      <div className={classes.mainContainer}>
        <div className={classes.topbar}>
          <div className={classes.leftdiv}>
            <div className={classes.icon}>
              <BsFillFileRichtextFill />
            </div>
            <div className={classes.studentTitle}>Student Details</div>
          </div>

          <button className={classes.edit}>EDIT</button>
        </div>

        <div className={classes.mainBox}>
          <div className={classes.leftsideBlock}>
            <div className={classes.block1}>
              <div className={classes.admissionNo}>Admission No :</div>
              <div className={classes.AdmissionNO}>100</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.role}>Role :</div>
              <div className={classes.Role}>Student</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.dateofBirth}>Date of Birth :</div>
              <div className={classes.DateofBirth}>20-12-2023</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.motherTounge}>MotherTounge :</div>
              <div className={classes.MotherTounge}>Hindi</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.permanantAddress}>
                Permanent address :
              </div>
              <div className={classes.PermanantAddress}>
                Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678
              </div>
            </div>

            <div className={classes.block1}>
              <div className={classes.presentAddress}>Present address :</div>
              <div className={classes.PresentAddress}>
                Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678
              </div>
            </div>
          </div>

          <div className={classes.rightSideBlock}>
            <div className={classes.block1}>
              <div className={classes.nationality}>Date Of Joining :</div>
              <div className={classes.Nationality}>12-12-2024</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.nationality}>Nationality :</div>
              <div className={classes.Nationality}>India</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.aadharNo}>Aadhaar no :</div>
              <div className={classes.AadharNO}>1234 1235 3698</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.gender}>Gender :</div>
              <div className={classes.Gender}>Male</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentDetails;
