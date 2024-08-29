import { useState, useEffect } from 'react';
import classes from "./UserContainer.module.css";
import ProfileImage from "./profile.jpg";

import { BsCheck2 } from 'react-icons/bs';
import { createchatgroup, getfewusers, usersearchgeneral, checkifuseradded, checkifuserisaddedonly, AddUserIfNotExists } from '../../../CommonApps/AllAPICalls';

import FadeLoader from "react-spinners/FadeLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};





const UserContainer = (props) => {



  const [userExists, setUserExists] = useState(false);
  let clickedGroupId = localStorage.getItem('clickedChatGroupId');

  let color = "var(--themeColor);";

  const [userAdded, setUserAdded] = useState("notAdded");


  const createOneOOneGroup = ({ userId, props, setUserAdded }) => {



    let groupMembers = [userId, props.userData.id];
    const maxId = Math.max.apply(null, groupMembers);
    const minId = Math.min.apply(null, groupMembers);
    const groupname = 'a' + maxId + 'a' + minId + 'a';
    createchatgroup({ groupname, groupMembers, props, setUserAdded });

  }








  const selectUserAddHandler = () => {

    //localStorage.setItem('clickedChatGroupId',props.group.id );
    // props.switchGroupHandler(groupId);
    //setButtonStyle({backgroundColor:"lightgrey"});  
    let userId = props.user.id;
    AddUserIfNotExists({ userId, setUserExists, createOneOOneGroup, props, setUserAdded });



  }



  useEffect(() => {

    let userId = props.user.id;
    checkifuserisaddedonly({ userId, setUserExists });

    return () => {
      setUserExists(userExists => false);
    }

  }, [props.user.id])



  console.log("userExists: ", userExists);

  console.log(props.user)



  return (
    <button className={classes.userBox} onClick={selectUserAddHandler}>
      <div className={classes.mainContainer}>



        <div className={classes.pic}>

          <img className={classes.profilePic} src={props.userImage} alt="logo" />
          <div className={classes.greenDot}></div>

        </div>



        <div className={classes.midDetails}>
          <div className={classes.nameOfUserTitle}>
            {props.userName}
            {/* userDisplayObject.firstname !== ""? userDisplayObject.firstname+" " + userDisplayObject.lastname: userDisplayObject.username*/}
          </div>
          <div className={classes.nameOfUserMsg}>
          </div>
        </div>

        <div className={classes.endContainer}>
          <div className={classes.date}>
            {userExists.exists &&
              <BsCheck2 size={25} style={{ color: "var(--themeColor)" }} />
            }

            {!userExists.exists && userAdded === "notAdded" &&

              <div> Add  </div>

            }



            {!userExists.exists && userAdded === "adding" &&

              <FadeLoader color={color} loading={true} css={override} size={15} />

            }




          </div>

          <div className={classes.bkgMsg}>
            {/*props.msgNum !== "0" && (
              <div className={classes.noMsg}>
                <b>{props.msgNum}</b>
              </div>
            )*/}
          </div>
        </div>
      </div>

      <div className={classes.line}></div>
    </button>
  );
};
export default UserContainer;
