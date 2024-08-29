import React,{useState,useEffect} from 'react'
import classes from './ClassViewShort_v2.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill,BsFillCameraVideoFill, BsLink45Deg, BsThreeDotsVertical} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
//import {FiExternalLink} from 'react-icons/fi';
//import {getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';

import {MdDoubleArrow} from 'react-icons/md';



const ClassViewShort = (props)=>{

   
    
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
    

    //console.log("selected Class: ", props.Class);


    const courseSwitchHandler = ()=>{
      localStorage.setItem('selectedClassId', props.Class.id);     
      props.rerender();
      history.push('/class/detail');	    
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

    /*    
    useEffect(()=>{
       let deepColor='#00AFF0';
       let lessDeep='#9de2fc';
       let lightColor='white';


      if(selectedClass !== null && Number(selectedClass) === props.Class.id){
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


    return()=>{
       

    }


    },[props.Class.id, selectedClass]);
    */







     const deleteCourseHandler=()=>{

       
     }


     const enrollInfoButtonHandler=()=>{}


     //const [enrollRequests,setEnrollRequests] = useState(false);
     //const [enrollStatus, setEnrollStatus] = useState(false);

     let NumToMonth =["N/A","Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]


     const classcardHandler=()=>{

      console.log("class card click");
     }


    const joinClassHandler=()=>{

     console.log("join class handler");
    }


    const viewClassDetailHandler=()=>{


     history.push('/course/classes/1');

    }


     const commentTime=({datetime})=>{

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

  /*
  let datetime=props.Class.datetime;	
 
  let valuesTnD = commentTime({datetime});
  let classTime = valuesTnD[0];
  let classDateMonthYear = valuesTnD[1];	
  */

   


   //console.log("class server DateTime:  ", classTime, classDateMonth);


  const openMeetingRoomHandler=()=>{
      let meetingLink = props.Class.meetingLink;
       window.open(meetingLink, "_blank")

   

  }






     

return (



<div className={classes.courseViewDashboard} onClick={classcardHandler}>
        

        

        
        <div className={classes.titleDiv}>
	   
	    <div className={classes.leftInfo}>
	        
	        <div className={classes.classInfo}>
	          <div className={classes.classData}>
	                      <b>9:30am -10:30am </b>
                              {/*" "+props.Class.classdate.split("-")[2]+" "*/}
                              {/*NumToMonth[Number(props.Class.classdate.split("-")[1])]*/}{" "}
                              {/*props.Class.classdate.split("-")[0]+" "*/}
	                      
              	              {/*" "+props.Class.classtime.split(":")[0]*/}
                              {/*":"*/}
                              {/*props.Class.classtime.split(":")[1]*/}
                              {/*", "}{props.Class.duration}{" mins "*/}
    

	                      {/*classDateMonthYear*/}

	          </div>
	          {/*
	          <div className={classes.classId}> {props.Class.id} </div>
		  */}
	        </div>
	        <div className={classes.topicsTitle}> 
	              <b className={classes.classNum}>#12</b> 
	              <b> Concepts of Classical Physics  </b>
	              <i style={{color:"grey",fontStyle:"normal"}}> >> Newtons Laws of Motion, paralellogram law, action and reaction</i>
	        </div>
		
            </div>
	    <div className={classes.toprightBoxes}>
	       <div className={classes.classStatus}><b>Scheduled </b></div>
	       <button type="button" className={classes.dotsButton}> <BsThreeDotsVertical/> </button>
	    </div>
	</div>

       

        <div className={classes.lowerDiv}>

	   <div className={classes.leftLowerDiv}>
	       
	       <div className={classes.authorDiv}> by Dr. Bibhuprasad  Mahakud</div>
	       <div className={classes.addressDiv}>
	            <span> Address : </span>
	            <span className={classes.classTime}><b>{" "+" Hall No 23, Bld 22"+" "}</b></span>
	            {/*props.Class.roomNo ===""? "N/A ": props.Class.roomNo*/}
	       </div> 
	   </div>
	   <div className={classes.rightLowerDiv}> 
	     <button type="button" className={classes.joinClassButton} onClick={openMeetingRoomHandler}> <b>Join Class</b> </button>
	     <button type="button" className={classes.viewClassButton} onClick={viewClassDetailHandler}> 
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

export default ClassViewShort;
