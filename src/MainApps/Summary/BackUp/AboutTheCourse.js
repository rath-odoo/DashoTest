import classes from './AboutTheCourse.module.css';
//import {BsArrowDown} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';

const AboutTheCourse =(props)=>{

return (

<div className={classes.aboutTheCourse}>

   <i className={classes.titleSpace}> <span>ABOUT THE COURSE </span>  <button> <BiEdit className={classes.editIcon}/></button>   </i>


   <div className={classes.aboutTheCourseText}> 


        <p>
            {props.selectedCourse.length>0 && props.selectedCourse[0].abouttheCourse}
       </p>


   </div>
</div>

);

}

export default AboutTheCourse;
