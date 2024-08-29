
import classes from './SelectScreen.module.css';
import {AiFillCloseCircle} from "react-icons/ai";



const SelectScreen =(props)=>{


return (


<div className={classes.selectScreen}>



   <div className={classes.selectScreenView} >

     
      <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
      </div>



       <div className={classes.actionDiv}>

          <i>You need to select this class before viewing detail</i>

	  <button onClick={props.selectNMove}> Select and View Detail </button>

       </div>


   </div>









</div>


);




}


export default SelectScreen;
