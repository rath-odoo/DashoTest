import classes from './CourseProgressBar.module.css';



const CourseProgressBar =()=>{

return (


<div className={classes.infoUnitBar}>
        <i className={classes.courseProgress}>
            <span className={classes.cproTitle}> COURSE PROGRESS: </span>
            <span className={classes.cproCont}>   <i className={classes.progressBar} style={{backgroundColor: "#50C878"}}> 30%  </i>   </span>
        </i>

    </div>







);

}

export default CourseProgressBar;
