import React,{useState} from "react";
import classes from "./TopIdBarLeft.module.css"
import {BsPlus} from "react-icons/bs"
import CreateTicketForm from "./Forms/CreateTicketForm";






const TopIdBarLeft = (props) =>{


  const [createPost,showCreateForm]=useState(false);

  const showPostFormHandler=()=>{
   showCreateForm(true);
  }

  const closeCreateFormHandler=()=>{
   showCreateForm(false);
  }




return(




<div className={classes.topIdBarLeft}>
	 {/*
         <button className={classes.allTickets}> <b>All tickets</b> </button>	

         <button className={classes.myTickets}> <b>Created by me </b></button>
        */}

       <button className={classes.createTicket} 
	  onClick={showPostFormHandler}
	  type="button"
	  >
	  <BsPlus/> 
	  <b>Create </b> 
       </button>	



       {createPost && <CreateTicketForm onPress={closeCreateFormHandler} 
	                          selectedCourse={props.selectedCourse}
	                          userData={props.userData}
	                          rerender={props.rerender}
	                          /> 
       }

</div>

);

}

export default TopIdBarLeft;
