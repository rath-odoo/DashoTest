import React from "react";

import classes from "./EMailSecButton.module.css";



const EMailSecButton = (props)=>{

const TheIcon= props.icon !==null ? props.icon : null;

return(

<button className={classes.eMailSecButton}>
   
   { TheIcon !==null && 	
  <TheIcon className={classes.sectionIcon}/>
   }
 {props.secName}


</button>

);

}

export default EMailSecButton;
