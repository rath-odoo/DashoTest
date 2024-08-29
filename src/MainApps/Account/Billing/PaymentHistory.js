import classes from "./PaymentHistory.module.css";

function App() {
  return (
    <div className={classes.parentPaymentHistoryMain}>
      <div className={classes.parentPaymentHistory}>
        <div className={classes.srNo}>1</div>
        <div className={classes.Date}>29/12/2023</div>

        <div className={classes.Amount}>200000</div>

        <div className={classes.PaymnetMethod}>Net Banking</div>

        <div className={classes.Status}>Complete</div>
        <div className={classes.Invoice}>View</div>
      </div>

      <div className={classes.horizontalLine}></div>
    </div>
  );
}



export default App;
