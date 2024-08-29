import classes from "./CourseCardSagar.module.css";
import p1 from "./teacher.jpg";
import p3 from "./add-user.png";
import p6 from "./movie.png";
import p7 from "./arrow.png";
import p8 from "./loading.png";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";

const OneCourseCardSagar = (props) => {


  return (
    <div className={classes.innerBox}>
      <button className={classes.innerchild}>
        <div className={classes.pic1}>
          <img src={props.picture} className={classes.img} />
        </div>
        <div className={classes.textAndPara}>
          <div className={classes.text}>
            <div className={classes.courseTitle}>
              {props.courseTitle}
              <div className={classes.arrow}>
                <img src={p7} className={classes.img} />
              </div>
            </div>
            <div className={classes.instructor}>{props.Instructor}</div>
            <div className={classes.info}>
              <div className={classes.class}>{props.studentClass}</div>

              <div className={classes.teachingBox}>Teaching  </div>
            </div>
          </div>
        </div>
      </button>
      <div className={classes.para}>
        <div className={classes.code}> {props.id}</div>
        <div className={classes.mediaContainer}>
          <button className={classes.videoButton}>
            <img src={p6} className={classes.video} />
          </button>
          <button className={classes.img2}>
            <AiOutlineUserAdd size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default OneCourseCardSagar;
