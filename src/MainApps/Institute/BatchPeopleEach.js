import React, { useState } from 'react';
import classes from './BatchPeopleEach.module.css';
import DetailsPeopleBatch from './DetailsPeopleBatch';
import { BsTrash } from 'react-icons/bs';
import { removeBatchMember } from '../../CommonApps/AllAPICalls';

function BatchPeopleEach(props) {
  const [showPeopleProfile, setShowPeopleProfile] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleClose = () => {
    setShowDeleteConfirm(false);
  };

  const handleClick = () => {
    setShowPeopleProfile(true);
  };

  const handleBackFromPeopleDetails = () => {
    setShowPeopleProfile(false);
  };
  const handleRemove = () => {
    const { batch, oneMember, userData } = props;
    removeBatchMember(batch.id, userData.id, oneMember.id, props, handleClose)

  };

  console.log(props.oneMember)


  return <div >


    <button className={classes.parentClass} >
      <div className={classes.div} onClick={handleClick}>
        <div className={classes.userContainer} >
          <div className={classes.namenimagediv}>
            <img src={props.oneMember.profile_image} className={classes.pic} alt="User" />
            <div className={classes.nameContainer}>
              {props.oneMember.firstname} {props.oneMember.lastname}
            </div>
          </div>
        </div>
        <div className={classes.rolwContainer}>{props.oneMember.role}</div>
      </div>

      { props.isAdminOrOwner && (
      <div className={classes.statusContainer}>
        <BsTrash className={classes.unLinkIcon} onClick={handleDeleteConfirm} />
      </div>
      )}
    </button>

    {showPeopleProfile && (
      <DetailsPeopleBatch
        onBack={handleBackFromPeopleDetails}

        oneMember={props.oneMember}
        selectedInstitute={props.selectedInstitute}
        isAdminOrOwner={props.isAdminOrOwner}
        userData={props.userData}
        rerender={props.rerender}
      />
    )}

    {showDeleteConfirm && (
      <div className={classes.overLay}>
        <div className={classes.confirmDialog}>
          <p className={classes.p}>Are you sure you want to Remove this Member?</p>
          <div className={classes.div1}>
            <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
            <button className={classes.deleteYes} onClick={handleRemove}>Yes, Remove</button>
          </div>
        </div>
      </div>
    )}
  </div>;
}

export default BatchPeopleEach;
