import React,{useState} from 'react';
import classes from './AddUserorGroup.module.css';

const AddUserorGroup=()=>{


   const [addContactStyle, setAddContactStyle]=useState(
   {
    buttonColor:"var(--themeColor)"

   }
   );

   const [addGroupStyle, setAddGroupStyle]=useState(
   {
    buttonColor:"grey"

   }
   );

   




   const [showNewChat, setShowNewChat] = useState(true);
   const [showNewGroupChat, setShowNewGroupChat] = useState(false);

   const newChatHandler=()=>{
    setShowNewChat(true);
    setShowNewGroupChat(false);	   
    setAddContactStyle( {...addContactStyle,  buttonColor:"var(--themeColor)"});
    setAddGroupStyle({...addGroupStyle, buttonColor:"grey"});	   
   }

   const newGroupChatHandler=()=>{
      setShowNewGroupChat(true);
      setShowNewChat(false);
      setAddContactStyle( {...addContactStyle,  buttonColor:"grey"});
      setAddGroupStyle({...addGroupStyle, buttonColor:"var(--themeColor)"});    

   }



return (

  <>	

   <div className={classes.newusergroupbar}>
       
     <button type="button" 
	        className={classes.addContactButton} 
	        onClick={newChatHandler}
	        style={{color: addContactStyle.buttonColor}}
	        > +New Chat  
     </button>

     <button type="button" 
	     className={classes.createGroupButton} 
	     onClick={newGroupChatHandler}
	     style={{color: addGroupStyle.buttonColor}}
	     > +New Group Chat  
     </button>

   </div>

   <div className={classes.explainTextDiv}>  
	 { showNewChat && <span className={classes.explainText}> Select contacts for new chat</span>}
	 { showNewGroupChat && <span className={classes.explainText}> Select contacts for new group chat</span>}

   </div>

</>

);


}

export default AddUserorGroup;


