import classes from "./LeftImageRightText.module.css";
import bookAppointment from "./about1.png";
import image from "./office1.jpg";

import topperImage1 from "./topper_mentor_2.jpg";

function LeftImageRightText() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <img
          className={classes.HomeImageContainer2}
          src={topperImage1}
          alt="logo"
        ></img>

        <div className={classes.detailContainer2}>
          {/* <div className={classes.aboutHeading1}>Requirements</div> */}

          <div className={classes.aboutHeading2}>
            What We Look for in a Topper Mentor:
          </div>
          {/*
      
	  */}

          <div className={classes.topperRequirementDiv}>
            {/* <ul className={classes.bulletList}>
              <li>
                <b>Exam Excellence :</b> Achieved outstanding results in your
                chosen field of expertise, demonstrating a deep understanding of
                the subject matter.
              </li>
              <li>
                <b>Communication Skills :</b> Ability to convey complex concepts
                in an accessible and engaging manner, fostering a positive
                learning environment.
              </li>
              <li>
                <b>Passion for Teaching :</b> A genuine desire to help students
                succeed, with patience, empathy, and a supportive approach.
              </li>
            </ul> */}

            <div className={classes.topContainer}>
              <div className={classes.bulleticon}></div>
              <div className={classes.MainHeading}>Exam Excellence</div>
            </div>
            <div className={classes.mainDetails}>
              Achieved outstanding results in your chosen field of expertise,
              demonstrating a deep understanding of the subject matter.
            </div>

            <div className={classes.topContainer}>
              <div className={classes.bulleticon}></div>
              <div className={classes.MainHeading}>Communication Skills: </div>
            </div>
            <div className={classes.mainDetails}>
              Ability to convey complex concepts in an accessible and engaging
              manner, fostering a positive learning environment.
            </div>

            <div className={classes.topContainer}>
              <div className={classes.bulleticon}></div>
              <div className={classes.MainHeading}>Passion for Mentoring: </div>
            </div>
            <div className={classes.mainDetails}>
              A genuine desire to help students succeed, with patience, empathy,
              and a supportive approach.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImageRightText;
