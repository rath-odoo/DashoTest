import classes from './CreateLeavePolicy.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { NumberInput, TextInput } from "../../../CommonApps/FormInputObjects";
import Logo from "../../../CommonApps/Logo";
import { useState } from 'react';
import { createLeavePolicy, updateLeavePolicy } from '../../../CommonApps/AllAPICalls';


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
};

const UpdateLeavePolicyForm = (props) => {

    let color = "white";


    const initialFormData = Object.freeze({

        new_name: props.leavePolicy.name,
        total_leaves: props.leavePolicy.total_leaves,
    });

    const [formData, updateFormData] = useState(initialFormData)
    const [editState, setEditState] = useState("notSaving");



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
        let leavePolicyId = props.leavePolicy.id;
        setEditState("Saving");
        await updateLeavePolicy({ instituteId, userId, leavePolicyId, formData, setEditState });
        props.render();
        props.onPress();
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

                            <span className={classes.tubeIconText}> Update a Leave Policy </span></div>
                    </div>
                    <div className={classes.titleDiv}>
                        <TextInput handleChange={handleChange}
                            label="Name"
                            placeholder="Enter the name of the leave policy ( ex: casual leaves )"
                            name="new_name"
                            requirement="*"
                            defaultValue={props.leavePolicy.name}
                        />
                    </div>
                    <div className={classes.titleDiv}>
                        <NumberInput handleChange={handleChange}
                            label="Total Leaves"
                            placeholder="Enter the Number of Leaves ( ex:1,2 )"
                            name="total_leaves"
                            requirement="*"
                            defaultValue={props.leavePolicy.total_leaves}
                        />
                    </div>
                    <div className={classes.submitButtonDiv}>
                        {editState === "Saving" &&
                            <button type="submit" className={classes.submit_button} disabled={true}>
                                <FadeLoader color={color} loading={true} css={override} size={10} />
                                Saving ...
                            </button>
                        }
                        {editState === "notSaving" &&
                            <button type="submit" className={classes.submit_button}><b>
                                Save </b>
                            </button>
                        }
                        {editState === "saved" &&
                            <button type="submit" className={classes.submit_button}><b>
                                Saved </b>
                            </button>
                        }

                    </div>
                </form>
            }
        </div>
    )
}

export default UpdateLeavePolicyForm;