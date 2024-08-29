import classes from './UpdateInstituteAttendanceForm.module.css';
import { CustomTimePicker } from '../../../CommonApps/FormInputObjects';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { getListOfApprovalsForLeave, updateAttendance } from '../../../CommonApps/AllAPICalls';

const UpdateInstituteAttendanceForm = (props) => {
    const parseTimeString = (timeString) => {
        const [hourStr, minuteStr, secondStr] = timeString.split(':');
        let hour = parseInt(hourStr, 10);
        const minute = minuteStr;
        let ampm = 'AM';

        if (hour >= 12) {
            ampm = 'PM';
            if (hour > 12) {
                hour -= 12;
            }
        } else if (hour === 0) {
            hour = 12;
        }

        return {
            hour: hour.toString().padStart(2, '0'),
            minute: minute,
            ampm: ampm,
        };
    };
    const convertTo24HourFormat = (timeObj) => {
        let { hour, minute, ampm } = timeObj;
        hour = parseInt(hour, 10);

        if (ampm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            hour = 0;
        }

        return hour.toString().padStart(2, '0') + ":" + minute + ":00";
    };
    const [inTime, setInTime] = useState(props.in_time ? parseTimeString(props.in_time) : { hour: "HH", minute: "MM", ampm: "AM" });
    const [outTime, setOutTime] = useState(props.out_time ? parseTimeString(props.out_time) : { hour: "HH", minute: "MM", ampm: "AM" });
    const [status, setStatus] = useState("");
    const [approverName, setApproverName] = useState("Select an approver");
    const [approverList, setApprovers] = useState(null);
    const [isApproverDropDown, setApproverDropDown] = useState(true);
    const [approverId, setApproverId] = useState(null);



    const [updateStatus, setUpdateStatus] = useState("notUpdated");



    const approverDropDownHandler = () => {
        setApproverDropDown(!isApproverDropDown);
    }
    const changeApproverHandler = (approver) => {
        setApproverId(approver.id);
        setApproverName(approver.firstname+" "+approver.lastname);
        approverDropDownHandler();
    }
    const [formData, setFormData] = useState({
        in_time: '',
        out_time: '',
        status: '',
        remarks: '',
        approver: approverId
    });
    const [remarks, setRemarks] = useState(props.remarks);
    const handleUpdateButtonClick = async () => {

    
     //if( inTime.hour !=="HH"){
     //   alert("Please Enter In-Time: HH");
     //   return null;
      //}
      if (inTime.hour === "HH" || outTime.hour === "HH" || !status || !approverId) {
        alert("Please fill in all the required fields: in time, out time, status, and approver.");
        return;
    }


    const updatedFormData = {
            in_time: convertTo24HourFormat(inTime),
            out_time: convertTo24HourFormat(outTime),
            status: status,
            remarks: remarks || '',
            approver: approverId
        };


       //if(updatedFormData.in_time ===''){
       //  alert("Please Enter In-Time");
       //  return null;
       //}
      
       //if(updatedFormData.out_time ===''){
       //  alert("Please Enter Out-Time");
       //  return null;
       //}
 
       //if(updatedFormData.status ===''){
       //  alert("Please Enter Present/Absent Status");
       //  return null;
       //}
	    
         //setUpdateStatus("Updating");

         setUpdateStatus("Updating");

         await setFormData(updatedFormData); // Update formData state

         // console.log("updatedFormData", updatedFormData);

         // Log formData after it has been updated
    };

    console.log("in_Time: ", inTime);

    useEffect(() => {
        let instituteId = props.attendance.institute.id;
        let userId = props.attendance.member.id;
        getListOfApprovalsForLeave({ instituteId, userId, setApprovers });

    }, []);

    useEffect(() => {
        if (formData.in_time !== "") {
            let instituteId = props.attendance.institute.id;
            let userId = props.attendance.member.id;
            let attendanceId = props.attendance.id;
            updateAttendance({ instituteId, userId, attendanceId, formData, props, setUpdateStatus });
        }

    }, [formData]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    };

    const attendanceDate = formatDate(props.attendance.attendance_date);


    console.log("this is formdata ", formData);

    console.log("for attendance", props.attendance.attendance_date);
    return (

        <div className={classes.overlay}>
            <div className={classes.mainContainer}>
                <div className={classes.closeContainer}>
                    <AiFillCloseCircle className={classes.closeButtonIcon} onClick={props.onPress} />

                </div>



                <div className={classes.inTimeContainer}>

                    <div style={{
                         height:"40px",
                         borderStyle:"none",
                         fontSize:"16px"
                    }}> <b>Update Check-In  and Check-Out</b> </div>




                    <div className={classes.dateContainer}>
                        <label className={classes.label} htmlFor="attendanceDate">Date</label>
                        <input
                            type="date"
                            id="attendanceDate"
                            value={attendanceDate}
                            readOnly
                            className={classes.dateInput}
                        />
                    </div>

                    <div className={classes.timeContainer}>
                        <CustomTimePicker label="In" time={inTime} setTime={setInTime} width="48%" requirement="*" />
                        <CustomTimePicker label="Out" time={outTime} setTime={setOutTime} width="48%" requirement="*" />
                    </div>
                </div>
                <div className={classes.statusContainer}>
                    <div className={classes.statusTextContainer}>
                    <span className={classes.requiredAsterisk}>*</span> Status
                    </div>
                    <div className={classes.presentContainer}>
                        <div className={classes.presentTextContainer}>
                            Present
                        </div>
                        <input
                            type='radio'
                            value="present"
                            checked={status === "present"}
                            className={classes.presentInput}
                            onChange={() => { setStatus("present") }}
                        />
                    </div>


                    <div className={classes.absentContainer}>
                        <div className={classes.absentTextContainer}>
                            Absent
                        </div>
                        <input
                            type='radio'
                            value="absent"
                            checked={status === "absent"}
                            className={classes.absentInput}
                            onChange={() => { setStatus("absent") }}
                        />
                    </div>
                </div>

	        {/* <div style={{
	          height:"40px",
		  borderStyle:"none",
		  width:"90%",
		  display: "flex",
		  justifyContent: "flex-start",
		  alignItems:"center",
		  color:"grey",
		  marginTop:"20px"

		}}> Select Approver</div> */}

                {/* <div className={classes.leavePolicyDiv} onClick={approverDropDownHandler}>
                    <div className={classes.leavePolicyContainer}>                   
                        {approverName}
                    </div>

                </div> */}

                {/* <div className={`${classes.approverDropDownDiv} ${isApproverDropDown ? classes.scaled : ''}`}>
                    {
                        approverList !== null &&
                        approverList.map((approver, index) => {
                            return (
                                <div className={classes.oneApproverMainDiv} onClick={() => changeApproverHandler(approver)}>
                                    <div className={classes.approverImageDiv}>
                                        <img src={approver.profile_image} className={classes.imageContainer} />
                                    </div>
                                    <div className={classes.leavePolicySingleDiv}>
                                        {approver.firstname +" "+approver.lastname} 
                                    </div>

                                </div>
                            )
                        })
                    }

                </div> */}
                <div className={classes.selectApproverContainer}>
                    <label htmlFor="approverDropdown" style={{ color: "grey" }} className={classes.statusTextContainer}><span className={classes.requiredAsterisk}>*</span> Select Approver</label>
                    <select
                        id="approverDropdown"
                        className={classes.approverDropdown}
                        value={approverId || ""}
                        onChange={(e) => {
                            const selectedApprover = approverList.find(approver => approver.id === parseInt(e.target.value));
                            if (selectedApprover) {
                                setApproverId(selectedApprover.id);
                                setApproverName(`${selectedApprover.firstname} ${selectedApprover.lastname}`);
                            }
                        }}
                    >
                        <option value="" disabled>Select an approver</option>
                        {  approverList !== null &&
                        approverList.map((approver, index) => (
                            <option key={approver.id} value={approver.id}>
                                {approver.firstname} {approver.lastname}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={classes.remarkContainer}>
                    <div className={classes.remarkTextContainer} style={{color:"grey"}}>
                        Remarks
                    </div>
                    <textarea className={classes.remarkInput} cols={50} rows={7} defaultValue={props.remarks} onChange={(e) => { setRemarks(e.target.value) }}>

                    </textarea>
                </div>
                <div className={classes.updateButtonContainer}>
	           { updateStatus ==="notUpdated" &&
                    <button className={classes.updateButton} type="button" onClick={handleUpdateButtonClick} >
                        Update
                    </button>
		   }

                   { updateStatus === "Updating" &&

                     <button className={classes.updateButton} type="button" disabled={true} >
                        Updating
                    </button>
                   }

                   { updateStatus === "Updated" &&

                     <button className={classes.updateButton} type="button" disabled={true} >
                        Updated
                    </button>
                   }




                </div>
            </div>
        </div>
    )
}

export default UpdateInstituteAttendanceForm;
