import React from 'react';
import classes from './ClassTitleBar.module.css';
import {BsCheckCircleFill} from 'react-icons/bs';



const ClassTitleBar=(props)=>{


//const [style,setStyle]=useState(props.Course);



return(


  <div className={classes.infoUnitBarParent}>
     <div className={classes.infoUnitBar} >
         <i>
	     
	      <b>Class Id :</b> <span className={classes.courseName}>
                           <span className={classes.serialNo}>10 </span>
	                   {/*
                           <BsCheckCircleFill className={classes.signupStatus} style={{color:props.Course.courseSignUpstatusColor}}/>
			   */}
                           </span>
         </i>

          <i>       
               <span> Report </span>
	       <span className={classes.courseCodeName} style={{
                                                            padding: "10px",
                                                            borderRadius: "5px",
			                                    borderStyle: "solid",
			                                    marginLeft:"10px"
                                                            }}>
                      Attendance
               </span>
         </i>



         <div>       

	          <span className={classes.courseCodeName} style={{color: 'white', 
			                                    backgroundColor:"green",
		                                            padding: "10px",
			                                    borderRadius: "5px"
	                                                    }}> 
	              Scheduled
	            </span>
	 </div>

     </div>
   </div>










);

}

export default ClassTitleBar;
