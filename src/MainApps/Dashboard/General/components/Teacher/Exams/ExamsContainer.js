import classes from './ExamsContainer.module.css';

import OneExamShortView from './OneExamShortView';


const ExamsContainer=()=>{



  return (


   <div className={classes.parentContainer}>
     	  
     <OneExamShortView/>
     <OneExamShortView/>
     <OneExamShortView/>
     <OneExamShortView/>
     
   </div>	

);




}

export default ExamsContainer;
