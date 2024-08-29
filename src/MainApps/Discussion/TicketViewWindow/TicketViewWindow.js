import React,{useState,useEffect} from "react";
import classes from "./TicketViewWindow.module.css"
import TicketInfo from "./TicketInfo";
import TicketDescription from "./TicketDescription";
import TicketComments from "./TicketComments";
import AddComment from "./AddComment"
import {getcomments} from "../../../CommonApps/AllAPICalls";

import EditTicketForm from './Forms/EditTicketForm';



const TicketViewWindow = (props) =>{

    const ticketId = localStorage.getItem('clickedDiscussionId');
    const [commentObj,setCommentObj]=useState(null);
    const [commentAdded, setComAdded]=useState(false);

    const [editTicketForm, setEditTicketForm] = useState(false);

    const [rerender, setRerender] = useState(false);

    useEffect(()=>{
      getcomments({setCommentObj, ticketId});	
    },[commentAdded, props.selectedTicket, rerender]);

    //console.log("commentObj: ", commentObj);

    const showTicketEditFormHandler=()=>{

     setEditTicketForm(true);

    }

    const closeTicketEditForm=()=>{

     setEditTicketForm(false);	    
     props.rerender();	    

    }

     const rerenderHandler=()=>{

        setRerender(rerender => !rerender);      

     }




return(

<div className={classes.ticketViewWindow}>


   { editTicketForm  && props.selectedCourse !==null &&  Number(props.selectedTicket.author.id) === Number(props.userData.id) &&
      
       <EditTicketForm selectedCourse={props.selectedCourse}
	               onPress={closeTicketEditForm}
	               selectedTicket={props.selectedTicket}
	               rerender={closeTicketEditForm}
	               userData={props.userData}
	               />

   }

   { editTicketForm  && props.selectedCourse !==null &&  Number(props.selectedTicket.author.id) !== Number(props.userData.id) &&

    <div className={classes.noEditRights}>
     
         <div className={classes.noEditRights_inner}>
             Only creaters have edit rights!!

	    <button type="button" className={classes.noEditButton} onClick={closeTicketEditForm}>
		   Yes, I understand!
	    </button>	   
         </div>
    </div>		   

   }


   { commentObj ===null &&
      <div className={classes.ticketNotSelectedPage}>

	  Please choose a discussion to continue

      </div>
   }

   { commentObj !==null &&
      <div className={classes.ticketViewWindowContainer}>

           <TicketInfo ticketId={ticketId} data={props.selectedTicket}/>

           <button type="button" className={classes.ticketEditButton} onClick={showTicketEditFormHandler}> Edit</button>

           <TicketDescription ticketId={ticketId}  data={props.selectedTicket}/>

          {commentObj.map((comment,index)=>{
 
   	       return <TicketComments  key={index}  
		                       commenttext={comment.commenttext} 
		                       commenter={comment.commenter} 
		                       commenttime={comment.commenttime}
		                       comment={comment}
		                       onPress={rerenderHandler}
		                       userData={props.userData}
		                       newCommentAdded={setComAdded} 
			               />	     
            }

          )}

          <AddComment ticketId={ticketId} newCommentAdded={setComAdded} />

     </div>
   }

</div>

);

}

export default TicketViewWindow;
