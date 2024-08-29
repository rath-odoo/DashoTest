import classes from './ChapterNTopics.module.css';
import {BiEdit} from 'react-icons/bi';


const InstituteBar=(props)=>{

return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> <span>CHAPTER AND TOPICS</span>   
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button></i> 
    <div className={classes.timeAndAddressInfo}>
     <i><b style={{color:'var(--themeColor)'}}>Laws of Motion</b></i>
     <i>Intuitive concept of force. Inertia, Newton’s first law of motion, momentum and Newton’s second law of motion.</i>

   </div>

</div>

);

}

export default InstituteBar;
