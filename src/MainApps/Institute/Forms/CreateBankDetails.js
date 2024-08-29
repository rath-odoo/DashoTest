import { useState } from 'react';
import axios from 'axios';
import classes from './CreateBankDetails.module.css';
import Logo from '../../../CommonApps/Logo';
import { addBankDetails } from '../../../CommonApps/AllAPICalls';

const CreateBankDetails = (props) => {
  const { institute, user } = props.memberDetails;
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [upiId, setUpiId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (event) => {
    
    event.preventDefault();
    const bankDetails = {
      bank_name: bankName,
      bank_account_number: accountNumber,
      ifsc_code: ifscCode,
      upi_id: upiId,
      phone_number: phoneNumber,
    };
    addBankDetails(institute.id, user.id, bankDetails ,props)
      .then((response) => {
        console.log('Bank details added successfully:', response.data);
        props.onClose();
      })
      .catch((error) => {
        console.error('Error adding bank details:', error.response ? error.response.data : error.message);
      });
  };
 



  const handleCloseButtonClick = () => {
    props.onClose();
  };
  
 


  return (
    <div className={classes.overlay} > 
    <div className={classes.warningBlock} >
      <div>
        <div className={classes.closeBtnOuter}>
          <div className={classes.closeBtn} onClick={handleCloseButtonClick}  >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
            </svg>
          </div>
        </div>

        <div className={classes.logo}>
          <Logo />
        </div>

        <div className={classes.heading}>
          Add Bank Details
        </div>

        <form onSubmit={handleSubmit}>
          <div className={classes.datesContainer}>
            <div className={classes.dateStart}>
              <label className={classes.label}><span className={classes.redStar}>*</span>Bank Name:</label>
              <input type="text" className={classes.inputStyle} value={bankName} onChange={(e) => setBankName(e.target.value)} required />
            </div>

            <div className={classes.dateStart}>
              <label className={classes.label}><span className={classes.redStar}>*</span>Account Number:</label>
              <input type="number" className={classes.inputStyle} value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} required />
            </div>
          </div>

          <div className={classes.datesContainer}>
            <div className={classes.dateStart}>
              <label className={classes.label}><span className={classes.redStar}>*</span>IFSC Code:</label>
              <input type="text" className={classes.inputStyle} value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} maxLength="11" required />
            </div>

            <div className={classes.dateStart}>
              <label className={classes.label}><span className={classes.redStar}>*</span>UPI ID:</label>
              <input type="text" className={classes.inputStyle} value={upiId} onChange={(e) => setUpiId(e.target.value)} required />
            </div>

            <div className={classes.dateStart}>
              <label className={classes.label}><span className={classes.redStar}>*</span>Phone Number:</label>
              <input type="number" className={classes.inputStyle} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
          </div>

          <div className={classes.submitContainer}>
            <button className={classes.submitBtn} type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateBankDetails;
