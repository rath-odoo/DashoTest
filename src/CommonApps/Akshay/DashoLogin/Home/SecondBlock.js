import classes from "./SecondBlock.module.css";
import bookAppointment from "./about1.png";
import image from "./p11.jpg";

function SecondBlock() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <img
          className={classes.HomeImageContainer2}
          src={image}
          alt="logo"
        ></img>

        <div className={classes.detailContainer2}>
          {/* <div className={classes.aboutHeading1}>Empowerment</div> */}

          <div className={classes.aboutHeading2}>
            "Bridges of Brilliance: Aisha and Rohan's BE Triumph"
          </div>

          <div className={classes.aboutDetails}>
            In the dynamic world of engineering studies, Aisha and Rohan,
            steadfast friends, embarked on a shared journey to top their
            Bachelor of Engineering program. Through late-night study sessions
            and collaborative problem-solving, they transformed challenges into
            stepping stones. As exams neared, their friendship became an
            unyielding source of motivation. Their dedication bore fruit as
            Aisha and Rohan emerged as the BE program toppers. Their success
            wasn't just academic; it was a testament to the strength of their
            friendship and the belief that shared dreams propel individuals to
            greater heights. Aisha and Rohan's story echoes the idea that, in
            the pursuit of excellence, the bonds we forge can be as instrumental
            as the knowledge we gain, proving that true success is often a
            shared triumph.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondBlock;
