import React,{useState,useEffect} from "react";
import classes from "./TicketBoxContainer.module.css"
import LeftUserBox from "./LeftUserBox";
import {getalltickets, getticketsbycourseid} from '../../../CommonApps/AllAPICalls';







const TicketBoxContainer = (props) =>{

     const [allTicketData, getAllTicketData] = useState(null);
     const [pageNo, setPageNo] = useState(1);


     useEffect(()=>{
        let courseId = props.selectedCourse[0].id;
	getticketsbycourseid({courseId, getAllTicketData, pageNo});      
 
     },[]);


    //console.log("Total No of tickets: ", allTicketData !==null ? allTicketData.count: "no data");



return(

  <div className={classes.leftUserBoxContainer}>

        { allTicketData !==null && allTicketData.count===0 &&
          
	    <div className={classes.noTicketMessage}>  There are no discussions in this course. </div>	

        }

        <div className={classes.totalNoOfTickets}>
            <span>Total no of tickets: {  allTicketData !==null && <> {allTicketData.count}</>} </span>
	</div>


	{ allTicketData !==null && allTicketData.results.map((oneTicket,index)=>{

               return <LeftUserBox key={index} 
		                   userName={"Discussion - "+oneTicket.id} 
		                   oneTicket={oneTicket} 
		                   onPress={()=>props.onPress(oneTicket.id)}
		                   
			           />

	   }

        )}


  </div>

);

}

export default TicketBoxContainer;
