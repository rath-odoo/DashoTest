import classes from './ClassAndCoursesTopInfoBar.module.css';
import {GrChapterAdd} from 'react-icons/gr';
import {BsCheckCircleFill,BsFillCartPlusFill} from 'react-icons/bs';
import {BiErrorCircle} from 'react-icons/bi';

const ClassAndCoursesTopInfoBar=()=>{

return(

<div className={classes.classAndCoursesTopInfoBar}>

  <div className={classes.topSectionBar}>  

      <div> <b> Pursuing: K-12 </b> <button className={classes.changeClassButton}><BiErrorCircle className={classes.changeBtnIcon}/> Change </button>  </div>
      
      <div> <b> <BsCheckCircleFill  className={classes.signupIcon}/> Courses signed up: 3 </b> </div>	

      <div>  
           <button className={classes.addCourseButton}> <BsFillCartPlusFill className={classes.addCourseIcon}/> <b>Add a course</b> </button>
      </div>

  </div>



  <div className={classes.bottomSectionBar}>  

     <div className={classes.upcomingClasses}> 
	
	 <span> Upcoming Classes</span>    
    
         <button className={classes.upcomingClass}> 2pm, Today, CLM-221)  </button>

         <button className={classes.upcomingClass}> 9am, Tomorrow, CLM-231) </button>

         <button className={classes.upcomingClass}> 2pm, Today, CLM-221) </button>







     </div>
 


  </div>


</div>

);




}

export default ClassAndCoursesTopInfoBar;
