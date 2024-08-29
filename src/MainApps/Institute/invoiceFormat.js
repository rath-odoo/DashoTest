import classes from "./invoiceFormat.module.css";

function InvoiceFormat() {
  return (
    <div className={classes.mainContainer}>
      <div className={classes.userDetailsContainert1}>

        <div className={classes.block}>
        <div className={classes.t1}>Transcation Id :</div>
        <div className={classes.a1}>1478936523651236</div>
        </div>

        <div className={classes.block}>
        <div className={classes.t1}>Payment Date :</div>
        <div className={classes.a2}>10-12-2023</div>
        </div>


        <div className={classes.block}>
        <div className={classes.t1}>Status :</div>
        <div className={classes.a3}>Done</div>
        </div>


        <div className={classes.block}>
        <div className={classes.t1}>Payment method :</div>
        <div className={classes.a4}>UPI</div>
        </div>


        <div className={classes.block}>
        <div className={classes.t1}>Account Number :</div>
        <div className={classes.a5}>8523698741236547896</div>
        </div>

        <div className={classes.block}>
        <div className={classes.t1}>Note :</div>
        <div className={classes.a6}>First Installment Of Biology Course</div>
        </div>
      </div>



      <div className={classes.userDetailsContainer2}>


      <div className={classes.block}>
        <div className={classes.t1}>Name :</div>
        <div className={classes.a7}>Akshay Bhasme</div>
        </div>

        <div className={classes.block}>
        <div className={classes.t1}>Mobile Number :</div>
        <div className={classes.a8}>+91 8855935799</div>
        </div>


        <div className={classes.block}>
        <div className={classes.t1}>Email :</div>
        <div className={classes.a9}>iamguddu37@gmail.com</div>
        </div>



        <div className={classes.block}>
        <div className={classes.t1}>Address :</div>
        <div className={classes.a10}>
          this is the dummy address this is the dummy address this is the dummy
          address
        </div>
        </div>
      </div>
    </div>
  );
}
export default InvoiceFormat;
