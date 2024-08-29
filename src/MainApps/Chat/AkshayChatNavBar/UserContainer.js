import { arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../../CommonApps/Reshwanth/firebase";
import classes from "./UserContainer.module.css";
import ProfileImage from "./profile.jpg";
import { getchatgroupbyId } from "../../../CommonApps/AllAPICalls";
import { useEffect, useState } from "react";

const UserContainer = (props) => {



  let clickedGroupId = localStorage.getItem('clickedChatGroupId');
  let color = Number(clickedGroupId) === Number(props.group.id) ? "#cfe2fa" : "var(--bodyBkgColor)";
  let groupId = props.group.id;
  let userDisplayObject = props.group.groupuserObjects[0].id !== props.userData.id ? props.group.groupuserObjects[0] : props.group.groupuserObjects[1];
  const selectGroupHandler = () => {
    localStorage.setItem('clickedChatGroupId', props.group.id);
    createCommentInFirebase(String(groupId));
    props.switchGroupHandler(groupId);
  }
  const [noOfUnreadMessages, setNoOfUnreadMessages] = useState("0");
  const lastMessageTimeToDisplay = props.group.lastmsgTime.split(":").at(0).split("T").at(0).split("-").reverse().join("/");

  const createCommentInFirebase = async (groupId) => {
    const unSub = onSnapshot(doc(storage, "chatRooms", groupId), async (docSnapshot) => {
      if (!docSnapshot.exists()) {
        try {
          await setDoc(doc(storage, "chatRooms", groupId), {
            chatroomId: "",
            lastMessage: "",
            lastMessageSenderId: "",
            lastMessageTimestamp: "",
            userIds: ["", ""],
            unRead: 0,
          });
        } catch (err) {
          console.error("Error creating documents in Firebase:", err);
        }
      }
    });

    return () => {
      unSub();
    };
  };

  useEffect(() => {
    const unSub = onSnapshot(collection(storage, `chatRooms/${groupId}/chats`), (querySnapshot) => {
      let unreadCount = 0;
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          try {
            const messageData = doc.data();
            if (messageData.senderId !== props.userData.id && !messageData.isRead) {
              unreadCount++;
            }
          } catch (err) {
            console.error("Error processing document:", err);
          }
        }
      });
      if (clickedGroupId == groupId) {
        setNoOfUnreadMessages("0");
      }
      else {
        setNoOfUnreadMessages(unreadCount.toString());
      }
    });

    return () => {
      unSub();
    };
  }, []);
  // console.log("groupId, clickedGroupId, color: ", groupId,clickedGroupId, color);


  // console.log("group: ", props.group.lastMsg);


  return (
    <button className={classes.userBox} onClick={selectGroupHandler} >


      <div className={classes.mainContainer} style={{ backgroundColor: color }}>



        <div className={classes.pic}>
          <img className={classes.profilePic} src={userDisplayObject.profile_image} alt="logo" />
          <div className={classes.greenDot}></div>
        </div>


        <div className={classes.midDetails}>
          <div className={classes.nameOfUserTitle}>
            {userDisplayObject.firstname !== "" ? userDisplayObject.firstname + " " + userDisplayObject.lastname : userDisplayObject.username}
          </div>
          <div className={classes.nameOfUserMsg}>
            {props.group !== null && props.group.lastMsg}
          </div>
        </div>


        <div className={classes.endContainer}>
          <div className={classes.date}>{lastMessageTimeToDisplay}</div>

          <div className={classes.bkgMsg}>
            {noOfUnreadMessages !== "0" && (
              <div className={classes.noMsg}>
                <b>{noOfUnreadMessages}</b>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className={classes.line}></div>


    </button>
  );
};
export default UserContainer;
