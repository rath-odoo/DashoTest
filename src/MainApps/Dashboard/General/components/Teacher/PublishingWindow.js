import {useState} from 'react';
import classes from "./PublishingWindow.module.css";



const AddNameForm=(props)=>{









 return <div className={classes.addNameForm}>
          <div className={classes.formDiv}>

             <div className={classes.marginDiv}>
                  <div className={classes.setYourName}> {props.statustext} your Course ...  </div>
            </div>

          </div>
       </div>

}

export default AddNameForm;
