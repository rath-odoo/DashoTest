import classes from "./TopCard.module.css";

function TopCard() {
  return (
    <div className={classes.TopcardParent}>
      <div className={classes.firstContainer}>
        <div className={classes.billingContainer}>
          <div className={classes.planName}>Billing Monthly :</div>
          <div className={classes.planstatus}>Running</div>
        </div>

        <div className={classes.detailsText}>
          Please Recharge Your number before it gets Disconnected.
        </div>
      </div>

      <div className={classes.rightContainer}>
        <div className={classes.secContainer}>
          <div className={classes.ValidityTitle}>Validity</div>
          <div className={classes.ValidityDetails}>10 Days left to Expire</div>
        </div>

        <div className={classes.thirdContainer}>
          <button className={classes.Repeat}>Repeat</button>
        </div>
      </div>
    </div>
  );
}

export default TopCard;
