import classes from "./Document.module.css";
import { useState, useEffect, useRef } from 'react';
import Person from "./docs.png";
import { BsTrash } from "react-icons/bs";


import { deleteDocumentInstitute } from '../../CommonApps/AllAPICalls';

const Document = (props) => {



  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  }
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };

  const openFileHandler = () => {
    window.open(props.onedoc.docfile, "__blank");
  }


  const [editState, setEditState] = useState(false);

  const deleteDocHandler = () => {

    let documentId = props.onedoc.id;
    deleteDocumentInstitute({ documentId, setEditState, props });

  }



  return (


    <div className={classes.mainBlock} >
      <div className={classes.nameContainer1} onClick={openFileHandler}>{props.onedoc.name}</div>
      <div className={classes.dateContainer1}>{props.onedoc.uploadtime.split("T")[0]}</div>
      {props.isAdminOrOwner && props.isEditable &&
        <button type="button" className={classes.linkContainer1} onClick={handleDeleteConfirm}>
          <BsTrash />
        </button>
      }
      {showDeleteConfirm && (
        <div className={classes.overLay}>
          <div className={classes.confirmDialog}>
            <p className={classes.p}>Are you sure you want to Delete this Course?</p>
            <div className={classes.div1}>
              <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button type="submit" className={classes.deleteYes} onClick={deleteDocHandler}><b>
                Yes,Delete </b>
              </button>
            </div>
          </div>
        </div>)
      }

    </div>


  );
}

export default Document;
