import React,{useState,useEffect,useRef} from "react";
import classes from "./ChatWindow.module.css"
import ChatUserInfoTopBar from "./ChatUserInfoTopBar";
import ChatScreen from "./ChatScreen";
import ChatInput from "./ChatInput";
import {w3cwebsocket as W3CWebSocket } from 'websocket';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Login from '../../../../CommonApps/Login';
import axiosInstance from '../../../../axios';
import {MdSend} from 'react-icons/md';
import {postchatcomment,getchatcomments} from '../../../../CommonApps/AllAPICalls';
import {client} from "./WebSocket";



const ChatWindow = (props) =>{



  const [loggedIn, setLoggedIn] = useState(false);

  useEffect( ()=>{
  axiosInstance.get().then((res) => {
                        setLoggedIn(loggedIn=>true);
                       // console.log(res.data);
                });
             },[]);


  let roomname='class'


  const mountedRef = useRef(true);
  const textInput = useRef();

  const clearInput = () => (textInput.current.value = "");	


  const initialFormData = Object.freeze(

     {
         comment: "",
     }
  );



  const [formData, updateFormData] = useState(initialFormData)

  const handleChange = (e) => {
                updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        };




 
  const [state, setState] = useState(

    {
       messages: [],
       value: '',
    }
 );


const [chatcomment, getChatcomment]= useState([{
        "groupId": 1,
        "commenter": 1,
        "commenttext": "sadsad",
    },])





 const [commentObj,setChatCommentObj]=useState([{}]);

 useEffect(()=>{
  const groupId=props.clickedGroupId;


  getchatcomments({setChatCommentObj, groupId});

  },[props.clickedGroupId, props.userData.id]);





  


  const handleSubmit = (e) => {

     //if (!loggedIn){ return <Login setLoggedIn={setLoggedIn}/>}

    if (typeof client !== 'undefined') {	  

    if (client.readyState === client.CLOSED){
       //console.log("websocket CLOSED");
       //window.location.reload();	
       // const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/chat/class/');	    
       //return null;    
    }


    if(formData.comment !==''){
      client.send(JSON.stringify({
      type: "message",
      message: formData.comment,
    }))

     const comment = formData.comment;
     const userId = props.userData.id;
     	    
     const groupId=props.clickedGroupId;	    
     postchatcomment({groupId,userId,comment});

       }


    clearInput();	  
    state.value = '';
    formData.comment='';	    
    	 
    }

    e.preventDefault();
  }





	
useEffect(()=>{



    client.onopen=()=>{
   };


    client.onmessage = (message) => {
    const dataFromServer = JSON.parse(message.data);

    if (dataFromServer !== ""  && mountedRef.current){
  

                     setState((state)=>({     
                              messages: [...state.messages,dataFromServer.message],
                              value: 'jai ganesh',
                                        }));

      

                              }}

    return () => { 
     mountedRef.current = false;
     client.close();	     
    }

	         
},[props.clickedGroupId]);








return(

<div className={classes.chatWindow}>

<ChatUserInfoTopBar clickedUserId={props.clickedUserId} />

<ChatScreen messages={state.messages}  commentObj={commentObj}/>
	
<div className={classes.chatInput}>



     {/*
         {commentObj.map((comment,index)=>{


               return <div  key={index}  >{comment.commenttext} </div>
           }

        )}

    */}







     <form className={classes.addCommentForm} onSubmit={handleSubmit}>


                  <div className={classes.chatInput} >
                          <input
                             ref={textInput}
                             type="text"
                             onChange={handleChange}
                             name="comment"
                             className={classes.inputTextBox}
                             placeholder="Write your comment"
                             defaultValue=""
                          />
                  </div>

                 
                 <button type="submit"  className= {classes.submit_button} ><b><MdSend className={classes.sendButtonIcon}/> </b> </button>
                  
	</form>

	{/*
   <Picker onSelect={addEmoji} />
        */}

</div>



	
</div>

);

}

export default ChatWindow;
