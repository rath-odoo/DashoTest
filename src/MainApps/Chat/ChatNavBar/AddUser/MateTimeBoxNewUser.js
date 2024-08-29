import React from "react";
import classes from "./MateTimeBox.module.css";
import {BsCheckLg} from 'react-icons/bs';


const MateTimeBox =(props)=>{






return (

<div className={classes.mateTimeBox}>

 
  <div className={classes.time}>    
  {props.added && <BsCheckLg/>}

  {!props.added && <span style={{marginRight:'10px'}}>Add</span> }	

 </div>

  {/*
  <div> props.userType !==null && props.userType === 1 && "Teacher"  </div>
   */}
</div>
);

}

export default MateTimeBox;

