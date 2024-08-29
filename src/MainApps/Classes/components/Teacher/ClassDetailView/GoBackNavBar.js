
import classes from './GoBackNavBar.module.css';
import {FaArrowLeft} from 'react-icons/fa';
import { useHistory } from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs'

const GoBackNavBar =()=>{
 let history = useHistory();

const moveToClasses=()=>{
history.push('/course/classes');


}



return (

<div className={classes.goBackNavBar}>
   <button className={classes.backButton} onClick={moveToClasses}>
      <BsArrowLeft className={classes.backIcon}/> 
   </button>

   {/*	
   <button className={classes.currentWindowButton}>
         DetailView
   </button>
   */}

</div>

);


}

export default GoBackNavBar;
