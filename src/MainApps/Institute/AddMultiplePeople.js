import React, { useState } from 'react';
import classes from './AddMultiple.module.css';
import { AiFillCloseCircle } from 'react-icons/ai'; 
import { uploadBatchMembers } from '../../CommonApps/AllAPICalls';

const AddMultiplePeople = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    uploadBatchMembers(props.batchId, props.userData.id, selectedFile)
      .then(data => {
        console.log('File uploaded successfully:', data);
        setUploading(false);
        setSelectedFile(null);
        props.onClose();  
      })
      .catch(error => { 
        setUploading(false);
      });
  };

  return (
    <div className={classes.addContactForm}>
      <form className={classes.aboutEditForm} onSubmit={handleFileUpload}>
        <div className={classes.closeButtonDiv}>
          <div className={classes.titleSec}>Add Multiple Peoples</div>
          <button type="button" onClick={props.onClose} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="fileUpload">Upload Excel File</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>
        {error && <div className={classes.errorMessage}>{error}</div>}
        <div className={classes.formActions}>
          <button type="submit" className={classes.submitButton} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMultiplePeople;
