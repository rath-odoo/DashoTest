import { useEffect, useState } from "react";
import classes from "./LeftMsg.module.css";
import {
  BsCheck2All,
  BsFillEmojiSmileFill,
  BsFillReplyFill,
  BsFillTrashFill,
  BsFillChatDotsFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { storage } from "../../../CommonApps/Reshwanth/firebase";

const LeftMsg = (props) => {
  const replyHandler = () => {
    props.setReplyMessage(props.documentId);
  }

  const [reply, setReply] = useState(false);
  const [commenter, setCommenter] = useState(null);
  const [unRead, setUnRead] = useState()
  useEffect(() => {
    updating();
  }, [])
  const updating = async () => {
    try {
      const docRef = doc(storage, `chatRooms/${props.groupId}/chats`, props.documentId);
      const docSnapshot = await getDoc(docRef);
      // sendConfirm(props.groupId);
      // try {
      //   await updateDoc(doc(storage, "chatRooms", String(props.groupId)), {
      //     unRead: Number(unRead) - 1,
      //   });
      // }
      // catch (err) {
      //   console.log("error in updating unread", err);
      // }

      if (docSnapshot.exists()) {
        await updateDoc(docRef, {
          isRead: true,
        });
        console.log("Document updated successfully.");
      } else {
        console.log("Document does not exist.");
      }
    } catch (err) {
      console.error("Error updating document:", err);
    }
  };
  // const sendConfirm = async (groupId) => {
  //   const messageDocRef = doc(storage, "chatRooms", String(groupId));
  //   try {
  //     const docSnap = await getDoc(messageDocRef);
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       setUnRead(data.unRead);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (e) {
  //     console.error("Error reading document:", e);
  //   }
  // }
  // const sendConfirm = (groupId) => {
  //   const messageDocRef = doc(storage, "chatRooms", String(groupId));
  //   const unsubscribe = onSnapshot(messageDocRef, (docSnap) => {
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       setUnRead(data.unRead);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   });
  //     return unsubscribe;
  // }
  // const sendConfirm = async (groupId) => {
  //   const messageDocRef = doc(storage, "chatRooms", String(groupId));
  
  //   try {
  //     const docSnap = await messageDocRef.get();
  //     if (docSnap.exists()) {
  //       const data = docSnap.data();
  //       setUnRead(data.unRead);
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (e) {
  //     console.error("Error reading document:", e);
  //   }
  // };
  

  useEffect(() => {
    const getMessageDocData = async (groupId, documentId) => {
      try {
        const docRef = doc(storage, `chatRooms/${groupId}/chats/${documentId}`);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setReply(data.message);
          setCommenter(data.senderId);
        } else {
          setReply(null);
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getMessageDocData(props.groupId, props.repliedMessageToDoc)
  }, [props.repliedMessageToDoc])

  return (
    <div className={classes.Left}>
      <div className={classes.leftMsgContainer}>
        {props.repliedMessageToDoc !== null && <div className={classes.replyDivContainer}>
          <div className={classes.verticalLine}></div>
          <div className={classes.replySecondContainer}>

            <div className={classes.commenterDiv}>
              <div className={classes.innerCommenterDiv}>
                {commenter}
              </div>
            </div>
            <div className={classes.replyMessageDiv}>
              {reply}
            </div>
          </div>

        </div>}
        <div className={classes.msgTitle}>
          {props.commenttext}
        </div>
        {props.imageData !== null && <div className={classes.imageContainer}>
          <img className={classes.imageData} src={props.imageData} />
        </div>}

        <div className={classes.timeandReadContainer}>
          <div className={classes.msgTime}>{props.commentTime} </div>
          {/* <div className={classes.readIcon}>
            <BsCheck2All size={14}></BsCheck2All>
          </div> */}
        </div>
      </div>

      <div className={classes.iconContainer}>
        <button className={classes.iconMenu1}>
          <BsFillEmojiSmileFill size={16}></BsFillEmojiSmileFill>
        </button>

        <button className={classes.iconMenu2} onClick={replyHandler}>
          <BsFillReplyFill size={16}></BsFillReplyFill>
        </button>

        {/* <button className={classes.iconMenu3}>
          <BsFillTrashFill size={16}></BsFillTrashFill>
        </button> */}

        <button className={classes.iconMenu4}>
          <BsFillChatDotsFill size={16}></BsFillChatDotsFill>
        </button>

        {/* <BsFillHeartFill size={16}></BsFillHeartFill> */}
      </div>
    </div>
  );
};

export default LeftMsg;
