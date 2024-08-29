import React from 'react';
import classes from './AddChapterButton.module.css';
import {BsTrash} from 'react-icons/bs';


const DeleteSectionButton =(props)=>{

 return (        


	 <button
              className={classes.sectionEditButton}
              //onClick={(event)=>props.addChapterHandler()}
	       onClick={props.deleteSectionHandler}
         >
             <BsTrash/>
                 
	</button>


 );


}

export default DeleteSectionButton;
