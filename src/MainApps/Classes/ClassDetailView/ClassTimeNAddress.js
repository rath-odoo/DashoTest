import classes from "./ClassTimeNAddress.module.css";

import { BsLink45Deg } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

import { MdLocationOn } from "react-icons/md";




const formatDate = (inputDateTime) => {
  const dateTime = new Date(inputDateTime);
  
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const formattedDateTime = dateTime.toLocaleString('en-US', options);
  return formattedDateTime;
};






const ClassTimeNAddress=(props)=> {



  let inputDateTime = props.oneClass.datetime;

  let dateTime  = formatDate(inputDateTime);


   

   console.log("object time n addrsss: ", props.oneClass.datetime);


  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topmainContainer}>
          <div className={classes.timenAddressContainer}>
            <div className={classes.timeandAddressIcon}>
              <MdLocationOn />
            </div>

            <div className={classes.timenAddressText}>Time And Address</div>
          </div>
          {/*
          <button className={classes.editBtnContainer}>
            <BsPencilSquare className={classes.editbutton} />

            <div className={classes.editText}>Edit</div>
          </button>
	  */}
        </div>

        <div className={classes.mainContainer}>
          <div className={classes.timeandAddressDetails}>
            <div className={classes.timeandAddressContianer}>
              <div className={classes.time}>{dateTime} {", "}{props.oneClass.duration+" mins"}</div>
            </div>

            <div className={classes.addressContainer}>
              <div className={classes.addressLine1}>Location:  {props.oneClass.address}</div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ClassTimeNAddress;
