import { useState, useRef, useEffect } from "react";
import classes from "./OneLeave.module.css";
import { CiMenuKebab } from "react-icons/ci";
import UpdateLeaveForm from "./UpdateLeaveForm";
import { deleteLeave } from "../../../CommonApps/AllAPICalls";
import { CiCalendar } from 'react-icons/ci';
import { CiClock1 } from "react-icons/ci";

const OneLeave = (props) => {

    const [isOptions, setOptions] = useState(false)
    const changeOptionsHandler = () => {
        setOptions(!isOptions);
    }
    const [isShowEditForm, setShowEditForm] = useState(false);
    const editHandler = () => {
        changeOptionsHandler();
        setShowEditForm(!isShowEditForm);
    }
    const deleteHandler = () => {
        let instituteId = props.institute.id;
        let leaveId = props.leave.id;
        let userId = props.userData.id;
        deleteLeave({ instituteId, leaveId, userId });
        changeOptionsHandler();
        props.render();
        setShowDeleteConfirm(false)


    }
    const shouldShowMenu = props.leave.status !== "approved" && props.leave.status !== "denied";
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setOptions(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const createdAt = new Date(props.leave.created_at);


    const formattedDate = createdAt.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    });


    const formattedTime = createdAt.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Kolkata'
    });
    const formatDatenew = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    const formattedStartDate = formatDatenew(props.leave.start_date);
    const formattedEndDate = formatDatenew(props.leave.end_date);
    const getStatusColor = () => {
        switch (props.leave.status) {
            case 'pending':
                return classes.pendingStatus;
            case 'approved':
                return classes.approvedStatus;
            case 'denied':
                return classes.deniedStatus;
            default:
                return '';
        }
    };
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const handleDeleteConfirm = () => {
        setShowDeleteConfirm(true);
    };
    const handleClose = () => {
        setShowDeleteConfirm(false);
    };

    return (

        <div className={classes.mainDiv}>
            <div className={classes.innerDiv}>
                <div className={classes.top}>
                    <span className={classes.reason}>Reason: {props.leave.reason}</span>
                    {shouldShowMenu && (
                        <button className={classes.menuIconDiv} onClick={changeOptionsHandler}>
                            <CiMenuKebab className={classes.menuIcon} />
                        </button>
                    )}
                </div>
                <div className={`${classes.optionsDiv} ${isOptions ? classes.scale : ''}`} ref={dropdownRef}>
                    <div className={classes.editDiv} onClick={editHandler}>
                        Edit
                    </div>
                    <div className={classes.editDiv} onClick={handleDeleteConfirm}  >
                        Delete
                    </div>
                    {showDeleteConfirm && (
                        <div className={classes.overLay}>
                            <div className={classes.confirmDialog}>
                                <p className={classes.p}>Are you sure you want to Remove this Leave?</p>
                                <div className={classes.div1}>
                                    <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                    <button className={classes.deleteYes} onClick={deleteHandler}>Yes, Remove</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className={classes.topRow}>
                    <div className={classes.leavetype}>{props.leave.leave_type === "half_day" ? "Half Day" : "Full Day"}</div>
                </div>
                <div className={classes.details}>
                    <div className={classes.dates}>
                        <div className={classes.create}>
                            <div className={classes.dateitem}>
                                <CiCalendar className={classes.icon} />
                                <span className={classes.key1}><b>Created at:</b></span> <span className={classes.value}>{formattedDate}</span>
                            </div>
                            <div className={classes.dateitem}>
                                <CiClock1 className={classes.icon} />
                                <span className={classes.key1}><b>Time:</b></span> <span className={classes.value}>{formattedTime}</span>
                            </div>
                        </div>
                        <div className={classes.from}>
                            <div className={classes.dateitem}>
                                <CiCalendar className={classes.icon} />

                                <span className={classes.key1}><b>From:</b></span> <span className={classes.value}>{formattedStartDate}</span>
                            </div>
                            <div className={classes.dateitem}>
                                <CiCalendar className={classes.icon} />

                                <span className={classes.key1}><b>To:</b></span> <span className={classes.value}>{formattedEndDate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.status}>
                    <b>Status:</b> <span className={`${getStatusColor()}`}>{props.leave?.status}</span>
                </div>
                <div className={classes.statusbox}>{props.leave?.leave_policy?.is_paid ? "Paid" : "Unpaid"}</div>

                {
                    isShowEditForm &&
                    <UpdateLeaveForm
                        userData={props.userData}
                        render={props.render}
                        institute={props.institute}
                        leave={props.leave}
                        onPress={() => { setShowEditForm(!isShowEditForm) }}

                    />
                }
            </div>
        </div>
    )
}

export default OneLeave;