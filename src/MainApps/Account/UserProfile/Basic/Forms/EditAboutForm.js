import React, { useState } from 'react';
import classes from "./EditAboutForm.module.css";
import Logo from '../../../../../CommonApps/Logo';
import { ParagraphField } from '../../../../../CommonApps/FormInputObjects';
import { updateAboutData } from '../../../../../CommonApps/AllAPICalls';

const EditAboutForm = ({  aboutData, onClose , rerender   }) => {
  const [description, setDescription] = useState(aboutData.description);

   
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const userId = aboutData.user ;
      const { success, error } = await updateAboutData( aboutData.id, userId ,   {
        description: description,
        skills: "", 
      });
      if (success) {
        onClose();
        rerender();
      } else {
        console.error(error); 
      }
    } catch (error) {
      console.error(error); 
    }
  };


  return (
    <div className={classes.overlay}>
    <div className={classes.warningBlock}>
      
      <div>
        <div>
        <button className={classes.closeBtn} onClick={onClose}>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" class="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
        </button>
        </div>

        <div className={classes.logo}   >
          <Logo />
        </div>

        <div className={classes.heading}>
          Edit About Us  
        </div>
      
        <form onSubmit={handleSubmit}>
      <div className={classes.fieldContainer}>

     

        <div className={classes.descriptionDiv}> 
        <div className={classes.spanAndText}><span className={classes.redStar}>*</span>Description</div>
        <textarea className={classes.borderBox}  value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
     
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

export default EditAboutForm;
