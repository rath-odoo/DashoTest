import classes from "./RightMsg.module.css";
import {
  BsCheck2All,
  BsFillEmojiSmileFill,
  BsFillReplyFill,
  BsFillTrashFill,
  BsFillChatDotsFill,
  BsFillHeartFill,
} from "react-icons/bs";
import { doc, deleteDoc, documentId, onSnapshot, collection, getDoc } from "firebase/firestore";
import { storage } from "../../../CommonApps/Reshwanth/firebase";
import { useEffect, useState } from "react";


const RightMsg = (props) => {


  const replyHandler = () => {
    props.setReplyMessage(props.documentId);
  }

  const deleteHandler = () => {
    const result = window.confirm("Do you want to delete?");
    if (result) {
      const docRef = doc(storage, `chatRooms/${props.groupId}/chats`, props.documentId);
      deleteDoc(docRef)
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        });

    } else {
      console.log("see")
    }



  }

  useEffect(() => {
    addFirebaseChat(props.groupId, props.documentId);
  }, [])

  const [readmark, setReadmark] = useState(false);
  const [reply, setReply] = useState(null);
  const [commenter, setCommenter] = useState(null);

  const addFirebaseChat = async (groupId, documentId) => {
    if (!storage) {
      return;
    }
    const unsubscribe = onSnapshot(doc(storage, `chatRooms/${groupId}/chats/${documentId}`), (querySnapshot) => {
      if (querySnapshot.exists() && querySnapshot.data() !== undefined) {
        setReadmark(readmark => querySnapshot.data().isRead);
      }
    });
    return {
      unsubscribe: () => unsubscribe()
    };
  };
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

  const temp = '';

  return (
    <div className={classes.Right}>
      <div className={classes.iconContainer}>

        <button className={classes.iconMenu1}>
          <BsFillEmojiSmileFill size={16}></BsFillEmojiSmileFill>
        </button>

        <button className={classes.iconMenu2} onClick={replyHandler}>
          <BsFillReplyFill size={16}></BsFillReplyFill>
        </button>

        <button className={classes.iconMenu3} onClick={deleteHandler}>
          <BsFillTrashFill size={16}></BsFillTrashFill>
        </button>

        <button className={classes.iconMenu4}>
          <BsFillChatDotsFill size={16}></BsFillChatDotsFill>
        </button>

      </div>

      <div className={classes.rightMsgContainer}>
        <div className={classes.rightmsgTitle}>
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
          {props.commenttext}


        </div>
        {props.imageData !== null && <div className={classes.imageContainer}>
          <img className={classes.imageData} src={props.imageData} />
        </div>}
        <div className={classes.timeandReadContainer}>
          <div className={classes.rightmsgTime}>{props.commentTime}</div>
          <div className={classes.readIcon} style={readmark ? { color: "blue" } : { color: "black" }}>
            <BsCheck2All size={14}></BsCheck2All>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightMsg;
