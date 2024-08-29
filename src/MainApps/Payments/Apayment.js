import classes from "./Apayment.module.css";

import Student from "./singleStudent";

function App() {
  return (
    <div className={classes.paymentParent}>
      <div className={classes.topContainer}>
        <div className={classes.billingTitle}>Payment</div>

        <div className={classes.setCourseFeeBtn}>Set Course Fees</div>
      </div>

      <div className={classes.subPayment}>
        <div className={classes.boxContainer}>
          <div className={classes.box1}>
            <div className={classes.boxTitle1}>Total Course Fee :</div>

            <div className={classes.box1Amount}> &#8377; 1,00,000</div>
          </div>

          <div className={classes.box2}>
            <div className={classes.boxTitle2}>Total Due :</div>

            <div className={classes.box2Amount}> &#8377; 50,000</div>
          </div>

          <div className={classes.box3}>
            <div className={classes.boxTitle3}>Total Paid :</div>

            <div className={classes.box3Amount}> &#8377; 50,000</div>
          </div>
        </div>

        <div className={classes.mainDetailsContainer}>
          <div className={classes.paymetDetailsSummary}>
              <div className={classes.StudText}>Students</div>
              <div className={classes.TotalText}>Total</div>
              <div className={classes.PaidText}>Paid</div>
              <div className={classes.PaidText}>Paid Date</div>
              <div className={classes.DueText}>Due</div>
              <div className={classes.demo}></div>
          </div>

          <div className={classes.studentDetails}>
            <Student />
            <Student />
            <Student />
            <Student />
            <Student />
            <Student />
            <Student />
            <Student />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
