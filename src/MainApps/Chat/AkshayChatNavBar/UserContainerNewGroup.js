import {useState} from 'react';
import classes from "./UserContainer.module.css";
import ProfileImage from "./profile.jpg";
import {BsCheck2} from 'react-icons/bs';

const UserContainer = (props) => {



      let clickedGroupId = localStorage.getItem('clickedChatGroupId');
      let color = Number(clickedGroupId)===Number(props.group.id)? "#cfe2fa":"var(--bodyBkgColor)";
      let groupId = props.group.id;
      let userDisplayObject = props.group.groupuserObjects[0].id !== props.userData.id? props.group.groupuserObjects[0] : props.group.groupuserObjects[1];
      const selectGroupHandler = ()=>{
        //localStorage.setItem('clickedChatGroupId',props.group.id );
        props.addUserToGroupHandler(userDisplayObject);
        //setButtonStyle({backgroundColor:"lightgrey"}); 
	//console.log("userDisplayObject: ", userDisplayObject);      

      }
    
      const [ selectedUsers, setSelectedUsers ] = useState([]);

      //console.log("group: ", props.group.lastMsg);
     

  return (
    <button className={classes.userBox} onClick={selectGroupHandler} >
        
      	  
      <div className={classes.mainContainer} style={{backgroundColor: color}}>
           	 
        <div className={classes.pic}>         
            <img className={classes.profilePic} src={userDisplayObject.profile_image} alt="logo"/>
            <div className={classes.greenDot}></div>                    
        </div>

	
        <div className={classes.midDetails}>
          <div className={classes.nameOfUserTitle}>
	      { userDisplayObject.firstname !== ""? userDisplayObject.firstname+" " + userDisplayObject.lastname: userDisplayObject.username}
	  </div>
          <div className={classes.nameOfUserMsg}>
             {props.group !==null && props.group.lastMsg}
          </div>
        </div>

	 
        <div className={classes.endContainer} style={{color:"grey"}}>
	  {/*
          <div className={classes.date}>30/03/23</div>

          <div className={classes.bkgMsg}>
            {props.msgNum !== "0" && (
              <div className={classes.noMsg}>
                <b>{props.msgNum}</b>
              </div>
            )}
          </div>
	  */}

          { props.selectedUsers.includes(userDisplayObject) &&  <BsCheck2 size={20}/> }
	  { !props.selectedUsers.includes(userDisplayObject) &&  "+Add" }
        </div>
	
      </div>

      <div className={classes.line}></div>
      

    </button>
  );
};
export default UserContainer;
