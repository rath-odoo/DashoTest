import React from 'react';
import classes from './AddChapterButton.module.css';
import {BiEdit} from 'react-icons/bi';


const EditSectionButton =(props)=>{

 return (        


	 <button
              className={classes.sectionEditButton}
              onClick={props.editSectionHandler}
         >
              <BiEdit/>
                 
	</button>


 );


}

export default EditSectionButton;
