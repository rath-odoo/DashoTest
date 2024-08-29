import React, { useState } from "react";
import classes from "./CreateNoticeForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { DateField, TextInput, ParagraphField } from "../../CommonApps/FormInputObjects";
import Logo from "../../CommonApps/Logo";
import { createBatchNotice } from "../../CommonApps/AllAPICalls";

const CreateNoticeForm = (props) => {
  const initialFormData = {
    noticeTitle: "",
    noticeText: "",
    batch_ids: [],
  };

  const [formData, updateFormData] = useState(initialFormData);
  const [submissionStatus, setSubmissionStatus] = useState("Create");

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const selectedBatches = formData.batch_ids;
    if (checked) {
      selectedBatches.push(value);
    } else {
      const index = selectedBatches.indexOf(value);
      if (index > -1) {
        selectedBatches.splice(index, 1);
      }
    }
    updateFormData({
      ...formData,
      batch_ids: selectedBatches,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { noticeTitle, noticeText, batch_ids } = formData;
    if (!noticeTitle || !noticeText || batch_ids.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    setSubmissionStatus("Creating");
    createBatchNotice({ formData, props , setSubmissionStatus });
  };

  return (
    <div className={classes.createTicketFormDivParent}>
      <form className={classes.createTicketForm} onSubmit={handleSubmit}>
        <div className={classes.closeButtonDiv}>
          <button type="button" onClick={props.onPress} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>

        <div className={classes.innerDiv}>
          <div className={classes.logoAndTitleContainer}>
            <Logo />
            <div className={classes.formTitleDiv}><i>Create a Notice</i></div>
          </div>

          <TextInput label="Notice Title" placeholder="Exam Notice" name="noticeTitle"   requirement="*" handleChange={handleChange} />
          <ParagraphField label="Notice Text" placeholder="There will be an exam on the 15th of June."  requirement="*" name="noticeText" handleChange={handleChange} />

          <div className={classes.fieldDiv}>
            <label className={classes.label}><span className={classes.span}>*</span>Select Batches</label>
            <div className={classes.checkboxContainer}>
              {props.instituteBatches.map(batch => (
                <div key={batch.id} className={classes.checkboxItem}>
                  <input
                    className={classes.inputCheckBox}
                    type="checkbox"
                    id={`batch_${batch.id}`}
                    value={batch.id}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`batch_${batch.id}`} className={classes.checkboxLabel}>
                    {batch.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={classes.submitButtonDiv}>
            <button type="submit" className={classes.submit_button}>
              <b>{submissionStatus}</b>
            </button>
          </div>

          <div className={classes.emptyDiv}></div>
        </div>
      </form>
    </div>
  );
};

export default CreateNoticeForm;
