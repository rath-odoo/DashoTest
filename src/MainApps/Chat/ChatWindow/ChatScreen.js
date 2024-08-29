import React,{useRef,useEffect} from "react";
import classes from "./ChatScreen.module.css";


const ChatScreen=(props)=>{


const messages=props.messages;

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }



    useEffect(() => {
      scrollToBottom();
    }, [messages]);


    const commentTime=({datetime})=>{
         
     let DatetimeLocalFull = new Date(datetime);

     let DatetimeLocalFullStr= String(DatetimeLocalFull);
    
     let dayStr=DatetimeLocalFullStr.split(" ").at(0);
     let dateStr=DatetimeLocalFullStr.split(" ").at(2);
     let month= DatetimeLocalFullStr.split(" ").at(1);	   

     let fullTimeLocal = DatetimeLocalFullStr.split(" ").at(4);
    
     let fullTimeLocalStr = String(fullTimeLocal);

     let localTimeHour = fullTimeLocalStr.split(":").at(0);
     let localTimeMin = fullTimeLocalStr.split(":").at(1);	   
     
     let ampm ="am";

     if (localTimeHour === 12) {
        ampm = 'pm';
     } else if (localTimeHour === 0) {
        localTimeHour = 12;
     } else if (localTimeHour > 12) {
        localTimeHour -= 12;
        ampm = 'pm';
     }

     let time=String(localTimeHour)+":"+String(localTimeMin)+String(ampm)+", "+String(dayStr)+", "+String(dateStr)+" "+String(month);
     
     return time;

   }

   const currentTime=()=>{
   var now = new Date();

   let timeInfo=String(now);
   //"Sun Jul 24 2022 00:23:04 GMT-0700 (Pacific Daylight Time)";

   //console.log("Now time : ", ttime.split(" ").at(0));
  
     let dayStr=timeInfo.split(" ").at(0);
     let dateStr=timeInfo.split(" ").at(2);
     let month= timeInfo.split(" ").at(1);






   let time=timeInfo.split(" ").at(4);
   let timehour = time.split(":").at(0);
   let timemin = time.split(":").at(1);	
   let ampm;
   if(timehour < 12){
      ampm="am";
     }
     if(timehour > 12){
       timehour=timehour-12;
       ampm="pm"
     }

     let finaltime=String(timehour)+":"+String(timemin)+String(ampm)+", "+String(dayStr)+", "+String(dateStr)+" "+String(month);
     return finaltime;	   
   

   }	

    const listInnerRef = useRef();

    const onScrollHandler=()=>{
      
      if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
           //console.log("reached bottom");
	   props.loadDownHandler();
         }

      if(scrollTop===0){

        //console.log("reached top");
	props.loadUpHandler();      

      } 


     }

   }







return(

<div className={classes.chatScreen}
	onScroll={onScrollHandler}
        ref={listInnerRef}

	>


     <div className={classes.dummyDiv1}>  Bibhuprasad   </div>
     
       {/* props.commentObj !==null && props.commentObj.next !==null &&	
       <button type="button" onClick={props.loadUpHandler}>

	  Load Up

       </button>	
       */}

      {props.commentObj.slice(0).reverse().map((comment,index)=>{


               let datetime=comment.commenttime;

               return <div  key={index} className={classes.comment} >  
		      
		      { comment.commenter === props.currentUser &&
		          <i className={classes.commentText}>
			     <span> {comment.commenttext}</span>
			     <span className={classes.chatTime}> 
			         <span className={classes.timeText}>  {commentTime({datetime})}</span>
			     </span>
			 </i> 
                      }

                      {comment.commenter !== props.currentUser &&

                       <i className={classes.commentText} style={{backgroundColor: 'white', float: 'left',marginLeft: '100px',boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}>

                             <span> {comment.commenttext}</span>
                             <span className={classes.chatTime}>
                                 <span className={classes.timeText}>  {commentTime({datetime})}</span>
                             </span>

		       </i>

                      }

		      </div>

           }

        )}



        { /*props.commentObj !==null && props.commentObj.previous !==null &&
           <button type="button" onClick={props.loadDownHandler}>

                   Load Down

           </button>
        */}











         { messages.map((message,index)=>{


               let allMsg = message.split(" ");
		
	       let userId = allMsg[allMsg.length-2];	

               let fullMsg=allMsg;

               let GroupIdArr = fullMsg.splice(allMsg.length-1, 1);
	       let SenderIdArr = fullMsg.splice(allMsg.length-1, 1);	 

               let GroupId = GroupIdArr[0];
	       let SenderId = SenderIdArr[0]; 

	       //console.log("fullMsg: ", fullMsg)
	       //console.log("SenderId: ", SenderId[0]);
	       //console.log("GroupId: ", GroupId[0]);
	       //let displayMsg1 = allMsg.pop();
	       //let displayMsg2 = allMsg.pop(); 
               //console.log("group Id: ", typeof(GroupId), typeof(props.chatGroup.id));
              

               return <div key={index} className={classes.comment}>   


                     { Number(userId) === props.currentUser && Number(GroupId) === Number(props.chatGroup.id) &&

                          <i className={classes.commentText}>  
			     
                              <span> {fullMsg.join(" ")}</span>
                              <span className={classes.chatTime}>
                                 <span className={classes.timeText}>  {currentTime()}</span>
                              </span>

			  </i>

                     }


                     { Number(userId) !== props.currentUser && Number(GroupId) === Number(props.chatGroup.id) &&

                          <i className={classes.commentText} style={{backgroundColor: 'white', 
					                     float: 'left', 
					                     marginLeft: '100px',
					                     boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}}
				                             >  
				      
                             <span> {fullMsg.join(" ")}</span>
                             <span className={classes.chatTime}>
                                 <span className={classes.timeText}>  {currentTime()}</span>
                             </span>

			   </i>

                     }


		      </div>

           }

        ) 
      } 
   


     <div className={classes.dummyDiv} ref={messagesEndRef}>   </div>	




</div>	
);


}


export default ChatScreen;
