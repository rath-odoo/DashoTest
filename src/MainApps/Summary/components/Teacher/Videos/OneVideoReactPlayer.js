import React,{useState} from 'react';
import ReactPlayer from 'react-player';
import classes from './OneVideoReactPlayer.module.css';


const OneVideoReactPlayer=()=>{

const [videoFilePath, setVideoFilePath] = useState(null);


//const handleVideoUpload = (event) => {
//console.log("event.target.files[0]: ", event.target.files[0]);	
//setVideoFilePath(URL.createObjectURL(event.target.files[0]));
//};


 console.log("videoFilePath: ", videoFilePath);

return (

      <div className={classes.oneVideoReactPlayer}>	
      {/*
      <input type="file" onChange={handleVideoUpload} />


      <ReactPlayer url={videoFilePath} width="350px" height="250px" controls={true} />
      */}
      </div>

);

}


export default OneVideoReactPlayer;
