import React from "react";
import classes from "./TicketInfo.module.css"
import TicketTitleBar from "./TicketTitleBar";
import TicketProp from "./TicketProp";



const TicketInfo = (props) =>{

return(

<div className={classes.ticketInfo}>

<TicketTitleBar ticketId={props.ticketId} data={props.data}/>

<TicketProp data={props.data}/>


</div>

);

}

export default TicketInfo;

