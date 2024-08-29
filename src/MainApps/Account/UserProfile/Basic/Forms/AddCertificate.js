import React, { useState } from 'react';
import classes from './AddCertificate.module.css';
import { addCertificate } from '../../../../../CommonApps/AllAPICalls';
import Logo from '../../../../../CommonApps/Logo';
import { BsX } from 'react-icons/bs';

const Certificate = (props) => {
  const [formData, setFormData] = useState({
    certificate_name: "",
    issuing_organization: "",
    issue_date: "",
    expiration_date: "",
    credential_id: "",
    credential_url: "",
    media: null,
    skills: [],
  });

  const [skillInput, setSkillInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleMediaChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.certificate_name) newErrors.certificate_name = "Certificate Name is required.";
    if (!formData.issuing_organization) newErrors.issuing_organization = "Issuing Organization is required.";
    if (!formData.issue_date) newErrors.issue_date = "Issue Date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    const userId = props.userData.id;
    const data = new FormData();
    data.append('name', formData.certificate_name);
    data.append('issuing_organisation', formData.issuing_organization);
    data.append('issue_date', formData.issue_date);
    if (formData.expiration_date) data.append('expiration_date', formData.expiration_date);
    if (formData.credential_id) data.append('credentials_id', formData.credential_id);
    if (formData.credential_url) data.append('credentials_url', formData.credential_url);
    if (formData.skills.length > 0) data.append('skills', JSON.stringify(formData.skills));
    if (formData.media) data.append('media', formData.media);
    data.append('user', userId);

    try {
      await addCertificate(data, userId, props);
      handleCloseButtonClick();
    } catch (error) {
      console.error("Error submitting certificate:", error);
      // Handle error (e.g., show notification)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div className={classes.outerOneDiv}>
          <div>
            <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
              </svg>
            </button>
          </div>

          <div className={classes.logo}>
            <Logo />
          </div>

          <div className={classes.heading}>Add Certificate</div>
          <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={classes.divSix}>
              <label className={classes.label} htmlFor="certificate_name">
                <span className={classes.redStar}>*</span>Certificate Name:
              </label>
              <input
                className={`${classes.borderBox} ${errors.certificate_name ? classes.errorInput : ''}`}
                type="text"
                name="certificate_name"
                value={formData.certificate_name}
                onChange={handleInputChange}
                required
              />
              {errors.certificate_name && <span className={classes.errorText}>{errors.certificate_name}</span>}
            </div>

            <div className={classes.divFour}>
              <label className={classes.label} htmlFor="issuing_organization">
                <span className={classes.redStar}>*</span>Issuing Organization:
              </label>
              <input
                className={`${classes.borderBox} ${errors.issuing_organization ? classes.errorInput : ''}`}
                type="text"
                name="issuing_organization"
                value={formData.issuing_organization}
                onChange={handleInputChange}
                required
              />
              {errors.issuing_organization && <span className={classes.errorText}>{errors.issuing_organization}</span>}
            </div>

            <div className={classes.divDate}>
              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="issue_date">
                  <span className={classes.redStar}>*</span>Issue Date:
                </label>
                <input
                  className={`${classes.date} ${errors.issue_date ? classes.errorInput : ''}`}
                  type="date"
                  name="issue_date"
                  value={formData.issue_date}
                  onChange={handleInputChange}
                  required
                />
                {errors.issue_date && <span className={classes.errorText}>{errors.issue_date}</span>}
              </div>

              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="expiration_date">Expiration Date:</label>
                <input
                  className={classes.date}
                  type="date"
                  name="expiration_date"
                  value={formData.expiration_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={classes.divSix}>
              <label className={classes.label} htmlFor="credential_id">Credential ID:</label>
              <input
                className={classes.borderBox}
                type="text"
                name="credential_id"
                value={formData.credential_id}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divSix}>
              <label className={classes.label} htmlFor="credential_url">Credential URL:</label>
              <input
                className={classes.borderBox}
                type="url"
                name="credential_url"
                value={formData.credential_url}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.mediaSkills}>
              <div className={classes.divSkills}>
                <label className={classes.label} htmlFor="skills">Skills:</label>
                <div className={classes.skillInputContainer}>
                  <input
                    className={classes.borderBox}
                    type="text"
                    value={skillInput}
                    onChange={handleSkillInputChange}
                  />
                  <button type="button" className={classes.addSkillBtn} onClick={handleAddSkill}>Add</button>
                </div>
                <div className={classes.skillList}>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className={classes.skillItem}>
                      {skill} <button type="button" className={classes.removeBtn} onClick={() => handleRemoveSkill(index)}><BsX /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="media">Media:</label>
                <input
                  type="file"
                  name="media"
                  onChange={handleMediaChange}
                  accept="image/*, video/*, .pdf, .doc, .docx"
                />
              </div>
            </div>

            <button
              className={classes.submitBtn}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
