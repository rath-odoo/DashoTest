import classes from "./SingleFeesDetailView.module.css";
import React, { useState } from "react";
import TransactionDetails from "./TransctionDetails";

import {useHistory} from "react-router-dom";



function formatDateString(dateString) {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Extract the day, month, and year from the date object
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();

  // Determine the correct suffix for the day
  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const daySuffix = getDaySuffix(day);

  // Construct the final formatted date string
  return `${day}${daySuffix} ${month} ${year}`;
}




const SingleFeesDetailView=(props)=> {


   const [showPeopleDetails, setPeople] = useState(false);

   const history = useHistory();


   const openNewTab = (path) => {
    const url = window.location.origin + path;
    window.open(url, '_blank');
  };



   const showPeopleDetailsHandler = () => {

    let fee_id = props.onePayment.id;	  
    let path = '/transactions/'+fee_id
    //openNewTab(path);

    history.push({
      pathname: `/transactions/${fee_id}`,
      state: { feeid: fee_id, 
	       userid: props.userData.id , 
	       instituteid : props.onePayment.institute.id, 
	       isowner: props.isOwner ,
	       isowner_or_admin: props.isAdminOrOwner,
	       transaction_type : props.onePayment.type_transaction,
	       due_amount : props.onePayment.due_amount,
	       amount : props.onePayment.amount
             } // Pass user data as state
    });



   };


   console.log("props.isAdminOrOwner: ", props.isAdminOrOwner);

   const dateString = props.onePayment.date_of_schedule;


  console.log("props.onePayment.date_of_schedule: ", props.onePayment.date_of_schedule); 	
   const formattedDate = formatDateString(dateString);
  




  return (
    <div
      className={`${classes.parentContainer} ${
        showPeopleDetails ? classes.active : ""
      }`}
      onClick={showPeopleDetailsHandler}
    >
      <button
      className={`${classes.parentClass} ${showPeopleDetails ? classes.active : ""}`}
      style={{ backgroundColor: showPeopleDetails ? "#207ef5" : "white", borderColor: showPeopleDetails ? "#207ef5" : "#E8E8E8" }}
      onClick={showPeopleDetailsHandler}
      >
      <div className={`${classes.b1} ${showPeopleDetails ? classes.textColor : ""}`}>
        
	  { 'firstname' in props.onePayment.user &&

           props.onePayment.user.firstname+" "+props.onePayment.user.lastname

          }


       
	  { !('firstname' in props.onePayment.user ) && 

            props.onePayment.custom_user

	  }


      </div>
      <div className={`${classes.b2} ${showPeopleDetails ? classes.textColor : ""}`}>{props.onePayment.amount}</div>



      <div className={`${classes.b3} ${showPeopleDetails ? classes.textColor : ""}`}>

	 { (props.isOwner || props.isAdminOrOwner) &&  props.onePayment.type_transaction}

	 { (!props.isOwner && !props.isAdminOrOwner) &&  props.onePayment.type_transaction ==="debit" && "credit"}
	 { (!props.isOwner && !props.isAdminOrOwner) &&  props.onePayment.type_transaction ==="credit" && "debit"}

      </div>


      {/*
      <div className={`${classes.b4} ${showPeopleDetails ? classes.textColor : ""}`}>5,000</div>
      */}
      <div className={`${classes.b5} ${showPeopleDetails ? classes.textColor : ""}`}>{props.onePayment.due_amount}</div>
      <div className={`${classes.b6} ${showPeopleDetails ? classes.textColor : ""}`}>{props.onePayment.status}</div>
      <div className={`${classes.b7} ${showPeopleDetails ? classes.textColor : ""}`}>{props.onePayment.description}</div>
      <div className={`${classes.b7} ${showPeopleDetails ? classes.textColor : ""}`}>{formattedDate}</div>
      <div className={`${classes.b8} ${showPeopleDetails ? classes.textColor : ""}`}>View</div>
    </button>
      {/*showPeopleDetails && (
        <div className={classes.main}>
          <div className={classes.trans}>Transaction</div>

          <div className={classes.TranscationDetailsBox}>
            <div className={classes.Transid}>Transaction Id</div>
            <div className={classes.amt}>Transaction Amount</div>
            <div className={classes.typ}>Transaction Type</div>
            <div className={classes.date}>Transaction Date</div>
            <div className={classes.method}> Transaction Method</div>
            <div className={classes.download}>Transaction Invoice</div>
           
          </div>

          <TransactionDetails />
        </div>
      )*/}
    </div>
  );
}

export default SingleFeesDetailView;
