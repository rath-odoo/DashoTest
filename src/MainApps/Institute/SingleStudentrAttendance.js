import React, { useEffect, useState } from 'react';
import classes from './SingleStudentrAttendance.module.css';

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





const SingleStudentrAttendance = ({ student, userId, batchId, rerender }) => {
    const [attendanceData, setAttendanceData] = useState({
        status: 'present',
        in_time: '',
        out_time: '',
        remarks: '',
    });
    return (
        <div>
            <div className={classes.parentDiv}>
                <button className={classes.parentClass}>
                    <div className={classes.date}>{formatDate(student.attendance_date)}</div>
                    <div className={classes.userContainer} >

                        <div className={classes.namenimagediv}>
                            <img src={student.member.profile_image || 'default-image-url'} className={classes.pic} alt="User" />
                            <div className={classes.nameContainer}>{student.member.firstname} {student.member.lastname}</div>
                        </div>
                    </div>
                    <div className={classes.rolwContainer}> {student.status === "present" &&
                        <div className={classes.present}>
                            <span className={classes.pstyle}> P </span>
                        </div>
                    }
                        {student.status === "absent" &&
                            <div className={classes.absent}>
                                <span className={classes.astyle}> A </span>
                            </div>
                        }

                        {student.status === "na" &&
                            <div className={classes.notavailable}>
                                <span className={classes.nastyle}> na </span>
                            </div>
                        }</div>
                    <div className={classes.dateContainer}>{student.remarks}</div>
                    <div className={classes.dateContainer}>{student.in_time}</div>
                    <div className={classes.dateContainer}>{student.out_time}</div>
                    <div className={classes.statusContainer}>

                    </div>
                </button>
            </div>
        </div>
    )
}
export default SingleStudentrAttendance