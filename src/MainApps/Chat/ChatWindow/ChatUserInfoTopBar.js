import React,{useState, useEffect} from "react";
import classes from "./ChatUserInfoTopBar.module.css";
import TopBarChatUserTools from "./TopBarChatUserTools";
//import {getuserbyId} from '../../../../CommonApps/AllAPICalls';
//import basewebURL from "../../../../basewebURL";

const ChatUserInfoTopBar=(props)=>{



   const [displayUser, setDisplayUser] = useState(null);


   useEffect(()=>{

       props.chatGroup !==null && props.chatGroup.groupType ==="oneoone" &&

		   props.chatGroup.groupuserObjects.forEach((user, index)=>{

                        if(user.id !==props.userData.id){
			      setDisplayUser(displayUser=>user);
				
			}

		   })		  


   },[props.chatGroup,props.userData.id]);



return(

<div className={classes.chatUserInfoTopBar}>

    <div className={classes.userNameImageDiv}>

       <img className={classes.userImage} src={displayUser !==null? displayUser.profile_image: "N/A"} alt='edr Logo' />

       <div className={classes.userName}> 
	  { displayUser !==null? 
		  (displayUser.firstname !=="" ? displayUser.firstname+" "+displayUser.lastname: displayUser.username): 
		  "Name not available"} 
       </div>       

    </div>



  <TopBarChatUserTools/>




</div>	
);



}


export default ChatUserInfoTopBar;

