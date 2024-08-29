import React from "react";
import {AiOutlineMenu,AiOutlineUserAdd} from 'react-icons/ai';
//import {BiMessageAdd} from "react-icons/bi";
import classes from "./TopIdBarTools.module.css"







const TopIdBarTools =(props)=>{






return(

<div className={classes.topIdBarTools}>

<button className={classes.menuButton}  onClick={props.onPress}>
   <AiOutlineUserAdd className={classes.newChatIcon} />
</button>



<button className={classes.menuButton}>	
   <AiOutlineMenu className={classes.menuIcon}/>
</button>




</div>
);


}

export default TopIdBarTools;
