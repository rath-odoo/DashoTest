import { postLeaveStatus } from '../../../CommonApps/AllAPICalls';
import classes from './LeaveStatusDropBox.module.css';
import { IoMdClose } from "react-icons/io";


const LeaveStatusDropBox = (props) => {

    const changeStatusHandler = async (status) => {
        let instituteId = props.institute.id;
        let leaveId = props.user.id;
        let userId = props.userData.id;
        await postLeaveStatus({instituteId,leaveId,userId,status});
        props.render();
        props.onPress();
    }


    return (

        <div className={classes.mainDiv}>
            <div className={classes.innerDiv}>
                <div className={classes.closeDiv}>
                    <IoMdClose size={25} onClick={props.onPress}/>
                </div>
                <div className={classes.profileContainer}>
                    <div className={classes.imageContainer}>
                        <img src={props.user.user.profile_image} alt='profile_image' className={classes.imageInput} />
                    </div>
                    <div className={classes.nameContainer}>
                        <b>
                            {props.user.user.firstname + " " + props.user.user.lastname}

                        </b>
                    </div>
                </div>
                <div className={classes.durationContainer}>
                    <div className={classes.fromContainer}>
                        <b>
                            From:
                        </b> &nbsp;
                        {props.user.start_date}
                    </div>
                    <div className={classes.toContainer}>
                        <b>
                            To:
                        </b>&nbsp;
                        {props.user.end_date}
                    </div>
                </div>
                <div className={classes.reasonContainer}>
                    <b>
                        Reason:

                    </b>
                    &nbsp;

                    {props.user.reason}
                </div>
                <div className={classes.statusChangeContainer}>
                    <div className={classes.acceptContainer} onClick={()=>changeStatusHandler("approved")}>
                        Accept
                    </div>
                    <div className={classes.rejectContainer}onClick={()=>changeStatusHandler("denied")}>
                        Reject
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LeaveStatusDropBox;