import classes from "./UserContainer.module.css";
import ProfileImage from "./profile.jpg";


const UserContainer = (props) => {


      let clickedGroupId = localStorage.getItem('clickedChatGroupId');

      let color = Number(clickedGroupId)===Number(props.group.id)? "#E0E0E0":"white";

      let groupId = props.group.id;

      let userDisplayObject = props.group.groupuserObjects[0].id !== props.userData.id? props.group.groupuserObjects[0] : props.group.groupuserObjects[1];
      const selectGroupHandler = ()=>{

        localStorage.setItem('clickedChatGroupId',props.group.id );
        props.switchGroupHandler(groupId);
        //setButtonStyle({backgroundColor:"lightgrey"});  

      }













  return (
    <div className={classes.userBox}>
      <div className={classes.mainContainer}>



        <div className={classes.pic}>
         
            <img className={classes.profilePic} src={userDisplayObject.profile_image} alt="logo"/>
            <div className={classes.greenDot}></div>
                    
        </div>

        

        <div className={classes.midDetails}>
          <div className={classes.nameOfUserTitle}>
	     { userDisplayObject.firstname !== ""? userDisplayObject.firstname+" " + userDisplayObject.lastname: userDisplayObject.username}
	  </div>
          <div className={classes.nameOfUserMsg}>
          </div>
        </div>

        <div className={classes.endContainer}>
          <div className={classes.date}>30/03/23</div>

          <div className={classes.bkgMsg}>
            {props.msgNum !== "0" && (
              <div className={classes.noMsg}>
                <b>{props.msgNum}</b>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={classes.line}></div>
    </div>
  );
};
export default UserContainer;
