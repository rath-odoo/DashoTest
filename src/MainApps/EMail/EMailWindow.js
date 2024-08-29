import React from "react";
import classes from "./EMailWindow.module.css";
import SecTitleTopBar from "./SecTitleTopBar";
import InBoxMailShortView from "./InBoxMailShortView";



const EMailWindow = (props) =>{

let Inbox="Inbox"



return(

<div className={classes.emailWindow}>

  <SecTitleTopBar  title={Inbox}/>

   <div className={classes.mailBoxContainer}>


   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>	

   <InBoxMailShortView/>	

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>


   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>

   <InBoxMailShortView/>


   </div>



</div>

);

}

export default EMailWindow;
