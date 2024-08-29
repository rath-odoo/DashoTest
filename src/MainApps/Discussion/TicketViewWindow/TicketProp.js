import React,{useState,useEffect} from "react";
import classes from "./TicketProp.module.css"
import {getuserbyId, getcategorybyId} from '../../../CommonApps/AllAPICalls';

import {BsFillRecordFill} from 'react-icons/bs';


const localTime=(serverTime)=>{

        let timeData = new Date(serverTime);
        let timeDataStr=timeData.toString()
        let fulltime=timeDataStr.split(" ")[4];
        let hrmin = fulltime.split(":")[0]+":"+fulltime.split(":")[1]
        let year = timeDataStr.split(" ")[3];
        let month = timeDataStr.split(" ")[1];
        let day = timeDataStr.split(" ")[2];

        let displayTime =  hrmin+", "+day+" "+month+" "+year;
   
	return displayTime;

}



const TicketProp = (props) =>{


       let serverTime=props.data.created_at;
       let ticketCreationTime = props.data.created_at !==null ? localTime(serverTime):"N/A";
       let lastUpdateServerTime= props.data.last_comment_time;
       let ticketLastUpdate = props.data.last_comment_time !==null ? localTime(lastUpdateServerTime):"N/A";



return(

<div className={classes.ticketProp}>
   
   <div className={classes.info}> 
     <button className={classes.proptitlebtn}> Details</button>
     <ul className={classes.listStyleType}>
      <div className={classes.oneInfoDiv}> 
	    <BsFillRecordFill className={classes.bulletIcon}/>
	    <span className={classes.params}>Category:</span>  {props.data.category.name}
      </div>
      <div className={classes.oneInfoDiv}> 
	   <BsFillRecordFill className={classes.bulletIcon}/>
	   <span className={classes.params}>Priority:</span> {props.data.priority}
      </div>
      <div className={classes.oneInfoDiv}> 
	   <BsFillRecordFill className={classes.bulletIcon}/>
	   <span className={classes.params}>Status:</span>  
	   { props.data.status==="open" &&
	   <span className={classes.statusholder} style={{background:"var(--greenColor1)",color:"white"}}>  Open </span>
	   }	  

           { props.data.status==="closed" &&
           <span className={classes.statusholder} style={{background:"var(--redColor1)",color:"white"}}> Closed</span>
           } 

      </div>	
      <div className={classes.oneInfoDiv}> 
	  <BsFillRecordFill className={classes.bulletIcon}/>
	  <span className={classes.params}>Resolution:</span> {props.data.resolution} 
      </div>

     </ul>
  </div>

  <div className={classes.people}>
  
     <button className={classes.proptitlebtn}> People </button>	

     <ul>
        <div className={classes.oneInfoDiv}> 
	    <BsFillRecordFill className={classes.bulletIcon}/> 
	    <span className={classes.params}>Created by :</span>  
	    <span style={{color:"black"}}>{ props.data.author !==null && 
		     props.data.author.firstname+" "+props.data.author.lastname
	          }

                  { props.data.author ===null && "N/A"}

	    </span>
	</div>
        {/*
        <div className={classes.oneInfoDiv}> 
	   <BsFillRecordFill className={classes.bulletIcon}/>
	   <span className={classes.params}>Last updated by :</span> Ipsita Nanda 
	</div>
        */}
        <div className={classes.oneInfoDiv}> 
	    <BsFillRecordFill className={classes.bulletIcon}/>
	    <span className={classes.params}>Visibility :</span> 
	    <span style={{color:"black"}}> {props.data.visibility}</span>
	</div>	 
     </ul>

  </div>

   <div className={classes.dates}> 
      <button className={classes.proptitlebtn}> Dates </button>
      <ul>
        <div className={classes.oneInfoDiv}>
	      <BsFillRecordFill className={classes.bulletIcon}/>
	      <span className={classes.params}>Created at :</span>  
	      <span style={{marginLeft:"10px",color:"black"}}>{ticketCreationTime}</span>
	</div>
        <div className={classes.oneInfoDiv}>
	     <BsFillRecordFill className={classes.bulletIcon}/>
	    <span className={classes.params}>Last updated at :</span> 
	    <span style={{marginLeft:"10px",color:"black"}}> {ticketLastUpdate}</span>
	</div>

     </ul>
   </div>


</div>

);

}

export default TicketProp;
