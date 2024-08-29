import React,{useState,useEffect,useRef} from "react";
import classes from "./ChatWindow.module.css"
import ChatUserInfoTopBar from "./ChatUserInfoTopBar";
import ChatScreen from "./ChatScreen";
//import ChatInput from "./ChatInput";
import {w3cwebsocket as W3CWebSocket } from 'websocket';
//import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
//import Login from '../../../../CommonApps/Login';
//import axiosInstance from '../../../../axios';
import {MdSend} from 'react-icons/md';
import {postchatcomment,getchatcomments, getchatgroupbyId} from '../../../CommonApps/AllAPICalls';
import {ImAttachment} from 'react-icons/im';
import {BsEmojiSmile} from 'react-icons/bs';


function Connect (){

let client;
let messageListeners = [];
let isConnected = false;
let componentMounted = false;

//let reconnectOnClose = true;
let stateChangeListeners = [];


function mountInfo(value){

  componentMounted = value;
}



function on(fn) {
    messageListeners.push(fn);
  }

 function off(fn) {
    messageListeners = messageListeners.filter(l => l !== fn);
  }

function onStateChange(fn) {
    stateChangeListeners.push(fn);
    return () => {
      stateChangeListeners = stateChangeListeners.filter(l => l !== fn);
    };
  }








function start () {
 

   
        client = new W3CWebSocket('wss://td7ru13iq4.execute-api.ca-central-1.amazonaws.com/production');



   

   //client = new W3CWebSocket('wss://edresearch.co.in:8001/ws/chat/class/');



    //const close = client.close;

    //client.close = () => {
    //   reconnectOnClose = false;
    //  close.call(client);
    //}

   // if(client.readyState === client.CLOSED ){
   //   setTimeout(start, 5000);
    //}





   client.onclose = () => {
     isConnected=false;
     stateChangeListeners.forEach(fn => fn(false));	   
     if(componentMounted){	   
       setTimeout(start, 5000);
     }
   }

   client.onopen=()=>{
     isConnected=true;
     stateChangeListeners.forEach(fn => fn(true));	   
   }

   client.onmessage = (event)=>{
    const dataFromServer = JSON.parse(event.data);	
    messageListeners.forEach(fn => fn(dataFromServer));
   }


}

start();







return {
    on,
    off,
    onStateChange,
    mountInfo,
    componentMounted: ()=>componentMounted,	
    getClient: () => client,
    isConnected: () => isConnected,
    close: () => client.close(),
   }
}

const client = Connect();



function useMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleMessage(message) {
      setMessages([...messages, message]);
    }
      client.on(handleMessage);
     return () => {
	     client.off(handleMessage);
             }
  }, [messages, setMessages]);

  return messages;
}







const ChatWindow = (props) =>{



    //let clickedUserId=props.group.groupuserObjects[0].id !== props.userData.id? props.group.groupuserObjects[0] : props.group.groupuserObjects[1];

    const mountedRef = useRef(true);
    let value=true;
    client.mountInfo(value);
    //this is commented out on April 5th 2022. Check if hat function works
    //const [isConnected, setIsConnected] = useState(client.isConnected());
  
    let isConnected = client.isConnected();

    console.log('isConnected: ', isConnected);	

    const [commentObj,setChatCommentObj]=useState(null);

    const [message, setMessage] = useState('');
   
    const messages = useMessages();  


    console.log("messages: ", messages);

    
   // let lastMessage = messages.at(-1).split(" ");	

    const commentGroupId = 43;//Number(lastMessage[lastMessage.length - 1]);	

   	
    const clickedGroupIdT= props.clickedGroupId;


    const [pageNum, setPageNum]= useState(1);

    const loadUpHandler=()=>{

      if(commentObj !==null && commentObj.next !==null){
        setPageNum(pageNum=>pageNum + 1);
       }	   
    }


    const loadDownHandler=()=>{

      if(commentObj !==null && commentObj.previous !==null){
          setPageNum(pageNum=>pageNum - 1);
        }

    }






   let displayMessage=[];
  
   if( commentGroupId === clickedGroupIdT ){
      
        displayMessage=messages;	  

     }	

   const handleChange = (e) => {
      setMessage(msg=>e.target.value);


   };

   useEffect(()=>{
     


      return ()=>{
         mountedRef.current = false;
	 client.mountInfo(false);    
        // client.close();
       }
     },[isConnected]);


    const [chatGroup, getChatGroupById] = useState(null);


   useEffect(()=>{
     const groupId=props.clickedGroupId;
     let pageno=pageNum;
     getchatcomments({setChatCommentObj, groupId,pageno});
     getchatgroupbyId({groupId, getChatGroupById});

   },[props.clickedGroupId, props.userData.id,pageNum ]);



    console.log("chatGroup: ", chatGroup);



   function sendMessage(e) {
    e.preventDefault();
    if(message !== ""){	   
    client.getClient().send(JSON.stringify({
           "action":"sendPublic",
            "message": message+" "+props.userData.id+" "+props.clickedGroupId,
            "senderUserId":props.userData.id,
            "receiverUserIds":[],
            "chatGroupId":props.clickedGroupId,

    }))

     const comment = message;
     const userId = props.userData.id;

     const groupId=props.clickedGroupId;
     postchatcomment({groupId,userId,comment});

    }
    	    
    setMessage('');
   }
   

   //console.log("displayMessage ", displayMessage);


   //console.log("commentObj: ", commentObj);



return(




<div className={classes.chatWindow}>



  {clickedGroupIdT === Number(0) && <div className={classes.noGroupSelectDiv}> <b>Please select a chat to continue</b> </div>}



 { clickedGroupIdT !== Number(0) &&  <>

      <ChatUserInfoTopBar chatGroup={chatGroup}
	                  userData={props.userData}
		          />

      {/*		 
      <ChatScreen messages={displayMessage}  
	          commentObj={commentObj !==null ? commentObj.results: []} 
	          currentUser={props.userData.id}
		  loadUpHandler={loadUpHandler}
	          loadDownHandler={loadDownHandler}
	          chatGroup={chatGroup}
		  />
      */}	
    <div className={classes.chatInput}>

        <form className={classes.addCommentForm} onSubmit={sendMessage}>
		  
	          <button type="button" className={classes.uploadButton}> <BsEmojiSmile className={classes.uploadIcon}/></button>

                  <button type="button" className={classes.uploadButton}> <ImAttachment className={classes.uploadIcon}/></button>

                  <div className={classes.chatInput} >

                      <input className={classes.inputTextBox} value={message} onChange={handleChange} />


                  </div>

                 
                 <button type="submit"  className= {classes.submit_button} ><b><MdSend className={classes.sendButtonIcon}/> </b> </button>
                  
       </form>


    </div>

</>

 }
	
</div>


 


);

}

export default ChatWindow;
