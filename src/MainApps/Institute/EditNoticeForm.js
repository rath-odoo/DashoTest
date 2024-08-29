import React, { useState } from 'react';
import { editNotice } from '../../CommonApps/AllAPICalls'; 
import classes from './EditNoticeForm.module.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import Logo from '../../CommonApps/Logo';

const EditNoticeForm = ({ userData, courseData, selectedInstitute, instituteBatches, selectedNoticeId, onPress, selectedNotice }) => {
  const [noticeTitle, setNoticeTitle] = useState(selectedNotice.noticeTitle);
  const [noticeText, setNoticeText] = useState(selectedNotice.noticeText);
  const [batchIds, setBatchIds] = useState([]);
  const [buttonState, setButtonState] = useState('Update Notice');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonState('Editing...'); 
    if (!noticeTitle || !noticeText ) {
      alert("Please fill in all required fields.");
      return;
    }


    const updatedNotice = {
      noticeTitle,
      noticeText,
      batch_ids: batchIds,
      institute_ids: [selectedInstitute.id],
      user_id: userData.id,
    };

    editNotice(selectedNotice.id, userData.id, updatedNotice)
      .then(response => {
        console.log('Notice updated successfully:', response);
        setButtonState('Edited');
        onPress();
    
      })
      .catch(error => {
        console.error('Error updating notice:', error);
        setButtonState('Update Notice');  
      });
  };

  const handleBatchChange = (batchId) => {
    setBatchIds(prevBatchIds =>
      prevBatchIds.includes(batchId)
        ? prevBatchIds.filter(id => id !== batchId)
        : [...prevBatchIds, batchId]
    );
  };

  return (
    <div className={classes.overLay}> 
      <div className={classes.editNoticeContainer}>
        <div className={classes.closeButtonDiv}>
          <button onClick={onPress} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>
        <div className={classes.logoAndTitleContainer}>
          <Logo />
          <div className={classes.formTitleDiv}><i>Edit a Notice</i></div>
        </div>
        <form className={classes.innerDiv} onSubmit={handleSubmit}>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="title">Notice Title</label>
            <input
              id="title"
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              className={classes.inputTitle}
            />
          </div>
          <div className={classes.formGroup}>
            <label className={classes.label} htmlFor="text">Description</label>
            <textarea
              id="text"
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              className={classes.inputTitleTextArea}
            />
          </div>
          <div className={classes.fieldDiv}>
            <label className={classes.label}>Batches:</label>
            {instituteBatches && instituteBatches.map(batch => (
              <div key={batch.id} className={classes.checkboxItem}>
                <input
                  className={classes.inputCheckBox}
                  type="checkbox"
                  id={`batch-${batch.id}`}
                  value={batch.id}
                  checked={batchIds.includes(batch.id)}
                  onChange={() => handleBatchChange(batch.id)}
                />
                <label className={classes.checkboxLabel} htmlFor={`batch-${batch.id}`}>{batch.name}</label>
              </div>
            ))}
          </div>
          <div className={classes.submitButtonDiv}>
            <button type="submit" className={classes.submit_button}>
              {buttonState}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNoticeForm;
