import React, { useState } from 'react';
import classes from './AddPublication.module.css';
import { addPublication, getusersfromnames } from '../../../../../CommonApps/AllAPICalls';
import Logo from '../../../../../CommonApps/Logo';
import { BsX } from 'react-icons/bs';
import { TextInputAddMember } from '../../../../../CommonApps/FormInputObjects';

const Publication = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    publisher: '',
    publication_date: '',
    publication_url: '',
    description: '',
    authors: [],
  });

  const [submitState, setSubmitState] = useState('Submit'); // State to manage submit button text

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAuthorChange = (index, value) => {
    const newAuthors = [...formData.authors];
    newAuthors[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      authors: newAuthors,
    }));
  };

  const handleAddAuthor = () => {
    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check required fields
    if (!formData.title || !formData.publisher || !formData.publication_date) {
      alert('Please fill out all required fields: Title, Publisher, and Publication Date.');
      return;
    }

    setSubmitState('Submitting...'); // Update button state to 'Submitting...'

    try {
      const userId = props.userData.id;
      const response = await addPublication(formData, userId);
   

      setSubmitState('Submitted');
      props.onClose();
    } catch (error) {
      console.error('Error adding publication:', error);
      alert('An error occurred while adding the publication. Please try again.');
      setSubmitState('Submit'); 
    }
  };

  const [searchUsers, getSearchUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const handleChangeSearch = (e) => {
    let namestring = e.target.value;
    getusersfromnames({ namestring, getSearchUsers });
  };

  const selectSpeakerHandler = ({ user }) => {
    const { firstname, lastname } = user;
    const fullName = `${firstname} ${lastname}`;

    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, fullName],
    }));

    setAddedUsers((prevUsers) => {
      if (!prevUsers.some((oldUser) => oldUser.id === user.id)) {
        return [...prevUsers, user];
      } else {
        return prevUsers;
      }
    });
  };

  return (
    <div className={classes.overlay}>
      <div className={classes.warningBlock}>
        <div className={classes.outerOneDiv}>
          <div> 
            <button className={classes.closeBtn} onClick={handleCloseButtonClick}>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
              </button>
          </div>

          <div className={classes.logo}>
            <Logo />
          </div>

          <div className={classes.heading}>Add Publication</div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.overFlow}>
              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="title">
                  <span className={classes.redStar}>*</span>Title:
                </label>
                <input
                  className={classes.borderBox}
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className={classes.divFour}>
                <label className={classes.label} htmlFor="publisher">
                  <span className={classes.redStar}>*</span>Publisher:
                </label>
                <input
                  className={classes.borderBox}
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                />
              </div>

              <div className={classes.divDate}>
                <div className={classes.divOne}>
                  <label className={classes.label} htmlFor="publication_date">
                    <span className={classes.redStar}>*</span>Publication Date:
                  </label>
                  <input
                    className={classes.date}
                    type="date"
                    name="publication_date"
                    value={formData.publication_date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="publication_url">
                  URL:
                </label>
                <input
                  className={classes.borderBox}
                  type="url"
                  name="publication_url"
                  value={formData.publication_url}
                  onChange={handleChange}
                />
              </div>

              <div className={classes.divSix}>
                <label className={classes.label} htmlFor="description">
                  Description:
                </label>
                <textarea
                  className={classes.borderBox}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <TextInputAddMember
                handleChange={handleChangeSearch}
                label="Author Names"
                name="speaker"
                placeholder="Search by firstname"
                searchUsers={searchUsers}
                selectSpeaker={selectSpeakerHandler}
                addedUsers={addedUsers}
                getSearchUsers={getSearchUsers}
                setAddedUsers={setAddedUsers}
                width="100%"
              />

              <div className={classes.mediaAuthors}>
                <div className={classes.divAuthors}>
                  <label className={classes.label} htmlFor="authors">
                    Added Authors:
                  </label>
                  {formData.authors.map((author, index) => (
                    <div key={index} className={classes.authorInputContainer}>
                      <span className={classes.spanAuthor}>{author}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className={classes.submitBtn} type="submit">
              {submitState}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Publication;
