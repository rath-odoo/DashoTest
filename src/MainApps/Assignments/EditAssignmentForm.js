import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import classes from "./EditAssignmentForm.module.css";
import { updateAssignment } from "../../CommonApps/AllAPICalls";
import FadeLoader from "react-spinners/BeatLoader";


const EditAssignmentForm = (props) => {
  const [formState, setFormState] = useState({
    title: props.assignment.title || "",
    publishDate: props.assignment.publishDate || "",
    dueDate: props.assignment.dueDate || "",
    credit: props.assignment.credit || "",
    status: props.assignment.status || "",
    description: props.assignment.description || "",
    questionFiles: [],
    questionFilesMeta: props.assignment.questionFilesMeta || [{ name: "", description: "" }],
  });
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    fontSize: "10px",
  };

  let color = "white";
  const [showMetaFields, setShowMetaFields] = useState(
    formState.questionFilesMeta.map(() => false)
  );
  const [AssignmentFormData, setFormData] = useState("notSaving");

  const handleInputChange = (e) => {
    const { name, value, files, dataset } = e.target;

    if (dataset.type === "questionFiles") {
      const index = dataset.index;
      const updatedFiles = [...formState.questionFiles];
      updatedFiles[index] = files[0];
      setFormState({
        ...formState,
        questionFiles: updatedFiles,
      });
    } else if (dataset.type === "questionFilesMeta") {
      const index = dataset.index;
      const key = dataset.key;
      const updatedQuestionFilesMeta = formState.questionFilesMeta.map((meta, i) =>
        i === parseInt(index) ? { ...meta, [key]: value } : meta
      );
      setFormState({
        ...formState,
        questionFilesMeta: updatedQuestionFilesMeta,
      });
    } else {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleAddQuestionFileMeta = () => {
    setFormState({
      ...formState,
      questionFiles: [...formState.questionFiles, null],
      questionFilesMeta: [...formState.questionFilesMeta, { name: "", description: "" }],
    });
    setShowMetaFields([...showMetaFields, false]);
  };

  const handleRemoveQuestionFileMeta = (index) => {
    if (formState.questionFiles.length <= 1) {
      return; // Prevent removing the only file
    }

    const updatedQuestionFiles = formState.questionFiles.filter((_, i) => i !== index);
    const updatedQuestionFilesMeta = formState.questionFilesMeta.filter((_, i) => i !== index);
    setFormState({
      ...formState,
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

    const { id } = props.assignment;
    const userId = props.userData.id;
    const formData = new FormData();
    formData.append("course_ids", props.selectedCourse[0].id);
    formData.append("title", formState.title);
    formData.append("publishDate", formState.publishDate);
    formData.append("dueDate", formState.dueDate);
    formData.append("credit", formState.credit);
    formData.append("status", formState.status);
    formData.append("description", formState.description);

    if (formState.questionFiles.length > 0) {
      formState.questionFiles.forEach((file) => {
        if (file) {
          formData.append("questionFiles", file);
        }
      });
    }
    const filteredQuestionFilesMeta = formState.questionFilesMeta.filter(
      (meta) => meta.name.trim() !== "" || meta.description.trim() !== ""
    );
    if (filteredQuestionFilesMeta.length > 0) {
      formData.append("questionFilesMeta", JSON.stringify(filteredQuestionFilesMeta));
    }
    setFormData("Saving");
    updateAssignment(id, userId, formData, props, setFormData);
  };

  return (
    <div className={classes.createAssignmentFormDivParent}>
      <form className={classes.createAssignmentForm} onSubmit={handleSubmit}>
        <div className={classes.closeButtonDiv}>
          <button onClick={props.onClose} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>
        <div className={classes.logoAndTitleContainer}>
          <div className={classes.formTitleDiv}>
            <span className={classes.tubeIconText}>Edit Assignment</span>
          </div>
        </div>
        <div className={classes.assignmentTitleDiv}>
          <div className={classes.AssignmentTitle}>
            <label className={classes.label}>Assignment Title</label>
            <input
              className={classes.borderInput}
              type="text"
              name="title"
              placeholder="ex: Scalar and Vector"
              value={formState.title}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className={classes.DateField}>
          <div className={classes.DateFieldThree}>
            <div className={classes.startData}>
              <label className={classes.label}>Publish Date </label>
              <input
                className={classes.borderInput}
                type="date"
                name="publishDate"
                value={formState.publishDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={classes.dueData}>
              <label className={classes.label}>Due Date</label>
              <input
                className={classes.borderInput}
                type="date"
                name="dueDate"
                value={formState.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={classes.creditField}>
              <label className={classes.label}>Credit</label>
              <input
                className={classes.borderInput}
                type="number"
                name="credit"
                placeholder="10"
                value={formState.credit}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className={classes.threeDivs}>
          {/* <div className={classes.AssignmentTitle}>
            <label className={classes.label}>Status</label>
            <select
              type="text"
              className={classes.borderInput}
              name="status"
              value={formState.status}
              onChange={handleInputChange}
              required
            >
              <option className={classes.option} value=""></option>
              <option value="open">open</option>
              <option value="closed">closed</option>
              <option value="reviewed">reviewed</option>
            </select>
          </div> */}

          <div className={classes.fileList}>
            <label className={classes.label}>Existing Files</label>
            <div>
              {props.assignment.questionFiles &&
                props.assignment.questionFiles.map((file, index) => (
                  <div key={file.id}>
                    <a href={file.afile} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                    : {file.description}
                  </div>
                ))}
            </div>
          </div>

          <div className={classes.descriptionDiv}>
            <label className={classes.label}>Description</label>
            <textarea
              className={classes.borderInputArea}
              name="description"
              placeholder="Short Description"
              value={formState.description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {formState.questionFilesMeta.map((meta, index) => (
          <div key={index} className={classes.fileUpload}>
            <label>Assignment Files</label>
            <div className={classes.btnContainer}>
              <input
                type="file"
                name="questionFiles"
                data-index={index}
                data-type="questionFiles"
                onChange={handleInputChange}
              />
              <div className={classes.div}>
                {index > 0 && index === formState.questionFilesMeta.length - 1 && (
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
                  {showMetaFields[index] ? "Hide Meta Fields" : "Show Meta Fields"}
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
                      onChange={handleInputChange}
                    />
                    <textarea
                      className={classes.borderInputArea}
                      type="text"
                      placeholder="File Description"
                      value={meta.description}
                      data-index={index}
                      data-type="questionFilesMeta"
                      data-key="description"
                      onChange={handleInputChange}
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
              Submitting ...
            </button>
          ) : (
            <button type="submit" className={classes.submit_button}>
              <b>Submit</b>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditAssignmentForm;
