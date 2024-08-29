import { useState } from "react";
import classes from "./SingleBatchView.module.css";
import { BiEditAlt, BiUnlink } from "react-icons/bi";
import { deleteinstitutebatch, editBatch } from "../../CommonApps/AllAPICalls";
import { BsTrash } from "react-icons/bs";
import AlertTwoOptions from "./AlertTwoOptions";
import OptionBar from './OptionBar';
import Logo from "../../CommonApps/Logo";
import { AiFillCloseCircle } from "react-icons/ai";
import EditBatchForm from "./EditBatchForm";
// import { editBatch } from "../../CommonApps/editBatchAPI";   
function  SingleBatchView(props) {
  const [isDelinking, setIsDelinking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(props.batch);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteState, setDeleteState] = useState("Yes, Delete");

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
    editBatch(props.batch.id, props.userData.id, editFormData , props)
      .then(() => {
        setShowWarning(false);
      })
  };

  const deleteBatchHandler = () => {
    setShowDeleteConfirmation(true);
  };

  const proceedWithDeletion = () => {
    setDeleteState("Deleting...");
    let batch_id = props.batch.id;
    let user_id = props.userData.id;
  
    deleteinstitutebatch({ batch_id, user_id, props })
      .then(() => {
        setDeleteState("Deleted");
        setTimeout(() => {
          setShowDeleteConfirmation(false);
          setDeleteState("Yes, Delete");
        }, 1000);
      })
      .catch((error) => {
        // Handle the error if needed
        setDeleteState("Yes, Delete"); // Reset the button state
        console.error("Error deleting batch:", error);
      });
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


  const cancelDeletion = () => {
    setShowDeleteConfirmation(false);
  };


  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className={classes.parentClass}>
      {isModalOpen && (
        <AlertTwoOptions
          message="Are you sure you want to delete this batch?"
          option1="Yes, Delete"
          option2="Cancel"
          onOption1={proceedWithDeletion}
          onOption2={doNothing}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <button className={classes.BtnForView} onClick={handleOptionBarOpen}>
        <div className={classes.name}>{props.batch.name}</div>
        <div className={classes.courseId}>{props.batch.id}</div>
        <div className={classes.ins}>{formatDate(props.batch.start_date)}</div>
        <div className={classes.startdate}>{formatDate(props.batch.end_date)}</div>
   
 
      </button>


 
      {props.isAdminOrOwner && (
      <div className={classes.quantity} onClick={applyLeaveHandler}>
        <BiEditAlt className={classes.editIcon} />
      </div>  )}

      {props.isAdminOrOwner && (
      <button className={classes.sr2} type="button" onClick={deleteBatchHandler}>
        <BsTrash className={classes.unLinkIcon} />
      </button>
       )}

      {showButtons && (
        <OptionBar
          onBack={handleBackFromButton}
          rerender={props.rerender}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          batch={props.batch}
          onPress={props.onClick}
          isAdminOrOwner={props.isAdminOrOwner}
        />
      )}

      {showWarning && (

        <EditBatchForm 
        onBack={closeWarningHandler}
          rerender={props.rerender}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          batch={props.batch}
          onPress={props.onClick} 
        />
     
      )}


{showDeleteConfirmation && (
        <div className={classes.overLay}>

          <div className={classes.confirmDialog}>
          <p className={classes.p}>Are you sure you want to delete this batch?</p>


          <div className={classes.div}>
          <button
            className={classes.deleteYes}
            onClick={proceedWithDeletion}
            disabled={deleteState !== "Yes, Delete"}
          >
            {deleteState}
          </button>
          <button className={classes.deleteNo} onClick={cancelDeletion}>
            Cancel
          </button>
          </div>


        </div>


        </div>
      )}
    </div>
  );
}

export default SingleBatchView;
