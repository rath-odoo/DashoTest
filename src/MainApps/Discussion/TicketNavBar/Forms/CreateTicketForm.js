import React, { useState, useEffect, CSSProperties } from "react";
import classes from "./CreateCourseForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import logoImage from '../../../../CommonApps/BWlogo.JPG'
import { OptionField, OptionFieldSubmitValue, OptionFieldSecondaryObjs, ParagraphField, TextInput, DateField } from '../../../../CommonApps/FormInputObjects';
import { getticketcategorybyId } from '../../../../CommonApps/AllAPICalls';
import { getalltickets, getticketscategory, createticket } from '../../../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/BeatLoader";
const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        fontSize: "10px",
};







const CreateTicketForm = (props) => {



        let color = "white";

        const [data, setData] = useState({});
        const [createState, setCreateState] = useState("notCreating");

        const [categoryData, getCategoryData] = useState([{ "id": 1, "name": "N/A" }]);
        let PriorityOptions = [{ "id": "Low", "name": "Low" }, { "id": "Medium", "name": "Medium" }, { "id": "High", "name": "High" }, { "id": "Critical", "name": "Critical" }]
        let visibilityOptions = [{ "id": "Public", "name": "Public" }, { "id": "Private", "name": "Private" }]

        useEffect(() => {
                let courseId = props.selectedCourse[0].id;
                console.log("courseId: ", courseId);
                getticketcategorybyId({ courseId, getCategoryData });
        }, []);







        //'title','category','priority','visibility','content'

        const initialFormData = Object.freeze({


                title: null,
                category: null,
                priority: null,
                visibility: null,
                content: "",

        });



        const [formData, updateFormData] = useState(initialFormData)

        const handleChange1 = (e) => {
                //console.log('classname', e.target.value);
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                });
        };







        const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                });
        }







        const handleSubmit = async (e) => {
                e.preventDefault();
                if (formData.title === null) {
                        alert('Please enter title');
                        return;
                }
                if (formData.category === null) {
                        alert('Please choose category');
                        return;
                }
                if (formData.priority === null) {
                        alert('Please choose priority');
                        return;
                }
                if (formData.visibility === null) {
                        alert('Please choose visibility');
                        return;
                }

                setCreateState("Creating");

                try {
                        let course_id = props.selectedCourse[0].id;
                        let user_id = props.userData.id;
                        await createticket({ formData, course_id, user_id, props });
                        setCreateState("Created");
                } catch (error) {
                        console.error("Error creating ticket:", error);
                        setCreateState("notCreating");
                }
        };


        //console.log("formData: ", formData);

        var today = '2022-10-01';//new Date();



        return (

                <div className={classes.createTicketFormDivParent}>

                        {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}


                        {
                                <form className={classes.createTicketForm} onSubmit={handleSubmit}>

                                        <div className={classes.marginDivForm}>

                                                {/*form close button below*/}
                                                <div className={classes.closeButtonDiv}>
                                                        <button onClick={props.onPress} className={classes.closeFormButton}>
                                                                <AiFillCloseCircle className={classes.closeButtonIcon} />
                                                        </button>
                                                </div>


                                                {/*logo and field title container below*/}
                                                <div className={classes.logoAndTitleContainer}>
                                                        <div className={classes.formTitleDiv}><i>  Start a discussion </i></div>
                                                </div>



                                                <TextInput handleChange={handleChange}
                                                        label="Title"
                                                        placeholder="e.g. Can exam be postponed to next month? "
                                                        name="title"
                                                        requirement="*"
                                                        defaultValue=""
                                                />




                                                <div className={classes.optionContainers}>
                                                        <OptionField handleChange={handleChange}
                                                                label="Category"
                                                                name="category"
                                                                options={categoryData}
                                                                requirement="*"
                                                        />

                                                        <OptionField handleChange={handleChange}
                                                                label="Priority"
                                                                name="priority"
                                                                options={PriorityOptions}
                                                                requirement="*"
                                                        />

                                                        <OptionField handleChange={handleChange}
                                                                label="Visibility"
                                                                name="visibility"
                                                                options={visibilityOptions}
                                                                requirement="*"
                                                        />
                                                </div>



                                                <ParagraphField label="About the course"
                                                        name="content"
                                                        placeholder="Short description..."
                                                        handleChange={handleChange}
                                                        defaultValue=""
                                                />



                                                <div className={classes.submitButtonDiv}>

                                                        {createState === "Creating" &&
                                                                <button type="submit" className={classes.submit_button} disabled={true}>
                                                                        <FadeLoader color={color} loading={true} css={override} size={10} />
                                                                        Creating ...
                                                                </button>
                                                        }

                                                        {createState === "notCreating" &&
                                                                <button type="submit" className={classes.submit_button} ><b>
                                                                        Create </b>
                                                                </button>
                                                        }
                                                        {createState === "Created" && (
                                                                <button type="button" className={classes.submit_button} disabled={true}>
                                                                        Created
                                                                </button>
                                                        )}

                                                </div>




                                        </div>

                                </form>

                        }


                </div>
        );

}


export default CreateTicketForm;
