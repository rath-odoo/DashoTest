import React, { useState, useEffect } from 'react';
import classes from './ChapterCreationForm.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import { TextInput, OptionField } from './FormInputs/FormInputObjects';
import { createnewchapter, getchapternumbers } from '../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/BeatLoader"; // Import the spinner

const ChapterCreationForm = (props) => {
        const initialFormData = Object.freeze({
                chapterTitle: "",
                chapterNumber: null,
                syllabusId: props.syllabusData.id,
        });

        const [formData, updateFormData] = useState(initialFormData);
        const [chapterNumbers, setChapterNumbers] = useState([1, 2, 3, 4, 5]);
        const [createState, setCreateState] = useState("notCreating"); // Add state for submission status

        useEffect(() => {
                getchapternumbers({ setChapterNumbers });
        }, []);

        const handleSubmit = async (e) => {
                e.preventDefault();

                if (formData.chapterTitle === "") {
                        alert('Please enter chapter title');
                        return null;
                }

                if (formData.chapterNumber === null) {
                        alert('Please enter chapter number');
                        return null;
                }

                setCreateState("Creating"); // Set state to show loading

                try {
                        await createnewchapter({ formData, props });
                        setCreateState("Created"); // Update state to reflect successful creation
                        // Optionally, close the form or reset the formData
                        // props.onPress();
                } catch (error) {
                        console.error("Error creating chapter:", error);
                        setCreateState("Error"); // Set state to reflect error
                }
        };

        const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        };

        return (
                <div className={classes.formScreen}>
                        <div className={classes.formScreenView}>
                                <div className={classes.closeButtonDiv}>
                                        <button onClick={props.onPress} className={classes.closeFormButton}>
                                                <AiFillCloseCircle className={classes.closeButtonIcon} />
                                        </button>
                                </div>

                                <form className={classes.createChapterForm} onSubmit={handleSubmit}>
                                        <div className={classes.chapterNumberDiv}>
                                                <span className={classes.requiredField}>*</span>
                                                <label htmlFor="chapterNumber">Chapter Number</label>
                                        </div>
                                        <OptionField
                                                handleChange={handleChange}
                                                name="chapterNumber"
                                                options={chapterNumbers}
                                                addedChapters={props.syllabusData.chapters}
                                        />

                                        <div className={classes.chapterNumberDiv}>
                                                <span className={classes.requiredField}>*</span>
                                                <label htmlFor="chapterTitle">Chapter Title</label>
                                        </div>
                                        <TextInput
                                                placeholder="Name the title"
                                                name="chapterTitle"
                                                handleChange={handleChange}
                                        />

                                        <div className={classes.submitButtonDiv}>
                                                {createState === "Creating" && (
                                                        <button type="submit" className={classes.submit_button} disabled>
                                                                <FadeLoader color="white" loading={true} css={{ margin: "0 auto", borderColor: "white" }} size={10} />
                                                                Creating...
                                                        </button>
                                                )}

                                                {createState === "notCreating" && (
                                                        <button type="submit" className={classes.submit_button}>
                                                                <b>Create</b>
                                                        </button>
                                                )}

                                                {createState === "Error" && (
                                                        <button type="button" className={classes.submit_button} disabled>
                                                                Error! Please try again
                                                        </button>
                                                )}
                                        </div>
                                </form>
                        </div>
                </div>
        );
};

export default ChapterCreationForm;
