import React from "react";
import classes from "./MateInfoBox.module.css";
import NameMsgBox from "./NameMsgBox";
import MateTimeBox from "./MateTimeBox"; 

const MateInfoBox =(props)=>{


return (

<div className={classes.mateInfoBox}>

 <NameMsgBox userName={props.userName} data={props.data} />
 

 <MateTimeBox data={props.data} />	

</div>
);

}

export default MateInfoBox;

