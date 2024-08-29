
import classes from './OneFriend.module.css';

import Bibhuti from './Bibhuti.jpeg';

import { BsChatDots } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

import { useHistory } from "react-router-dom";



const OneFriend=(props)=>{


//console.log('contact: ',props.contact);

//console.log('contact: ', props.contact.profile_image);
   let history = useHistory();

   const viewPublicProfileHandler=()=>{
     history.push("/public/profile");
     //window.open("/some-link", "_blank");
   }




return (


<div className={classes.oneFriend}>
  {
  <img src={props.contact.profile_image}  className={classes.friendImage} />	
  }

  <div className={classes.iconContainer}>
     <div className={classes.chat}> <BsChatDots color="#5e5d5d" size={18}/></div>
     <button className={classes.profile} onClick={viewPublicProfileHandler}> Profile</button>
  </div>

  <div className={classes.lineHorizontal}> </div>

  <div className={classes.InfoBox}> <i>{props.contact.firstname} {props.contact.lastname}</i> </div>

</div>
);


}

export default OneFriend;
