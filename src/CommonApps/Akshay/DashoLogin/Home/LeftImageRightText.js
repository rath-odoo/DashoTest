import classes from "./LeftImageRightText.module.css";
import bookAppointment from "./about1.png";
import image from "./p12.jpg";

function LeftImageRightText() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <img
          className={classes.HomeImageContainer2}
          src={image}
          alt="logo"
        ></img>

        <div className={classes.detailContainer2}>
         

          <div className={classes.aboutHeading2}>
            "Echoes of Success: Priya's Guiding Light"
          </div>

          <div className={classes.aboutDetails}>
            In a tranquil town, Priya, an academic prodigy, emerged as a guiding
            force for her fellow students. Recognizing her success, she
            selflessly shared her study techniques and insights into maintaining
            a balanced life. Through collaborative study sessions and
            motivational discussions, Priya empowered her peers, helping them
            tap into their own potential. As her influence grew, a positive
            transformation rippled through the student community. Priya's story
            is a vivid reminder that true success isn't just a personal
            conquest; it's about fostering an environment where everyone has the
            chance to shine and thrive.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftImageRightText;
