import React,{useState,useEffect} from 'react'
import classes from './ClassViewShort.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill,BsFillCameraVideoFill, BsLink45Deg} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
//import {FiExternalLink} from 'react-icons/fi';
//import {getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';


import SelectScreen from './SelectScreen';

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

    //if(props.Course.courseStatus==="closed"){
    // setStatusBkgColor(statusBkgColor=>'grey');
    //}

    return()=>{
       

    }


    },[props.Class.id, selectedClass]);




    //const [userData, setUserData]= useState({
      //usertitle:'',
      //firstname:'',
      //lastname:''	    
    //});

    useEffect(()=>{

     //let userId = props.selectedCourse[0].teacher;	    
     //getuserbyId({userId, setUserData});

    },[]);



     const deleteCourseHandler=()=>{

       
     }


     const enrollInfoButtonHandler=()=>{}


     //const [enrollRequests,setEnrollRequests] = useState(false);
     //const [enrollStatus, setEnrollStatus] = useState(false);

     let NumToMonth =["N/A","Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]


     

return (



<div className={classes.courseViewDashboard} 
	style={{borderColor: style.borderColor, backgroundColor:style.boxBkgColor,borderStyle:'none'}} 

	>
        

        
	{  showSelectScreen &&  <SelectScreen onPress={closeSelectScreen} selectNMove={courseSwitchAndMoveHandler}/>}


   
   <div className={classes.infoUnitBarParent}  onClick={moveToSubject} style={{backgroundColor: style.boxBkgColor}}>
       <div className={classes.infoUnitBar} style={{borderColor:style.topBarBottomColor,backgroundColor: style.boxBkgColor}}>

        <div className={classes.subjectSection}> 
	   <div className={classes.serialNo}> 7th Oct 2022</div>
	   {/*
	   <span className={classes.subjectTitle} style={{color: style.subjectColor}}> CLASS ID: </span>
	   <span className={classes.subjectName} style={{color: style.rightButtonColor}}>{props.Class.id}</span>   
           <span className={classes.signupIcon}> <BsFillCheckSquareFill/> </span>
           */}
	</div>          


	<i className={classes.codeSection} style={{color: style.codeColor}}>
	  STATUS: <span className={classes.courseCode}>
	          <b style={{color:"green"}}>
	              {props.Class.classStatus}
	          </b>
	        </span>
	</i>




      </div>
   </div>
    



   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor }}>
      <div className={classes.designedFor}  style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        TIME : <i style={{color:style.codeColor,backgroundColor:'white'}}> 
	                   <b>{props.Class.classtime.split(":")[0]}
	                      {":"}
	                      {props.Class.classtime.split(":")[1]}  
	                       {", "}{props.Class.duration}{" mins "}
	                       |
	                      {" "}
	                      {" "+props.Class.classdate.split("-")[2]+" "}
	                      {NumToMonth[Number(props.Class.classdate.split("-")[1])]}{" "}
	                      {props.Class.classdate.split("-")[0]}
	                   </b>  
	                 </i>
      </div>

      <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: style.rightButtonColor}}> <BiEdit/> </button>
       </div>

   </div>



   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}} >
       <div className={classes.address} style={{backgroundColor:style.boxBkgColor}}>

         <i className={classes.addressTitle} onClick={moveToSubject} > ADDRESS: </i> 
         <i className={classes.addressRoom} onClick={moveToSubject} >{"Room No. "} 
	      {props.Class.roomNo ===""? "N/A ": props.Class.roomNo} 
	 </i>
	 <button className={classes.meetingLinkButton}>
	     <span className={classes.joinTxt}><b>Join</b> </span><BsFillCameraVideoFill/>
	 </button>

	 <button className={classes.meetingLinkCopy}>
             <span className={classes.joinTxt}><b>Copy</b> </span><BsLink45Deg/>
         </button>

	 <span className={classes.emptyDiv} onClick={moveToSubject}>  </span>
	         
       </div>

   </div>





   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      <div className={classes.instructor} style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
           <i style={{color:style.fieldValueColor}} className={classes.creditScore}> CLASS CREDIT SCORE: 
	      <span className={classes.creditScoreNum}>60%</span>
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

   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
      <div className={classes.upcomingClass}  style={{backgroundColor:style.boxBkgColor}}>
        <i className={classes.chapterTopic}> 
	   CHAPTER & TOPICS: <span className={classes.topicText}> 
	       <b> { props.Class.chapter !==null? props.Class.chapter.name:"N/A"}:</b> Need for measurement: Units of measurement, systems of units, SI units 
	    </span> 
	</i>
      </div>


   </div>	



   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      {  selectedClass === null && <button className={classes.switchTo} onClick={courseSwitchHandler}>
           Go to Class 
         </button>
      }

      { selectedClass !== null && Number(selectedClass) !== props.Class.id &&
        <button className={classes.switchTo} onClick={courseSwitchHandler}>
           Go to Class
        </button>
      }


      { selectedClass !== null && Number(selectedClass) === props.Class.id &&
        <button className={classes.switchTo} onClick={courseSwitchHandler} style={{color: '#ff5349',backgroundColor:'#ffd4d1'}}>
           Selected
        </button>
      }





      <div className={classes.viewDetail} style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        <i> <b>View Detail</b></i>
      </div>




      <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: style.rightButtonColor}} onClick={deleteCourseHandler}> 
	    <BsFillTrashFill/> 
	 </button>
       </div>

   </div>




</div>


);

}

export default ClassViewShort;
