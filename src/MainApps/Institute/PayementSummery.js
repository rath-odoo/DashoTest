import {useState, useEffect, useRef} from 'react';
import classes from "./PayementSummery.module.css";
import FadeLoader from "react-spinners/BarLoader";
import { getinstitutepaymentsummary, getinstitutepaymentsummaryformember } from '../../CommonApps/AllAPICalls';



const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



const PayementSummery=(props)=> {


  const [institutePaymentSummary, getInstitutePaymentSummary] = useState(null); 

 // const [instituteMemberPaymentSummary, getInstituteMemberPaymentSummary] = useState(null);



  let color = "var(--themeColor);";

  useEffect(()=>{

    let user_id = props.userData.id;
    let institute_id = props.selectedInstitute.id
    let formData = props.formData;
      console.log("formData inside Summary ", formData);
     props.isAdminOrOwner &&  getinstitutepaymentsummary({ institute_id,formData,  getInstitutePaymentSummary});  
     !props.isAdminOrOwner && getinstitutepaymentsummaryformember({institute_id, user_id, getInstitutePaymentSummary});

  },[props.rerender]);


  console.log("institutePaymentSummary: ", institutePaymentSummary);	





  return (
    <div className={classes.paymentParent}>

     
       <div className={classes.topBar}>
	  { institutePaymentSummary !== null && "Payment Summary" }
	  { institutePaymentSummary === null && <span style={{marginLeft:"10px"}}>Loading Summary ...</span> }
	  { institutePaymentSummary === null &&  <div style={{ margin: 'auto' }}>
                    <FadeLoader color={color} loading={true} css={override} size={50} />
                  </div>
          }
       </div>
     
 

      <div className={classes.Container1}>
        <div className={classes.totalDebitSch}>Total Debit Scheduled :</div>
        <div className={classes.totalDebitSchAmt}>

	 {institutePaymentSummary !== null && institutePaymentSummary.total_debit_scheduled}
        </div>
      </div>

      <div className={classes.Container1}>
        <div className={classes.totalCreditSch}>Total Credit Scheduled :</div>
        <div className={classes.totalCreditSchAmt}>
	  {institutePaymentSummary !== null && institutePaymentSummary.total_credit_scheduled}
	</div>
      </div>

      <div className={classes.Container1}>
        <div className={classes.totalCredit}>Total Credited :</div>
        <div className={classes.totalCreditAmt}>
	  {institutePaymentSummary !== null && institutePaymentSummary.total_credited}
	</div>
      </div>

      <div className={classes.Container1}>
        <div className={classes.totalDebit}>Total Debited :</div>
        <div className={classes.totalDebitAmt}>
	  {institutePaymentSummary !== null && institutePaymentSummary.total_debited}
	</div>
      </div>

      <div className={classes.Container1}>
        <div className={classes.totalDebitDue}>Total Credit Due :</div>
        <div className={classes.totalDebitSDueAmt}>
	  {institutePaymentSummary !== null && institutePaymentSummary.total_credit_due}
	</div>
      </div>

      <div className={classes.Container1}>
        <div className={classes.totalCreditDue}>Total Debit Due :</div>
        <div className={classes.totalCreditDueAmt}>
	  {institutePaymentSummary !== null && institutePaymentSummary.total_debit_due}
	</div>
      </div>

     <div className={classes.Container1}>
        <div className={classes.totalCreditDue} style={{color:"var(--themeColor)"}}>Current Balance :</div>
        <div className={classes.totalCreditDueAmt} style={{color:"var(--themeColor)"}}>
          {institutePaymentSummary !== null && ( Number(institutePaymentSummary.total_credited) -  Number(institutePaymentSummary.total_debited) ) }
        </div>
      </div>





    </div>
  );
}
export default PayementSummery;
