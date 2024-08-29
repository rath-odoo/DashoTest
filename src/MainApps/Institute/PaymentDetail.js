import React from 'react';
import classes from './PaymentDetail.module.css';
import p1 from './instagram.png';
import p2 from './instagram.png';

function App() {
  const transactionsReceived = [
    { date: '2024-05-01', time: '10:30 AM', creditDebit: 'Credit', fromTo: 'Akashya', transactionId: '123456', amount: '₹11000', paymentMethod: 'UPI' },
    { date: '2024-05-02', time: '11:45 AM', creditDebit: 'Credit', fromTo: 'Akashya', transactionId: '789012', amount: '₹15000', paymentMethod: 'Bank Transfer' },
    { date: '2024-05-03', time: '1:15 PM', creditDebit: 'Credit', fromTo: 'Akashya', transactionId: '345678', amount: '₹1475', paymentMethod: 'Cheque' },
    { date: '2024-05-04', time: '2:30 PM', creditDebit: 'Credit', fromTo: 'Akashya', transactionId: '901234', amount: '₹3000', paymentMethod: 'UPI' },
    { date: '2024-05-05', time: '4:45 PM', creditDebit: 'Credit', fromTo: 'Akashya', transactionId: '567890', amount: '₹12000', paymentMethod: 'Bank Transfer' },
  ];

  const transactionsPaid = [
    { date: '2024-05-01', time: '10:30 AM', creditDebit: 'Debit', fromTo: 'Institute', transactionId: '123456', amount: '₹20000', paymentMethod: 'Bank Transfer' },
    { date: '2024-05-02', time: '11:45 AM', creditDebit: 'Debit', fromTo: 'Institute', transactionId: '789012', amount: '₹18000', paymentMethod: 'UPI' },
    { date: '2024-05-03', time: '1:15 PM', creditDebit: 'Debit', fromTo: 'Institute', transactionId: '345678', amount: '₹9500', paymentMethod: 'Cheque' },
    { date: '2024-05-04', time: '2:30 PM', creditDebit: 'Debit', fromTo: 'Institute', transactionId: '901234', amount: '₹5000', paymentMethod: 'Bank Transfer' },
    { date: '2024-05-05', time: '4:45 PM', creditDebit: 'Debit', fromTo: 'Institute', transactionId: '567890', amount: '₹7000', paymentMethod: 'UPI' },
  ];

  const totalReceived = transactionsReceived.reduce((total, transaction) => {
    return transaction.creditDebit === 'Credit' ? total + parseInt(transaction.amount.replace('₹', ''), 10) : total;
  }, 0);

  const totalPaid = transactionsPaid.reduce((total, transaction) => {
    return transaction.creditDebit === 'Debit' ? total + parseInt(transaction.amount.replace('₹', ''), 10) : total;
  }, 0);

  const dues = totalReceived - totalPaid;

  return (
    <div>
       
      <header className={classes.Header}>
        
        <img src={p1} alt="Institute Logo" className={classes.Logo} />
        <div className={classes.HeaderContent}>
          <h1 className={classes.InstituteName}>NIT Institute Hydrabad</h1>
          
        </div>
      </header>
      <h2 className={classes.ReportHeading}>Detailed Payment Report</h2>

      <hr/ >
      <div className={classes.SubHeader}>
  <h2>Salary Schedule Details</h2>
  <p>Schedule Date: <span className={classes.ScheduleDate}>12-05-2024</span></p>
  <p>Status: <span className={classes.Status}>Paid</span></p>
  <p>Total Salary Amount: <span className={classes.TotalAmount}>{totalPaid}</span></p>
  <p>Total Amount Paid: <span className={classes.TotalAmount}>{totalPaid}</span></p>
  <p>Dues: <span className={classes.Dues}>{dues}</span></p>
  
</div>
<p className={classes.Description}><strong>Description:</strong> This payment is for the course of <span className={classes.Course}>Basic Concept of Physics</span> From <span className={classes.Institute}>NIT Institute, Hydrabad</span>.</p> 



      <div className={classes.TransactionStatement}>
        <h2>Amount Received</h2>
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
            {transactionsReceived.map((transaction, index) => (
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

      <div className={classes.SubHeader}>
        <h2>Salary Schedule Details</h2>
        <p>Schedule Date: <span className={classes.ScheduleDate}>12-05-2024</span></p>
        <p>Status: <span className={classes.Status}>Paid</span></p>
        <p>Total Salary Amount: <span className={classes.TotalAmount}>{totalPaid}</span></p>
        <p>Total Amount Paid: <span className={classes.TotalAmount}>{totalPaid}</span></p>
        <p>Dues: <span className={classes.Dues}>{dues}</span></p>
      </div>

      <div className={classes.TransactionStatement}>
        <h2>Salary Paid</h2>
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
     
    </div>
  );
}

export default App;
