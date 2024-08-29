
import classes from './GoBackNavBar.module.css';
import {BsArrowLeft} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
const GoBackNavBar =()=>{
 let history = useHistory();

const moveToClasses=()=>{
history.push('/meetings');


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
