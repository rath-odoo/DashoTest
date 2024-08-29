import React from 'react';
import classes from './AddChapterButton.module.css';
import {BsPlus} from 'react-icons/bs';


const AddChapterButton =(props)=>{

 return (        


	 <button
              className={classes.addChapterButton}
              onClick={(event)=>props.addChapterHandler()}
         >
            Add a new chapter  <BsPlus/>
                 
	</button>


 );


}

export default AddChapterButton;
