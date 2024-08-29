import React from "react";
import classes from "./MateInfoBox.module.css";
import NameMsgBox from "./NameMsgBox";
import MateTimeBoxNewUser from "./MateTimeBoxNewUser"; 

const MateInfoBox =(props)=>{


return (

<div className={classes.mateInfoBox}>

 <NameMsgBox userName={props.userName}/>
 

 <MateTimeBoxNewUser added = {props.added}
	 userType={props.userType}/>	

</div>
);

}

export default MateInfoBox;

