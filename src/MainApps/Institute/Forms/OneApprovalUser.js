import { useState } from 'react';
import classes from './OneApprovalUser.module.css';
import { FaAngleRight } from "react-icons/fa";
import LeaveStatusDropBox from './LeaveStatusDropBox';
import { CiCalendar } from 'react-icons/ci';
const OneApprovalUser = (props) => {

    const [isShowDropBox, setShowDropBox] = useState(false);
    const formattedDate = new Date(props.user.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    const formatDatenew = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formattedStartDate = formatDatenew(props.user.start_date);
    const formattedEndDate = formatDatenew(props.user.end_date);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.innerContainer}>
                <div className={classes.nameContainer}>
                    <div className={classes.nameContainer}>
                        <b>
                            {props.user.user.firstname + " " + props.user.user.lastname}

                        </b>
                    </div>
                    <div className={classes.dateitem}>
                        <CiCalendar className={classes.icon} />
                        <span className={classes.key1}><b>Created at:</b></span> <span className={classes.value}>{formattedDate}</span>

                    </div>
                    <div className={classes.fromToContainer}>
                        <div className={classes.dateitem}>
                            <CiCalendar className={classes.icon} />

                            <span className={classes.key1}><b>From:</b></span> <span className={classes.value}>{formattedStartDate}</span>
                        </div>
                        <div className={classes.dateitem}>
                            <CiCalendar className={classes.icon} />

                            <span className={classes.key1}><b>To:</b></span> <span className={classes.value}>{formattedEndDate}</span>
                        </div>

                    </div>
                    <div className={classes.reasonContainer}>
                        <span className={classes.reason}>Reason: {props.user.reason}</span>
                    </div>


                </div>
                <div className={classes.topRow}>
                    <div className={classes.leavetype}>Half Day</div>
                </div>
                <div className={classes.statusbox}> Paid</div>
                <div className={classes.iconContainer} onClick={() => { setShowDropBox(!isShowDropBox) }}>
                    <FaAngleRight size={30} />
                </div>
                {
                    isShowDropBox &&
                    <LeaveStatusDropBox
                        userData={props.userData}
                        institute={props.institute}
                        user={props.user}
                        render={props.render}
                        onPress={() => { setShowDropBox(!isShowDropBox) }}
                    />
                }
            </div>
        </div>
    )
}

export default OneApprovalUser;