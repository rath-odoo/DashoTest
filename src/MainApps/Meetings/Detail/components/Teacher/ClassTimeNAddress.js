import React,{useState} from 'react';
import classes from './ClassTimeNAddress.module.css';
import {BiEdit} from 'react-icons/bi';
import {BsLink45Deg,BsFillCameraVideoFill} from 'react-icons/bs';

import EditMeetingForm from './Forms/EditMeetingForm'


const formatLocalDateTime = ({ datetime }) => {
  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utcDate = new Date(datetime);
  const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
  const formattedDate = localDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = localDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return `${formattedDate} at  ${formattedTime}`;
};









const InstituteBar=(props)=>{


   const [showEditForm, setShowEditForm] =useState(false);

   const [linkCopied, setLinkCopied]=useState(false);
   const delay = ms => new Promise(res => setTimeout(res, ms));

    const copyMeetingLinkToClipBoardHandler=async()=>{

        navigator.clipboard.writeText(props.selectedMeeting.meetingLink);
        setLinkCopied(true);
        await delay(3000);
        setLinkCopied(false);

  }




   const showEditFormHandler=()=>{

     //setShowEditForm(true);

    //console.log("host: ",props.selectedMeeting.creater.id);
    //console.log("current user: ", props.userData.id);
    if(props.selectedMeeting !==null && props.userData.id !==null){

      if(Number(props.selectedMeeting.creater.id) === Number(props.userData.id) ){

      setShowEditForm(true);

      }else{
       alert("Only hosts can edit meetings");
      }

    }
   }


   const closeTimeNAddressEditForm=()=>{
   setShowEditForm(false);   
   props.rerender();
   }





   const joinMeetingHandler=()=>{

     //window.open("https://meet.google.com/pfq-vkvp-zeq", "_blank")

       let meetingLink = props.selectedMeeting.meetingLink;
       window.open(meetingLink, "_blank")


    }

  let NumToMonth =["N/A","Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]

   let datetime = props.selectedMeeting.datetime;




return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> <span>TIME AND ADDRESS :</span> 
    
	{/*
	<button className={classes.editButton} onClick={showEditFormHandler}> 
	     <BiEdit className={classes.editIcon}/>
	</button>
	*/}
   </i>


    { showEditForm &&  <EditMeetingForm onPress={closeTimeNAddressEditForm} meeting={props.selectedMeeting}/>}


    <div className={classes.timeAndAddressInfo}>

               <i style={{color:"Grey",backgroundColor:'white',marginLeft:"30px"}}>

	          {formatLocalDateTime({datetime})}

               </i>


	       <i style={{color:"grey",backgroundColor:'white',marginLeft:"30px",marginTop:"10px"}}>

                	{props.selectedMeeting.address}
               </i>



        <i className={classes.meetingLinki} style={{marginLeft:"30px", color: "grey" , marginBottom:"10px"}}>Meeting Link : 

           { !linkCopied &&
          <button className={classes.copyLinkBtn} type="button" onClick={copyMeetingLinkToClipBoardHandler}>
            <BsLink45Deg />
            <div className={classes.copyText}>Copy</div>
          </button>
          }

          { linkCopied &&
          <button className={classes.copyLinkBtn} type="button">
            <BsLink45Deg />
            <div className={classes.copyText}>Copied</div>
          </button>
          }




       </i> 

        <button className={classes.meetingLinkButton}  onClick={joinMeetingHandler}>
           {props.selectedMeeting.meetingLink}
        </button>


       <i className={classes.aboutBlock}><span>ABOUT:</span>
         <span style={{marginLeft:"10px"}}> {props.selectedMeeting.about} </span> 
       </i>






     <button className={classes.goLiveButton} onClick={joinMeetingHandler}> 
	<h2> Join Meeting</h2>
     </button>

   </div>

</div>

);

}

export default InstituteBar;
