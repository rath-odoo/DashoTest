import React, { useState, useEffect } from "react";
import classes from "./CreateBatchForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import logoImage from '../../../CommonApps/BWlogo.JPG'
import { ParagraphField, TextInput, DateField } from '../../../CommonApps/FormInputObjects';
import { CheckBoxInput } from './FormInputObjects';
import { getuser, createinstitutebatch, getadmincourses } from '../../../CommonApps/AllAPICalls';
import Logo from '../../../CommonApps/Logo';

//getteachercourses

//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


//const override = css`
//  display: block;
//  margin: 0 auto;
//  border-color: red;
//`;


const CreateBatchForm = (props) => {







        const [checkedCourses, setCheckedCourses] = useState([]);

    const [submitState, setSubmitState] = useState("notSubmitting");


        const [adminCourses, getAdminCourses] = useState(null);


        useEffect(() => {


                getadmincourses({ getAdminCourses });

        }, []);


        console.log("adminCourses: ", adminCourses);
        const initialFormData = Object.freeze({
                name: "",
                start_date: "",
                end_date: "",
                institute: props.selectedInstitute.id,
                created_by: props.userData.id,
                courses: [],

        });



        const [formData, updateFormData] = useState(initialFormData);




        const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        }


        const handleChangePostData = ({ checkedState }) => {


        }

        const [addCoursesDuringBatchCreation, setAddCoursesDuringBatchCreation] = useState(false);


        console.log("formData: ", formData);

        //const [showForm, setShowForm] = useState(true);

        let showForm = true;

        const handleSubmit = (e) => {


                console.log("handle Submit: ");
                e.preventDefault();

                if (formData.name === "") {
                        alert('please enter the name');
                        return null;
                }

                if (formData.start_date === "") {
                        alert('please select the start date');
                        return null;
                }

                if (formData.end_date === "") {
                        alert('please select the end date');
                        return null;
                }

                //let selectedCourseIds=[]
                //props.courseData.forEach((course,index)=>{

                //	 props.courseData.length === checkedCourses.length && checkedCourses[index] && selectedCourseIds.push(course.id);

                //});

                //if(selectedCourseIds.length===0){
                //         alert('You cannot post a notice without selecting a course. If you do not have a course, first create one!');
                //         return null;
                // }

                //let data = props.userData;
                //console.log("formData: ", formData)
                //createnotice({data, formData, selectedCourseIds, props});   

        setSubmitState("submitting");
                createinstitutebatch({ formData, props , setSubmitState});
        };

        var today = new Date();






        return (

                <div className={classes.createTicketFormDivParent}>

                        {/*!showForm &&  
	   <div className={classes.createTicketFormLoading}>

	   <FadeLoader color={color} loading={loading} css={""} size={50}  />
	    
	   <div className={classes.submittingDiv}> Creating . . . </div>
           </div>
   */}


                        {showForm &&
                                <form className={classes.createTicketForm} onSubmit={handleSubmit}>

                                        <div className={classes.closeButtonDiv}>
                                                <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
                                        </div>

                                        <div className={classes.innerDiv}>

                                                {/*form close button below*/}



                                                {/*logo and field title container below*/}
                                                <div className={classes.logoAndTitleContainer}>
                                                        <div> <Logo /></div>
                                                        <div className={classes.formTitleDiv}><i>  Create a Batch </i></div>
                                                </div>



                                                <TextInput label="Batch name" placeholder="Science-Class-11-2024-25" name="name" handleChange={handleChange} />

                                                <div style={{ height: "10px" }}> </div>

                                                <div className={classes.datesDiv}>

                                                        <DateField handleChange={handleChange}
                                                                label="start date"
                                                                name="start_date"
                                                                placeholder="Enter  start date"
                                                                defaultValue={today}
                                                                width="200px"
                                                        />

                                                        <DateField handleChange={handleChange}
                                                                label="end date"
                                                                name="end_date"
                                                                placeholder="Enter  end date"
                                                                defaultValue={today}
                                                                width="200px"
                                                        />

                                                </div>

                                                <div style={{ height: "50px" }}> </div>


                                                {/* { props.courseData.length>0 &&
      <CheckBoxInput 
	     label="Add courses to Batch"  
	     placeholder="jai"  
	     name="postCourses" 
	     handleChange={handleChangePostData} 
	     Courses={props.courseData}   
             setCheckedCourses={setCheckedCourses}  
	     />
     } */}




<div className={classes.submitButtonDiv}>
                            {submitState === "submitting" && (
                                <button type="submit" className={classes.submit_button} disabled={true}>
                                    {/* <FadeLoader color="white" loading={true} css={override} size={10} /> */}
                                    Creating ...
                                </button>
                            )}

                            {submitState === "notSubmitting" && (
                                <button type="submit" className={classes.submit_button}>
                                    <b>Create</b>
                                </button>
                            )}

                            {submitState === "submitted" && (
                                <button type="submit" className={classes.submit_button} disabled={true}>
                                    <b>Created</b>
                                </button>
                            )}
                        </div>






                                                <div className={classes.emptyDiv}>



                                                        dshdfjhd sdns dasd ashda sdhasd asdjas djasd asdas da asd asd
                                                        asd asda asdb sadasdj dDMNASD ASDNBSAD ASDNBADS ADSNBA Dsj dn
                                                        dcnd ASDNAS DJASD AJSDA DBASD ASDB SADBSA dasjdnbqww dwbdw dd


                                                </div>


                                        </div>

                                </form>

                        }


                </div>
        );

}


export default CreateBatchForm;
