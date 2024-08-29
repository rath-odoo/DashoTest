import { useState } from "react";
import classes from "./EditBatchForm.module.css";
import { BiEditAlt, BiUnlink } from "react-icons/bi";
import { deleteinstitutebatch, editBatch } from "../../CommonApps/AllAPICalls";
import { BsTrash } from "react-icons/bs";
import AlertTwoOptions from "./AlertTwoOptions";
import OptionBar from './OptionBar';
import Logo from "../../CommonApps/Logo";
import { AiFillCloseCircle } from "react-icons/ai";
// import { editBatch } from "../../CommonApps/editBatchAPI";   
function EditBatchForm(props) {
  const [isDelinking, setIsDelinking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const [submitState, setSubmitState] = useState("notSubmitting");

  const [editFormData, setEditFormData] = useState({
    name: props.batch.name,
    start_date: props.batch.start_date,
    end_date: props.batch.end_date,
    institute: props.selectedInstitute.id,
    created_by: props.userData.id
  });

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    setSubmitState("submitting");
    editBatch(props.batch.id, props.userData.id, editFormData ,  setSubmitState , props )
      .then(() => {
        
        props.onBack();
      })
  };

  const deleteBatchHandler = () => {
    setIsModalOpen(true);
  };

  const proceedWithDeletion = () => {
    let batch_id = props.batch.id;
    let user_id = props.userData.id;
    deleteinstitutebatch({ batch_id, user_id, props });
  };

  const doNothing = () => {
    setIsModalOpen(false);
  };

  const handleBackFromButton = () => {
    setShowButtons(false);
  };

  const handleOptionBarOpen = () => {
    setShowButtons(true);
  };

  const applyLeaveHandler = () => {
    setShowWarning(true);
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
  };

  return ( 
       
  
        <div className={classes.overlay}>
          <div className={classes.warningBlock}>
            <div> 
              <div className={classes.closeButtonDiv}>
        <button onClick={props.onBack} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	
            </div>

            <div className={classes.logo}>
              <Logo />
            </div>

            <div className={classes.heading}>Edit Batch</div>

            <form onSubmit={handleEditFormSubmit}>
              <div className={classes.datesContainer}>
                <div className={classes.dateStart}>
                  <div className={classes.labelAsset}>
                    <span className={classes.asterisk}>*</span>Name of the Batch:
                  </div>
                  <input
                    type="text"
                    className={classes.assetNameInput}
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className={classes.dateEnd}>
                  <div className={classes.labelAsset}>
                    <span className={classes.asterisk}>*</span>Start Date:
                  </div>
                  <input
                    type="date"
                    className={classes.assetNameInput}
                    name="start_date"
                    value={editFormData.start_date}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className={classes.dateEnd}>
                  <div className={classes.labelAsset}>
                    <span className={classes.asterisk}>*</span>End Date:
                  </div>
                  <input
                    type="date"
                    className={classes.assetNameInput}
                    name="end_date"
                    value={editFormData.end_date}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>
              </div>

              <div className={classes.submitContainer}>
            {submitState === "submitting" && (
              <button className={classes.submitBtn} type="submit" disabled>
                Submitting...
              </button>
            )}

            {submitState === "notSubmitting" && (
              <button className={classes.submitBtn} type="submit">
                Submit
              </button>
            )}

            {submitState === "submitted" && (
              <button className={classes.submitBtn} type="submit" disabled>
                Submitted
              </button>
            )}
          </div>
            </form>
          </div>
        </div>
  
  );
}

export default EditBatchForm;
