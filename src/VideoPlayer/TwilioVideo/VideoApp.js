import classes from './VideoApp.module.css';
import VideoChat from './VideoChat';



const VideoApp=()=>{

return (
  <div className={classes.videoApp}>
    <div style={{backgroundColor:"green"}}> EDResearch Video Chat App Testing </div>

    <VideoChat/>	


  </div>
);
}


export default VideoApp;
