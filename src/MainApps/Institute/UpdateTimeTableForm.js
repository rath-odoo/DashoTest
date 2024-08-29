import React, { useState, useEffect, CSSProperties } from "react";
import classes from './UpdateTimeForm.module.css';
import { AiFillCloseCircle } from "react-icons/ai";
import Logo from "../../CommonApps/Logo";
import { updateBatchTimetable } from "../../CommonApps/AllAPICalls";
import FadeLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize: "10px",
};

const UpdateTimeTableForm = (props) => {
  const [formData, setFormData] = useState({
    name: props.timeTable.name,
    file: props.timeTable.file,
    batch_ids: [props.timeTable.batches[0].id],
  });
  const [editState, setEditState] = useState("notSaving");
  let color = "white";


  useEffect(() => {
  }, [props]);

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

  const handleSubmit = async (e) => {
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
      return;
    }
    const userId = props.userData.id

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    if (formData.file) {
      formDataToSubmit.append("file", formData.file);
    }
    formData.batch_ids.forEach((id) => {
      formDataToSubmit.append("batch_ids", id);
    });
    setEditState("Saving");
    updateBatchTimetable(props.timeTableId, formDataToSubmit, props, userId, setEditState, props.isUpdate, props.setIsUpdate)
      .then(response => {
        console.log('Batch timetable created successfully', response);
      })


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
            <div className={classes.formTitleDiv}><i>Update TimeTable</i></div>
          </div>

          <div className={classes.mainDiv}>
            <div className={classes.fieldDiv}>
              <label className={classes.label}>Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={classes.selectField}
              />
            </div>

            <div className={classes.timeTablename}>
              <label className={classes.label} htmlFor="file">Upload File:</label>
              <input
                type="file"
                id="file"
                name="file"
                className={classes.fileInput}
                onChange={handleFileChange}
                required
              />
            </div>

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
                    checked={formData.batch_ids.includes(batch.id)}

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
                updating ...
              </button>
            }
            {editState === "notSaving" &&
              <button type="submit" className={classes.submit_button}><b>
                Update </b>
              </button>
            }
            {editState === "Saved" &&
              <button type="submit" className={classes.submit_button}><b>
                Updated</b>
              </button>
            }
          </div>

          <div className={classes.emptyDiv}>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTimeTableForm;
