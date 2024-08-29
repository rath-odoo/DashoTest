import React from "react";

import classes from "./MateIconBox.module.css"

import {GoIssueOpened} from "react-icons/go";


const MateIconBox=(props)=>{

return(

<div className={classes.mateIconBox}>

  
   <GoIssueOpened className={classes.mateIconUserImage}/>	  

</div>
);

}


export default MateIconBox;
