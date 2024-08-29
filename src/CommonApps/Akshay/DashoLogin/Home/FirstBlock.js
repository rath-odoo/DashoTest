import classes from "./FirstBlock.module.css";
import bookAppointment from "./about1.png";
import image from "./p13.jpg";

function FirstBlock() {
  return (
    <div className={classes.LeftImageRightTextParent}>
      <div className={classes.websiteContent2}>
        <div className={classes.detailContainer2}>
          {/* <div className={classes.aboutHeading1}>Empowerment</div> */}

          <div className={classes.aboutHeading2}>
            "Resilience Triumphs: Kabir's Journey to IIT Glory"
          </div>

          <div className={classes.aboutDetails}>
            Amid the bustling city, Kabir, a relentless dreamer, secured the top
            rank in the IIT JEE. His journey was a symphony of sacrifice and
            perseverance. Growing up in a modest household, he faced financial
            hurdles and societal expectations. Undeterred, Kabir turned every
            setback into a stepping stone, studying under streetlights and
            embracing challenges with a tenacious spirit. His success not only
            elevated his family but inspired countless aspirants. Kabir's story
            echoed the mantra that passion, coupled with unwavering
            determination, could turn dreams into tangible victories, proving
            that one's background should never dictate the height of one's
            ambitions.
          </div>
        </div>

        <img
          className={classes.HomeImageContainer2}
          src={image}
          alt="logo"
        ></img>
      </div>
    </div>
  );
}

export default FirstBlock;
