import React from 'react';
import classes from './UserBox.module.css';

const UserBox = (props) => {
  return (
    <div className={classes.userBox}>
      <img src={props.userImage} className={classes.userImage} alt="User" />
      <div className={classes.nameInfo}>
        <div className={classes.name}>{props.userName}</div>
      </div>
      <div className={classes.btnAddStudentContainer}>
        {props.added ? (
          <div className={classes.studentAddedText}>Added</div>
        ) : (
          <button className={classes.btnAddStudentWb} onClick={props.onPress}>
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default UserBox;
