import React from "react";
import classes from "./LeftUserBox.module.css"
import MateInfoBox from "./MateInfoBox";

import { SiWechat } from "react-icons/si";
import {BsChatLeftText} from 'react-icons/bs';




const LeftUserBox = (props) =>{


	let clickedDiscussionId = localStorage.getItem('clickedDiscussionId');
        let color = Number(clickedDiscussionId)===Number(props.oneTicket.id)? "#E8E8E8":"white";
	//let color="white";

return(

<div className={classes.leftUserBox}>

  <button  type="button" className={classes.leftUserBoxButton} onClick={props.onPress} style={{backgroundColor:color}}  >
       <div className={classes.mateIconBox}>
            <SiWechat className={classes.mateIconUserImage} size={20}/>
       </div>
       <MateInfoBox userName={props.userName}  data={props.oneTicket} />
  </button>

</div>

);

}

export default LeftUserBox;
