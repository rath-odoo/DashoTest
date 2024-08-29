import React, { useState, useEffect } from 'react';
import { fetchEducationList, deleteEducation, editEducation, fetchAcademicDetails } from '../../../../../CommonApps/AllAPICalls';
import classes from "./EducationList.module.css";
import { BsTrash, BiEditAlt, MdCheckCircle } from "react-icons/all";
import Logo from '../../../../../CommonApps/Logo';

const EducationList = (props) => {

  const [rerender, setRerender] = useState(false);
  const [academicDetails, setAcademicDetails] = useState([]);
  const [educations, setEducations] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '' });
  const [editingEducation, setEditingEducation] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    school_name: '',
    degree_name: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    description: '',
    activities_and_societies: '',
    skills: []
  });
  
 

  // useEffect(() => {
  //   const userId = props.userData.id;
  //   fetchAcademicDetails(userId)
  //     .then(data => {
  //       setAcademicDetails(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching academic details:', error);
  //     });
  // }, [rerender, props]);

  useEffect(() => {
    let isMounted = true;
  
    if (props.userData && props.userData.id) {
      const userId = props.userData.id;
      fetchAcademicDetails(userId)
        .then(data => {
          if (isMounted) {
            setAcademicDetails(data);
          }
        })
        .catch(error => {
          console.error('Error fetching academic details:', error);
        });
    }
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]);  


  const applyLeaveHandler = (detail) => {
    setEditingEducation(detail);
    setFormData({
      school_name: detail.school_name,
      degree_name: detail.degree_name,
      field_of_study: detail.field_of_study,
      start_date: detail.start_date,
      end_date: detail.end_date,
      grade: detail.grade,
      description: detail.description,
      activities_and_societies: detail.activities_and_societies,
      skills: detail.skills
    });
    setShowWarning(true);
  };

     const closeWarningHandler = () => {
    setEditingEducation(null);
    setShowWarning(false);

    setIsSubmitting(false); 
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, newSkill]
    });
    setNewSkill({ name: '', description: '', category: '' });
  };

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

 
const handleSubmit = async (event) => {
  event.preventDefault();

  setIsSubmitting(true); 

  
  try {
    const userId = props.userData.id;
    await editEducation(editingEducation.id, userId, formData , props);
    
    closeWarningHandler();
  } catch (error) {

    setIsSubmitting(false);  
    console.error('Error editing experience:', error);
  }
};
 

  

  const formatEducationDate = (startDate, endDate) => {
    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const startYear = new Date(startDate).getFullYear();
    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });
    const endYear = new Date(endDate).getFullYear();

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  const handleDeleteEducation = async (id) => {
    try {
      const userId = props.userData.id;
      const success = await deleteEducation(id, userId, props);
      if (success) {
        setRerender(!rerender);
      }
    } catch (error) {
      console.error('Error deleting education:', error);
    }
  };

  console.log("accadmy", academicDetails);

  return (
    <div>
      <div>
        <div className={classes.educationDiv}>
          {academicDetails.map((detail, index) => (
            <div className={classes.eduInnerDiv} key={index}>
              <div className={classes.div}>
                <div className={classes.divOne}>{detail.school_name}</div>
                <button className={classes.deleteBtn} onClick={() => handleDeleteEducation(detail.id)}>
                  <BsTrash className={classes.trashBtn} />
                </button>
                <button onClick={() => applyLeaveHandler(detail)} className={classes.editBtn}>
                  <BiEditAlt />
                </button>
              </div>
              <div>{detail.degree_name}, {detail.field_of_study}</div>
              <div className={classes.dateEdu}>{formatEducationDate(detail.start_date, detail.end_date)}</div>
              <div className={classes.skillListOuter}>
                {detail.skills.map((skill, skillIndex) => (
                  <div className={classes.skillList} key={skill.id}>
                    {skillIndex === 0 && <MdCheckCircle className={classes.skillIcon} />}
                    {skill.name}
                    {skillIndex < detail.skills.length - 1 && ','}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showWarning && (
        <div className={classes.overlay}>
          <div className={classes.warningBlock}>
            <div>
              <button className={classes.closeBtn} onClick={closeWarningHandler}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
              </button>
            </div>
            <div className={classes.logo}>
              <Logo />
            </div>
            <div className={classes.heading}>
              Edit Education Details
            </div>
            <form onSubmit={handleSubmit}>
              <div className={classes.fieldContainer}>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="school_name"><span className={classes.redStar}>*</span>School Name</label>
                  <input
                    className={classes.divInput}
                    type="text"
                    id="school_name"
                    name="school_name"
                    value={formData.school_name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="degree_name"><span className={classes.redStar}>*</span>Degree Name</label>
                  <input
                  className={classes.divInput}
                    type="text"
                    id="degree_name"
                    name="degree_name"
                    value={formData.degree_name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="field_of_study"><span className={classes.redStar}>*</span>Field of Study</label>
                  <input
                  className={classes.divInput}
                    type="text"
                    id="field_of_study"
                    name="field_of_study"
                    value={formData.field_of_study}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className={classes.dateDiv}>
                  <div className={classes.inputFieldStart}>
                    <label className={classes.label} htmlFor="start_date"><span className={classes.redStar}>*</span>Start Date</label>
                    <input
                    className={classes.divDate}
                      type='date'
                      id="start_date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                  <div className={classes.inputFieldStart}>
                    <label className={classes.label} htmlFor="end_date"><span className={classes.redStar}>*</span>End Date</label>
                    <input
                    className={classes.divDate}
                      type='date'
                      id="end_date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleFormChange}
                      required
                    />
                  </div>
                </div>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="grade">Grade</label>
                  <input
                  className={classes.divInput}
                    type="text"
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleFormChange}
                  />
                </div>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="description">Description</label>
                  <input
                  className={classes.divInput}
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>
                <div className={classes.inputField}>
                  <label className={classes.label} htmlFor="activities_and_societies">Activities and Societies</label>
                  <input
                  className={classes.divInput}
                    type="text"
                    id="activities_and_societies"
                    name="activities_and_societies"
                    value={formData.activities_and_societies}
                    onChange={handleFormChange}
                  />
                </div>
                <div className={classes.skillsContainer}>
                  <div className={classes.skillInputField}>
                    <label className={classes.label} htmlFor="skill_name">Skill Name</label>
                    <input
                    className={classes.divInput}
                      type="text"
                      id="skill_name"
                      name="name"
                      value={newSkill.name}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <div className={classes.skillInputField}>
                    <label className={classes.label} htmlFor="skill_description">Skill Description</label>
                    <input
                    className={classes.divInput}
                      type="text"
                      id="skill_description"
                      name="description"
                      value={newSkill.description}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <div className={classes.skillInputField}>
                    <label className={classes.label} htmlFor="skill_category">Skill Category</label>
                    <input
                    className={classes.divInput}
                      type="text"
                      id="skill_category"
                      name="category"
                      value={newSkill.category}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <button type="button" onClick={handleAddSkill} className={classes.addSkillBtn}>Add Skill</button>
                </div>
                <div className={classes.skillListTwo}>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className={classes.skillItem}>
                      <span>{skill.name} ({skill.category}): {skill.description}</span>
                      <button type="button" onClick={() => handleRemoveSkill(index)} className={classes.removeSkillBtn}>Remove</button>
                    </div>
                  ))}
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
      )}
    </div>
  );
};

export default EducationList;
