import React, { useState } from 'react';
import classes from './User.module.css';
import { MdOutlineDone } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { updateInOutAttendance } from '../../CommonApps/AllAPICalls';

const User2 = (props) => {
    const [loading, setLoading] = useState(false);

    const submitHandler = (approver_status) => {
        setLoading(true);  
        const instituteId = props.item.institute.id;
        const userId = props.userData.id;
        const attendanceId = props.item.id;

        updateInOutAttendance({
            instituteId,
            userId,
            attendanceId,
            formData: {
                in_time: props.item.in_time,
                out_time: props.item.out_time,
                status: props.item.status,
                remarks: props.item.remarks,
                approver_status: approver_status
            },
            props,
            setLoading
        });
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return classes.pending;
            case 'approved':
                return classes.approved;
            case 'rejected':
                return classes.rejected;
            case 'na':
                return classes.na;
            default:
                return '';
        }
    };

    return (
        <div className={classes.mainData}>
            {loading && <div className={classes.loadingBar}>Updating...</div>}
            <div className={classes.date}>{props.item.start_date}</div>
            <div className={classes.nameuser}>
                <img src={props.item.member.profile_image} className={classes.imgContainer} alt="Profile" />
                <div className={classes.nameContainer}>
                    {props.item.member.firstname + " " + props.item.member.lastname}
                </div>
            </div>
            <div className={classes.inTime}>{props.item.in_time}</div>
            <div className={classes.outTime}>{props.item.out_time}</div>
            <div className={classes.absent}>{props.item.status}</div>
            <div className={`${classes.absent} ${getStatusClass(props.item.approver_status)}`}>
                {props.item.approver_status}
            </div>
            <div className={classes.Edit}>
            {loading && <div className={classes.loadingBar}>Updating...</div>}
                <AiFillCloseCircle className={classes.wrong} size={20} onClick={() => { submitHandler("rejected") }} />
               
                <MdOutlineDone className={classes.okay} size={20} onClick={() => { submitHandler("approved") }} />
            </div>
        </div>
    );
};

export default User2;