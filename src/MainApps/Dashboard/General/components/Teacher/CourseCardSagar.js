import classes from "./CourseCardSagar.module.css";
import p1 from "./teacher.jpg";
import p3 from "./add-user.png";
import p4 from "./teach1.jpg";
import p5 from "./teach2.jpg";
import p6 from "./movie.png";
import p7 from "./arrow.png";
import p8 from "./Default .jpg";
import p2 from "./Knowledge.png";
import p9 from "./design.jpg";
import {
  BsFillCheckSquareFill,
  BsThreeDotsVertical,
  BsCameraVideoFill,
  BsFillBasketFill,
  BsPersonPlusFill,
  BsUiChecksGrid,
  BsCurrencyDollar,
} from "react-icons/bs";

import { AiOutlineUserAdd } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import Card from "./OneCourseCardSagar";

const CourseCardSagar = () => {
  const instructor = "Bibhu Prasad Mahakud";
  const className = "12th";

  return (
    <div className={classes.sagarBox1}>
    <Card picture={p9}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics and Ecelctro Magenatic"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p2}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p4}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p5}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p1}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p2}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p4}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
    <Card picture={p5}  classInstructor={"Bibhuprasad Mahakud"} courseTitle={"Concept of Physics"} studentClass={"Class-12"} id={"100032"}/ >
      {/* <div className={classes.innerBox}>
        <button className={classes.innerchild}>
          <div className={classes.pic1}>
            <img src={p1} className={classes.img} />
          </div>
          <div className={classes.textAndPara}>
            <div className={classes.text}>
              <div className={classes.courseTitle}>
                CONCEPT OF PHYSICS
                <div className={classes.arrow}>
                  <img src={p7} className={classes.img} />
                </div>
              </div>
              <div className={classes.instructor}>Instructor: {instructor}</div>

              <div className={classes.info}>
                <div className={classes.class}>Class - 12</div>

                <div className={classes.teachingBox}>Teaching</div>
              </div>
            </div>
          </div>
        </button>
        <div className={classes.para}>
          <div className={classes.code}>100032</div>
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

      <div className={classes.innerBox}>
        <button className={classes.innerchild}>
          <div className={classes.pic1}>
            <img src={p2} className={classes.img} />
          </div>
          <div className={classes.textAndPara}>
            <div className={classes.text}>
              <div className={classes.courseTitle}>
                CONCEPT OF PHYSICS
                <div className={classes.arrow}>
                  <img src={p7} className={classes.img} />
                </div>
              </div>
              <div className={classes.instructor}>Instructor: {instructor}</div>

              <div className={classes.info}>
                <div className={classes.class}>Class - 12</div>
                <div className={classes.teachingBox}>Teaching</div>
              </div>
            </div>
          </div>
        </button>
        <div className={classes.para}>
          <div className={classes.code}>100032</div>
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

      <div className={classes.innerBox}>
        <button className={classes.innerchild}>
          <div className={classes.pic1}>
            <img src={p4} className={classes.img} />
          </div>
          <div className={classes.textAndPara}>
            <div className={classes.text}>
              <div className={classes.courseTitle}>
                CONCEPT OF PHYSICS
                <div className={classes.arrow}>
                  <img src={p7} className={classes.img} />
                </div>
              </div>
              <div className={classes.instructor}>Instructor: {instructor}</div>

              <div className={classes.info}>
                <div className={classes.class}>Class - 12</div>
                <div className={classes.teachingBox}>Teaching</div>
              </div>
            </div>
          </div>
        </button>
        <div className={classes.para}>
          <div className={classes.code}>100032</div>
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

      <div className={classes.innerBox}>
        <button className={classes.innerchild}>
          <div className={classes.pic1}>
            <img src={p5} className={classes.img} />
          </div>
          <div className={classes.textAndPara}>
            <div className={classes.text}>
              <div className={classes.courseTitle}>
                CONCEPT OF PHYSICS
                <div className={classes.arrow}>
                  <img src={p7} className={classes.img} />
                </div>
              </div>
              <div className={classes.instructor}>Instructor: {instructor}</div>

              <div className={classes.info}>
                <div className={classes.class}>Class - 12</div>
                <div className={classes.teachingBox}>Teaching</div>
              </div>
            </div>
          </div>
        </button>
        <div className={classes.para}>
          <div className={classes.code}>100032</div>
          <div className={classes.mediaContainer}>
            <button className={classes.videoButton}>
              <img src={p6} className={classes.video} />
            </button>
            <button className={classes.img2}>
              <AiOutlineUserAdd size={25} />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default CourseCardSagar;
