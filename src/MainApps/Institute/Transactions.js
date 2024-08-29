import React, { useState, useEffect, useRef } from 'react';
import classes from './Transactions.module.css';
import p1 from './Institutes.png';
import p2 from './Institutes.png';

import { useLocation, useParams, useHistory } from 'react-router-dom';

//import { pdf } from 'react-pdf';

//import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import { getInstituteOnePayment, deleteinstitutepayment } from '../../CommonApps/AllAPICalls';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { BsDownload } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";



import CreateTransactionForm from './Forms/CreateTransactionForm';


const DateFormatter = ({ dateString }) => {
  // Helper function to get the day suffix
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  // Parse the date string
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Format the day with the correct suffix
  const dayWithSuffix = `${day}${getDaySuffix(day)}`;

  // Construct the final formatted date string
  const formattedDate = `${dayWithSuffix} ${month} ${year}`;

  return <div>{formattedDate}</div>;
};





function formatDate(isoString) {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}





const App = () => {



  // const { fee_id } = useParams();
  // const { user_id } = useParams();
  // const { institute_id} = useParams();

  const location = useLocation();
  const { feeid, userid, instituteid, isowner, isowner_or_admin, transaction_type, due_amount, amount } = location.state || {};

  const history = useHistory();

  //const feeid = location.state.feeid;

  // console.log("pars ", feeid, userid, instituteid, isowner);

  const [oneScheduledPayment, getScheduledPayment] = useState(null);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {


    console.log("reloading payment...");
    let institute_id = instituteid;
    let fee_id = feeid;
    getInstituteOnePayment({ institute_id, fee_id, getScheduledPayment });

  }, [feeid, userid, instituteid, rerender]);


  const divRef = useRef();

  const handleDownloadPdf = async () => {
    const canvas = await html2canvas(divRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('download.pdf');
  };



  const deletePaymentHandler = () => {

    let institute_id = instituteid;
    let user_id = userid;
    let fee_id = feeid;

    deleteinstitutepayment({ institute_id, user_id, fee_id });


  }

  const [showCreateTransactionForm, setShowCreateTransactionForm] = useState(false);



  const showCreateTransactionFormHandler = () => {


    setShowCreateTransactionForm(true);

  }






  console.log("oneScheduledPayment: ", oneScheduledPayment, isowner_or_admin);






  let dateString = oneScheduledPayment !== null ? oneScheduledPayment.date_of_schedule : null;

  let paymentUser = oneScheduledPayment !== null ? oneScheduledPayment.user : null;

  console.log("paymentUser: ", paymentUser);
  //let userOrcustomuser = null;

  let userOrcustomuser = (paymentUser !== null && paymentUser.hasOwnProperty('firstname')) ? (oneScheduledPayment !== null ? oneScheduledPayment.user.firstname + " " + oneScheduledPayment.user.lastname : null) : (oneScheduledPayment !== null ? oneScheduledPayment.custom_user : null);



  const closeCreateTransactionFormHandler = () => {


    setShowCreateTransactionForm(false);
    setRerender(rerender => !rerender);

  }



  const backButtonHandler = () => {

    history.push('/institute');

  }





  return (
    <div className={classes.paymentDetailPage} ref={divRef}>


      <button type="button" className={classes.backButton} onClick={backButtonHandler}> Back </button>


      {showCreateTransactionForm && feeid !== null && userid !== null && instituteid !== null &&

        <CreateTransactionForm fee_id={feeid}
          user_id={userid}
          institute_id={instituteid}
          is_owner={isowner}
          onPress={closeCreateTransactionFormHandler}
          transaction_type={transaction_type}
          due_amount={due_amount}
          amount={amount}
        />

      }









      <div className={classes.downLoadButtonDiv} >

        {<button onClick={handleDownloadPdf} type="button" className={classes.downLoadButton}><BsDownload size={20} /></button>}
        {isowner && <>
          <button type="button" className={classes.deletePaymentButton} onClick={deletePaymentHandler}> <BsTrash size={16} /> </button>

          <button type="button" className={classes.deletePaymentButton}> <BiEdit size={18} /> </button>
        </>
        }
      </div>
      <header className={classes.Header}>
        {oneScheduledPayment !== null &&
          <img src={oneScheduledPayment.institute.logo} alt="Institute Logo" className={classes.Logo} />
        }
        <div className={classes.HeaderContent}>
          <h1 className={classes.InstituteName}>{oneScheduledPayment !== null && oneScheduledPayment.institute.name}</h1>

        </div>
      </header>
      <h2 className={classes.ReportHeading}> Detail payment report </h2>

      <hr style={{ color: 'lightgrey', height: '1px' }} />
      <div className={classes.SubHeader}>
        <h2>Payment Schedule Details</h2>
        <div style={{ display: "flex", alignItems: "center" }}>Schedule Date: <span className={classes.ScheduleDate}>
          {dateString !== null && DateFormatter({ dateString })}
        </span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}> Type of Payment: <span className={classes.ScheduleDate}>
          {oneScheduledPayment !== null && oneScheduledPayment.type_transaction}
        </span>
        </div>




        <p>Status:
          <span className={classes.Status}>
            {oneScheduledPayment !== null && oneScheduledPayment.status}
          </span></p>
        <p>Total  Amount: <span className={classes.TotalAmount}>{oneScheduledPayment !== null && oneScheduledPayment.amount}</span></p>
        <p>Total Amount Paid: <span className={classes.TotalAmount}>{oneScheduledPayment !== null && oneScheduledPayment.amount - oneScheduledPayment.due_amount}</span></p>
        <p>Dues: <span className={classes.Dues}>{oneScheduledPayment !== null && oneScheduledPayment.due_amount}</span></p>

      </div>

      <div className={classes.senderReceiverDiv}> <span style={{ color: "var(--themeColor)", marginRight: "20px" }}> Sender: </span>
        {oneScheduledPayment !== null && oneScheduledPayment.type_transaction === "debit" && oneScheduledPayment.institute.name}
        {oneScheduledPayment !== null && oneScheduledPayment.type_transaction === "credit" && userOrcustomuser}
      </div>
      <div className={classes.senderReceiverDiv}> <span style={{ color: "var(--themeColor)", marginRight: "20px" }}> Receiver: </span>
        {oneScheduledPayment !== null && oneScheduledPayment.type_transaction === "debit" && userOrcustomuser}
        {oneScheduledPayment !== null && oneScheduledPayment.type_transaction === "credit" && oneScheduledPayment.institute.name}
      </div>


      <div className={classes.ReceiverDiv}>

        <div> Receiver account details </div>


      </div>




      <p className={classes.Description}><strong>Description:</strong> {oneScheduledPayment !== null && oneScheduledPayment.description}</p>



      <div className={classes.TransactionStatement}>
        <h2 style={{ display: "flex", alignItems: "center" }}>List of Transactions
          {isowner_or_admin &&
            <button type="button" className={classes.addTransactionButton} onClick={showCreateTransactionFormHandler}> +Add a Transaction  </button>
          }
        </h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Amount</th>
              <th>Transaction Type</th>
              <th>Transaction Date</th>
              <th>Transaction Method</th>
              <th>Transaction Invoice</th>
            </tr>
          </thead>
          <tbody>


            {oneScheduledPayment !== null && oneScheduledPayment.institute_transactions.map((transaction, index) => {


              return <tr key={index} className={transaction.creditDebit === 'Credit' ? classes.Credit : classes.Debit}>
                <td>{transaction.transaction_id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.transaction_type}</td>
                <td>{formatDate(transaction.date_of_payment)}</td>
                <td>{transaction.method}</td>
                <td style={{ display: "flex", justifyContent: "center", height: "100%" }}>
                  <button type="button" className={classes.downloadButtonInvoice}> <BsDownload size={18} /> </button>
                </td>
              </tr>



            })
            }


          </tbody>
        </table>
      </div>

      {/*
      <div className={classes.TransactionStatement}>
        <h2>Amount  Paid</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Transaction Amount</th>
              <th>Transaction Type</th>
              <th>Transaction Date</th>
              <th>Transaction Method</th>
              <th>Salary Slip</th>
            </tr>
          </thead>
          <tbody>
            {transactionsPaid.map((transaction, index) => (
              <tr key={index} className={transaction.creditDebit === 'Credit' ? classes.Credit : classes.Debit}>
                <td>{transaction.transactionId}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.creditDebit}</td>
                <td>{transaction.date}</td>
                <td>{transaction.paymentMethod}</td>
                <td><img src={p2} alt="Download Invoice" className={classes.InvoiceIcon} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      */}


    </div>
  );
}

export default App;
