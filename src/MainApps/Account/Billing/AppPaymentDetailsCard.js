import classes from "./AppPaymentDetailsCard.module.css";

import Payment from "./AppPaymentHistory";

function AppPaymentDetailsCard() {
  return (
    <div className={classes.appPaymentCard}>
      <div className={classes.paymentContainer}>
        <div className={classes.srNo}>#</div>

        <div className={classes.Date}>Date</div>

        <div className={classes.Amount}>Description</div>

        <div className={classes.Credit}>Plan</div>
        <div className={classes.Debit}>Amount</div>

        <div className={classes.Status}>Status</div>
        <div className={classes.Invoice}>Invoice</div>
      </div>
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
      <Payment />
    </div>
  );
}
export default AppPaymentDetailsCard;
