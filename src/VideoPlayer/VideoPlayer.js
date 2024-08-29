import React,{useState} from 'react';
import classes from './VideoPlayer.module.css';


import {FaMicrophone, FaMicrophoneSlash} from 'react-icons/fa';
import {BsFillCameraVideoFill, BsFillCameraVideoOffFill,BsFillTelephoneXFill, BsFillChatLeftTextFill,BsFillPeopleFill} from 'react-icons/bs';

import {FiShare} from 'react-icons/fi';

import {GiCctvCamera} from 'react-icons/gi';

import UnitVideo from './UnitVideo';
import ChatBox from './ChatBox';
//import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';

//const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

let client;


const VideoPlayer=()=>{


      //console.log("client.uid:  ", client.uid);

      const [ appid, setAppid ] = useState('4661d9bf245f4ed19e45c3747944d6be');
      const [ token, setToken ] = useState('0064661d9bf245f4ed19e45c3747944d6beIABw+/eCjfWGjOOMwae88O8Jqsg0nDzN+fr9gzsZMJPd3RELSA0AAAAAEACDxJolH5q0YgEAAQAfmrRi');
      const [ channel, setChannel ] = useState('livestream1')


      const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);



      const [showVideoPlayerScreen, setShowVideoPlayerScreen] = useState(false);

      const [username,setUsername]= useState(null);


      const [playing, setPlaying] = useState(false);

      const [showChatBox, setShowChatBox] = useState(false);


      const HEIGHT = 700;
      const WIDTH = 700;

      const startVideo = () => {
		setPlaying(true);
		navigator.getUserMedia(
			{
				video: true,
			},
			(stream) => {
				let video = document.getElementsByClassName('app__videoFeed')[0];
				if (video) {
					video.srcObject = stream;
				}
			},
			(err) => console.error(err)
		);
	};



    const stopVideo = () => {
		setPlaying(false);
		let video = document.getElementsByClassName('app__videoFeed')[0];
		video.srcObject.getTracks()[0].stop();
	};


    const showChatBoxHandler =()=>{
      setShowChatBox(showChatBox=>!showChatBox);

    }

   
    const JoinMeetingHandler=()=>{
     setShowVideoPlayerScreen(true);
     //client.uid="bibhu"
      let uid=username;
     join(appid, channel, token,uid);
    }	



   const stopVideoHandler=()=>{



   }



   //console.log("username: ", username);





 return (


   <div className={classes.videoPlayer}>

     { !showVideoPlayerScreen &&
     <div className={classes.beforeJoinScreen}>
        Enter Name
        <input
	 type="text"
	 style={{borderStyle:"solid"}}
	 name="username"
         onChange={(event) => { setUsername(event.target.value) }}

	 /> 
        <button type="button" onClick={JoinMeetingHandler}>Join Meeting </button>
     </div>
     }

     { showVideoPlayerScreen &&  <>

       <div className={classes.videoParentDiv}>

        <div className={classes.videoDiv}>
	                      
			       
                               
            <div className={classes.oneVideoDiv}>
		                {/*
                                <video    
                                        style={{height:"100%",width:"100%"}}
                                        className={classes.oneVideoDiv}
                                        muted
                                        autoPlay
                                        className="app__videoFeed"
                                        >    
                               </video>
                               */}			      



             <p className={classes.userName}>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>

             <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>


	    </div>

                                                                                                    

            </div>

                { showChatBox && 
                    <ChatBox/>
                 }		
            </div>




        <div className={classes.toolsDiv}>

            <div className={classes.timeInfo}> 5:30pm  </div>

            <div className={classes.buttonIcons}>
                   <FaMicrophone className={classes.Icon}/>

        
                    {/*playing ? (
                                        <button onClick={stopVideo} className={classes.Icon} > <BsFillCameraVideoFill/> </button>
                                ) : (
                                        <button onClick={startVideo} className={classes.IconOff} > <BsFillCameraVideoOffFill/> </button>
                     )*/}


	           <button onClick={stopVideoHandler} className={classes.Icon} > <BsFillCameraVideoFill/> </button>


                   <GiCctvCamera className={classes.Icon}/>

                   <FiShare className={classes.Icon}/>

                   <BsFillTelephoneXFill className={classes.Icon3} />
       
            </div>


           <div className={classes.toolsDivRight}>

            <button className={classes.buttonIconsRight} onClick={showChatBoxHandler}>

               <BsFillPeopleFill className={classes.IconChat}/>

            </button>

            <button className={classes.buttonIconsRight} onClick={showChatBoxHandler}>

               <BsFillChatLeftTextFill className={classes.IconChat}/>

            </button>




           </div>


        </div>




       </>}



   </div>




 );




	

}


export default VideoPlayer;
