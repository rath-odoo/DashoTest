import React, { useEffect, useState } from 'react';
import { BsX } from 'react-icons/bs';
import classes from './AboutUs.module.css'; // Update the path based on your folder structure
// import { OptionField, TextInput } from '../../Advanced/Forms/FormInputObjects';
import Logo from '../../../../../CommonApps/Logo';
import axios from 'axios'; 

import { OptionField, ParagraphField, TextInput } from "./../../../../../CommonApps/FormInputObjects";
import { addAboutUsData } from '../../../../../CommonApps/AllAPICalls';

const AboutUs = (props) => {
  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const [formData, setFormData] = useState({
    description: '',
    // skills: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = props.userData.id ;
      await addAboutUsData(userId , formData , props ); 
      props.onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error('Bad Request:', error.response.data);
      } else {
        console.error('An unexpected error occurred:', error.message);
      }
    }
  };
  
 
  return (
    <div className={classes.overlay}>
        <div className={classes.warningBlock}>
          
          <div>
            <div>
            <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" class="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
            </button>
            </div>

            <div className={classes.logo}   >
              <Logo />
            </div>

            <div className={classes.heading}>
              Add About Us  
            </div>
          
            <form onSubmit={handleSubmit}>
          <div className={classes.fieldContainer}>

          <ParagraphField
              type="text"
              label="Description"                
              name="description"
              value={formData.description}
              handleChange = {handleChange}
              placeholder="Add Description here"
              requirement="*"
            />

          </div>

          {/* Assuming skills is a multi-select field */}
          {/* <div className={classes.fieldContainer}>
            <select
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              multiple
            >
              <option value="Leader">Leader</option>
              <option value="teamwork">Teamwork</option>
              <option value="Solving">Solving</option>
            </select>
          </div> */}

          <div className={classes.submitContainer}>
            <button className={classes.submitBtn} type="submit">
              Submit
            </button>
          </div>
        </form>


          </div>
        </div>
        </div>
  );
};

export default AboutUs;
