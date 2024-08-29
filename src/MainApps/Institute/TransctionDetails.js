import classes from "./TransctionDetails.module.css";

import { BsDownload } from "react-icons/bs";

function TransactionDetails() {
  return (
    <div className={classes.TranscationDetailsBox}>
      <div className={classes.Transid}>1236547899632</div>
      <div className={classes.amt}>10,000</div>
      <div className={classes.typ}>Credit</div>
      <div className={classes.date}>12-12-2023</div>
      <div className={classes.method}>UPI</div>
      <div className={classes.download}>
        <BsDownload />
      </div>
    </div>
  );
}

export default TransactionDetails;
