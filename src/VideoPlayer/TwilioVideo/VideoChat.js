import React,{useState, useCallback} from 'react';
import Video from "twilio-video";
//import axiosInstance from '../../axios';
import axios from 'axios';

import Room from './Room';
import Lobby from './Lobby';
const { connect } = require('twilio-video');

const VideoChat=()=>{


   //console.log("rerendering",);

   const [room, setRoom] = useState(null);
   const [username, setUsername] = useState("");
   const [roomName, setRoomName] = useState("");	
   const [connecting, setConnecting] = useState(false);

   const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value);
    //console.log('username change');

   }, []);

   const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
    //console.log('room name change');

   }, []);

   const [tokenData, setToken] = useState(null);
   

   const joinRoom=({data})=>{
           
    Video.connect(data.accessToken, {
        name: 'coolroom',
      })
        .then((room) => {
          setConnecting(false);
	  //console.log("room: ", room);	
          setRoom(room);
        })

   }


  


   const handleSubmit=(e)=>{
    e.preventDefault();	   
    setConnecting(true);
    //console.log("submit data");
    let susername='bibhu'

    axios.post(`https://token-service-6908-dev.twil.io/token?identity=${susername}`, {
    
    })
     .then((res) => {
         setToken(tokenData=>res.data);
          //console.log("token data inside: ", res.data.token);
	    let data=res.data; 
          joinRoom({data});


           

                })


   }
  

    async function handleSubmit2(event) {
 
    event.preventDefault();	    
    let usename=username;	    
    setConnecting(true);
    try {
       const response = await fetch(`https://token-service-6908-dev.twil.io/token?identity=${usename}`);
       const data = await response.json();
       const room = await connect(data.accessToken, {
          name: 'cool-room',
          audio: true,
          video: true
       });

    
      setRoom(room);
      //console.log("room isnide submit2: ", room);
      setConnecting(false);

      } catch(err) {
        console.log(err);
    }
   }



   const handleLogout=()=>{

   //console.log("handle Logout");



   }




 //console.log("room: ", room);


 let render;
  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout}/>
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit2}
        connecting={connecting}
      />



    );
  }
  return render;









}


export default VideoChat;
