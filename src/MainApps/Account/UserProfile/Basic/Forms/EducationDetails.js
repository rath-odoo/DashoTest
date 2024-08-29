import React, { useState } from 'react';
import { BsCheck, BsX } from 'react-icons/bs';
import classes from './EducationDetails.module.css'; // Update the path based on your folder structure
import Logo from '../../../../../CommonApps/Logo';
import { DateField, TextInput } from "./../../../../../CommonApps/FormInputObjects";
import { addAcademicDetails } from '../../../../../CommonApps/AllAPICalls';

const EducationDetails = (props) => {
  const [formData, setFormData] = useState({
    school_name: "",
    degree_name: "",
    field_of_study: "",
    start_date: "",
    end_date: "",
    grade: "",
    description: "",
    activities_and_societies: "",
    currently_studying: false,
    media: null,
    skills: []
  });
  const [newSkill, setNewSkill] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Add a loading state

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.school_name === "") {
  alert('please select the School name ');
  return null;
}
if (formData.degree_name === "") {
  alert('please select the Degree name ');
  return null;
}

if (formData.field_of_study === "") {
  alert('please select the Field of Study ');
  return null;
}

if (formData.start_date === "") {
  alert('please select the Start Date ');
  return null;
}

if (formData.end_date === "") {
  alert('please select the End Date ');
  return null;
}

if (formData.grade === "") {
  alert('please select the Grade ');
  return null;
}

if (formData.description === "") {
  alert('please select the description ');
  return null;
}


    setIsSubmitting(true); 
    const userId = props.userData.id;
    try {
      await addAcademicDetails(formData, userId, props, props.userId, props.instituteId);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);  
      handleCloseButtonClick();
    }
  };

  const handleSkillChange = (e) => {
    setNewSkill(e.target.value);
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setFormData({
        ...formData,
        skills: [...formData.skills, { name: newSkill }]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div>
          <div>
            <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
            </button>
          </div>
          <div className={classes.logo}>
            <Logo />
          </div>
          <div className={classes.heading}>
            Add Education Details
          </div>
          <form onSubmit={handleSubmit}>
            <div className={classes.fieldContainer}>
              <TextInput
                label="School Name"
                value={formData.school_name}
                name="school_name"
                handleChange={handleChange}
                requirement="*"
              />
              <TextInput
                label="Degree Name"
                value={formData.degree_name}
                name="degree_name"
                handleChange={handleChange}
                requirement="*"
              />
              <TextInput
                label="Field of Study"
                value={formData.field_of_study}
                name="field_of_study"
                handleChange={handleChange}
                requirement="*"
              />

              <div className={classes.dateDiv}>
                <div className={classes.startDate}>
                  <DateField
                    label="Start Date"
                    type="date"
                    value={formData.start_date}
                    name="start_date"
                    handleChange={handleChange}
                    requirement="*"
                  />
                </div>
                <div className={classes.endDate}>
                  <DateField
                    label="End Date"
                    type="date"
                    value={formData.end_date}
                    name="end_date"
                    handleChange={handleChange}
                    requirement="*"
                  />
                </div>
              </div>

              <TextInput
                label="Grade"
                value={formData.grade}
                name="grade"
                handleChange={handleChange}
                requirement="*"
              />
              <TextInput
                label="Description"
                value={formData.description}
                name="description"
                handleChange={handleChange}
                requirement="*"

              />
              <TextInput
                label="Activities and Societies"
                value={formData.activities_and_societies}
                name="activities_and_societies"
                handleChange={handleChange}
              />

              <div className={classes.skillsContainer}>
                <label className={classes.label} htmlFor="skills">Skills</label>
                <div className={classes.addSkillContainer}>
                  <input
                    className={classes.borderBoxTwo}
                    type="text"
                    value={newSkill}
                    onChange={handleSkillChange}
                    placeholder="Add a skill"
                  />
                  <button type="button" onClick={addSkill} className={classes.btnPlus}>Add</button>
                </div>
                <ul className={classes.skillsList}>
                  {formData.skills.map((skill, index) => (
                    <li key={index} className={classes.skillItem}>
                      {skill.name}
                      <button type="button" onClick={() => removeSkill(index)} className={classes.removeSkillBtn}>
                        <BsX />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={classes.submitContainer}>
              <button className={classes.submitBtn} type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationDetails;
