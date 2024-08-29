import React, { useState, useEffect } from 'react';
import classes from "./DocumentList.module.css";
import { BsTrash, BiEditAlt } from "react-icons/all";
import { deleteDoc, fetchDocument, updateDocument } from '../../CommonApps/AllAPICalls';

const DocumentList = (props) => {
  const [documents, setDocuments] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    docfile: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (props.memberDetails && props.memberDetails.user.id) {
          const userId = props.memberDetails.user.id;
          const instituteId = props.memberDetails.institute.id;
          const documentList = await fetchDocument(userId, instituteId);
          if (isMounted) {
            setDocuments(documentList.results);
          }
        }
      } catch (error) {
        console.error('Error fetching document list:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [rerender, props]);

  const handleDeleteDocument = async (id) => {
    try {
      const userId = props.memberDetails.user.id;
      await deleteDoc(id, userId, props);
      setRerender(!rerender);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const handleEditClick = (document) => {
    setEditingDocument(document);
    setFormData({
      name: document.document.name,
      docfile: null,
    });
    setShowWarning(true);
  };

  const handleFormChange = (event) => {
    const { name, value, files } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = props.memberDetails.user.id;
      const instituteId = props.memberDetails.institute.id;
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      if (formData.docfile) {
        formDataToSend.append('docfile', formData.docfile);
      }

      await updateDocument(editingDocument.document.id, userId, instituteId, formDataToSend);
      setRerender(!rerender);
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing document:', error);
    }
  };

  const closeWarningHandler = () => {
    setShowWarning(false);
    setEditingDocument(null);
  };

  const handleViewDocument = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div>
      <div>
        {documents.map(document => (
          <div className={classes.mainDiv} key={document.document.id}>

 

            <div className={classes.title}>
              {document.document.name}  
             
              {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
             <button className={classes.deleteBtn} onClick={() => handleDeleteDocument(document.document.id)}>
             <BsTrash className={classes.trashBtn} />
           </button>
        )}
              
              {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
             <button className={classes.editBtn} onClick={() => handleEditClick(document)}>
             <BiEditAlt />
           </button>
        )}
            </div>
            <div className={classes.divText}>
              {/* <div>Uploaded at: {new Date(document.document.uploadtime).toLocaleString()}</div> */}
            </div>
              <div className={classes.docFileContainer}>
                <button className={classes.btnViewDocument} onClick={() => handleViewDocument(document.document.docfile)}>View Document</button>
              </div>
              <div className={classes.span}>Uploaded at: {new Date(document.document.uploadtime).toLocaleString()}</div>
          </div>
        ))}
      </div>

      {showWarning && (
        <div className={classes.overlay}>
          <div className={classes.warningBlock}>
            <div className={classes.outerOneDiv}>
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

              <div className={classes.heading}>
                Edit Document
              </div>
              <form className={classes.form} onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={classes.divSix}>
                  <label className={classes.label} htmlFor="name"><span className={classes.redStar}>*</span>Title:</label>
                  <input className={classes.borderBox}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className={classes.divFour}>
                  <label className={classes.label} htmlFor="docfile">Document File:</label>
                  <input  
                    type="file"
                    id="docfile"
                    name="docfile"
                    onChange={handleFormChange}
                  />
                </div>

                <button className={classes.submitBtn} type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
