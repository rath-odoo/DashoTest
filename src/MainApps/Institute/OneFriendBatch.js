import React from 'react';
import classes from './OneFriendBatch.module.css';

const OneFriend = (props) => {
  const { userImage, userName, idUser, onAdd, isAdded } = props;

  return (
    <div className={classes.friendContainer}>
      <img src={userImage} className={classes.friendImage} alt={userName} />
      <div className={classes.InfoBox}>
        <div className={classes.fullName}>
          {userName}
        </div>
        <button className={classes.btnAdd} type="button" onClick={() => onAdd(idUser)} disabled={isAdded}>
          {isAdded ? 'Added' : 'Add '}
        </button>
      </div>
    </div>
  );
};

export default OneFriend;
