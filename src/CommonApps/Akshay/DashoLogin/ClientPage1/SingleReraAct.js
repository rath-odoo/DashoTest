import classes from "./SingleReraAct.module.css";
import Download from "./donwload.png";

function SingleReraAct(props) {
  return (
    <div className={classes.parent}>
      <div className={classes.detailsContainer}>
        
        <div className={classes.rightSide}>
          <div className={classes.nu}>{props.number}</div>

          <div className={classes.title}>{props.text}</div>
        </div>

        <div className={classes.downloadBtnContainer}>
          <img src={Download} className={classes.downloadIcon} />
        </div>

      </div>
    </div>
  );
}
export default SingleReraAct;
