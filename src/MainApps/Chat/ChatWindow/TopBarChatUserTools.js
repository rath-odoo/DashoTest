import React from "react";
import classes from "./TopBarChatUserTools.module.css";
import {FaSearch} from "react-icons/fa"
import {BsThreeDotsVertical, BsFillCameraVideoFill} from "react-icons/bs";
import {AiFillPhone} from "react-icons/ai"
const TopBarChatUserTools =()=>{



return (

<div className={classes.topBarChatUserTools}>

       
   <button className={classes.toolButtons1} >
	<AiFillPhone  className={classes.audioCallIcon}/>
   </button>

   <button className={classes.toolButtons2}>
        <BsFillCameraVideoFill className={classes.videoCallIcon}  />
   </button>


   <button className={classes.toolButtons3}>
        <FaSearch/>
   </button>


   <button className={classes.toolButtons4}>
        <BsThreeDotsVertical/>
   </button>
	




</div>
);


}


export default TopBarChatUserTools;
