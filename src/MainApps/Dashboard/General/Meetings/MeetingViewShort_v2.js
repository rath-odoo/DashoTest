import React,{useState,useEffect} from 'react'
import classes from './MeetingViewShort_v2.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill,BsFillCameraVideoFill, BsLink45Deg, BsThreeDotsVertical} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
//import {FiExternalLink} from 'react-icons/fi';
import {deletemeeting, getuserbyId} from '../../../../CommonApps/AllAPICalls';
import EditMeetingForm from './Forms/EditMeetingForm_v1';
import {MdDoubleArrow} from 'react-icons/md';
import MeetingShortViewDropDown from './MeetingShortViewDropDown';


const formatLocalTime = ({datetime}) => {

    //const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);        


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
    return `${formattedTime}`;
  };



const MeetingViewShort = (props)=>{

   
    

   const [editMeeting, setEditMeeting]= useState(false);
   const openMeetingRoomHandler=()=>{

      let meetingLink = props.Meeting.meetingLink;
      window.open(meetingLink, "_blank")

   }
   const viewMeetingDetailHandler=()=>{
      let meetingId=props.Meeting.id;
      props.goToMeetingDetail({meetingId});
   }

   const meetingCardHandler=()=>{


   }
  
   const local_Time=({datetime})=>{

        let DatetimeLocalFull = new Date(datetime);

        let DatetimeLocalFullStr= String(DatetimeLocalFull);

        let dayStr=DatetimeLocalFullStr.split(" ").at(0);
        let dateStr=DatetimeLocalFullStr.split(" ").at(2);
        let month= DatetimeLocalFullStr.split(" ").at(1);

        let year=DatetimeLocalFullStr.split(" ").at(3);

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
	
        let DateMonth=String(dateStr)+" "+String(month)+" "+year;

        let dayName=String(dayStr);

        let time=String(localTimeHour)+":"+String(localTimeMin)+String(ampm);

        return [time, DateMonth];

    }	   

     let datetime=props.Meeting.datetime;
     let valuesTnD = local_Time({datetime});
     let classTime = valuesTnD[0];
     let classDateMonthYear = valuesTnD[1];


    const [host, setUserData]= useState({
        usertitle:'',
        firstname:'',
        lastname:''
    });

    useEffect(()=>{

       console.log("useEffect meeting short");    
       let userId = 1;//props.Meeting.creater;
       getuserbyId({userId, setUserData});

    },[]);



    console.log("meeting host: ", host);

     const [showDropDownButtons, setShowDropDownButtons] = useState(false);

     const showDropDownButtonsHandler=()=>{     
        setShowDropDownButtons(showDropDownButtons=>true); 
     }


     const closeEditFormHandler=()=>{
       setEditMeeting(false);
       props.rerender();
     }


     const editMeetingHandler=()=>{

        if(Number(props.userData.id) === Number(props.Meeting.creater)){
            setEditMeeting(true);
            }else{
            alert("Only hosts have edit rights");
            }
     }


    console.log("One meeting detail dashboard: ", props.Meeting);


     

return (



<div className={classes.courseViewDashboard} onClick={meetingCardHandler}>
        

    { editMeeting && <EditMeetingForm onPress = {closeEditFormHandler} 
	                              userData = {props.userData} 
	                              oneMeeting = {props.Meeting} />}




        
        <div className={classes.titleDiv}>
	   
	    <div className={classes.leftInfo}>
	        	         
                <div className={classes.classInfo}>
                           <div className={classes.classData}>
                                 <b> {classDateMonthYear}</b>
                           </div>
                </div>
		  
	        <div className={classes.topicsTitle}> 
	           <span className={classes.classNum}> <b>{"# "+props.Meeting.id}</b> {props.Meeting.name}</span>
	        </div>
		
            </div>
	    <div className={classes.toprightBoxes}>
	       <div className={classes.classStatus}>
                     { props.Meeting.meetingStatus === "scheduled" &&
                        <span style={{color:"var(--themeColor)"}}>
                        {props.Meeting.meetingStatus}
                       </span>
                     }
                     { props.Meeting.meetingStatus === "postponed" &&
                        <span style={{color:"blue"}}>
                        {props.Meeting.meetingStatus}
                       </span>
                     }

                     { props.Meeting.meetingStatus === "cancelled" &&
                        <span style={{color:"red"}}>
                        {props.Meeting.meetingStatus}
                        </span>
                     }

                     { props.Meeting.meetingStatus === "completed" &&
                        <span style={{color:"green"}}>
                        {props.Meeting.meetingStatus}
                        </span>
                     }






	       </div>
	       <button type="button" className={classes.dotsButton} onClick={showDropDownButtonsHandler}> <BsThreeDotsVertical/> </button>

                { showDropDownButtons &&
			<MeetingShortViewDropDown setDropDown={setShowDropDownButtons}
			                          editMeetingHandler={editMeetingHandler}
			                          Meeting={props.Meeting}
			                          rerender={props.rerender}
			                          />

                }


	    </div>
	</div>

       

        <div className={classes.lowerDiv}>

	   <div className={classes.leftLowerDiv}>
	       
	       <div className={classes.authorDiv}> Host:  { host.firstname+" "+host.lastname}</div>
	       <div className={classes.addressDiv}>
	            <span>Time & Address : </span>
	            <span className={classes.classTime}> <b> {formatLocalTime({datetime}) }</b> 
	                 <i style={{color:"grey",fontStyle:"normal"}}>{(props.Meeting.address=="" || props.Meeting.address==null)? ", N/A":", "+props.Meeting.address}</i>
	            </span>
	            {/*props.Class.roomNo ===""? "N/A ": props.Class.roomNo*/}
	       </div> 
	   </div>
	   <div className={classes.rightLowerDiv}> 
	     <button type="button" className={classes.joinClassButton} onClick={openMeetingRoomHandler}> <b>Join Meeting</b> </button>
	     <button type="button" className={classes.viewClassButton} onClick={viewMeetingDetailHandler}> 
                    <span>View Detail</span> 
                    <MdDoubleArrow className={classes.viewdetailIcon}/> 
             </button>

	   </div>
  
	</div>

        {/*
        <div className={classes.middleDiv}> 
	  <div className={classes.authorDiv}> by: Dr. Bibhuprasad Kuumaram Mahakud</div>
	  <div className={classes.redirButtons}>
	       
              <button type="button" className={classes.joinClassButton}>Join Class </button>
              <button type="button" className={classes.viewClassButton}> 
	            <span>View Detail</span> 
	            <MdDoubleArrow className={classes.viewdetailIcon}/> 
	      </button>
	      
	  </div>
	</div>
        
        <div className={classes.addressDiv}>Address: Room 23, H Section </div>
        */}
    

</div>


);

}

export default MeetingViewShort;
