import React from 'react';
import classes from './DetailView.module.css';
import { BsArrowLeft } from 'react-icons/bs';

function App(props) {
  const contacts = [
    { number: '9862829992', status: 'Delivered' },
    { number: '7382920202', status: 'Delivered' },
    { number: '7383933033', status: 'Failed' },
    { number: '83930430036', status: 'Failed' },
    { number: '92732328937', status: 'Pending' },
    { number: '65327328937', status: 'Delivered' },
    { number: '9123456789', status: 'Delivered' },
    { number: '9123456790', status: 'Pending' },
    { number: '9123456791', status: 'Failed' },
    { number: '9123456792', status: 'Delivered' },
    { number: '9123456793', status: 'Pending' },
    { number: '9123456794', status: 'Failed' },
    { number: '9123456795', status: 'Delivered' },
    { number: '9123456796', status: 'Delivered' },
    { number: '9123456797', status: 'Pending' },
    { number: '9123456798', status: 'Failed' },
  ];

  return (
    <div className={classes.app}>

        <div className={classes.backContainer}> 

            <button className={classes.gobackBtn} onClick={props.onBack}><BsArrowLeft /></button> 
        </div>


      <div className={classes.header}>
        <div className={classes.title}>Admission Notification</div>
        <div className={classes.details}>
          <div>Time: 15:20:35</div>
          <div>Date: 12/07/24</div>
          <div>Type: SMS</div>
        </div>
      </div>
      <div className={classes.footer}>
        <div>Delivered: {contacts.filter(c => c.status === 'Delivered').length}</div>
        <div>Total: {contacts.length}</div>
        <div>Pending: {contacts.filter(c => c.status === 'Pending').length}</div>
        <div>Failed: {contacts.filter(c => c.status === 'Failed').length}</div>
      </div>
      
      <div className={classes.message}>
        <p>🏫 R.V. School Admission Alert! 🎓</p>
        <p>Dear Parents/Guardians,</p>
        <p>Admissions for the upcoming academic year at R.V. School are now open! 📝</p>
        <p>📅 Application Deadline: 15 August 2024</p>
        <p>📍 Location: Bangalore</p>
        <p>🕒 Timing: 10:00 a.m</p>
        <p>Secure your child’s future with quality education and excellent facilities. For more details and to apply, visit our website.</p>
        <p>Best Regards,</p>
        <p>R.V. School Administration</p>
      </div>
      <div className={classes.contactlist}>
        <div className={classes.contactlistheader}>
          <div>Contact Number</div>
          <div>Status</div>
        </div>
        {contacts.map((contact, index) => (
          <div key={index} className={classes.contactitem}>
            <div>{contact.number}</div>
            <div className={`${classes.status} ${classes[contact.status.toLowerCase()]}`}>{contact.status}</div>
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default App;