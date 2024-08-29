import React from 'react';
import classes from './CalenderContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
import CalendarApp from "./CalendarApp";



const CalenderContentDiv=()=>{




return (

<div className={base.appContentDiv}>	

<div className={classes.contentDiv}>

<CalendarApp/>


</div>

</div>

);

}


export default CalenderContentDiv;
