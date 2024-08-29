import React, { useState } from 'react';
import { BsPlus, BsX } from 'react-icons/bs';
import classes from './AddExperience.module.css'; // Update the path based on your folder structure
import { DateField, TextInput } from "./../../../../../CommonApps/FormInputObjects";
import Logo from '../../../../../CommonApps/Logo';
import { sendDataToAPI } from '../../../../../CommonApps/AllAPICalls';

const Experience = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    employment_type: "",
    company_name: "",
    location: "",
    location_type: "",
    currently_working: false,
    start_date: "",
    end_date: "",
    description: "",
    industry: "",
    skills: [],
    newSkill: '',
    media: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleMediaChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      media: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


if (formData.title === "") {
  alert('please select the title ');
  return null;
}

if (formData.employment_type === "") {
  alert('please select the Employment type ');
  return null;
}

if (formData.company_name === "") {
  alert('please select the company Name');
  return null;
}
if (formData.industry === "") {
  alert('please select the industry');
  return null;
}
if (formData.location === "") {
  alert('please select the location');
  return null;
}
if (formData.start_date === "") {
  alert('please select the start_date');
  return null;
}
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    for (let key in formData) {
      if (key !== 'media' && key !== 'skills') {
        formDataToSend.append(key, formData[key]);
      }
    }
    if (formData.media) {
      formDataToSend.append('media', formData.media);
    }
    if (formData.skills.length > 0) {
      formDataToSend.append('skills', JSON.stringify(formData.skills));
    }

    try {
      const userId = props.userData.id;
      await sendDataToAPI(formDataToSend, userId, props);
      handleCloseButtonClick();
    } catch (error) {
      console.error("Error handling form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkillChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      newSkill: e.target.value
    }));
  };

  const handleAddSkill = () => {
    const { newSkill, skills } = formData;
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setFormData(prevData => ({
        ...prevData,
        skills: [...skills, newSkill.trim()],
        newSkill: ''
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div className={classes.outerOneDiv}>
          <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
            </svg>
          </button>

          <div className={classes.heading}>
            Add Experience
          </div>
          <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={classes.divSix}>
              <label className={classes.label} htmlFor="title"><span className={classes.redStar}>*</span>Title:</label>
              <input
                className={classes.borderBox}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divFour}>
              <label className={classes.label} htmlFor="description"><span className={classes.redStar}>*</span>Description:</label>
              <textarea
                className={classes.divFive}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divSix}>
              <label className={classes.label} htmlFor="industry"><span className={classes.redStar}>*</span>Industry:</label>
              <input
                className={classes.borderBox}
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
              />
            </div>

            <div className={classes.divDate}>
              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="start_date"><span className={classes.redStar}>*</span>Start Date:</label>
                <input
                  className={classes.date}
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                />
              </div>

              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="end_date"><span className={classes.redStar}>*</span>End Date:</label>
                <input
                  className={classes.date}
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={classes.divTwo}>
              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="employment_type"><span className={classes.redStar}>*</span>Employment Type:</label>
                <select
                  className={classes.borderBox}
                  id="options"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleInputChange}
                >
                  <option className={classes.option} value=""></option>
                  <option value="Full-time">Full Time</option>
                  <option value="Part-time">Part Time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                  <option value="Trainee">Trainee</option>
                </select>
              </div>

              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="company_name"><span className={classes.redStar}>*</span>Company Name:</label>
                <input
                  className={classes.borderBox}
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={classes.divTwo}>
              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="location"><span className={classes.redStar}>*</span>Location:</label>
                <input
                  className={classes.borderBox}
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>

              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="location_type"><span className={classes.redStar}>*</span>Location Type:</label>
                <select
                  className={classes.borderBox}
                  id="options"
                  name="location_type"
                  value={formData.location_type}
                  onChange={handleInputChange}
                >
                  <option className={classes.option} value=""></option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
            </div>

            <div className={classes.divSeven}>
              <div className={classes.divOne}>
                <label className={classes.label} htmlFor="skills">Skills:</label>
                <div className={classes.skills}>
                  {formData.skills.map(skill => (
                    <div key={skill} className={classes.skillItem}>
                      <span>{skill}</span>
                      <BsX
                        className={classes.removeSkillIcon}
                        onClick={() => removeSkill(skill)}
                      />
                    </div>
                  ))}
                  <div className={classes.addSkillContainer}>
                    <input
                      className={classes.borderBoxTwo}
                      type="text"
                      value={formData.newSkill}
                      onChange={handleSkillChange}
                      placeholder="Enter skill"
                    />
                    <button
                      className={classes.btnPlus}
                      type="button"
                      onClick={handleAddSkill}
                    >
                      Add
                    </button>
                  </div>
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

export default Experience;
