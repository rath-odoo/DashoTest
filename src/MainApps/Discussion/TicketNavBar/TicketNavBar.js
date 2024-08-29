import React from "react";
import classes from "./TicketNavBar.module.css"
import TopIdBarLeft from "./TopIdBarLeft"
import TopLeftSearchBar from "./TopLeftSearchBar";
import TicketBoxContainer from "./TicketBoxContainer";


const TicketNavBar = (props) =>{




return(

<div className={classes.chatNavBar}>

  
  <TopIdBarLeft selectedCourse={props.selectedCourse}
	        userData={props.userData}
	        rerender={props.rerender}
	        />

  {/*
  <TopLeftSearchBar/>
  */}

  <TicketBoxContainer onPress={props.onPress} 
	               selectedCourse={props.selectedCourse}
	               userData={props.userData}
	              />


</div>	

);
	
}

export default TicketNavBar;
