import classes from "./Exambox.module.css";

import Exam from "./cat.jpg";

function Exambox() {
  return (
    <div className={classes.parentBox}>
      <div className={classes.logo}>
        <img src={Exam} className={classes.imagesExam} />
      </div>
      <div className={classes.title}>Online Cat Mentoring</div>
      <div className={classes.description}>2 topper’s</div>

      <button className={classes.ViewToppersBtn}>View Toppers</button>
    </div>
  );
}
export default Exambox;
