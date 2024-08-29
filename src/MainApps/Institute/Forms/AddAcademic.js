import React, { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import classes from './AddAcademics.module.css'; // Update the path based on your folder structure
import Logo from '../../../CommonApps/Logo';
import { AddDocument } from '../../../CommonApps/AllAPICalls';

const AddDocumentInstitute = (props) => {
  const userId = props.memberDetails.user.id;
  const instituteId = props.memberDetails.institute.id;

  const [formData, setFormData] = useState({
    name: "",
    media: null,
  });

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      media: e.target.files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    AddDocument(formData, userId, instituteId, props);
    handleCloseButtonClick();
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div>
          <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
            </svg>
          </button>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.heading}>
            Add Document
          </div>
          <form className={classes.divForm} onSubmit={handleSubmit}>
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="name"><span className={classes.redStar}>*</span>Document Name</label>
              <input
              className={classes.borderBox}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label className={classes.label} htmlFor="media"><span className={classes.redStar}>*</span>Upload Document</label>
              <input
              className={classes.borderBoxInput}
                type="file"
                id="media"
                name="media"
                onChange={handleFileChange}
                required
              />
            </div>
            <button type="submit" className={classes.submitBtn}>
              Add 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentInstitute;
