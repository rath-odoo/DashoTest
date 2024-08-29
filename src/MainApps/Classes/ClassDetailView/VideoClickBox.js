import classes from './VideoClickBox.module.css';

import thumbnail from "./thumbn.png"



const VideoClickBox =()=>{


return (

<div className={classes.videoClickBox}>

<img src={thumbnail} className={classes.thumbnails}/>

</div>

);

}


export default VideoClickBox;
