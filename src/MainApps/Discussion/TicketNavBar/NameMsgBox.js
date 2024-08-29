import React from "react";
import classes from "./NameMsgBox.module.css";


const NameMsgBox =(props)=>{


return (

<div className={classes.nameMsgBox}>


  <div className={classes.usersName}>  {props.userName} </div>



  <div className={classes.lastMessage} > {props.data.title}</div>

</div>
);

}

export default NameMsgBox;

