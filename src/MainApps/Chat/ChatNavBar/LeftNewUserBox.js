import React from "react";
import classes from "./LeftUserBox.module.css"
import MateIconBox from "./MateIconBox";
import MateInfoBoxNewUser from "./MateInfoBoxNewUser";




const LeftUserBox = (props) =>{

return(

<div className={classes.leftUserBox}>
<button className={classes.leftUserBoxButton} onClick={props.onPress}>

<MateIconBox userImage={props.userImage} />

<MateInfoBoxNewUser userName={props.userName} />


</button>
</div>

);

}

export default LeftUserBox;
