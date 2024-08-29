import React from "react";
import classes from "./TopIdBarLeft.module.css"
import TopIdBarTools from './TopIdBarTools';
//import basewebURL from "../../../../basewebURL";
import {IoMdArrowRoundBack} from 'react-icons/io';
import { useHistory } from "react-router-dom";




const TopIdBarLeft = (props) =>{


    let imageurl = props.userData.profile_image;
    const history = useHistory();
    const backToDashboardHandler=()=>{

      history.push('/dashboard/general/courses');

    }




return(

<div className={classes.topIdBarLeft}>




  <div className={classes.userImageIcon}>
    {/*	
    <button type="button" onClick={backToDashboardHandler} className={classes.backButtonToDash} > 
	<IoMdArrowRoundBack className={classes.backIcon}/>
    </button>
    */}
    <img className={classes.userImage} src={imageurl} alt='chatProfileImage' />

  </div>



  <TopIdBarTools onPress={props.onPress}/>






</div>

);

}

export default TopIdBarLeft;
