import { useState } from 'react';
import classes from './UserTwo.module.css'; 
import { BiEditAlt } from 'react-icons/bi';




function formatDate(dateString) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const suffixes = ['th', 'st', 'nd', 'rd'];

  const getDayWithSuffix = (day) => {
    if (day > 3 && day < 21) return `${day}th`;
    switch (day % 10) {
      case 1: return `${day}st`;
      case 2: return `${day}nd`;
      case 3: return `${day}rd`;
      default: return `${day}th`;
    }
  };

  const [year, month, day] = dateString.split('-');
  const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));
  const monthName = months[parseInt(month, 10) - 1];

  return `${dayWithSuffix} ${monthName} ${year}`;
}












const User = (props) => {
  console.log(props);
  const [showUpdate, setShowUpdateForm] = useState(false);

  return (
    <div className={classes.mainData} >
      {/*
            <div className={classes.nu}># </div>
	    */}
      <div className={classes.date}>{formatDate(props.attendance.attendance_date)}</div>
      <div className={classes.name}>
        {/* <img alt='a' src={props.attendance.member.profile_image} className={classes.imgContainer} /> */}
        <div className={classes.nameContainer}>
          {props.attendance.member.firstname + " " + props.attendance.member.lastname}
        </div>
      </div>
      <div className={classes.inTime}>{props.attendance.in_time}</div>
      <div className={classes.outTime}>{props.attendance.out_time}</div>
      {props.attendance.status === "present" &&
        <div className={classes.present}>
          <span className={classes.pstyle}> P </span>
        </div>
      }
      {props.attendance.status === "absent" &&
        <div className={classes.absent}>
          <span className={classes.astyle}> A </span>
        </div>
      }

      {props.attendance.status === "na" &&
        <div className={classes.notavailable}>
          <span className={classes.nastyle}> na </span>
        </div>
      }



      {/* {props.attendance.approver_status === "pending" &&
        <div className={classes.approverStatusPending}>
          {props.attendance.approver_status}
        </div>
      }

      {props.attendance.approver_status === "approved" &&
        <div className={classes.approverStatusApproved}>
          {props.attendance.approver_status}
        </div>
      }

{props.attendance.approver_status === "rejected" &&
        <div className={classes.approverStatusApproved}>
          {props.attendance.approver_status}
        </div>
      } */}

<div className={
        props.attendance.approver_status === "approved" ? classes.approverStatusApproved :
        props.attendance.approver_status === "rejected" ? classes.approverStatusRejected :
        
        classes.approverStatusPending
      }>
        {props.attendance.approver_status}
      </div>



 
    
    </div>
  );
}

export default User;
