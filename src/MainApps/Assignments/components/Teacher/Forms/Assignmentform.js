import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import FadeLoader from "react-spinners/BeatLoader";
import {
  ParagraphField,
  TextInput,
  DateField,
} from "../../../../../CommonApps/FormInputObjects";
import { createAssignmentform } from "../../../../../CommonApps/AllAPICalls";
import classes from "./Assignmentform.module.css";

const Assignmentform = (props) => {
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
  };

  let color = "white";

  const [AssignmentFormData, setFormData] = useState("notSaving");

  const initialFormData = {
    course_ids: props.Course.id,
    title: "",
    publishDate: "",
    dueDate: "",
    credit: "",
    status: "",
    questionFiles: [null],
    description: "",
    questionFilesMeta: [
      { name: "", description: "" },
    ],
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [showMetaFields, setShowMetaFields] = useState([false]);

  const handleChange = (e) => {
    const { name, value, files, dataset } = e.target;

    if (dataset.type === "questionFiles") {
      const index = dataset.index;
      const updatedFiles = [...formData.questionFiles];
      updatedFiles[index] = files[0];
      updateFormData({
        ...formData,
        questionFiles: updatedFiles,
      });
    } else if (dataset.type === "questionFilesMeta") {
      const index = dataset.index;
      const key = dataset.key;
      const updatedQuestionFilesMeta = formData.questionFilesMeta.map((meta, i) => 
        i === parseInt(index) ? { ...meta, [key]: value } : meta
      );
      updateFormData({
        ...formData,
        questionFilesMeta: updatedQuestionFilesMeta,
      });
    } else {
      updateFormData({
        ...formData,
        [name]: value.trim(),
      });
    }
  };

  const handleAddQuestionFileMeta = () => {
    updateFormData({
      ...formData,
      questionFiles: [...formData.questionFiles, null],
      questionFilesMeta: [...formData.questionFilesMeta, { name: "", description: "" }],
    });
    setShowMetaFields([...showMetaFields, false]);
  };

  const handleRemoveQuestionFileMeta = (index) => {
    if (formData.questionFiles.length <= 1) {
      return; 
    }
  
    const updatedQuestionFiles = formData.questionFiles.filter((_, i) => i !== index);
    const updatedQuestionFilesMeta = formData.questionFilesMeta.filter((_, i) => i !== index);
    updateFormData({
      ...formData,
      questionFiles: updatedQuestionFiles,
      questionFilesMeta: updatedQuestionFilesMeta,
    });
    const updatedShowMetaFields = showMetaFields.filter((_, i) => i !== index);
    setShowMetaFields(updatedShowMetaFields);
  };
  
  const toggleMetaFieldsVisibility = (index) => {
    const updatedShowMetaFields = [...showMetaFields];
    updatedShowMetaFields[index] = !updatedShowMetaFields[index];
    setShowMetaFields(updatedShowMetaFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (formData.questionFiles.includes(null)) {
      alert("Please upload all question files.");
      return;
    } 
    if (!formData.title || !formData.publishDate || !formData.dueDate || !formData.credit ) {
      alert("Please fill out all required fields: Title, Publish Date, Due Date, Credit, and Status.");
      return;
    }

    const isMetaValid = formData.questionFilesMeta.every(
      (meta) => meta.name.trim() !== "" && meta.description.trim() !== ""
    );

    let userId = props.userData.id;
    setFormData("Saving");
    console.log("Submitting formData: ", formData);
    createAssignmentform({ formData, userId, setFormData , props });
  };

  const statusOptions = ["open", "reviewed", "closed"];
  console.log(formData);

  return (
    <div className={classes.createAssignmentFormDivParent}>
      <form className={classes.createAssignmentForm} onSubmit={handleSubmit}>
        <div className={classes.closeButtonDiv}>
          <button onClick={props.onPress} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>
        <div className={classes.logoAndTitleContainer}>
          <div className={classes.formTitleDiv}>
            <span className={classes.tubeIconText}>Create Assignment</span>
          </div>
        </div>
        <div className={classes.assignmentTitleDiv}>
          <TextInput
            className={classes.AssignmentTitle}
            handleChange={handleChange}
            label="Assignment Title"
            placeholder="ex: Scalar and Vector"
            name="title"
            requirement="*"
            defaultValue=""
          />
        </div>
        <div className={classes.DateField}>
          <div className={classes.DateFieldThree}>
            <div className={classes.startData}>
              <DateField
                handleChange={handleChange}
                label="Publish Date"
                name="publishDate"
                requirement="*"
                placeholder="Enter course start date"
              />
            </div>
            <div className={classes.dueData}>
              <DateField
                handleChange={handleChange}
                label="Due Date"
                name="dueDate"
                requirement="*"
                placeholder="Enter course end date"
              />
            </div>
            <div className={classes.creditField}>
              <TextInput
                handleChange={handleChange}
                label="Marks"
                placeholder="10"
                name="credit"
                requirement="*"
                defaultValue=""
              />
            </div>
          </div>
        </div>
        <div className={classes.threeDivs}>
          {/* <div className={classes.statusDiv}>
            <label className={classes.label}><span className={classes.redStar}>*</span>Status</label>
            <select
              className={classes.borderInput}
              onChange={handleChange}
              name="status"
              value={formData.status}
            >
              <option value="">Select Status</option>
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div> */}
          
          <ParagraphField
            handleChange={handleChange}
            label="Description"
            placeholder="Description about the Assignment"
            name="description"
            defaultValue=""
          />
        </div>

        {formData.questionFilesMeta.map((meta, index) => (
  <div key={index} className={classes.fileUpload}>
    <label><span className={classes.redStar}>*</span>Assignment Files</label>
    <div className={classes.btnContainer}>
      <input
        type="file"
        name="questionFiles"
        data-index={index}
        data-type="questionFiles"
        onChange={handleChange}
        required
      />
      <div className={classes.div}>
      {index > 0 && index === formData.questionFiles.length - 1 && (
          <button
            type="button"
            onClick={() => handleRemoveQuestionFileMeta(index)}
            className={classes.removeMetaButton}
          >
            Remove file
          </button>
        )}
        <button
          type="button"
          onClick={() => toggleMetaFieldsVisibility(index)}
          className={classes.toggleBtn}
        >
          {showMetaFields[index] ? "Hide Optional Fields" : "Show Optional Fields"}
        </button>
       
      </div>
    </div>
    {showMetaFields[index] && (
      <div className={classes.metaDiv}>
        <div className={classes.questionFilesMetaDiv}>
          <div className={classes.inputDiv}>
            <input
              className={classes.borderInput}
              type="text"
              placeholder="File Name"
              value={meta.name}
              data-index={index}
              data-type="questionFilesMeta"
              data-key="name"
              onChange={handleChange}
            />
            <textarea
              className={classes.borderInputArea}
              type="text"
              placeholder="File Description"
              value={meta.description}
              data-index={index}
              data-type="questionFilesMeta"
              data-key="description"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    )}
  </div>
))}


        <div className={classes.addMetaButtonDiv}>
          <button
            type="button"
            onClick={handleAddQuestionFileMeta}
            className={classes.addMetaButton}
          >
            Add more File
          </button>
        </div>

        <div className={classes.submitButtonDiv}>
          {AssignmentFormData === "Saving" ? (
            <button
              type="submit"
              className={classes.submit_button}
              disabled={true}
            >
              <FadeLoader color={color} loading={true} css={override} size={10} />
              Saving ...
            </button>
          ) : (
            <button type="submit" className={classes.submit_button}>
              <b>Create</b>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Assignmentform;
