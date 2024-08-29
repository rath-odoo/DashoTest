import React,{useState,useEffect} from 'react'
import classes from './MeetingViewShort.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill,BsFillCameraVideoFill, BsLink45Deg} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
//import {FiExternalLink} from 'react-icons/fi';
import {deletemeeting, getuserbyId} from '../../../CommonApps/AllAPICalls';
import EditMeetingForm from './Forms/EditMeetingForm';
import {Route,Switch} from 'react-router-dom';
import SelectScreen from './SelectScreen';




const MeetingViewShort = (props)=>{



   
    
    let history = useHistory();
    const [style,setStyle]=useState({
          primary:'lightgrey',
          secondary:'lightgrey',
	  topBarBottomColor:'lightgrey',  
	  boxBkgColor: 'white', 
	  rightButtonColor: 'var(--themeColor)', 
	  codeColor:'grey', 
	  subjectColor: 'grey', 
	  boxShadow: 'grey 0px 3px 8px',
	  fieldColor: 'grey',
	  fieldValueColor:'grey', 
	  borderColor:'lightgrey'

    });
    //let deepColor='#5177bd';
    //let lessDeep='#bbd2fa';
    //let lightColor='#e0ebff';
    

    //console.log("selected Class: ", props.Class.meetingLink);


    const meetingDetailHandler = ()=>{
      localStorage.setItem('selectedMeetingId', props.Meeting.id);     
      //props.rerender();
      history.push('/meetings/detail');	
      //history.push(`../../dashboard/general/meetings/${props.Meeting.id}`)
    }






    const [selectedClass, setSelectedClass] = useState(localStorage.getItem('selectedClassId'));	

    //const [statusBkgColor, setStatusBkgColor] = useState('#25D366'); 
    
    
    const [showSelectScreen, setShowSelectScreen] = useState(false);

    const moveToSubject=()=>{
    //   if(Number(props.Course.id) === Number(selectedCourse)){      
    //   history.push('/class/detail');
     //  }
      
    //  if(Number(props.Course.id) !== Number(selectedCourse) ){
    

	 //     setShowSelectScreen(true);

     // }	    




    }

    
    const closeSelectScreen=()=>{
       setShowSelectScreen(showSelectScreen=>false);
    }





    

    //const ApproveHandler = (userId)=>{
        //let enrollId = userId;
        //let courseId = props.Course.id;	
        //enrolledstudents.push(enrollId);
        //putcourseenroll({courseId, enrolledstudents});
        //showEnrollStatus(false);
    //}






    const courseSwitchAndMoveHandler = ()=>{
     //localStorage.setItem('preferredCourseId', props.Course.id);	    	    
     //setShowSelectScreen(showSelectScreen=>false);
     //localStorage.setItem('preferredCourseId', props.Course.id);
     // moveToSubject();	 
     props.rerender();	    
     history.push('/class/detail');
     

    }



    //selectedCourse !== null && Number(selectedCourse) === props.Course.id &&

    
    useEffect(()=>{
       let deepColor='#00AFF0';
       let lessDeep='#9de2fc';
       let lightColor='white';


      if(selectedClass !== null && Number(selectedClass) === props.Meeting.id){
            setStyle(style=>({
		    primary: deepColor, 
		    secondary: lightColor,
		    topBarBottomColor:lessDeep,
		    boxBkgColor: lightColor,
		    rightButtonColor: deepColor,
		    codeColor: deepColor,
		    subjectColor: deepColor,
		    boxShadow: `grey 0px 3px 8px`,
		    fieldColor: deepColor,
		    fieldValueColor:deepColor,
		    borderColor:lessDeep

	    }));
      };

    //if(props.Course.courseStatus==="closed"){
    // setStatusBkgColor(statusBkgColor=>'grey');
    //}

    return()=>{
       

    }


    },[props.Meeting.id, selectedClass]);




    const [host, setUserData]= useState({
      usertitle:'',
      firstname:'',
      lastname:''	    
    });

    useEffect(()=>{

     let userId = props.Meeting.creater;	    
     getuserbyId({userId, setUserData});

    },[props.Meeting.creater]);



     const deleteCourseHandler=()=>{
     
         let meetingid = props.Meeting.id;	 
         //console.log("user: ", props.userData.id);
	 //console.log("host: ", props.Meeting.creater);     

       if( Number(props.userData.id) === Number(props.Meeting.creater) ){       	     
          deletemeeting({meetingid});	       
       window.location.reload(false);	
       }else{

          alert("You are not host of the meeting. Only host can delete this.");

       }      

     }


     const enrollInfoButtonHandler=()=>{}


     //const [enrollRequests,setEnrollRequests] = useState(false);
     //const [enrollStatus, setEnrollStatus] = useState(false);

     let NumToMonth =["N/A","Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]



    const joinMeetingHandler=()=>{

       let meetingLink = props.Meeting.meetingLink; 
       window.open(meetingLink, "_blank") 

    }


   const [editMeeting, setEditMeeting]= useState(false);


   const [warningMessageNoEdit, setWarningMessageNoEdit] = useState(false);


    const editMeetingHandler=()=>{
   
     if(Number(props.userData.id) === Number(props.Meeting.creater)){	    
     setEditMeeting(true);
      }else{


      alert("Only hosts have edit rights");

      }


    }


    const closeEditFormHandler=()=>{
     setEditMeeting(false);

    }




     

return (



<div className={classes.courseViewDashboard} 
	style={{borderColor: style.borderColor, backgroundColor:style.boxBkgColor,borderStyle:'none'}} 

	>
        
        { editMeeting && <EditMeetingForm onPress={closeEditFormHandler} userDataUpdated={props.userDataUpdated} meeting={props.Meeting} />}
        
	{  showSelectScreen &&  <SelectScreen onPress={closeSelectScreen} selectNMove={courseSwitchAndMoveHandler}/>}


   
    <div className={classes.infoUnitBarParent}  onClick={moveToSubject} style={{backgroundColor: style.boxBkgColor}}>
       <div className={classes.infoUnitBar} style={{borderColor:style.topBarBottomColor,backgroundColor: style.boxBkgColor}}>

        <div className={classes.subjectSection}> 
	   <span className={classes.serialNo}> {props.Meeting.id} </span>
	   <span className={classes.subjectTitle} style={{color: style.subjectColor}}>  </span>
	   <span className={classes.subjectName} style={{color: style.rightButtonColor}}>  {props.Meeting.name}</span>   
	   {/*<span className={classes.signupIcon}> <BsFillCheckSquareFill/> </span>*/}

	</div>          


	<i className={classes.codeSection} style={{color: style.codeColor}}>
	  STATUS: <span className={classes.courseCode}>
	          { props.Meeting.meetingStatus === "scheduled" &&
	          <b style={{color:"green"}}>
	              {props.Meeting.meetingStatus}
	          </b>
	          }		  
                  { props.Meeting.meetingStatus === "postponed" &&
                  <b style={{color:"blue"}}>
                      {props.Meeting.meetingStatus}
                  </b>
                  }

                  { props.Meeting.meetingStatus === "cancelled" &&
                  <b style={{color:"red"}}>
                      {props.Meeting.meetingStatus}
                  </b>
                  }

	        </span>
	</i>




       </div>
    </div>
    



      <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      <div className={classes.instructor} style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
           <i style={{color:style.fieldValueColor}} className={classes.creditScore}> <b>Host:</b>
              <span className={classes.creditScoreNum}>{host.firstname+" "+host.lastname}</span>
           </i>
      </div>

      <div className={classes.toolIcons}>
         <button className={classes.editButton} onClick={enrollInfoButtonHandler} style={{color: style.rightButtonColor}}>

               { /*enrollRequests.length>0 &&
               <span className={classes.enrolledRequests}><i> {enrollRequests.length} </i></span>
               */}

               <BsPeopleFill />
               <span className={classes.enrolledStuds}><i>{'2'}</i></span>
         </button>

        { /*enrollStatus && <div className={classes.enrollmentInfo}>

        
              { enrollRequests.length>0 &&

                    <>

                      {enrollRequests.map((userId,index)=>{
                           return <div className={classes.singleEnrollRequest} key={index}>
                                <i> New enrollment request from</i>
                                <i> Mr. Depak Samal</i>
                                <div className={classes.ApproveRejectBtn}>
                                  <button onClick={()=>ApproveHandler(userId)}> Approve </button>
                                  <button> Reject </button>
                                </div>
                             </div>
                             })
                      }       
                    </>


              }
         </div>
        */}

       </div>

   </div>











   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor }}>
      <div className={classes.designedFor}  style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        <b>Time:</b>  <i style={{color:style.codeColor,backgroundColor:'white'}}> 
	                   <b>{props.Meeting.meetingtime.split(":")[0]}
	                      {":"}
	                      {props.Meeting.meetingtime.split(":")[1]}  
	                       {", "}{props.Meeting.duration}{" mins "}
	                       |
	                      {" "}
	                      {" "+props.Meeting.meetingdate.split("-")[2]+" "}
	                      {NumToMonth[Number(props.Meeting.meetingdate.split("-")[1])]}{" "}
	                      {props.Meeting.meetingdate.split("-")[0]}
	                   </b>  
	                 </i>
      </div>
       {/*
      <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: style.rightButtonColor}}> <BiEdit/> </button>
       </div>
      */}
   </div>



   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}} >
       <div className={classes.address} style={{backgroundColor:style.boxBkgColor}}>

         <i className={classes.addressTitle} onClick={moveToSubject} > <b>Address:</b> </i> 
         <i className={classes.addressRoom} onClick={moveToSubject} >{"Room No. "} 
	      {props.Meeting.roomNo ===""? "N/A ": props.Meeting.roomNo} 
	 </i>
	 <button className={classes.meetingLinkButton} onClick={joinMeetingHandler}>
	     <span className={classes.joinTxt}><b>Join Meeting</b> </span><BsFillCameraVideoFill/>
	 </button>

	 <button className={classes.meetingLinkCopy} onClick={() => {navigator.clipboard.writeText(props.Meeting.meetingLink)}}>
             <span className={classes.joinTxt}><b>Copy</b> </span><BsLink45Deg/>
         </button>

	 <span className={classes.emptyDiv} onClick={moveToSubject}>  </span>
	         
       </div>

   </div>









   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
      <div className={classes.upcomingClass}  style={{backgroundColor:style.boxBkgColor}}>
        <i className={classes.chapterTopic}> 
	   <b>About: </b>  <span className={classes.topicText}> 

	        { /*props.Class.chapter !==null? props.Class.chapter.name:"N/A"*/}  {props.Meeting.about}  
	    </span> 
	</i>
      </div>


   </div>	



   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      {  selectedClass === null && <button className={classes.switchTo} onClick={meetingDetailHandler}>
           Meeting detail
         </button>
      }

      { selectedClass !== null && Number(selectedClass) !== props.Meeting.id &&
        <button className={classes.switchTo} onClick={meetingDetailHandler}>
           Meeting detail
        </button>
      }


      { selectedClass !== null && Number(selectedClass) === props.Meeting.id &&
        <button className={classes.switchTo} onClick={meetingDetailHandler} style={{color: '#ff5349',backgroundColor:'#ffd4d1'}}>
           Meeting detail
        </button>
      }




      {/*
      <div className={classes.viewDetail} style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        <i> <b>View Detail</b></i>
      </div>
      */}



      <div className={classes.toolIcons}>

         <button className={classes.editButtonEd} style={{color: style.rightButtonColor}} onClick={editMeetingHandler}> <BiEdit/> </button>

         <button className={classes.editButton} style={{color: style.rightButtonColor}} onClick={deleteCourseHandler}> 
	    <BsFillTrashFill/> 
	 </button>
       </div>

   </div>











</div>


);

}

export default MeetingViewShort;
