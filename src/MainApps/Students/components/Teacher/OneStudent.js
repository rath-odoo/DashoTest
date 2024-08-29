import classes from './OneStudent.module.css';
import StudentImg from './Student1.jpg';


const OneStudent =()=>{

return (

<div  className={classes.oneStudentDiv}>

  
  <img alt="OneStudent" src={StudentImg}  className={classes.oneStudentImage} width="100%" height="100%"/>
  <span>Debaprasad Mahakud</span>
  

  	

</div>

);

}

export default OneStudent;
