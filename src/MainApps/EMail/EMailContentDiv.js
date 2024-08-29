import React from 'react';
import classes from './EMailContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';

import EMailNavBar from "./EMailNavBar.js";
import EMailWindow from "./EMailWindow.js";


const EMailContentDiv=()=>{




return (

<div className={base.appContentDiv}>	

<div className={classes.contentDiv}>


  <EMailNavBar/>

  <EMailWindow/>


</div>

</div>

);

}


export default EMailContentDiv;
