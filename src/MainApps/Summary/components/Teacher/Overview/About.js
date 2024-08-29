


import classes from './About.module.css';


const About=(props)=>{

return (

<div className={classes.about}>
        <div className={classes.aboutTitle}>
	   <props.icon/>
	   <span>About the Course</span> 
	</div>
        <div className={classes.aboutText}>
	  {props.aboutText}
       </div>






</div>
);
	
}

export default About;
