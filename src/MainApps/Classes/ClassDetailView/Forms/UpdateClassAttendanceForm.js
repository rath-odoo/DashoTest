import classes from './UpdateClassAttendanceForm.module.css';
import { CustomTimePicker } from '../../../../CommonApps/FormInputObjects';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from "react-icons/ai";
import { updateClassCourseAttendance } from '../../../../CommonApps/AllAPICalls';

const UpdateClassAttendanceForm = (props) => {

    console.log(props);

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

        return hour.toString().padStart(2, '0')+":"+minute+":00";
    };
    const [inTime, setInTime] = useState(props.oneAttendee.in_time ? parseTimeString(props.oneAttendee.in_time) : { hour: "HH", minute: "MM", ampm: "AM" });
    const [outTime, setOutTime] = useState(props.oneAttendee.out_time ? parseTimeString(props.oneAttendee.out_time) : { hour: "HH", minute: "MM", ampm: "AM" });
    const [status, setStatus] = useState(props.status);
    const [remarks, setRemarks] = useState(props.remarks);
    const handleUpdateButtonClick = async () => {
        const userId = props.userData.id;
        updateClassCourseAttendance({userId,formData:{
            attendance_ids: [props.oneAttendee.id],
            attendance_date: props.oneAttendee.attendance_date,
            in_time: convertTo24HourFormat(inTime),
            out_time: convertTo24HourFormat(outTime),
            status: status,
            approver_status: "approved",
            remarks: remarks
          },props
          })
        
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.closeContainer}>
                <AiFillCloseCircle className={classes.closeButtonIcon} onClick={props.onPress} />

            </div>
            <div className={classes.inTimeContainer}>
                <CustomTimePicker label="In" time={inTime} setTime={setInTime} width="200px" requirement="*" />
                <CustomTimePicker label="Out" time={outTime} setTime={setOutTime} width="200px" requirement="*" />
            </div>
            <div className={classes.statusContainer}>
                <div className={classes.statusTextContainer}>
                    Status:
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
            <div className={classes.remarkContainer}>
                <div className={classes.remarkTextContainer}>
                    Remarks
                </div>
                <textarea className={classes.remarkInput} cols={50} rows={7} defaultValue={props.remarks} onChange={(e) => { setRemarks(e.target.value) }}>

                </textarea>
            </div>
            <div className={classes.updateButtonContainer}>
                <button className={classes.updateButton} type="button" onClick={handleUpdateButtonClick}>
                    Update
                </button>
            </div>
        </div>
    )
}

export default UpdateClassAttendanceForm;
