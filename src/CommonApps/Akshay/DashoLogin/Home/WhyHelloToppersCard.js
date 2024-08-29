import classes from "./WhyHelloToppersCard.module.css";

import Exam from "./exam.png";

function WhyHelloToppersCard() {
  return (
    <div className={classes.paarent}>
      <div className={classes.logo}>
        <img src={Exam} className={classes.imagesExam} />
      </div>
      <div className={classes.title}>Specialized Guidance</div>
      <div className={classes.description}>
        Specific Tips from Top Rankers, Say Goodbye to Generic Advice
      </div>
    </div>
  );
}
export default WhyHelloToppersCard;
