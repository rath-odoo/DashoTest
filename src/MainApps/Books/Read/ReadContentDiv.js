import React from 'react';
import classes from './ReadContentDiv.module.css';
import base from '../../CommonAppUtilities/AppContentDiv.module.css';

import BookPage1 from './BookPage1';
import BookPage2 from './BookPage2';




const ReadContentDiv=()=>{




return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>



  <BookPage1/>

  <BookPage2/>




</div>


</div>	

);

}


export default ReadContentDiv;
