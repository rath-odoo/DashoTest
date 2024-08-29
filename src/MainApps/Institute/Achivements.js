import classes from "./Achivements.module.css";


import { BsTrophyFill } from "react-icons/bs";

function Achivement() {
  return (
    <button className={classes.achivementBlockParent}>
      <div className={classes.pic}>
        <BsTrophyFill className={classes.award}/>
      </div>

      <div className={classes.leftContainer}>
        <div className={classes.title}>Best Institute Award 2025</div>

        <div className={classes.date}>20/12/20241</div>
      </div>
    </button>
  );
}
export default Achivement;
