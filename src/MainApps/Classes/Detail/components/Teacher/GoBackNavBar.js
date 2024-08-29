
import classes from './GoBackNavBar.module.css';
import {FaArrowLeft} from 'react-icons/fa';
import { useHistory } from "react-router-dom";
const GoBackNavBar =()=>{
 let history = useHistory();

const moveToClasses=()=>{
history.push('/class/overview');


}



return (

<div className={classes.goBackNavBar}>
   <button className={classes.backButton} onClick={moveToClasses}>
      <FaArrowLeft className={classes.backIcon}/> Classes /
   </button>

   <button className={classes.currentWindowButton}>
         DetailView
   </button>


</div>

);


}

export default GoBackNavBar;
