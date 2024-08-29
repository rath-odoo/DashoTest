import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./CreateLeaveForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { FaCaretDown } from "react-icons/fa";

import { CustomTimePicker, DateField, ParagraphField } from "../../../CommonApps/FormInputObjects";
import Logo from "../../../CommonApps/Logo";
import { createLeaveInstitute, getListOfApprovalsForLeave, getLeavePolicyList, updateLeaveInstitute } from "../../../CommonApps/AllAPICalls";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
};





const UpdateLeaveForm = (props) => {
    let color = "white";

    const [editState, setEditState] = useState("notSaving");
    const [leavePolicyList, setLeavePolicyList] = useState(null);
    const [approverList, setApprovers] = useState(null);
    const [isApproverDropDown, setApproverDropDown] = useState(false);
    const [isReasonDropDown, setReasonDropDown] = useState(false);
    const [reason, setReason] = useState(props.leave.reason ?? "Reason for the leave");

    const handleLeaveTypeChange = (event) => {
        setLeaveType(event.target.value);
    };

    const handleLeaveTypeCategoryChange = (event) => {
        setLeaveTypeCategory(event.target.value);
        setLeaveTypeCategory(event.target.value === "Paid" ? true : false);
    };
    const initialFormData = Object.freeze({
        "start_date": props.leave.start_date,
        "end_date": props.leave.end_date,
        "reason": props.leave.reason,
        "leave_type": props.leave.leave_type,
        "leave_type_category_id": props.leave.leave_type_category_id,
        "is_paid": props.leave.is_paid,
        "approver_id": props.leave.approver_id
    });
    useEffect(() => {
        let instituteId = props.institute.id;
        let userId = props.userData.id;
        getLeavePolicyList({ instituteId, setLeavePolicyList });
        getListOfApprovalsForLeave({ instituteId, userId, setApprovers });
    }, []);

    // const [leaveTypeCategory, setLeaveTypeCategory] = useState(()=>{
    //     leavePolicyList.map((policy)=>{
    //         if(formData.leave_type_category_id===policy.id){
    //             setLeavePolicyName(policy.name)
    //         }
    //     })
    // });
    const [formData, updateFormData] = useState(initialFormData);

    const [leaveTypeCategory, setLeaveTypeCategory] = useState(props?.leave?.leave_type_category_id);
    const [approverName, setApproverName] = useState(props?.leave?.approver?.firstname ?? "");
    const [leavePolicyName, setLeavePolicyName] = useState(props?.leave.leave_policy?.leave_type_name
        ?? "Select the leave policy");
    const [leaveType, setLeaveType] = useState(props?.leave?.leave_type);

    console.log(props)

    const [isPolicyDropDown, setPolicyDropDown] = useState(false);



    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),

        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let instituteId = props.institute.id;
        let userId = props.userData.id;
        let leaveId = props.leave.id;
        updateForm("is_paid", leaveTypeCategory === "Paid" ? true : false);
        updateForm("leave_type", leaveType);
        setEditState("Saving");
        await updateLeaveInstitute({ instituteId, userId, leaveId, formData, setEditState });
        props.render();
        props.onPress();
    }

    const changeLeavePolicyNameHandler = (leave) => {

        setLeavePolicyName(leave.name);
        updateForm("leave_type_category_id", leave.id);
        leavePolicyDropDownHandler();
    }

    const leavePolicyDropDownHandler = () => {
        setPolicyDropDown(!isPolicyDropDown);
    }

    const changeApproverHandler = (approver) => {
        setApproverName(approver.firstname);
        updateForm("approver_id", approver.id);
        approverDropDownHandler();
    }

    const approverDropDownHandler = () => {
        setApproverDropDown(!isApproverDropDown);
    }
    const reasonDropDownHandler = () => {
        setReasonDropDown(!isReasonDropDown);
    }

    const changeReasonHandler = (reason) => {
        setReason(reason);
        updateForm("reason", reason);
        reasonDropDownHandler();
    }

    const updateForm = (name, value) => {
        updateFormData({
            ...formData,
            [name]: value,

        });

    }
    return (

        <div className={classes.createTicketFormDivParent}>
            {
                <form className={classes.createTicketForm} onSubmit={handleSubmit}>
                    <div className={classes.closeButtonDiv}>
                        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
                    </div>
                    <div className={classes.logoAndTitleContainer}>
                        <div className={classes.logo}>   <Logo /></div>
                        <div className={classes.formTitleDiv}>
                            <BsFileEarmarkMedical className={classes.tubeIcon} />

                            <span className={classes.tubeIconText}> Apply For A Leave </span></div>
                    </div>


                    <div className={classes.dateHolderDiv}>

                        <div className={classes.titleDiv}>
                            <DateField handleChange={handleChange}
                                label="start date"
                                placeholder="Enter the Start Date of the Leave "
                                name="start_date"
                                requirement="*"
                                defaultValue={props.leave.start_date}
                            />
                        </div>
                        <div className={classes.titleDiv}>
                            <DateField handleChange={handleChange}
                                label="end date"
                                placeholder="Enter the Last Date of the Leave "
                                name="end_date"
                                requirement="*"
                                defaultValue={props.leave.end_date}
                            />
                        </div>
                    </div>

                    <div className={classes.leaveTypeDivDay}>
                        <div className={classes.durationDiv}>
                            Select the type of leave
                        </div>
                        <div className={classes.leaveTypeRadioDay}>

                            <label>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="full_day"
                                    checked={leaveType === 'full_day'}
                                    onChange={handleLeaveTypeChange}
                                />
                                Full Day
                            </label>
                            <label>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="half_day"
                                    checked={leaveType === 'half_day'}
                                    onChange={handleLeaveTypeChange}
                                />
                                Half Day
                            </label>
                        </div>

                    </div>

                    <div className={classes.leaveTypeDiv}>
                        <div className={classes.durationDiv}>
                            Select the type of leave category
                        </div>
                        <div className={classes.leaveTypeRadio}>

                            <label >
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="Paid"
                                    checked={leaveTypeCategory}
                                    onChange={handleLeaveTypeCategoryChange}
                                />
                                Paid
                            </label>
                            <label className={classes.leaveTypeRadioFull}>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="Unpaid"
                                    checked={!leaveTypeCategory}
                                    onChange={handleLeaveTypeCategoryChange}
                                />
                                Unpaid
                            </label>
                        </div>

                    </div>



                    <div className={classes.leavePolicyDiv} onClick={leavePolicyDropDownHandler}>
                        <div className={classes.leavePolicyContainer}>

                            <div>{leavePolicyName}</div>

                            <div><FaCaretDown className={`${classes.animeDown} ${isPolicyDropDown ? classes.spin : ""}`} /></div>



                        </div>

                    </div>
                    <div className={`${classes.leavePolicyDropDownDiv} ${isPolicyDropDown ? classes.scaled : ''}`}>
                        {
                            leavePolicyList !== null &&
                            leavePolicyList.map((leave, index) => {
                                return (
                                    <div className={classes.oneLeavePolicyMainDiv} onClick={() => changeLeavePolicyNameHandler(leave)}>
                                        <div className={classes.leavePolicySingleDiv}>
                                            {leave.name}
                                        </div>
                                        <div className={classes.totalLeaveCount}>
                                            {leave.total_leaves}
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className={classes.leavePolicyDiv} onClick={approverDropDownHandler}>
                        <div className={classes.leavePolicyContainer}>

                            <div> {approverName}</div>

                            <div><FaCaretDown className={`${classes.animeDown} ${isPolicyDropDown ? classes.spin : ""}`} /></div>


                        </div>

                    </div>

                    <div className={`${classes.approverDropDownDiv} ${isApproverDropDown ? classes.scaled : ''}`}>
                        {
                            approverList !== null &&
                            approverList.map((approver, index) => {
                                return (
                                    <div className={classes.oneApproverMainDiv} onClick={() => changeApproverHandler(approver)}>
                                        <div className={classes.approverImageDiv}>
                                            <img src={approver.profile_image} className={classes.imageContainer} />
                                        </div>
                                        <div className={classes.leavePolicySingleDiv}>
                                            {approver.firstname}
                                        </div>

                                    </div>
                                )
                            })
                        }

                    </div>

                    <div className={classes.leavePolicyDiv} onClick={reasonDropDownHandler}>
                        <div className={classes.leavePolicyContainer}>
                            {reason}
                            <div><FaCaretDown className={`${classes.animeDown} ${isPolicyDropDown ? classes.spin : ""}`} /></div>

                        </div>

                    </div>

                    <div className={`${classes.reasonDropDownDiv} ${isReasonDropDown ? classes.scaled : ''}`}>
                        <div className={classes.oneReasonMainDiv} onClick={() => changeReasonHandler("sick")}>
                            <div className={classes.leavePolicySingleDiv}>
                                Sick
                            </div>
                        </div>
                        <div className={classes.oneReasonMainDiv} onClick={() => changeReasonHandler("vacation")}>
                            <div className={classes.leavePolicySingleDiv}>
                                Vacation
                            </div>
                        </div>
                        <div className={classes.oneReasonMainDiv} onClick={() => changeReasonHandler("personal")}>
                            <div className={classes.leavePolicySingleDiv}>
                                Personal
                            </div>
                        </div>
                        <div className={classes.oneReasonMainDiv} onClick={() => changeReasonHandler("emergency")}>
                            <div className={classes.leavePolicySingleDiv}>
                                Emergency
                            </div>
                        </div>
                        <div className={classes.oneReasonMainDiv} onClick={() => changeReasonHandler("other")}>
                            <div className={classes.leavePolicySingleDiv}>
                                Other
                            </div>
                        </div>
                    </div>



















                    <div className={classes.submitButtonDiv}>
                        {editState === "Saving" &&
                            <button type="submit" className={classes.submit_button} disabled={true}>
                                <FadeLoader color={color} loading={true} css={override} size={10} />
                                Requested ...
                            </button>
                        }
                        {editState === "notSaving" &&
                            <button type="submit" className={classes.submit_button}><b>
                                Request </b>
                            </button>
                        }
                        {editState === "saved" &&
                            <button type="submit" className={classes.submit_button}><b>
                                Requested </b>
                            </button>
                        }

                    </div>

                </form>
            }
        </div>
    );

}
export default UpdateLeaveForm;
