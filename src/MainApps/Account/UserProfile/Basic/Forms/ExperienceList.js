// ExperienceList.js

import React, { useState, useEffect } from 'react';
import {fetchExperienceList,  deleteExperience, editExperience, getuser, editEducation}  from '../../../../../CommonApps/AllAPICalls';
import classes from "./ExperienceList.module.css";
import Logo from '../../../../../CommonApps/Logo';
import { BsTrash, BiEditAlt, MdCheckCircle } from "react-icons/all";

 

const ExperienceList = (props) => {
  const [experiences, setExperiences] = useState([]);
  const [rerender, setRerender] = useState(false);	
  const [showWarning, setShowWarning] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '' });
  const [formData, setFormData] = useState({
    title: '',
    employment_type: '',
    company_name: '',
    location: '', 
    industry: '',
    location_type: '',
    currently_working: '',
    start_date: '',
    end_date: '',
    description: '',
    // skills: [] ,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // console.log("id", props.userData.id)
  //       // console.log(data.id);
  //       const userId = props.userData.id;
  //       const experienceList = await fetchExperienceList(userId);
  //       setExperiences(experienceList);
  //     } catch (error) {
  //     }
  //   };
  //   fetchData();
  // }, [rerender , props, props.userData.id ]);


  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        if (props.userData && props.userData.id) {
          const userId = props.userData.id;
          const experienceList = await fetchExperienceList(userId);
          if (isMounted) {
            setExperiences(experienceList);
          }
        }
      } catch (error) {
        console.error('Error fetching experience list:', error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]); 
  

  const applyEditHandler = (experience) => {
    setEditingExperience(experience);
    setFormData({
      title: experience.title,
      employment_type: experience.employment_type,
      company_name: experience.company_name,
      location: experience.location,
      industry: experience.industry,
      end_date: experience.end_date,
      location_type: experience.location_type,
      currently_working: experience.currently_working,
      description: experience.description,
      start_date: experience.start_date,
      // skills: experience.skills ,
    });
    setShowWarning(true);
  };
  const closeWarningHandler = () => {
    setShowWarning(false);
  };
   
  
 


  const handleDeleteExperience = async (id) => {
    try {

        // const userId = props.userData.id;
        console.log(props.userData.id);
      const userId = props.userData.id;
      const success = await deleteExperience(id , userId, props);
    } catch (error) {
     
    }
  };
 
  
  const formatExperienceDate = (startDate, endDate) => {
    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const startYear = new Date(startDate).getFullYear();
    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });
    const endYear = new Date(endDate).getFullYear();
    
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  
  
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // const handleSkillChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewSkill({
  //     ...newSkill,
  //     [name]: value
  //   });
  // };

  // const handleAddSkill = () => {
  //   setFormData({
  //     ...formData,
  //     skills: [...formData.skills, newSkill]
  //   });
  //   setNewSkill({ name: '', description: '', category: '' });
  // };

  // const handleRemoveSkill = (index) => {
  //   setFormData({
  //     ...formData,
  //     skills: formData.skills.filter((_, i) => i !== index)
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const userId = props.userData.id;
      await editExperience(editingExperience.id, userId, formData ,props);
      console.log(formData);

      closeWarningHandler();
    } catch (error) {
      console.error('Error editing experience:', error);
    }finally {
      setIsSubmitting(false);
    }
  };
   
  return (
    <div >
      {/* <h1>List of Experiences</h1> */}
      <div >
        {experiences.map(experience => (
          <div className={classes.mainDiv}  key={experience.id}>
            {/* <div>{experience.id}</div> */}
            
            <div className={classes.title}> {experience.title}  <button className={classes.deleteBtn} onClick={() => handleDeleteExperience(experience.id)}><BsTrash className={classes.trashBtn
            } /></button>  
            <button   onClick={() => applyEditHandler(experience)}  className={classes.editBtn} ><BiEditAlt /></button>  </div>
            <div className={classes.divText}>
            <div className={classes.sameOne}> {experience.company_name} - {experience.employment_type}</div>   
            <div className={classes.sameTwo}> {formatExperienceDate(experience.start_date, experience.end_date)}</div>
            <div className={classes.sameThree} > {experience.location} - {experience.location_type}</div>

              {/* <strong>Skills:</strong> */}
              {/* <div>
                {experience.skills.map(skill => (
                  <div key={skill.id}>Skills: {skill.name}</div>
                ))}
              </div> */}

              {/* <div className={classes.skillListOuter}>
                {experience.skills.map((skill, skillIndex) => (
                  <div className={classes.skillList} key={skill.id}>
                    {skillIndex === 0 && <MdCheckCircle className={classes.skillIcon} />}
                    {skill.name}
                    {skillIndex < experience.skills.length - 1 && ','}
                  </div>
                ))}
              </div> */}

            </div>
 
            
             
          </div>
        ))}
      </div>

      {showWarning && (
        <div className={classes.overlay}>
         
            <div className={classes.warningBlock}>
            
            <div className={classes.outerOneDiv}>
                <div>
                <button className={classes.closeBtn} onClick={closeWarningHandler}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>
                </div>

                {/* <div className={classes.logo}   >
                <Logo />
                </div> */}

                <div className={classes.heading}>
                Edit Experience  
                </div>
                <form className={classes.form} onSubmit={handleSubmit}   encType="multipart/form-data">


                 

 
             
                   


 
    <div className={classes.divSix}> 
                
        <label className={classes.label} htmlFor="title"><span className={classes.redStar}>*</span>Title:</label>        
        <input className={classes.borderBox}
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleFormChange}
        required
 
           
        />

        
    </div>

    <div className={classes.divFour} > 
        <label className={classes.label} htmlFor="description"><span className={classes.redStar}>*</span>Description:</label>
        <textarea 
            className={classes.divFive}
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            required
         
            
        />


    </div>
    
    <div className={classes.divSix} > 

<label className={classes.label} htmlFor="industry"><span className={classes.redStar}>*</span>Industry:</label>
<input className={classes.borderBox}
 type="text"
 id="industry"
 name="industry"
 value={formData.industry}
 onChange={handleFormChange}
 // required
  
   
/>

</div>

    


<div className={classes.divTwo}> 
        <div className={classes.divOne}> 
        <label className={classes.label} htmlFor="employment_type"><span className={classes.redStar}>*</span>Employment Type :</label>
     

<select className={classes.borderBox}  
type="text"
id="employment_type"
name="employment_type"
value={formData.employment_type}
onChange={handleFormChange}
required
           
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
        <input className={classes.borderBox}
        type="text"
        id="company_name"
        name="company_name"
        value={formData.company_name}
        onChange={handleFormChange}
        required
            
        />
    </div>

    </div>


<div className={classes.divTwo}> 
    <div className={classes.divOne}> 
        <label  className={classes.label} htmlFor="location"><span className={classes.redStar}>*</span>Location:</label>
        <input className={classes.borderBox}
             type="text"
             id="location"
             name="location"
             value={formData.location}
             onChange={handleFormChange}
             required
             
        />
    </div>

 

        <div className={classes.divOne}> 
        <label className={classes.label} htmlFor="location"><span className={classes.redStar}>*</span>Location Type:</label>
      
<select className={classes.borderBox}  
 type="text"
 id="location_type"
 name="location_type"
 value={formData.location_type}
 onChange={handleFormChange}
 required
            >

        <option className={classes.option} value=""></option>
        <option value="On-site">On-site</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Remote">Remote</option>
       
      </select>
    </div>

    </div>


      

    <div className={classes.divDate}> 

    <div className={classes.divOne}> 

        <label className={classes.label} htmlFor="start_date"><span className={classes.redStar}>*</span>Start Date:</label>
        <input  className={classes.date}
        type="date"
        id="start_date"
        name="start_date"
        value={formData.start_date}
        onChange={handleFormChange}
        required
             
         
           
        />

</div>

<div className={classes.divOne}> 
<label className={classes.label} htmlFor="end_date"><span className={classes.redStar}>*</span>End Date:</label>
        <input className={classes.date}
        type="date"
        id="end_date"
        name="end_date"
        value={formData.end_date}
        onChange={handleFormChange}
        required
         
            
           
        />

</div>
    </div >

    <div className={classes.inputField}>
                    <label htmlFor="currently_working">Currently Working</label>
                    <select
                      id="currently_working"
                      name="currently_working"
                      value={formData.currently_working}
                      onChange={handleFormChange}
                      // required
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>




                  {/* <div className={classes.skillsContainer}>
                  <div className={classes.skillInputField}>
                    <label htmlFor="skill_name">Skill Name</label>
                    <input
                      type="text"
                      id="skill_name"
                      name="name"
                      value={newSkill.name}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <div className={classes.skillInputField}>
                    <label htmlFor="skill_description">Skill Description</label>
                    <input
                      type="text"
                      id="skill_description"
                      name="description"
                      value={newSkill.description}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <div className={classes.skillInputField}>
                    <label htmlFor="skill_category">Skill Category</label>
                    <input
                      type="text"
                      id="skill_category"
                      name="category"
                      value={newSkill.category}
                      onChange={handleSkillChange}
                    />
                  </div>
                  <button type="button" onClick={handleAddSkill} className={classes.addSkillBtn}>Add Skill</button>
                </div>
                <div className={classes.skillList}>
                  {formData.skills.map((skill, index) => (
                    <div key={index} className={classes.skillItem}>
                      <span>{skill.name} ({skill.category}): {skill.description}</span>
                      <button type="button" onClick={() => handleRemoveSkill(index)} className={classes.removeSkillBtn}>Remove</button>
                    </div>
                  ))}
                </div>
 
 */}

  
                      

        <button className={classes.submitBtn}    encType="multipart/form-data" type="submit"               disabled={isSubmitting}
        >{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </form>
            

            </div>
            </div>
        </div>
      )}


    </div>
  );
};

export default ExperienceList;
