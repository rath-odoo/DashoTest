import { useEffect, useState } from 'react';
import classes from './ApprovalsList.module.css';
import { getApprovalsLeaveList } from '../../../CommonApps/AllAPICalls';
import OneApprovalUser from './OneApprovalUser';

const ApprovalsList = (props) => {
    const [approverList , setApproverList] = useState(null);
    const [status , setStatus] = useState("pending");
    const [render ,setRender] = useState(false);
    useEffect(() => {
        let instituteId = props.institute.id;
        let userId = props.userData.id;
        getApprovalsLeaveList({ instituteId, userId, status, setApproverList })
    },[render])
    return (
        <div className={classes.mainDiv}>
            <div className={classes.toggleContainer}>
                <div className={`${classes.oneToggleDiv} ${status==="pending" ? classes.selected : ''}`}
                    onClick={()=>{
                        setStatus("pending");
                        setRender(!render);
                    }}
                >
                    Pending
                </div>
                <div className={`${classes.oneToggleDiv} ${status==="approved" ? classes.selected : ''}`}
                    onClick={()=>{
                        setStatus("approved");
                        setRender(!render);
                    }}
                >
                    Approved
                </div>
                <div className={`${classes.oneToggleDiv} ${status==="denied" ? classes.selected : ''}`}
                    onClick={()=>{
                        setStatus("denied");
                        setRender(!render);
                    }}
                >
                    Declined
                </div>
            </div>
            <div className={classes.listApprovals}>
                {
                    approverList!==null &&
                    approverList.map((user,index)=>{
                        return(<OneApprovalUser 
                            user={user}
                            institute={props.institute}
                            userData={props.userData}
                            render={()=>setRender(!render)}
                        
                        />)
                    })
                    
                }
            </div>

        </div>
    )
}

export default ApprovalsList;