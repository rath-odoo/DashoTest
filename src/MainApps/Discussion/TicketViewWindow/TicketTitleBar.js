import React from "react";
import classes from "./TicketTitleBar.module.css"

const TicketTitleBar = (props) =>{

return(

<div className={classes.ticketTitleBar}>

   <i> 
	<span className={classes.ticketNumber}>Discussion-{props.ticketId}: </span>
	 {props.data.title} 
   </i>

</div>

);

}

export default TicketTitleBar;

