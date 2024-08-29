import React,{useState,useEffect,memo} from "react";
import classes from "./LeftUserBox.module.css"
import MateIconBox from "./MateIconBox";
import MateInfoBox from "./MateInfoBox";
import {getuserbyId} from '../../../CommonApps/AllAPICalls';
//import basewebURL from "../../../../basewebURL";


const LeftUserBox = (props) =>{

    //console.log("Left UserBox rendering");

    let clickedGroupId = localStorage.getItem('clickedChatGroupId');

    let color = Number(clickedGroupId)===Number(props.group.id)? "#E0E0E0":"white";

    let groupId = props.group.id;

    let userDisplayObject = props.group.groupuserObjects[0].id !== props.userData.id? props.group.groupuserObjects[0] : props.group.groupuserObjects[1];

    const selectGroupHandler = ()=>{
     
      localStorage.setItem('clickedChatGroupId',props.group.id );
	    
      props.switchGroupHandler(groupId);

      //setButtonStyle({backgroundColor:"lightgrey"});	

    }




return(

<div className={classes.leftUserBox}>
    <button className={classes.leftUserBoxButton} onClick={selectGroupHandler} style={{backgroundColor:color}} >

         <MateIconBox userImage={userDisplayObject.profile_image} />

         <MateInfoBox userName={ userDisplayObject.firstname !== ""? userDisplayObject.firstname+" "+userDisplayObject.lastname: 
             userDisplayObject.username

	 } />

    </button>
</div>

);

}

export default memo(LeftUserBox);
