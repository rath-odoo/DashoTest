import React from 'react';
import classes from './ClassTitleBar.module.css';
import {BsCheckCircleFill} from 'react-icons/bs';



const ClassTitleBar=(props)=>{


//const [style,setStyle]=useState(props.Course);



return(


  <div className={classes.infoUnitBarParent}>
     <div className={classes.infoUnitBar} >
         <i>
	      <span className={classes.serialNo}>{props.selectedMeeting.id} </span>
	       <span className={classes.courseName}>
                           <b> {props.selectedMeeting.name} </b>
                           <BsCheckCircleFill className={classes.signupStatus} style={{color:props.Course.courseSignUpstatusColor}}/>
                         </span>
         </i>

         <i>STATUS : 
	           { props.selectedMeeting.meetingStatus ==="scheduled" &&
	            <span className={classes.courseCodeName}  style={{color: 'green' , marginLeft: '10px'}}> 
	              <b>{props.selectedMeeting.meetingStatus}</b>
	            </span>
                   }

                   { props.selectedMeeting.meetingStatus ==="postponed" &&
                    <span className={classes.courseCodeName} style={{color: 'blue' , marginLeft: '10px'}}>
                      <b>{props.selectedMeeting.meetingStatus}</b>
                    </span>
                   } 

	           { props.selectedMeeting.meetingStatus ==="cancelled" &&
                    <span className={classes.courseCodeName} style={{color: 'red' , marginLeft: '10px'}}>
                      <b>{props.selectedMeeting.meetingStatus}</b>
                    </span>
                   }


                   { props.selectedMeeting.meetingStatus ==="completed" &&
                    <span className={classes.courseCodeName} style={{color: 'green' , marginLeft: '10px'}}>
                      <b>{props.selectedMeeting.meetingStatus}</b>
                    </span>
                   }


	 </i>

     </div>
   </div>










);

}

export default ClassTitleBar;
