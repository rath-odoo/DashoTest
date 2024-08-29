// ExperienceList.js

import React, { useState, useEffect } from 'react';
// import {fetchExperienceList,  deleteExperience, editExperience, getuser, editEducation}  from '../../../../../CommonApps/AllAPICalls';
import classes from "./HealthData.module.css";
// import Logo from '../../../../../CommonApps/Logo';
import { BsTrash, BiEditAlt, MdCheckCircle } from "react-icons/all";
// import {  deleteExperienceData, deleteHealth, editHealthData, fetchHealthData } from '../../CommonApps/AllAPICalls';
import p5 from "./document.png";
import { deleteHealth, editHealthData, fetchHealthData } from '../../CommonApps/AllAPICalls';

 

const HealthData = (props) => {
  const [experiences, setExperiences] = useState([]);
  const [rerender, setRerender] = useState(false);	
  const [showWarning, setShowWarning] = useState(false)
  const [editingExperience, setEditingExperience] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '' });
  const [formData, setFormData] = useState({
    blood_group: "",
    height: "",
    weight : "",
  });

 
  
 
  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        if (props.memberDetails && props.memberDetails.user.id) {
          const userId = props.memberDetails.user.id;
          const healthData = await fetchHealthData(userId);
          if (isMounted) {
            setExperiences([healthData]); 
          }
        }
      } catch (error) {
        console.error('Error fetching health data:', error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]);
  
  

  const applyEditHandler = (data) => {
    setEditingExperience(data);
    setFormData({
      blood_group: data.blood_group,
      height: data.height,
      weight: data.weight,
    });
    setShowWarning(true);
  };
  
   
  
 


//   const handleDeleteExperience = async (id) => {
//     try {

//         // const userId = props.userData.id;
//         console.log(props.userData.id);
//         const userId = props.memberDetails.user.id;
//       const success = await deleteExperience(id , userId, props);
//     } catch (error) {
     
//     }
//   };
 
  
  const formatExperienceDate = (startDate, endDate) => {
    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const startYear = new Date(startDate).getFullYear();
    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });
    const endYear = new Date(endDate).getFullYear();
    
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };

  
  
 
  const closeWarningHandler = () => {
    setShowWarning(false);
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

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = props.memberDetails.user.id;
      await editHealthData(editingExperience.id, userId, formData, props);  
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing health data:', error);
    }
  };

  const handleDeleteHealth = async () => {
    try {

        // const userId = props.userData.id;
        // console.log(props.userData.id);
        const userId = props.memberDetails.user.id;
      const success = await deleteHealth( userId, props);
    } catch (error) {
     
    }
  };
 
  
   
  return (
    <div >
      {/* <h1>List of Experiences</h1> */}
      <div>
      {experiences.map(data => (
        <div className={classes.mainDiv} key={data.id}>
          <div className={classes.title}>
            Health Data

            <img  alt='image' src={p5} className={classes.icon} />
           

            {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
            <button onClick={() => applyEditHandler(data)} className={classes.editBtn}>
            <BiEditAlt />
          </button>
        )}
             

{(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
            <button className={classes.deleteBtn} onClick={() => handleDeleteHealth(data)}><BsTrash className={classes.trashBtn
            } /></button>  
        )}
          </div>
          <div className={classes.divText}>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Blood Group:</strong> <div> {data.blood_group} </div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Height:</strong> <div> {data.height}</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Weight:</strong> <div>{data.weight}</div></div>
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
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  className="CreateCourseForm_closeButtonIcon__3mLN8"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                </svg>
              </button>
            </div>
            <div className={classes.heading}>Edit Health Data</div>
            <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="blood_group">
                  Blood Group:
                </label>
                <input
                  className={classes.borderBox}
                  type="text"
                  id="blood_group"
                  name="blood_group"
                  value={formData.blood_group}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="height">
                  Height:
                </label>
                <input
                  className={classes.borderBox}
                  type="text"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="weight">
                  Weight:
                </label>
                <input
                  className={classes.borderBox}
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <button className={classes.submitBtn} encType="multipart/form-data" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default HealthData;
