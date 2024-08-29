import React from "react";

import classes from "./MateIconBox.module.css"

const MateIconBox=(props)=>{

return(

<div className={classes.mateIconBox}>

   <img className={classes.mateIconUserImage} src={props.userImage} alt='edr Logo' />

</div>
);

}


export default MateIconBox;
