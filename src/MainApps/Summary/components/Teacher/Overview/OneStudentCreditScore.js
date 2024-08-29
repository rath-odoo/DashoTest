


import classes from './OneStudentCreditScore.module.css';


const OneStudentCreditScore=(props)=>{

 
  let num=props.scoreValue;

return(
<>
<div className={classes.oneStudentCreditScore}>

   <div className={classes.creditScoreValue}
	style={{backgroundColor:`hsl(${num}, 100%, 70%)`,height:`${num}%`}}
	>
	<span className={classes.csnum}>{num}% </span>
	<span> John Stupak</span>
   </div>


</div>




</>


);
}

export default OneStudentCreditScore;
