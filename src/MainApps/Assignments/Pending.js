import React from 'react';
import classes from "./Pending.module.css";
import AssignmentBoxPending from './AssignmentBox';
// import AssignmentBoxPending from "./AssignmentBoxPending";

function Pending(props) {
  console.log("hii", props.assignmentdata);
  return (
    <div className={classes.pendingdiv}>
      {props.assignmentdata !== null &&
        props.assignmentdata.map((oneAssignment, index) => {
          return (
            <AssignmentBoxPending
              key={index}
              rerender={props.rerender}
              userData={props.userData}
              oneAssignment={oneAssignment}
              selectedCourse={props.selectedCourse}
              onPress={props.onPress}
              newrender={props.newrender}
          
            />
          );
        })}
    </div>
  );
}

export default Pending;
