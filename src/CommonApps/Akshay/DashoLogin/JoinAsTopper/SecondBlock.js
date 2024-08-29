import classes from "./SecondBlock.module.css";
import bookAppointment from "./about1.png";
import image from "./office1.jpg";

import topperImage3 from "./topper_mentor_3.jpg";

function SecondBlock() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <img
          className={classes.HomeImageContainer2}
          src={topperImage3}
          alt="logo"
        ></img>

        <div className={classes.detailContainer2}>
          <div className={classes.aboutHeading1}>Voices of change</div>

          <div className={classes.aboutHeading2}>
            What Our Topper Mentors Says?
          </div>

          <div className={classes.aboutDetails}>
            <span style={{ color: "var(--themeColor)" }}>
              “hello! Toppers allowed me to make a transformation in the youth
              community without leaving home!”
            </span>

            <div> Teena Bhabi, IAS Topper 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondBlock;
