import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./CreateLeaveForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { FaCaretDown } from "react-icons/fa";
import { CustomTimePicker, DateField, ParagraphField } from "../../../CommonApps/FormInputObjects";
import Logo from "../../../CommonApps/Logo";
import { createLeaveInstitute, getListOfApprovalsForLeave, getLeavePolicyList } from "../../../CommonApps/AllAPICalls";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
};





const CreateLeaveForm = (props) => {



    let color = "white";

    const [editState, setEditState] = useState("notSaving");
    const [leaveType, setLeaveType] = useState('');
    const [leavePolicyName, setLeavePolicyName] = useState("Select the leave policy");
    const [leaveTypeCategory, setLeaveTypeCategory] = useState('');
    const [leavePolicyList, setLeavePolicyList] = useState(null);
    const [approverName, setApproverName] = useState("Select an approver");
    const [approverList, setApprovers] = useState(null);
    const [isApproverDropDown, setApproverDropDown] = useState(false);
    const [isReasonDropDown, setReasonDropDown] = useState(false);
    const [leaveStatus, setLeaveStatus] = useState('');
    const [reason, setReason] = useState("Reason for the leave");

    const handleLeaveTypeChange = (event) => {
        setLeaveType(event.target.value);
        updateForm(event.target.name, event.target.value);
        if (event.target.value === "half_day") {
            updateForm("end_date", formData.start_date);
        }

    };
    useEffect(() => {

        console.log(leaveType);

    }, [leaveType])


    const handleLeaveTypeCategoryChange = (event) => {
        setLeaveTypeCategory(event.target.value);
        updateForm(event.target.name, event.target.value === "Paid" ? true : false);
    };
    const initialFormData = Object.freeze({
        "start_date": "",
        "end_date": "",
        "reason": "",
        "leave_type": "",
        "leave_type_category_id": null,
        "is_paid": null,
        "approver_id": null
    });
    useEffect(() => {
        let instituteId = props.institute.id;
        let userId = props.userData.id;
        getLeavePolicyList({ instituteId, setLeavePolicyList });
        getListOfApprovalsForLeave({ instituteId, userId, setApprovers });
    }, []);

    const [formData, updateFormData] = useState(initialFormData);
    const [isPolicyDropDown, setPolicyDropDown] = useState(false);



    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let instituteId = props.institute.id;
    //     let userId = props.userData.id;
    //     setEditState("Saving");
    //     await createLeaveInstitute({ instituteId, userId, formData, setEditState });
    //     props.render();
    //     props.onPress();
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.start_date === "") {
            alert("Please select a start date");
            return;
        }
        if (formData.end_date === "") {
            alert("Please select an end date");
            return;
        }
        if (formData.leave_type === "") {
            alert("Please select a leave type");
            return;
        }
        if (formData.is_paid === null) {
            alert("Please select if the leave is paid or not");
            return;
        }

        if (formData.leave_type_category_id === null) {
            alert("Please select a leave policy");
            return;
        }
        if (formData.approver_id === null) {
            alert("Please select an approver");
            return;
        }
        if (formData.reason === "") {
            alert("Please enter a reason");
            return;
        }


        let instituteId = props.institute.id;
        let userId = props.userData.id;


        setEditState("Saving");
        createLeaveInstitute({ instituteId, userId, formData, setEditState, props });
        props.render();

    };

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
        updateFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));

    }
    console.log(formData);

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
                                label="Start Date"
                                placeholder="Enter the Start Date of the Leave "
                                name="start_date"
                                requirement="*"
                                defaultValue=""
                            />
                        </div>

                        {/* {formData.leave_type === 'full_day' ? (
                            <div className={classes.titleDiv}>
                                <DateField
                                    handleChange={handleChange}
                                    label="End Date"
                                    placeholder="Enter the Last Date of the Leave"
                                    name="end_date"
                                    requirement="*"
                                    defaultValue=""
                                />
                            </div>
                        ) : (
                            <div className={classes.titleDiv}>
                                <DateField
                                    handleChange={handleChange}
                                    label="End Date"
                                    placeholder="Enter the Last Date of the Leave"
                                    name="end_date"
                                    requirement="*"
                                    defaultValue={formData.start_date || ''}
                                // disabled={formData.leave_type !== 'full_day'}
                                />
                            </div>
                        )} */}
                        <div className={classes.titleDiv}>
                            <DateField
                                handleChange={handleChange}
                                label="End Date"
                                placeholder="Enter the Last Date of the Leave"
                                name="end_date"
                                requirement="*"
                                value={formData.end_date}
                                disabled={formData.leave_type === 'half_day'}
                            />
                        </div>
                    </div>

                    <div className={classes.leaveTypeDiv}>
                        <div className={classes.durationDiv}>
                            <span className={classes.requiredStar}>*</span>Select the type of leave
                        </div>
                        <div className={classes.leaveTypeRadio}>

                            <label >
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="full_day"
                                    checked={leaveType === "full_day"}
                                    onChange={handleLeaveTypeChange}
                                    name="leave_type"

                                />
                                Full Day
                            </label>
                            <label>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="half_day"
                                    checked={leaveType === "half_day"}
                                    onChange={handleLeaveTypeChange}
                                    name="leave_type"
                                />
                                Half Day
                            </label>
                        </div>

                    </div>

                    <div className={classes.leaveTypeDiv}>
                        <div className={classes.durationDiv}>
                            <span className={classes.requiredStar}>*</span>Select the type of leave
                        </div>
                        <div className={classes.leaveTypeRadio}>

                            <label className={classes.leaveTypeRadioPaid}>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="Paid"
                                    checked={leaveTypeCategory === 'Paid'}
                                    onChange={handleLeaveTypeCategoryChange}
                                    name="is_paid"

                                />
                                Paid
                            </label>
                            <label>
                                <input className={classes.leaveTypeRadioFull}
                                    type="radio"
                                    value="Unpaid"
                                    checked={leaveTypeCategory === 'Unpaid'}
                                    onChange={handleLeaveTypeCategoryChange}
                                    name="is_paid"

                                />
                                Unpaid
                            </label>
                        </div>

                    </div>



                    <div className={classes.leavePolicyDiv} onClick={leavePolicyDropDownHandler}>

                        <div className={classes.leavePolicyContainer}>
                            <div> {leavePolicyName}</div>

                            <div><FaCaretDown className={`${classes.animeDown} ${isPolicyDropDown ? classes.spin : ""}`} /></div>


                        </div>

                    </div>
                    <div className={`${classes.leavePolicyDropDownDiv} ${isPolicyDropDown ? classes.scaled : ''}`}>
                        {leavePolicyList !== null && leavePolicyList.length > 0 ? (
                            leavePolicyList.map((leave, index) => (
                                <div className={classes.oneLeavePolicyMainDiv} key={index} onClick={() => changeLeavePolicyNameHandler(leave)}>
                                    <div className={classes.leavePolicySingleDiv}>
                                        {leave.name}
                                    </div>
                                    <div className={classes.totalLeaveCount}>
                                        {leave.total_leaves}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={classes.noLeavePolicy}>
                                Leave policies not available
                            </div>
                        )}
                    </div>
                    {/* <div className={classes.selectApproverContainer}>
                        <label htmlFor="approverDropdown" style={{ color: "grey" }}><span className={classes.requiredAsterisk}>*</span>{leavePolicyName}</label>
                        <select
                            id="approverDropdown"
                            className={classes.approverDropdown}
                            value={approverId || ""}
                            onChange={(e) => {
                                const selectedApprover = approverList.find(approver => approver.id === parseInt(e.target.value));
                                if (selectedApprover) {
                                    setApproverId(selectedApprover.id);
                                    setApproverName(${ selectedApprover.firstname } ${ selectedApprover.lastname });
                                }
                            }}
                        >
                            <option value="" disabled>Select an approver</option>
                            {approverList !== null &&
                                approverList.map((approver, index) => (
                                    <option key={approver.id} value={approver.id}>
                                        {approver.firstname} {approver.lastname}
                                    </option>
                                ))}
                        </select>
                    </div> */}
                    <div className={classes.leavePolicyDiv} onClick={approverDropDownHandler}>
                        <div className={classes.leavePolicyContainertwo}>

                            {approverName}
                            <div><FaCaretDown className={`${classes.animeDown} ${isPolicyDropDown ? classes.spin : ""}`} /></div>
                        </div>

                    </div>

                    <div className={`${classes.approverDropDownDiv} ${isApproverDropDown ? classes.scaled : ''}`}>
                        {approverList !== null && approverList.length > 0 ? (
                            approverList.map((approver, index) => (
                                <div key={index} className={classes.oneApproverMainDiv} onClick={() => changeApproverHandler(approver)}>
                                    <div className={classes.approverImageDiv}>
                                        <img src={approver.profile_image} className={classes.imageContainer} alt="Approver" />
                                    </div>
                                    <div className={classes.leavePolicySingleDiv}>
                                        {approver.firstname}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={classes.noDataMessage}>
                                Approvers not available
                            </div>
                        )}

                    </div>

                    <div className={classes.leavePolicyDiv} onClick={reasonDropDownHandler}>
                        <div className={classes.leavePolicyContainerthree}>
                            <div>{reason}</div>
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
                                Requesting ...
                            </button>
                        }
                        {editState === "notSaving" &&
                            <button type="submit" className={classes.submit_button}><b>
                                Request </b>
                            </button>
                        }
                        {editState === "Saved" &&
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
export default CreateLeaveForm;
