
import classes from "./App.module.css";

import TopBar from "./TopBar";
import BottomBar from "./BottomBar";


import DetailBox from "./DetailBox";
function App() {
  return (
    <div className={classes.parentInvoice}>
      <div className={classes.mainData}>
        <TopBar />

        <div className={classes.mainContainer}>
          <div className={classes.leftBox}>
            <div className={classes.box1}>
              <div className={classes.title}>Admission No :</div>
              <div className={classes.admissionNo}>123</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Invoice No :</div>
              <div className={classes.invoiceNo}>123</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Receipt No :</div>
              <div className={classes.receiptNo}>1239876543214567</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Date Issued :</div>
              <div className={classes.dateIssued}>12-09-2024</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Payment Method :</div>
              <div className={classes.paymentMethod}>UPI</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Issued By :</div>
              <div className={classes.issuedBy}>Naresh IT Institute</div>
            </div>
          </div>
          <div className={classes.rightBox}>
            <div className={classes.box1}>
              <div className={classes.title}>Name :</div>
              <div className={classes.admissionNo}>Akshay Bhasme</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Roll :</div>
              <div className={classes.admissionNo}>123</div>
            </div>

            <div className={classes.box1}>
              <div className={classes.title}>Address :</div>
              <div className={classes.address}>
                2nd Floor, Durga Bhavani Complex, Plaza, Ameerpet, Hyderabad,
                Telangana 500016
              </div>
            </div>
          </div>
        </div>

        <div className={classes.paymentDetials}>
          <div className={classes.mainBox}>
            <div className={classes.des}>Description</div>
            <div className={classes.amt}>Amount</div>
            <div className={classes.gst}>GST</div>
            <div className={classes.total}>Total</div>
          </div>

          <DetailBox />
        </div>

        <BottomBar />
      </div>
    </div>
  );
}

export default App;
