import classes from "./CreditDebitCard.module.css";

function CreditDebitCard() {
  return (
    <div className={classes.CreditDebitParent}>
      <div className={classes.leftContainer}>
        <div className={classes.titleTotalCredit}>Total Credit :</div>

        <div className={classes.creditAmount}>10000</div>
      </div>

      <div className={classes.rightContainer}>
        <div className={classes.titleTotalDebit}>Total Debit :</div>

        <div className={classes.debitAmount}>200000</div>
      </div>
    </div>
  );
}
export default CreditDebitCard;
