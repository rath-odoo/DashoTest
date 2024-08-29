import React, { useState, useEffect } from "react";
import classes from "./SchedulePaymentForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import Logo from '../../../CommonApps/Logo'
import {  getusersfromnames,  scheduleinstitutepayment } from '../../../CommonApps/AllAPICalls';
import { TimeField, TextInput, 
	 NumberInput, DateField, 
	 TextInputInstitute, 
	 ParagraphField, 
	 TextInputAddSpeaker, 
	 OptionField, 
	 CustomTimePicker,
         TextInputAddMemberForPayment} from './../../../CommonApps/FormInputObjects';

import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import moment from 'moment-timezone';

import { BsArrowDownUp } from "react-icons/bs";


const convertToUtcTimeold = ({year, month, day, hour, minute, ampm}) => {
    const formattedHour = parseInt(hour, 10) + (ampm === 'PM' ? 12 : 0);
    const formattedMinute = parseInt(minute, 10);

    if (isNaN(formattedHour) || isNaN(formattedMinute)) {
      //setUtcTime('Invalid input');
      return;
    }

    const istMoment = moment.tz(
      {
        year: moment().year(),
        month: moment().month(),
        date: day,
        hour: formattedHour,
        minute: formattedMinute,
      },
      'Asia/Kolkata' // IST timezone
    );

    //const utcTime = istMoment.clone().tz('UTC').format('HH:mm:ss z');
    const utcTime = istMoment.clone().tz('UTC').format('YYYY-MM-DD HH:mm:ss z');

    return utcTime;
  };


const convertToUtcTime = ({ year, month, day, hour, minute, ampm }) => {
  let formattedHour = parseInt(hour, 10);
  const formattedMinute = parseInt(minute, 10);

  if (ampm === 'PM' && formattedHour !== 12) {
    formattedHour += 12;
  } else if (ampm === 'AM' && formattedHour === 12) {
    formattedHour = 0;
  }

  if (isNaN(formattedHour) || isNaN(formattedMinute)) {
    return 'Invalid input';
  }

  const localMoment = moment.tz(
    {
      year,
      month: month - 1, // moment.js months are 0-indexed
      day,
      hour: formattedHour,
      minute: formattedMinute,
    },
    moment.tz.guess() // Automatically detect the local timezone
  );

  const utcTime = localMoment.clone().tz('UTC').format('YYYY-MM-DD HH:mm:ss z');
  return utcTime;
};


const SchedulePaymentForm = (props) => {

  const [addedUser, setAddedUser] = useState({});
  const [submissionState, setSubmissionState] = useState("notSubmitted");
  const [paymentScheduleStatus, setPaymentScheduleStatus] = useState("notScheduled");

  const [time, setTime] = useState({
      hour:"hh",
      minute:"mm",
      ampm:"AM"
     });




  let institute_ = {id: props.selectedInstitute.id,name: null, type:"Receiver" };
  let user_ = {id: null, name: null, type:"Sender"};

  const [sendReceiveInfo, setSendReceiveInfo] = useState({"Institute":"Sender","User":"Receiver"});	
  
  const initialFormData = Object.freeze({
    amount: "",
    description:"",
    date_of_schedule:"",
    //user:"",
    custom_user:"",
    institute:props.selectedInstitute.id,
    type_transaction:"debit",
    due_amount:"",
    installments:"[]"
  });




  const [formData, updateFormData] = useState(initialFormData)

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };


  console.log("formData: ", formData);
  console.log("addedUser: ", addedUser);	

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if(formData.user ===""){
    //  alert("Please select name");
    //  return null;
   // }
   
    if (Object.keys(addedUser).length === 0 && formData.custom_user===""){

      alert("Please fill both sender and receiver");
      return null;


    }



    if(formData.amount===""){
     alert("Please enter amount");
     return null;
    } 
 
    if(formData.date_of_schedule ===""){

     alert("Please enter date");
     return null;
    }


    if(time.hour === "hh"){
             alert('please select hour ');
             return null;
          }

          if(time.minute === "mm"){
             alert('please select minute ');
              return null;
          }






    setPaymentScheduleStatus("scheduling");


          let year = formData.date_of_schedule.split('-')[0];
          let month = formData.date_of_schedule.split('-')[1];
          let day = formData.date_of_schedule.split('-')[2];

          let ampm = time.ampm;
          let minute = time.minute;
          let hour = time.hour;

          let utcTime=convertToUtcTime({year, month, day, hour, minute, ampm});

          let utcTimeTZformat = utcTime.split(" ")[0]+"T"+utcTime.split(" ")[1]+"Z";


     let paymentForm = new FormData();
	
     let institute_id = props.selectedInstitute.id;
     let admin_user_id = props.userData.id;
     //2024-05-15T12:30:45Z
     paymentForm.append("scheduled_for","sh");
     paymentForm.append("type_transaction", sendReceiveInfo.Institute === "Sender"? "debit": "credit");
     paymentForm.append("amount",formData.amount);
     paymentForm.append("description",formData.description);
     paymentForm.append("date_of_schedule",utcTimeTZformat);

     console.log("utcTimeTZformat shit time: ", utcTimeTZformat);

     if(Object.keys(addedUser).length !==0){
     paymentForm.append("user",addedUser.id);
     paymentForm.append("custom_user","");
     } 
     if(Object.keys(addedUser).length ===0){
     paymentForm.append("user", "");
     paymentForm.append("custom_user",formData.custom_user);
     }


     paymentForm.append("due_amount",formData.amount);
     paymentForm.append("institute",institute_id);
     paymentForm.append("installments","[]");


      console.log("sate: ", utcTimeTZformat);	  
	  
     scheduleinstitutepayment({institute_id, admin_user_id,paymentForm, setPaymentScheduleStatus, props});


  };



  let intervals = ["scheduled", "postponed", "cancelled"]

  let timeintervals = [
    { "name": "Debit", "id": "Debit" },
    { "name": "Credit", "id": "Credit" },
  ]

   

  const [searchUsers, getSearchUsers] = useState([])

  const handleChangeSearch = (e) => {
   e.preventDefault();

    let namestring = e.target.value;
    getusersfromnames({ namestring, getSearchUsers });



  }



  const selectSpeakerHandler = ({ user }) => {
    console.log("user: ", user);

    setAddedUser(addedUser => user);

  }

  console.log("AddedUser: ", addedUser);
  console.log("formData: ", formData);

   //const [sendReceiveInfo, setSendReceiveInfo] = useState({"Institute":"Sender","User":"Receiver"});

   const alterSenderReceiverHandler=()=>{

    setSendReceiveInfo({
      "Institute": sendReceiveInfo["User"],
      "User": sendReceiveInfo["Institute"]
    });	   

   }	


  var today = new Date();

   console.log("formData: ", formData);
   console.log("addedUser: ", addedUser);

   



  return (

    <div className={classes.aboutEditFormDivParent}>

      <form className={classes.aboutEditForm} onSubmit={handleSubmit} style={{ height: "80vh" }}>

        <div className={classes.innerDiv}>

          <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
          </div>

          <div className={classes.logoAndTitleContainer}>
            <div style={{ width: "38px" }}> <Logo /> </div>
            <div className={classes.titleDiv}><i style={{ fontStyle: "normal", marginTop: "30px" }}>  Schedule a payment   </i></div>
          </div>


          <div className={classes.transactionType}> Type of Transaction:  
	     { sendReceiveInfo.Institute === "Receiver" && <span style={{color:"var(--themeColor)"}}> CREDIT </span> }

	     { sendReceiveInfo.Institute === "Sender" && <span style={{color:"red"}}> DEBIT </span> }
	  </div>


          <TextInputInstitute handleChange={handleChange}
                    label={sendReceiveInfo.Institute}
                    name="institute"
                    placeholder="--"
                    defaultValue={props.selectedInstitute.name}
                    disabled={true}
                  />

	  <div style={{height:"10px",width:"100%"}}>  </div>
          <div style={{height:"10px",width:"100%"}}>  </div>

          <button onClick={alterSenderReceiverHandler} type="button" className={classes.alterSenderReceiver}>
            <span style={{marginRight:"10px", color:"white"}}>Alter Sender and Receiver</span>
            { sendReceiveInfo.Institute === "Receiver" &&  <BsArrowDownUp size={20}/> }
            { sendReceiveInfo.Institute === "Sender" &&  <BsArrowDownUp size={20}/> }
          </button>

          <TextInputAddMemberForPayment
                  handleChange={handleChangeSearch}
                  label={sendReceiveInfo.User}
                  name="custom_user"
                  placeholder="Search by name within your institute"
                  searchUsers={searchUsers}
                  selectedSpeaker={selectSpeakerHandler}
                  addedUser={addedUser}
                  getSearchUsers={getSearchUsers}
                  setAddedUser={setAddedUser}
                  width="100%"
	          selectedInstitute={props.selectedInstitute}
	          updateFormData={updateFormData}
	          formData={formData}
                  />

          

          <NumberInput handleChange={handleChange}
                  label="Amount"
                  name="amount"
                  placeholder="40000"
                  defaultValue={""}
                  />
	 
          <div style={{height:"10px",width:"100%"}}>  </div>

	  <div className={classes.timeDateDiv}>
           <CustomTimePicker time={time} setTime={setTime} width="200px" requirement="*"/>


           <DateField handleChange={handleChange}
                    label="Date of Schedule "
                    name="date_of_schedule"
                    placeholder="Enter course start date"
                    defaultValue={today}
                    width="200px"
                   />

           </div>

          <div style={{height:"10px",width:"100%"}}>  </div>

          <ParagraphField
	         label="Description"
	         name="description"
	         placeholder="Course fee for 'classical physics'"
	         defaultValue={""}
	         handleChange={handleChange}
	         />

          <div className={classes.submitButtonDiv}>
	   { paymentScheduleStatus === "notScheduled" && 
            <button type="submit" className={classes.submit_button} >
              <b> Schedule </b>
            </button>
           }

           { paymentScheduleStatus === "scheduling" &&
            <button type="submit" className={classes.submit_button} disabled={true} >
              <b> Scheduling </b>
            </button>
           }


	   { paymentScheduleStatus === "scheduled" &&
            <button type="submit" className={classes.submit_button} disabled={true} >
              <b> Scheduled Successfully! </b>
            </button>
           }


          </div>
        </div>
      </form>

    </div>
  );

}


export default SchedulePaymentForm;
