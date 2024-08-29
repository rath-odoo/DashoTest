import React, { useState, useEffect } from "react";
import classes from "./AboutEditForm.module.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { getuser, putuserprofileadvanced } from '../../../../CommonApps/AllAPICalls';
import Logo from "../../../../CommonApps/Logo";

const AboutEditForm = (props) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false); // New loading state

  useEffect(() => {
    getuser({ setData });
  }, []);

  const initialFormData = Object.freeze({
    usertitle: data.usertitle,
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    gender: data.gender,
    position: data.position,
    dateofbirth: data.dateofbirth,
    institute: data.institute,
    city: data.city,
    state: data.state,
    country: data.country,
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await putuserprofileadvanced({ data, formData });
      props.userDataUpdated(true);
      props.onPress();
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.aboutEditFormDivParent}>
      <form className={classes.aboutEditForm} onSubmit={handleSubmit}>
        <div className={classes.closeButtonDiv}>
          <button onClick={props.onPress} className={classes.closeFormButton}>
            <AiFillCloseCircle className={classes.closeButtonIcon} />
          </button>
        </div>

        <div className={classes.logoAndTitleContainer}>
          <Logo />
          <div className={classes.titleDiv}><i>Edit Profile</i></div>
        </div>

        <div className={classes.position_div}>
          <div className={classes.name_txt}><span className={classes.redstar}>*</span>Title</div>
          <select
            name="usertitle"
            onChange={handleChange}
            type="text"
            className={classes.genpos_field}
            defaultValue={"titleDefault"}
            disabled={loading}
          >
            <option value="titleDefault" disabled>Choose your title</option>
            <option value="1">Mr</option>
            <option value="2">Ms</option>
            <option value="3">Dr</option>
            <option value="">No title</option>
          </select>
        </div>


        <div className={classes.name_div}>
          <div className={classes.name_txt}><span className={classes.redstar}>*</span>Firstname</div>
          <div className={classes.name_inputDiv}>
            <input
              type="text"
              onChange={handleChange}
              name="firstname"
              className={classes.firstname_field}
              placeholder="firstname"
              defaultValue={data.firstname}
              disabled={loading}
            />
          </div>
        </div>



        <div className={classes.submitButtonDiv}>
          <button type="submit" className={classes.submit_button} disabled={loading}>
            <b>{loading ? 'Saving...' : 'Save'}</b>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutEditForm;
