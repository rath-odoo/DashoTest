import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./FileForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { putFileInACourse } from "../../../../../CommonApps/AllAPICalls";
import { ParagraphField, TextInput } from "../../../../../CommonApps/FormInputObjects";
import Logo from "../../../../../CommonApps/Logo";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
};





const FileForm = (props) => {



    let color = "white";

    const [editState, setEditState] = useState("notSaving");

    const initialFormData = Object.freeze({

        displayname: "",
        fileaddress: null,
        description: "",

    });

    const [formData, updateFormData] = useState(initialFormData)



    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }
    const handleChangeFile = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
        });
    }





    const handleSubmit = (e) => {
        e.preventDefault();
        let courseId = props.CourseId;
        setEditState("Saving");
        const fileFormData = new FormData();
        fileFormData.append("displayname", formData.displayname);
        fileFormData.append("description", formData.description || "");
        fileFormData.append("fileaddress", formData.fileaddress);
        putFileInACourse({ courseId, fileFormData, setEditState, props });

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

                            <span className={classes.tubeIconText}> Add a file </span></div>
                    </div>
                    <div className={classes.titleDiv}>
                        <TextInput handleChange={handleChange}
                            label="Name"
                            placeholder="Enter the name of the file ( ex:file_name )"
                            name="displayname"
                            requirement="*"
                            defaultValue=""
                        />
                    </div>
                    <div className={classes.LinkDiv}>
                        <input
                            type='file'
                            name='fileaddress'
                            onChange={handleChangeFile}
                        />
                    </div>
                    <div className={classes.descriptionDiv}>
                        <ParagraphField label="Short description"
                            name="description"
                            placeholder="Short description..."
                            handleChange={handleChange}
                            defaultValue=""
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
                    <div className={classes.emptyDiv}>
                        dshdfjhd sdns dasd ashda sdhasd asdjas djasd asdas da asd asd
                        asd asda asdb sadasdj dDMNASD ASDNBSAD ASDNBADS ADSNBA Dsj dn
                        dcnd ASDNAS DJASD AJSDA DBASD ASDB SADBSA dasjdnbqww dwbdw dd
                    </div>
                </form>
            }
        </div>
    );

}
export default FileForm;
