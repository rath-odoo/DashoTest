import React, { useState, CSSProperties } from "react";
import classes from "./TimeTableForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { createBatchTimetable } from "../../CommonApps/AllAPICalls";
import Logo from "../../CommonApps/Logo";
import { TextInput } from "../../CommonApps/FormInputObjects";
import FadeLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize: "10px",
};

const TimeTableForm = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    batch_ids: [],
  });
  let color = "white";
  const [editState, setEditState] = useState("notSaving");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      file: file,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          batch_ids: [...prevFormData.batch_ids, parseInt(value)],
        };
      } else {
        return {
          ...prevFormData,
          batch_ids: prevFormData.batch_ids.filter((id) => id !== parseInt(value)),
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter name");
      return;
    }
    if (!formData.file) {
      alert("Please select file");
      return;
    }
    if (formData.batch_ids.length === 0) {
      alert("Please select batches");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    if (formData.file) {
      formDataToSubmit.append("file", formData.file);
    }
    formData.batch_ids.forEach((id) => {
      formDataToSubmit.append("batch_ids", id);
    });
    const userId = props.userData.id;
    setEditState("Saving");

    createBatchTimetable(formDataToSubmit, props, userId, setEditState)
      .then(response => {
        console.log('Batch timetable created successfully', response);
      })
  };
  console.log(props);


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
            <div className={classes.formTitleDiv}>
              <i>Add a TimeTable</i>
            </div>
          </div>


          <div className={classes.mainDiv}>
            <div className={classes.timeTablename}>
              <label className={classes.label}>Name</label>
              <input
                label="TimeTable name"
                placeholder="Science-Class-11-2024-25"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={classes.inputBox}
              />
            </div>

            <div style={{ height: "10px" }}></div>

            <div className={classes.timeTablename} >
              <label className={classes.label} htmlFor="file">Upload File:</label>
              <input
                type="file"
                id="file"
                name="file"
                className={classes.fileInput}
                onChange={handleFileChange}
              />
            </div>

            <div style={{ height: "10px" }}></div>

            <div className={classes.batches}>
              <label className={classes.label}>Select Batches:</label>
              {props.instituteBatches.map((batch) => (
                <div key={batch.id} className={classes.batchCheckbox}>
                  <input
                    type="checkbox"
                    id={`batch-${batch.id}`}
                    value={batch.id}
                    onChange={handleCheckboxChange}
                    className={classes.largeCheckbox}
                  />
                  <label className={classes.label1} htmlFor={`batch-${batch.id}`}>{batch.name}</label>
                </div>
              ))}
            </div>

          </div>



          <div className={classes.submitButtonDiv}>
            {editState === "Saving" &&
              <button type="submit" className={classes.submit_button} disabled={true}>
                <FadeLoader color={color} loading={true} css={override} size={10} />
                Creating ...
              </button>
            }
            {editState === "notSaving" &&
              <button type="submit" className={classes.submit_button}><b>
                Create </b>
              </button>
            }
            {editState === "Saved" &&
              <button type="submit" className={classes.submit_button}><b>
                Created</b>
              </button>
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default TimeTableForm;
