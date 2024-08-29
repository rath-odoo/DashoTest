import React from 'react';
import classes from './AddSectionButton.module.css';
import {BsPlus} from 'react-icons/bs';


const AddSectionButton =(props)=>{

 return (        


	 <button
              className={classes.addSectionButton}
              onClick={props.addSectionHandler}
         >
            Add a new section  <BsPlus/>
                 
	</button>


 );


}

export default AddSectionButton;
