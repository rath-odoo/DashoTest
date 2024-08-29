import React, { useRef, useEffect, useState } from "react";
import RightMsg from "./RightMsg";
import LeftMsg from "./LeftMsg";
import classes from "./ChatWindow.module.css";
import { BsX } from "react-icons/bs";
import { doc, getDoc } from "firebase/firestore";
import { storage } from "../../../CommonApps/Reshwanth/firebase";


const ChatScreen = (props) => {


  const messages = props.messages;

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const [replyMessage, setReplyMessage] = useState(null);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  // useEffect(() => {
  //   props.setReplyDoc(null);
  //   setReplyMessage(null);
  // }, [props.groupId]);

  useEffect(() => {
    const getMessageDocData = async (groupId, documentId) => {
      try {
        const docRef = doc(storage, `chatRooms/${groupId}/chats/${documentId}`);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setReplyMessage(data.message);
        } else {
          setReplyMessage(null);
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    getMessageDocData(props.groupId, props.replyDoc)
  }, [props.replyDoc])


  const setReplyMessageHandler = (message) => {
    setReplyMessage(replyMessage => message)
    props.setReplyDoc(message);
  }


  const commentTime = ({ datetime }) => {

    let DatetimeLocalFull = new Date(datetime);

    let DatetimeLocalFullStr = String(DatetimeLocalFull);

    let dayStr = DatetimeLocalFullStr.split(" ").at(0);
    let dateStr = DatetimeLocalFullStr.split(" ").at(2);
    let month = DatetimeLocalFullStr.split(" ").at(1);

    let fullTimeLocal = DatetimeLocalFullStr.split(" ").at(4);

    let fullTimeLocalStr = String(fullTimeLocal);

    let localTimeHour = fullTimeLocalStr.split(":").at(0);
    let localTimeMin = fullTimeLocalStr.split(":").at(1);

    let ampm = "am";

    if (localTimeHour === 12) {
      ampm = 'pm';
    } else if (localTimeHour === 0) {
      localTimeHour = 12;
    } else if (localTimeHour > 12) {
      localTimeHour -= 12;
      ampm = 'pm';
    }

    let time = String(localTimeHour) + ":" + String(localTimeMin) + String(ampm) + ", " + String(dayStr) + ", " + String(dateStr) + " " + String(month);

    return time;

  }


  const currentTime = () => {
    var now = new Date();

    let timeInfo = String(now);

    let dayStr = timeInfo.split(" ").at(0);
    let dateStr = timeInfo.split(" ").at(2);
    let month = timeInfo.split(" ").at(1);

    let time = timeInfo.split(" ").at(4);
    let timehour = time.split(":").at(0);
    let timemin = time.split(":").at(1);
    let ampm;
    if (timehour < 12) {
      ampm = "am";
    }
    if (timehour > 12) {
      timehour = timehour - 12;
      ampm = "pm"
    }

    let finaltime = String(timehour) + ":" + String(timemin) + String(ampm) + ", " + String(dayStr) + ", " + String(dateStr) + " " + String(month);
    return finaltime;


  }


  const listInnerRef = useRef();
  const [changedDate, setChangedDate] = useState(null);
  const [dateChanged, setDateChanged] = useState(false);


  const onScrollHandler = (event) => {

    const chatLog = event.target;

    //console.log("chatLog.scrollTop + chatLog.clientHeight:  ", chatLog.scrollTop,'+', chatLog.clientHeight,' = ', -chatLog.scrollTop+chatLog.clientHeight);    
    //console.log("chatLog.scrollHeight: ", chatLog.scrollHeight);

    //console.log("chatLog.scrollTop: ", chatLog.scrollTop);	    

    if (chatLog.scrollTop === 1) {

      //console.log("reached Bottom");
      props.loadDownHandler();

    } else if (- chatLog.scrollTop + chatLog.clientHeight === chatLog.scrollHeight) {

      //console.log("reached Top");	     
      props.loadUpHandler();
      chatLog.scrollTop += 100;
    }


    // console.log("listInnerRef.current: ", listInnerRef.current);

    //if(listInnerRef.current) 
    {/*
      const { scrollBottom, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollBottom + clientHeight === scrollHeight) {
           console.log("reached top");
           //props.loadDownHandler();
        }

      console.log("scroll Bottom: ", scrollBottom);

      if(scrollBottom===0){

           console.log("reached bottom");
           //props.loadUpHandler();
       }

     */}

  }


  //console.log("props.commentObj.previous: ", props.commentObj);



  return <div className={classes.chatScreen}
    onScroll={onScrollHandler}
    ref={listInnerRef}
  >

    {/* { 
        
	      props.commentObj.slice(0).map((comment,index)=>{
              let datetime = comment.commenttime;                     	 
	      return <div key ={index} className={classes.commentsBox}>
		             
			     { Number(comment.commenter) === Number(props.currentUser) && 
				            <RightMsg  commenttext = {comment.commenttext} 
				                       commentTime = {commentTime({datetime})}
				                       />

			     }
                          
                             { Number(comment.commenter) !== Number(props.currentUser) && 
					     <LeftMsg  commenttext = {comment.commenttext}
				                       commentTime = {commentTime({datetime})}
					               />
			     }

		    </div>  


             }

          )} */}
    {props.replyDoc !== null && <div className={classes.replyMessageDiv}>
      <div className={classes.messageDiv}>
        {replyMessage}
      </div>
      <button className={classes.previewButton} onClick={() => { setReplyMessage(null); props.setReplyDoc(null); }}>    <BsX size={30} /></button>
    </div>

    }

    {props.firebaseComment !== null &&

      props.firebaseComment.slice().reverse().map((comment, index) => {
        let datetime = comment.timestamp;
        // const tempTime = commentTime({ datetime }).split(",")[2];
        // const previousDate = tempTime;
        // if (changedDate !== previousDate) {
        //   setChangedDate(previousDate);
        //   setDateChanged(true);
        // } else {
        //   setDateChanged(false);
        // }

        return <div key={index} className={classes.commentsBox}>
          {dateChanged && <div className={classes.dateTag}>
            {changedDate}
          </div>

          }

          {Number(comment.senderId) === Number(props.currentUser) &&
            <RightMsg commenttext={comment.message}
              commentTime={commentTime({ datetime })}
              imageData={comment.chatMedia}
              setReplyMessage={setReplyMessageHandler}
              documentId={comment.documentId}
              groupId={props.groupId}
              repliedMessageToDoc={comment.repliedMessageToDoc}
              userData={props.userData}
            />

          }

          {Number(comment.senderId) !== Number(props.currentUser) &&
            <LeftMsg commenttext={comment.message}
              commentTime={commentTime({ datetime })}
              imageData={comment.chatMedia}
              setReplyMessage={setReplyMessageHandler}
              documentId={comment.documentId}
              groupId={props.groupId}
              repliedMessageToDoc={comment.repliedMessageToDoc}
              userData={props.userData}

            />
          }

        </div>


      }

      )}

    {/* { props.commentObj.previous === null && <>
          <div className={classes.commentsBox}> division  </div>

	  <div className={classes.commentsBox}> division  </div>	

          <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>


	  <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>


	  <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>


          <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>

          <div className={classes.commentsBox}> division  </div>

         <div className={classes.commentsBox}> division  </div>

         <div className={classes.commentsBox}> division  </div>

         <div className={classes.commentsBox}> division  </div>

         <div className={classes.commentsBox}> division  </div>


         <div className={classes.commentsBox}> division  </div>

         <div className={classes.commentsBox}> division  </div>


        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>


        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>


        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>


        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>


        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>

        <div className={classes.commentsBox}> division  </div>
       
	</>		

         } */}







  </div>


}

export default ChatScreen;
