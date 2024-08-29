import React, { useState, useEffect, useRef } from "react";

const Participant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);


  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));
   
    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);
    
  



    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);



  //reload to browser if video setting changes of the participant
  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);



  //reload to browser if audio setting changes of the participant
  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);



    ///console.log("Participant: ",participant.sid )
    //console.log("audioTracks.length: ",audioTracks.length)
    //console.log("videoTracks.lengh: ", videoTracks.length)
    //console.log("videoRef: ", videoRef);


   const turnOffVideoHandler=()=>{
    setVideoTracks([]);
   }


   const turnOnVideoHandler=()=>{
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
   }

   const turnOffAudioHandler=()=>{
    setAudioTracks([]);
   }


   const turnOnAudioHandler=()=>{
    setAudioTracks(trackpubsToTracks(participant.audioTracks));
   }










  return (
    <div className="participant">
      <h3>{participant.identity}</h3>
      <video ref={videoRef} autoPlay={true}  />
      <audio ref={audioRef} autoPlay={true} muted={false} />
	   
	  { videoTracks.length > 0 && <button type='button' onClick={turnOffVideoHandler}> video turn off</button>}	 
          { videoTracks.length===0 && <button type='button' onClick={turnOnVideoHandler}> video turn on </button>}

	  { audioTracks.length > 0 && <button type='button' onClick={turnOffAudioHandler}> audio turn off</button>}
          { audioTracks.length ===0 && <button type='button' onClick={turnOnAudioHandler}> audio turn on </button>}



    </div>
  );
};

export default Participant;
