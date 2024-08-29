import React,{useState,useEffect} from 'react';
import App from './App';
// import Login from './CommonApps/Akshay/Login';
import Login from './CommonApps/Reshwanth/Login';
import axiosInstance from './axios';

import VideoApp from './VideoPlayer/TwilioVideo/VideoApp';
//import AgoraVideo from './VideoPlayer/AgoraVideo';

import VideoAppAdvanced from './VideoPlayer/TwilioVideoAdvanced/VideoAppAdvanced';

import VideoPlayer from './VideoPlayer/VideoPlayer';




const CheckLogin=()=>{

 const [loggedIn, setLoggedIn] = useState(false);

  	
  useEffect(() =>{

      axiosInstance.get().then((res) => {
                        setLoggedIn(loggedIn=>true);
                       // console.log(res.data);
                });

  },[]);
  
  
  if (!loggedIn){ return <Login setLoggedIn={setLoggedIn} loadedUsername="None"/>}
  


return (
        
<App/>
      
);

}

export default CheckLogin;
