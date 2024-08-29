import classes from './VideoFiles.module.css';
import {BiEdit} from 'react-icons/bi';
import VideoClickBox from './VideoClickBox';
//import {BsUpload} from 'react-icons/bs';
//import {RiVideoUploadFill} from 'react-icons/ri';

const InstituteBar=(props)=>{

return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> 
	<span><i>VIDEO LECTURES</i>

         <button className={classes.uploadButton}> <b>+ Upload </b> </button>

	</span>   
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button></i>

    <i className={classes.textInfo}> Recorded Video Lectures will appear here  </i>

    <div className={classes.videoMicroContainer}>
 

      <VideoClickBox/>

      <VideoClickBox/>

      <VideoClickBox/>	




    </div>

</div>

);

}

export default InstituteBar;
