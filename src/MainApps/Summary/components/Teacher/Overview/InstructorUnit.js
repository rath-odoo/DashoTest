

import classes from './InstructorUnit.module.css';
import JackyImage from './Jacky.jpeg';





const InstructorUnit=(props)=>{



 console.log("selectedCourse: ", props.selectedCourse);



return (

<div className={classes.unitBar}>

    <div className={classes.instructorDetailDiv}>
         <img   src={props.selectedCourse[0].teacher.profile_image} className={classes.instructorImage}/>
	 <div className={classes.instructorInfo}> 
	       <i className={classes.instructorTitle}> Instructor</i>
	       <i className={classes.instructorName}>
	             
	             { props.selectedCourse[0].teacher.firstname !=="" &&
			     props.selectedCourse[0].teacher.usertitle +" "
			     +props.selectedCourse[0].teacher.firstname+" "
			     +props.selectedCourse[0].teacher.lastname
		     }

                     { props.selectedCourse[0].teacher.firstname ==="" &&
                             props.selectedCourse[0].teacher.username +" "
                     }





	       </i>
	 </div>
    </div>





</div>

);	

}


export default InstructorUnit;
