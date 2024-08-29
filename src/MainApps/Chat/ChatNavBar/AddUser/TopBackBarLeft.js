import React from "react";
import classes from "./TopBackBarLeft.module.css"
//import TopIdBarTools from './TopIdBarTools';
import {BsArrowLeft} from 'react-icons/bs';
//import basewebURL from "../../../../../basewebURL";




const TopIdBarLeft = (props) =>{






return(

<div className={classes.topIdBarLeft}>


  <button className={classes.backButton} onClick={props.onPress}>
      <BsArrowLeft className={classes.backButtonIcon}/>
  </button>


</div>

);

}

export default TopIdBarLeft;
