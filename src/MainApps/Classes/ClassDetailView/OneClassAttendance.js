import { useState, useEffect } from 'react';
import classes from './OneClassAttendance.module.css';
import UpdateInstituteAttendanceForm from './Forms/UpdateClassAttendanceForm';
import UpdateClassAttendanceForm from './Forms/UpdateClassAttendanceForm';
import { updateClassCourseAttendance, getCourseAdmins } from '../../../CommonApps/AllAPICalls';



function formatDate(dateString) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const suffixes = ['th', 'st', 'nd', 'rd'];

    const getDayWithSuffix = (day) => {
        if (day > 3 && day < 21) return `${day}th`;
        switch (day % 10) {
            case 1: return `${day} st`;
            case 2: return `${day} nd`;
            case 3: return `${day} rd`;
            default: return `${day} th`;
        }
    };

    const [year, month, day] = dateString.split('-');
    const dayWithSuffix = getDayWithSuffix(parseInt(day, 10));
    const monthName = months[parseInt(month, 10) - 1];

    return `${dayWithSuffix} ${monthName} ${year}`;
}





const OneClassAttendance = (props) => {
    const [showUpdate, setShowUpdateForm] = useState(false);
    const [selected, setSelected] = useState(null);
    const [status, setStatus] = useState(props.oneAttendee.status ?? "");
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
    const getCurrentTimeInIST = () => {
        // Get current time in UTC
        const now = new Date();

        // Convert to IST (UTC + 5:30)
        const offsetIST = 5 * 60 + 30;
        const currentTimeInIST = new Date(now.getTime() + offsetIST * 60000);

        let hours = currentTimeInIST.getHours();
        const minutes = currentTimeInIST.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const strHours = hours.toString().padStart(2, '0');

        return {
            hour: strHours,
            minute: minutes,
            ampm: ampm
        };
    };


    const inTime = getCurrentTimeInIST();
    const outTime = getCurrentTimeInIST();


    const handleUpdateButtonClick = async (status) => {
        const userId = props.userData.id;
        updateClassCourseAttendance({
            userId, formData: {
                attendances: [{
                    attendance_id: props.oneAttendee.id,
                    attendance_date: props.oneAttendee.attendance_date,
                    in_time: convertTo24HourFormat(inTime),
                    out_time: convertTo24HourFormat(outTime),
                    status: status,
                    approver_status: "approved",
                    remarks: ""
                }]
            }, props
        })
        setStatus(status);

    };
    console.log(props.isEnrolledStudent);
    // 
    // const [admins, setAdmins] = useState([]);
    // useEffect(() => {
    //     const fetchAdmins = async () => {
    //         try {
    //             const courseId = props.selectedCourse[0].id;
    //             const data = await getCourseAdmins(courseId);
    //             setAdmins(data);
    //         } catch (error) {
    //             console.error("Error fetching admins:", error);
    //         }
    //     };

    //     fetchAdmins();
    // }, []);
    // const isAdmin = admins.some(admin => admin.id === props.userData.id);
    // const isEnrolledStudent = props.selectedCourse[0].enrolled_students.includes(props.userData.id);
    // const teacherIds = (props.selectedCourse[0].teachers || []).map(teacher => teacher.id);
    // const isTeacher = teacherIds.includes(props.userData.id);
    // console.log("props", isTeacher);

    return (
        <div className={classes.mainData} >
            {/*
            <div className={classes.nu}># </div>
	    */}
            <div className={classes.date}>{formatDate(props.oneAttendee.attendance_date)}</div>
            <div className={classes.parentClass}>            <div className={classes.name}>
                <img src={props.oneAttendee.member.profile_image} className={classes.imgContainer} />
                <div className={classes.nameContainer}>
                    {props.oneAttendee.member.firstname + " " + props.oneAttendee.member.lastname}
                </div>
            </div>

                {/* <div className={classes.inTime}>{props.oneAttendee.in_time}</div>
            <div className={classes.outTime}>{props.oneAttendee.out_time}</div> */}
                <div className={classes.rolwContainer}>
                    {/* {props.oneAttendee.status === "present" &&
                    <div className={classes.present}>
                        <span className={classes.pstyle}> P </span>
                    </div>
                }
                    {props.oneAttendee.status === "absent" &&
                        <div className={classes.absent}>
                            <span className={classes.astyle}> A </span>
                        </div>
                    }

                    {props.oneAttendee.status === "na" &&
                        <div className={classes.notavailable}>
                            <span className={classes.nastyle}> na </span>
                        </div>
                    } */}
                    {props.oneAttendee.status === "present" || props.oneAttendee.status === "absent" ?
                        <>
                            <button disabled={props.isEnrolledStudent}
                                className={`${classes.notavailable} ${classes.present} ${status === 'present' ? classes.selected : ''}`}
                                onClick={() => handleUpdateButtonClick('present')}

                            >
                                Present
                            </button>
                            <button disabled={props.isEnrolledStudent}
                                className={`${classes.notavailable} ${classes.absent} ${status === 'absent' ? classes.selected : ''}`}
                                onClick={() => handleUpdateButtonClick('absent')}
                            >
                                Absent
                            </button>
                        </> : null
                    }

                    {props.oneAttendee.status === "na" && <> <button disabled={props.isEnrolledStudent}
                        className={`${classes.notavailable} ${classes.present} ${status === 'present' ? classes.selected : ''}`}
                        onClick={() => handleUpdateButtonClick('present')}
                    >
                        Present
                    </button><button disabled={props.isEnrolledStudent}
                        className={`${classes.notavailable} ${classes.absent} ${status === 'absent' ? classes.selected : ''}`}
                        onClick={() => handleUpdateButtonClick('absent')}
                    >
                            Absent
                        </button></>}
                </div>


                {/* <div className={classes.Edit} onClick={() => { setShowUpdateForm(true) }}>Update</div> */}
                {
                    showUpdate &&
                    <UpdateClassAttendanceForm
                        oneAttendee={props.oneAttendee}
                        onPress={() => { setShowUpdateForm(false) }}
                        userData={props.userData}
                        render={props.render}
                    />
                }
            </div>
        </div>
    );
}

export default OneClassAttendance;
