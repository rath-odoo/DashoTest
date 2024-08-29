import React, { useEffect, useState } from 'react';
import classes from './OneVideoBox.module.css';
import ReactPlayer from 'react-player';
import { AiFillDelete } from 'react-icons/ai';
import { deleteVideoById, getCourseAdmins } from '../../../../../CommonApps/AllAPICalls';

const OneVideoBox = (props) => {

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };



  const deleteVideohandler = (videoId) => {
    deleteVideoById(videoId, props.setIsDeleted, props.isDeleted);
  };



  return (

    <div className={classes.oneVideoBox} >
      {/*
       <iframe
          src="https://www.youtube.com/embed/TedGJlmQfaU"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          title="video"
	  className={classes.iframestyle}
          />
      */}
      <ReactPlayer url={props.video.link} width="100%" height="100%" controls={true} />


      <div className={classes.nameDiv}>
        <div className={classes.videoInfoBox}>
          <div> <b>{props.video.name}</b></div>
          <div style={{ color: "grey" }}> {props.video.description} </div>
        </div>






        {(props.isOwner || props.isAdmin || props.isTeacher) &&
          <button
            className={classes.delete}
            onClick={handleDeleteConfirm}
          >
            <AiFillDelete className={classes.deleteicon} />
          </button>

        }
        {showDeleteConfirm && (
          <div className={classes.overLay}>
            <div className={classes.confirmDialog}>
              <p className={classes.p}>
                {isDeleting ? (
                  <div>
                    <p>"Are you sure you want to delete this video?"</p>
                    <div className={classes.div}>
                      <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                      <button className={classes.deleteYes}>Deleting...</button>
                    </div>
                  </div>
                ) : "Are you sure you want to delete this Notice?"}
              </p>
              {!isDeleting && (
                <div className={classes.div}>
                  <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)
                  }>Cancel</button>
                  <button className={classes.deleteYes} onClick={() => deleteVideohandler(props.video.id)}>Yes, Delete</button>
                </div>
              )}
            </div>
          </div>
        )}



      </div>


    </div>

  );




}

export default OneVideoBox;


