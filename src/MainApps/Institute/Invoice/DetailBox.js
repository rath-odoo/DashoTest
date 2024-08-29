import classes from "./DetailBox.module.css";

function DetailBox() {
  return (
    <div className={classes.mainBox}>
      <div className={classes.des}>This is the Demo Descriptuon</div>
      <div className={classes.amt}>1000</div>
      <div className={classes.gst}>10</div>
      <div className={classes.total}>1000</div>
    </div>
  );
}

export default DetailBox;
