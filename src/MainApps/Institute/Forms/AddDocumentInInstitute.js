import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./AddDocumentInInstitute.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import { BsFileEarmarkMedical } from 'react-icons/bs';
import { TextInput } from "../../../CommonApps/FormInputObjects";
import Logo from "../../../CommonApps/Logo";
import { putFileInAInstitute } from "../../../CommonApps/AllAPICalls";


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
};





const AddDocumentInInstitute = (props) => {



    let color = "white";

    const [editState, setEditState] = useState("notSaving");

    const initialFormData = Object.freeze({

        name: "",
        docfile: null,

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
        let instituteId = props.selectedInstitute.id;
        let userId = props.userData.id;
        setEditState("Saving");
        const docFormData = new FormData();
        docFormData.append("name",formData.name);
        docFormData.append("docfile",formData.docfile);
        putFileInAInstitute({ instituteId , userId , docFormData , setEditState ,props });

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

                            <span className={classes.tubeIconText}> Add a Document </span></div>
                    </div>
                    <div className={classes.titleDiv}>
                        <TextInput handleChange={handleChange}
                            label="Name"
                            placeholder="Enter the name of the Document ( ex:Document_name )"
                            name="name"
                            requirement="*"
                            defaultValue=""
                        />
                    </div>
                    <div className={classes.LinkDiv}>
                        <input
                            type='file'
                            name='docfile'
                            onChange={handleChangeFile}
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
export default AddDocumentInInstitute;
