import React,{memo} from "react";
import classes from "./MateInfoBox.module.css";
import NameMsgBox from "./NameMsgBox";
import MateTimeBox from "./MateTimeBox"; 

const MateInfoBox =(props)=>{


return (

<div className={classes.mateInfoBox}>

 <NameMsgBox userName={props.userName}/>
 
 {/*
 <MateTimeBox/>	
 */}
</div>
);

}

export default memo(MateInfoBox);

