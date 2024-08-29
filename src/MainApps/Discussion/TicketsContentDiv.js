import React,{useState,useEffect} from 'react';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
import classes from './TicketsContentDiv.module.css';
import TicketNavBar from './TicketNavBar/TicketNavBar';
import TicketViewWindow from './TicketViewWindow/TicketViewWindow';

import {getticket} from '../../CommonApps/AllAPICalls';

const TicketsContentDiv=(props)=>{


   const [clickedTicketId, setTicketId]=useState(localStorage.getItem('clickedDiscussionId'));

   const [selectedTicket, setData ] = useState(null)

   const [rerenderTicket, setRerenderTicket] = useState(false);

    useEffect(() =>{
      let ticketId=clickedTicketId;	    
      getticket({ticketId, setData});        
    },[clickedTicketId]);




    const ticketClickHandler=(ticketId)=>{
        setTicketId(ticketId);	
        localStorage.setItem('clickedDiscussionId',ticketId );
    }


    const rerenderTicketHandler=()=>{
      setRerenderTicket(rerenderTicket=>!rerenderTicket);

    }


     //console.log("selectedTicket: ", selectedTicket);





return (

<div className={base.appContentDiv}>	

  <div className={classes.contentDiv}>

	
	
     <TicketNavBar onPress={ticketClickHandler} 
	           selectedCourse={props.selectedCourse}
	           userData={props.userData}
	           rerender={props.rerender}
	           />
	
     { selectedTicket !==null &&
     <TicketViewWindow ticketId={clickedTicketId} 
	               selectedTicket={selectedTicket}
	               selectedCourse={props.selectedCourse}
	               rerender={props.rerender}
	               userData={props.userData}
	               />
     }

     { selectedTicket ===null &&
		     
        <div className={classes.noDiscussionSelected}> No discussion is selected </div>

     }

  </div>

</div>

);

}


export default TicketsContentDiv;
