import React,{memo} from "react";
import classes from "./NameMsgBox.module.css";


const NameMsgBox =(props)=>{


return (

<div className={classes.nameMsgBox}>


  <div className={classes.usersName}>  {props.userName} </div>


  
  <div className={classes.lastMessage} >  </div>
  
</div>
);

}

export default memo(NameMsgBox);

