import React from 'react';
import classes from './AddChapterButton.module.css';


const SaveSectionButton =(props)=>{

 return (        


	 <button
              className={classes.sectionEditButton}
              onClick={props.editSectionHandler}
         >
              Save
                 
	</button>


 );


}

export default SaveSectionButton;
