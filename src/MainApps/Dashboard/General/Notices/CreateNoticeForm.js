import React, { useState, useEffect } from "react";
import classes from "./CreateNoticeForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import logoImage from '../../../../CommonApps/BWlogo.JPG'
import { ParagraphField, TextInput } from '../../../../CommonApps/FormInputObjects';
import { CheckBoxInput } from './FormInputObjects';
import { getuser, createnotice, getAdminCourse } from '../../../../CommonApps/AllAPICalls';
import Logo from '../../../../CommonApps/Logo';

//getteachercourses

//import FadeLoader from "react-spinners/FadeLoader";
//import { css } from "@emotion/react";


//const override = css`
//  display: block;
//  margin: 0 auto;
//  border-color: red;
//`;


const CreateCourseForm = (props) => {




        //console.log("websocket: ",props.socketObj)


        //console.log("Create notice form");

        /*
        let  client = new W3CWebSocket('ws://127.0.0.1:8000/ws/notification/alll/');
      
      
         client.onmessage = (event)=>{
                const dataFromServer = JSON.parse(event.data);
                console.log("message from Server:", dataFromServer.message);
         }
         */





        //let [loading, setLoading] = useState(true);
        //let [color, setColor] = useState(" var(--themeColor)");

        //const [data, setData] = useState({});
        //const [teacherCourses,setTeacherCourses] = useState([]);
        //const [formSubmitted,setFormSubmitted] = useState(false);


        //useEffect(()=>{
        //   getuser({setData});
        //},[]);


        //useEffect(()=>{
        //  let teacherId=data.id;
        //  getteachercourses({teacherId, setTeacherCourses});
        //},[data.id ]);



        const [checkedCourses, setCheckedCourses] = useState([]);
        const [adminCourse, getadminCourse] = useState([]);
        const [submitState, setSubmitState] = useState("notSubmitting");
        const [rerender, setRerender] = useState(false);
        useEffect(() => {
                getAdminCourse({ getadminCourse });

                // Comment out initial selected course setting
                // const initialSelectedCourseIds = props.batchTwo.courses.map(course => course.id);
                // setSelectedCourseIds(initialSelectedCourseIds);
        }, [rerender, props]);

        console.log("adminCourse ", adminCourse);



        const initialFormData = Object.freeze({

                creater: 1,
                noticeTitle: "",
                noticeText: "",
                postCourses: [],

        });



        const [formData, updateFormData] = useState(initialFormData)




        const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                });
        }


        const handleChangePostData = ({ checkedState }) => {


        }




        //const [showForm, setShowForm] = useState(true);

        let showForm = true;

        const handleSubmit = async (e) => {
                e.preventDefault();

                if (formData.noticeTitle === "") {
                        alert('Please enter a notice title.');
                        return;
                }

                if (formData.noticeText === "") {
                        alert('Please fill in the notice text.');
                        return;
                }

                if (selectedCourseIds.length === 0) {
                        alert('You cannot post a notice without selecting a course. If you do not have a course, first create one!');
                        return;
                }

                setSubmitState("creating");

                let data = props.userData;
                try {
                        await createnotice({ data, formData, selectedCourseIds, props });
                        setSubmitState("created");


                } catch (error) {
                        console.error("Error creating notice:", error);
                        setSubmitState("notSubmitting");
                }
        };

        const [selectedCourseIds, setSelectedCourseIds] = useState([]);

        const toggleCourseSelection = (courseId) => {
                if (selectedCourseIds.includes(courseId)) {
                        setSelectedCourseIds(selectedCourseIds.filter(id => id !== courseId));
                } else {
                        setSelectedCourseIds([...selectedCourseIds, courseId]);
                }
        };








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

                                        <div className={classes.innerDiv}>

                                                {/*form close button below*/}
                                                <div className={classes.closeButtonDiv}>
                                                        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
                                                </div>


                                                {/*logo and field title container below*/}
                                                <div className={classes.logoAndTitleContainer}>
                                                        <Logo />
                                                        <div className={classes.formTitleDiv}><i>  Create a notice </i></div>
                                                </div>



                                                <TextInput label="Notice Title" placeholder="What is the notice about?" name="noticeTitle" handleChange={handleChange} />


                                                <ParagraphField label="Describe in detail" placeholder="Notice content" name="noticeText" handleChange={handleChange} />

                                                {/* {props.courseData.length > 0 &&
                                                        <CheckBoxInput
                                                                label="Choose where to post"
                                                                placeholder="jai"
                                                                name="postCourses"
                                                                handleChange={handleChangePostData}
                                                                Courses={props.courseData}
                                                                setCheckedCourses={setCheckedCourses}
                                                        />
                                                } */}
                                                <div className={classes.course}>
                                                        <span className={classes.redStar}>*</span>Choose where to post
                                                </div>
                                                <div className={classes.checkboxContainer}>
                                                        {adminCourse.map(course => (
                                                                <div key={course.id} className={classes.checkboxItem}>
                                                                        <input
                                                                                className={classes.coursesDiv}
                                                                                type="checkbox"
                                                                                id={course.id}
                                                                                value={course.id}
                                                                                checked={selectedCourseIds.includes(course.id)}
                                                                                onChange={() => toggleCourseSelection(course.id)}
                                                                        />
                                                                        <label htmlFor={course.id}>
                                                                                {course.courseShortName} ({course.courseGlobalCode})
                                                                        </label>
                                                                </div>
                                                        ))}
                                                </div>




                                                <div className={classes.submitButtonDiv}>
                                                        <button type="submit" className={classes.submit_button} disabled={submitState === "creating"}>
                                                                <b>{submitState === "creating" ? "Creating..." : "Create"}</b>
                                                        </button>
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


export default CreateCourseForm;
