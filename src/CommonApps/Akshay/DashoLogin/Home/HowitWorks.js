import classes from "./HowitWorks.module.css";
import Exam from "./choose_topper.gif";


function HowitWorks() {
  return (
    <div className={classes.paarent}>
      <div className={classes.title}>Step 1 :</div>

      <div className={classes.logo}>
        <img src={Exam} className={classes.imagesExam} />
      </div>
      <div className={classes.title}>Choose Your Topper</div>
      <div className={classes.description}>
        Watch topper’s introduction profile and read reviews from other students
      </div>
    </div>
  );
}
export default HowitWorks;
