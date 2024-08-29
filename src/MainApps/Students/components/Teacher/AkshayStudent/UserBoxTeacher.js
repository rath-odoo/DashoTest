import React from 'react';
import classes from './UserBoxTeacher.module.css';

const UserBoxTeacher = (props) => { 
    return (
        <div className={classes.userBox}>   
            <img src={props.userImage} className={classes.userImage} alt="User" />
            <div className={classes.nameInfo}>
                <div className={classes.name}>{props.userName}</div>
            </div>
            <div className={classes.btnAddStudentContainer}>
                <button className={classes.btnAddStudentWb} onClick={props.onPress} disabled={props.isAdded}>
                    {props.isAdded ? "Added" : "Add"}
                </button>
            </div>
        </div>
    );
}

export default UserBoxTeacher;
