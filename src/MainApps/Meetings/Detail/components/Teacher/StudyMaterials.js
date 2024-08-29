import classes from './StudyMaterials.module.css';
import {BiEdit} from 'react-icons/bi';
//import VideoClickBox from './VideoClickBox';
//import {BsUpload} from 'react-icons/bs';
//import {RiVideoUploadFill} from 'react-icons/ri';
import {AiOutlineFilePdf, AiOutlineFilePpt} from 'react-icons/ai';



const InstituteBar=(props)=>{

return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> 
	<span><i>USEFUL ATTACHMENTS</i>

         <button className={classes.uploadButton}> <b>+ Upload </b> </button>

	</span>   
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button></i>


    <div className={classes.videoMicroContainer}>
 

     <AiOutlineFilePdf className={classes.pdfFileIcon} style={{color:'red'}}/>

     <AiOutlineFilePdf className={classes.pdfFileIcon}/>

     <AiOutlineFilePdf className={classes.pdfFileIcon}/>
    	
     <AiOutlineFilePpt  className={classes.pdfFileIcon} style={{color:'green'}}/>


    </div>

</div>

);

}

export default InstituteBar;
