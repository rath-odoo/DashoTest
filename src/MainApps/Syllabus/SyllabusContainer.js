
import Syllabus from '../Summary/Syllabus/CourseSyllabus.js';
import classes from './SyllabusContainer.module.css';



const SyllabusContainer=(props)=>{









const showPhotosHandler=()=>{

  console.log("see photos");
}

  console.log("sel course: ", props.selectedCourse);


return (

<div className={classes.syllabusContainer}>
 { props.selectedCourse !==null &&	
 <Syllabus selectedCourse={props.selectedCourse}/>
 }

</div>

);


}

export default SyllabusContainer;
