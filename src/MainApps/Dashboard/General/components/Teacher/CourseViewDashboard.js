import React,{useState,useEffect} from 'react'
import classes from './CourseViewDashboard.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import {putcourseenroll, getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';

import SelectScreen from './SelectScreen';

const CourseViewDashboard = (props)=>{

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
	  fieldValueColor:'var(--themeColor)',  

    });
    //let deepColor='#5177bd';//#0498cf';
    //let lessDeep='#bbd2fa';
    //let lightColor='#e0ebff';//#def3fa';

    const [enrollStatus, showEnrollStatus]= useState(false);
    const [enrollRequests,getEnrollRequests]= useState([]);
    //const [data,setData]=useState({});
    //const [selectedCourse, setSelectedCourse] = useState(localStorage.getItem('preferredCourseId'));	

    let selectedCourse = localStorage.getItem('preferredCourseId');

    const [statusBkgColor, setStatusBkgColor] = useState('#25D366'); 
   

    const [showSelectScreen, setShowSelectScreen] = useState(false);

    const moveToSubject=()=>{
 
       if(Number(props.Course.id) === Number(selectedCourse)){      
       history.push('/dashboard/subject');
       }
      
      if(Number(props.Course.id) !== Number(selectedCourse) ){
    

	      setShowSelectScreen(true);

      }	    


    }


    const closeSelectScreen=()=>{
    //console.log("clsoe called");
    setShowSelectScreen(showSelectScreen=>false);
    }





    const enrollInfoButtonHandler =()=>{
        showEnrollStatus(true);
    }


    useEffect(()=>{

            props.Course.enrolementrequests.forEach((requester,index)=>{

                       if(!props.Course.enrolled_students.includes(requester)){
                             getEnrollRequests(enrollRequests => [...enrollRequests, requester]);
	               }   

             }
	    )

       return ()=>{
            getEnrollRequests([]);

       }


    },[props.Course.enrolementrequests,props.Course.enrolled_students]);


    //const [enrolledstudents,setEnrolledstudents] = useState(props.Course.enrolledstudents);

    let enrolledstudents = props.Course.enrolled_students;
 

    const ApproveHandler = (userId)=>{
        let enrollId = userId;
        let courseId = props.Course.id;	
        enrolledstudents.push(enrollId);
        putcourseenroll({courseId, enrolledstudents});
        showEnrollStatus(false);
    }





    const courseSwitchHandler = ()=>{

      localStorage.setItem('preferredCourseId', props.Course.id);
      //window.location.reload(false);
      props.rerender();
      history.push('/dashboard/subject');	    
    }



    const courseSwitchAndMoveHandler = ()=>{
     //localStorage.setItem('preferredCourseId', props.Course.id);	    	    
     setShowSelectScreen(showSelectScreen=>false);
     localStorage.setItem('preferredCourseId', props.Course.id);
     // moveToSubject();	 
     props.rerender();	    
     history.push('/dashboard/subject');
     

    }



    //selectedCourse !== null && Number(selectedCourse) === props.Course.id &&


    useEffect(()=>{
       let deepColor='#5177bd';//#0498cf';
       let lessDeep='#bbd2fa';
       let lightColor='#e0ebff';//#def3fa';



      if(selectedCourse !== null && Number(selectedCourse) === props.Course.id){
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

	    }));
      };

    if(props.Course.courseStatus==="closed"){
     setStatusBkgColor(statusBkgColor=>'grey');
    }

    return()=>{
       

    }


    },[props.Course.id, selectedCourse, props.Course.courseStatus]);

    const [userData, setUserData]= useState({
     usertitle:'',
     firstname:'',
     lastname:''	    
    });

    useEffect(()=>{

     let userId = props.Course.teacher;	    
     getuserbyId({userId, setUserData});

    },[props.Course.teacher]);







  /*const MouseEnterHandler =()=>{

  }

  const MouseLeaveHandler =()=>{

  }
  */

  const deleteCourseHandler=()=>{


     alert("Are you sure you want to delete the course?");

     let dashboardcourses = props.userData.dashboardcourses;
     //console.log("userDta ", props.userData);
     //console.log("dashboardcourses: ", dashboardcourses);
      if(dashboardcourses.indexOf(props.Course.id) > -1){
          let eleIndex=dashboardcourses.indexOf(props.Course.id);	
          dashboardcourses.splice(eleIndex, 1);
	  deletedashboardcourses({dashboardcourses});
	  //console.log("Delete Course");    
	  props.rerender();    
      }
       
 }






return (



<div className={classes.courseViewDashboard} 
	style={{borderColor: style.secondary, backgroundColor:style.boxBkgColor}} 

	>


        
         {/* if course is not selected, first select and then move to detail*/}
	{  showSelectScreen &&  <SelectScreen onPress={closeSelectScreen} selectNMove={courseSwitchAndMoveHandler}/>}


   
   <div className={classes.infoUnitBarParent}  onClick={moveToSubject} style={{backgroundColor: style.boxBkgColor}}>
       <div className={classes.infoUnitBar} style={{borderColor:style.topBarBottomColor,backgroundColor: style.boxBkgColor}}>

        <div className={classes.subjectSection}> 
	   <span className={classes.bulletBar}> {props.Course.courseGlobalCode} </span>
	   {/*<span className={classes.subjectTitle} style={{color: style.subjectColor}}>  </span>*/}
	   <span className={classes.subjectName} style={{color: style.rightButtonColor}}>{props.Course.courseShortName}</span>   

	</div>          

       {/*
	<i className={classes.codeSection} style={{color: style.codeColor}}>
	  CODE: <span className={classes.courseCode}>
	         {props.Course.courseLocalCode} (<b>{props.Course.courseGlobalCode}</b>)
	        </span>
	</i>
       */}



      </div>
   </div>
    




      <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      <div className={classes.instructor} style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        <span className={classes.leftTitle}> Instructor: </span>
          <i style={{color:style.fieldValueColor, borderStyle: 'none'}}>{userData.usertitle} {userData.firstname} {userData.lastname}</i>
      </div>

      <div className={classes.toolIcons}>
         <button className={classes.editButton} onClick={enrollInfoButtonHandler} style={{color: "grey"}}>

               { enrollRequests.length>0 &&
               <span className={classes.enrolledRequests}><i> {enrollRequests.length} </i></span>
               }
          
               <BsPeopleFill /> 
               <span className={classes.enrolledStuds}><i>{props.Course.enrolled_students.length}</i></span> 
         </button>

        { enrollStatus && <div className={classes.enrollmentInfo}>

        
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
        }
       </div>

   </div>






   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor }}>
      <div className={classes.designedFor}  style={{backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
        <span className={classes.leftTitle}> Designed for: </span> 
	      <i style={{color:style.codeColor,backgroundColor:'white',borderStyle:"none" }}> {props.Course.designedFor}</i> 
      </div>
       {/*
       <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: style.rightButtonColor}}> <BiEdit/> </button>
       </div>
       */}
   </div>


  
   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
       <div className={classes.status} style={{backgroundColor:style.boxBkgColor}}>
           <span className={classes.leftTitle}> Status:</span> 
	    <i style={{backgroundColor: statusBkgColor}}> {props.Course.courseStatus}</i>
       </div>


   </div>	






   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor}} onClick={moveToSubject}>
      <div className={classes.upcomingClass}  style={{backgroundColor:style.boxBkgColor}}>
         <span className={classes.leftTitle}> Upcoming Class:</span> 
	    <i style={{color:style.codeColor}}> 9:45 am |  27/02/2022</i>
      </div>


   </div>	



   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      {  selectedCourse === null && <button className={classes.switchTo} onClick={courseSwitchHandler}>
           Go To Course 
         </button>
      }

      { selectedCourse !== null && Number(selectedCourse) !== props.Course.id &&
        <button className={classes.switchTo} onClick={courseSwitchHandler}>
           Go To Course
        </button>
      }


      { selectedCourse !== null && Number(selectedCourse) === props.Course.id &&
        <button className={classes.switchTo} onClick={courseSwitchHandler} style={{color: '#ff5349',backgroundColor:'#ffd4d1'}}>
           Selected
        </button>
      }






     <span style={{display:"flex",borderStyle:"none"}}>
       <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: "grey"}}> 
	    <BiEdit style={{fontSize:"25px"}}/> 
	 </button>
       </div>





       <div className={classes.toolIcons}>
         <button className={classes.editButton} style={{color: "grey"}} onClick={deleteCourseHandler}> 
	    <BsFillTrashFill style={{fontSize:"22px"}}/> 
	 </button>
       </div>
     </span>


   </div>








</div>


);

}

export default CourseViewDashboard;
