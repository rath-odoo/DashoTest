import classes from "./ToppersCard.module.css";

import Exam from "./p2.jpg";

function ToppersCard() {
  return (
    <div className={classes.parentBox}>
      <div className={classes.logo}>
        <img src={Exam} className={classes.imagesExam} />
      </div>
      <div className={classes.title}>Tapas Panda</div>
      <div className={classes.description1}>Online Cat GATE</div>
      <div className={classes.description2}>Online Cat GATE</div>

      <button className={classes.ViewToppersBtn}>View Profile</button>
    </div>
  );
}

export default ToppersCard;
