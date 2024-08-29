import React,{useState} from 'react';
import classes from './AgoraVideo.module.css';
//import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';

//const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

const client;
const AgoraVideo=()=>{

  const [ appid, setAppid ] = useState('4661d9bf245f4ed19e45c3747944d6be');
  const [ token, setToken ] = useState('0064661d9bf245f4ed19e45c3747944d6beIABw+/eCjfWGjOOMwae88O8Jqsg0nDzN+fr9gzsZMJPd3RELSA0AAAAAEACDxJolH5q0YgEAAQAfmrRi');
  const [ channel, setChannel ] = useState('livestream1');


  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);	





   const initialFormData = Object.freeze({

        username: null,

        });

   const [formData, updateFormData] = useState(initialFormData);

   const handleChange = (e) => {

        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
        };


  const handleSubmit=(e)=>{
  e.preventDefault();

  //console.log("print: ", formData.username)

  }






return (

    <div className='call'>

      <form className='call-form'>
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-primary btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>Join</button>
          <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>



      <div className='player-container'>

         <div className='local-player-wrapper'>
           <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
           <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
         </div>


         {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}


      </div>



    </div>	



);

}


export default AgoraVideo;
