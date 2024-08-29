import React, { useState } from 'react';
import { updateAboutData } from '../../../../../CommonApps/AllAPICalls';
import classes from "./AboutUsView.module.css";
import { BiEditAlt } from "react-icons/all";
import Logo from '../../../../../CommonApps/Logo';

const AboutUsView = (props) => {
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    about: props.userData.about
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const userId = props.userData.id;
      const newData = { about: formData.about };
      await updateAboutData(newData, props);
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing about us data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
  };
  console.log("props",props.data.about)

  return (
    <div>
      <div className={classes.aboutUsDiv}>
        <div className={classes.aboutUsInnerDiv}>
          <div className={classes.editContainer}>
            <button onClick={() => setShowWarning(true)} className={classes.editBtn}>
              <BiEditAlt />
            </button>
          </div>
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
              Edit About Us Details
            </div>
            <form className={classes.form} onSubmit={handleSubmit}>
              <div className={classes.inputField}>
                <label className={classes.label} htmlFor="about"><span className={classes.redStar}>*</span>Description</label>
                <textarea
                  className={classes.divInputTextArea}
                  type="text"
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleFormChange}
                  defaultValue={props.data.about}
                  disabled={loading}
                />
              </div>
              <div className={classes.submitContainer}>
                <button className={classes.submitBtn} type="submit" disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsView;
