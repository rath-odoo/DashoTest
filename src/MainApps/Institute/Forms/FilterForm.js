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


const convertToUtcTime = ({year, month, day, hour, minute, ampm}) => {
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
  








  const handleChange = (e) => {
  const dateInput = e.target.value.trim(); // The input date (e.g., "2024-01-01")
  let dateTimeString;

  if (e.target.name === "endDate") {
    // Add time component for the end of the day
    const timeComponent = "T23:59:59.999999Z";
    dateTimeString = `${dateInput}${timeComponent}`;
  } else {
    // Add time component for the start of the day
    const timeComponent = "T00:00:00.000000Z";
    dateTimeString = `${dateInput}${timeComponent}`;
  }

  // Update the form data with the new datetime string
  props.updateFormData({
    ...props.formData,
    [e.target.name]: dateTimeString,
  });
};









  console.log("formData: ", props.formData);
  console.log("addedUser: ", addedUser);	

  const handleSubmit = async (e) => {
    e.preventDefault();

   


    if(props.formData.startDate===""){
     alert("Please enter Start Date");
     return null;
    } 
 
    if(props.formData.endDate ===""){

     alert("Please End date");
     return null;
    }



   props.applyFilter();     	  
	  


  };



   var today = new Date();
   

   



  return (

    <div className={classes.aboutEditFormDivParent}>

      <form className={classes.aboutEditForm} onSubmit={handleSubmit} style={{ height: "80vh" }}>

        <div className={classes.innerDiv}>

          <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
          </div>

          <div className={classes.logoAndTitleContainer}>
            <div style={{ width: "38px" }}> <Logo /> </div>
            <div className={classes.titleDiv}><i style={{ fontStyle: "normal", marginTop: "30px" }}>  Filter Options   </i></div>
          </div>


	  <div style={{height:"10px",width:"100%"}}>  </div>
          <div style={{height:"10px",width:"100%"}}>  </div>

           <div style={{display:"flex", justifyContent:"space-between"}}>

           <DateField handleChange={handleChange}
                    label="Start Date"
                    name="startDate"
                    placeholder="Enter course start date"
                    defaultValue={today}
                    width="200px"
                   />

          <DateField handleChange={handleChange}
                    label="End Date"
                    name="endDate"
                    placeholder="Enter course start date"
                    defaultValue={today}
                    width="200px"
                   />

          </div>

          <div style={{height:"10px",width:"100%"}}>  </div>

          <div className={classes.submitButtonDiv}>
	   { paymentScheduleStatus === "notScheduled" && 
            <button type="submit" className={classes.submit_button} >
              <b> Apply </b>
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
