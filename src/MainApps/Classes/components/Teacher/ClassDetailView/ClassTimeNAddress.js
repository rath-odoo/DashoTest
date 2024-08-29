import classes from './ClassTimeNAddress.module.css';
import {BiEdit} from 'react-icons/bi';
import {BsLink45Deg} from 'react-icons/bs';

const InstituteBar=(props)=>{



const joinClassHandler=()=>{

     //window.open("https://meet.google.com/pfq-vkvp-zeq", "_blank")

       //let meetingLink = props.selectedMeeting.meetingLink;
       //window.open(meetingLink, "_blank")


    }








return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> <span>TIME AND ADDRESS</span>   
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button></i> 
    <div className={classes.timeAndAddressInfo}>
     <i>9am -- 10 am | 27th March 2022</i>
     <i>Room No. 27A, Dogra Hall</i>
     <i className={classes.meetingLinki}>Meeting Link: <button className={classes.copyMeetingLink}>Copy <BsLink45Deg/> </button></i> 	
     <button className={classes.goLiveButton} onClick={joinClassHandler}> 
	<h2>Join Class</h2>
     </button>

   </div>

</div>

);

}

export default InstituteBar;
