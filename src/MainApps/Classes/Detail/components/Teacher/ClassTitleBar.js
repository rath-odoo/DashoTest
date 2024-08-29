import React from 'react';
import classes from './ClassTitleBar.module.css';
import {BsCheckCircleFill} from 'react-icons/bs';



const ClassTitleBar=(props)=>{


//const [style,setStyle]=useState(props.Course);



return(


  <div className={classes.infoUnitBarParent}>
     <div className={classes.infoUnitBar} >
         <i>
	      <span className={classes.serialNo}>10 </span>
	      CLASS ID : <span className={classes.courseName}>
                           <b> 100001 </b>
                           <BsCheckCircleFill className={classes.signupStatus} style={{color:props.Course.courseSignUpstatusColor}}/>
                         </span>
         </i>

         <i>STATUS: <span className={classes.courseCodeName} style={{color: 'green'}}> 
	              <b>Scheduled</b>
	            </span>
	 </i>

     </div>
   </div>










);

}

export default ClassTitleBar;
