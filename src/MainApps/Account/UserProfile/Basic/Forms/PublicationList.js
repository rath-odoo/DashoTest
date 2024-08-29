import React, { useState, useEffect } from 'react';
import { fetchPublicationList, deletePublication, editPublication, getusersfromnames } from '../../../../../CommonApps/AllAPICalls';
import classes from "./PublicationList.module.css";
import { BsTrash, BiEditAlt } from "react-icons/all";
import Logo from '../../../../../CommonApps/Logo';
import { TextInputAddMember } from '../../../../../CommonApps/FormInputObjects';

const PublicationList = (props) => {
  const [publications, setPublications] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [searchUsers, getSearchUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [currentPublication, setCurrentPublication] = useState(null); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error , setError] = useState(); 
  const [formData, setFormData] = useState({
    title: '',
    publisher : '',
    publication_date : '',
    publication_url : '',
    description: '',
    authors: [""],
  });

 

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userId = props.userData.id;
  //       const publicationList = await fetchPublicationList(userId);
  //       setPublications(publicationList);
  //     } catch (error) {
  //       console.error('Error fetching publication list:', error);
  //     }
  //   };
  //   fetchData();
  // }, [rerender, props]);

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        if (props.userData && props.userData.id) {
          const userId = props.userData.id;
          const publicationList = await fetchPublicationList(userId);
          if (isMounted) {
            setPublications(publicationList);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]); 
  

  const applyLeaveHandler = (publication) => {
    setFormData({
      title: publication.title,
      authors: publication.authors, 
      description: publication.description,
      publisher : publication.publisher,
      publication_date : publication.publication_date,
      publication_url : publication.publication_url,
    });
    setCurrentPublication(publication);
    setShowWarning(true);
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
    setCurrentPublication(null);
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
  const selectSpeakerHandler = (user) => {
    setAddedUsers((prevUsers) => [...prevUsers, user]);
    setFormData((prevData) => ({
      ...prevData,
      authors: [...prevData.authors, user.id],
    }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (currentPublication) {
        const userId = props.userData.id;
        const response = await editPublication(currentPublication.id, formData, userId , props);
       
     
    setIsSubmitting(false);
        closeWarningHandler();
      }
      console.log(formData);
    } catch (error) {
      console.error('Error editing publication:', error);
    }
  };

  const handleDeletePublication = async (id) => {
    try {
      const userId = props.userData.id;
      await deletePublication(id, userId, props);
      
    } catch (error) {
      console.error('Error deleting publication:', error);
    }
  };
 

  const handleChangeSearch = (e) => {
    let namestring = e.target.value;
    getusersfromnames({ namestring, getSearchUsers });
  };


 

 
  return (
    <div>
      <div>
        {error ? <p>{error}</p> : publications.map(publication => (
          <div className={classes.mainDiv} key={publication.id}>
            <div className={classes.title}>
              {publication.title}
              <button className={classes.deleteBtn} onClick={() => handleDeletePublication(publication.id)}>
                <BsTrash className={classes.trashBtn} />
              </button>
              <button onClick={() => applyLeaveHandler(publication)} className={classes.editBtn}>
                <BiEditAlt />
              </button>
            </div>
            <div className={classes.divText}>
              <div className={classes.sameOne}></div>
              <div className={classes.sameTwo}>{publication.publication_date}</div>
              <div className={classes.sameThree}>{publication.description}</div>
              <div className={classes.authors}>
                {publication.author_usernames.map((username, index) => (
                  <span key={index} className={classes.author}>
                    {username}
                    {index !== publication.author_usernames.length - 1 && ', '}
                  </span>
                ))}
              </div>
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
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path>
                  </svg>
                </button>
              </div>
              <div className={classes.logo}>
                <Logo />
              </div>
              <div className={classes.heading}>Edit Publication</div>
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

              {/* <TextInputAddMember
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
              /> */}

              <div className={classes.mediaAuthors}>
                <div className={classes.divAuthors}>
                  <label className={classes.label} htmlFor="authors">
                    Added Authors:
                  </label>
                  <input
                  className={classes.borderBox}
                  // type="number"
                  name="authors"
                  value={formData.authors}
                  onChange={handleChange}
                />
                </div>
              </div>
            </div>

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

export default PublicationList;
