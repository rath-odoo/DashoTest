import React,{useState,useEffect} from 'react'
import classes from './CourseViewDashboard_v3.module.css';
import {BsFillCheckSquareFill,BsThreeDotsVertical, BsCameraVideoFill, BsFillBasketFill,BsFillXSquareFill} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill,BsXLg} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import {AiOutlineCheck} from 'react-icons/ai';
import {putcourseenroll, getuserbyId, deletedashboardcourses, removecoursefromdashboard} from '../../../../../CommonApps/AllAPICalls';
import coursePic from './coursePic.jpg';
import EnrollForm from './Forms/EnrollForm';
import {GiTeacher} from "react-icons/gi";
import {RiVideoAddFill} from 'react-icons/ri';

import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';


import {MdDoubleArrow} from 'react-icons/md';


import SelectScreen from './SelectScreen';

const CourseViewDashboard = (props)=>{

    let history = useHistory();
    const [style,setStyle]=useState({
          primary:'lightgrey',

          courseNameColor:"black",
          courseNameTextDecoration:"none"

    });

    const [enrollStatus, showEnrollStatus]= useState(false);
    const [enrollRequests,getEnrollRequests]= useState([]);

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

    /*
    useEffect(()=>{

            props.Course.enrolementrequests.forEach((requester,index)=>{

                       if(!props.Course.enrolledstudents.includes(requester)){
                             getEnrollRequests(enrollRequests => [...enrollRequests, requester]);
	               }   

             }
	    )

       return ()=>{
            getEnrollRequests([]);

       }


    },[props.Course.enrolementrequests,props.Course.enrolledstudents]);
    */
   
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


      !props.Course.enrolled && alert("You are not enrolled is this course");

      if(props.Course.enrolled){
      localStorage.setItem('preferredCourseId', props.Course.id);
      //window.location.reload(false);
      props.rerender();
      history.push('/course/summary');
      }	      
    }



    const courseSwitchAndMoveHandler = ()=>{
     //localStorage.setItem('preferredCourseId', props.Course.id);	    	    
     setShowSelectScreen(showSelectScreen=>false);
     localStorage.setItem('preferredCourseId', props.Course.id);
     // moveToSubject();	 
     props.rerender();	    
     history.push('/course/summary');
     

    }



    //selectedCourse !== null && Number(selectedCourse) === props.Course.id &&


    useEffect(()=>{
       let deepColor='#5177bd';//#0498cf';
       let lessDeep='#bbd2fa';
       let lightColor='#e0ebff';//#def3fa';



      if(selectedCourse !== null && Number(selectedCourse) === props.Course.id){
            setStyle(style=>({
		    primary: deepColor, 

	    }));
      };

    if(props.Course.courseStatus==="closed"){
     setStatusBkgColor(statusBkgColor=>'grey');
    }

    return()=>{
       

    }


    },[props.Course.id, selectedCourse, props.Course.courseStatus]);








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



   const changeStyleOnMouseEnterHandler=()=>{

     setStyle( {...style,  courseNameColor:"var(--themeColor)", courseNameTextDecoration:"underline"});

   }


   const changeStyleOnMouseLeaveHandler	=()=>{

   setStyle( {...style,  courseNameColor:"black",courseNameTextDecoration:"none"});

   }

   const [showDropDown, setShowDropDown] = useState(false);

   const showActionToolsHandler=()=>{

      setShowDropDown(showDropDown=>true);


   }


   const removeCourseHandler=()=>{
     let courseId=props.Course.id;
     removecoursefromdashboard({courseId, props});

   }


   const [showEnrollForm, setShowEnrollForm] = useState(false);

   const enrollFormHandler=()=>{
     setShowEnrollForm(true);

   }

   
   const closeEnrollFormHandler=()=>{

     setShowEnrollForm(false);

   }





   //console.log("course::::::::::", props.Course.teacher.username);




return (



<div className={classes.courseViewDashboard}  
	onMouseEnter={changeStyleOnMouseEnterHandler} 
	onMouseLeave={changeStyleOnMouseLeaveHandler}
	>


   {showEnrollForm && <EnrollForm onPress={closeEnrollFormHandler} Course={props.Course} userData={props.userData}/>}

   <div className={classes.innerMarginDiv}>	

      <div className={classes.upperPart}> 
	  <div className={classes.picDiv}>
	     <img src={props.Course.card_cover_image} className={classes.picStyle} />
	  </div>
	  <div className={classes.upperInfoDiv}>

            <div className={classes.courseNameDiv}>
                          <div className={classes.courseNameDiv_left}>   

                           { !props.Course.enrolled && !props.Course.enrollementRequestSent &&
                        <span className={classes.notEnrolledSign}>
                           <BsFillXSquareFill style={{color: 'var(--redColor1)',marginRight:'10px',borderStyle:'none'}}/>
                           <span className={classes.toolTipText}> You are not enrolled in this course </span>
                        </span>
                        }

                        { !props.Course.enrolled && props.Course.enrollementRequestSent &&
                        <span className={classes.notEnrolledSign}>
                           <BsFillCheckSquareFill style={{color: 'orange',marginRight:'10px',borderStyle:'none'}}/>
                           <span className={classes.toolTipText}> You have sent enrollment request. Wait for response </span>
                        </span>
                        }



                        { props.Course.enrolled &&
                         <span className={classes.notEnrolledSign}>
                            <BsFillCheckSquareFill style={{color: 'green',marginRight:'10px',borderStyle:'none'}}/>
                            <span className={classes.toolTipText}> You are enrolled in this course </span>
                         </span>
                        }




                            <button className={classes.courseNameButton}
                                 onClick={courseSwitchHandler}
                               >
                               <b> {props.Course.courseLocalCode !=="N/A" && props.Course.courseLocalCode !==""? props.Course.courseLocalCode+": ":""} 
	                            {props.Course.courseShortName}
	                       </b>
                            </button>

                            <button type="button" className={classes.arrowButton} onClick={courseSwitchHandler}>
                                     <MdDoubleArrow className={classes.goToCourseBtnIcon}/>
                            </button>













                          </div>
                          <div className={classes.dotsButton} >
                            <BsThreeDotsVertical className={classes.verticalDotsIcon} onClick={showActionToolsHandler}/>
                            {
                               showDropDown  &&

				<OutsideAlerter setDropDown={()=>setShowDropDown(false)}>    
				<div className={classes.dropdownButtons}>
                                    { !props.Course.enrolled &&
                                    <button type="button" className={classes.dropdownButton} onClick={enrollFormHandler}> enroll
                                    </button>
                                    }
                                    { props.Course.enrolled &&
                                    <button type="button" className={classes.dropdownButton} > enrolled
                                    </button>
                                    }





                                    <button type="button" className={classes.dropdownButton} 
				                          onClick={removeCourseHandler}> remove
                                    </button>

                                     <button type="button" className={classes.dropdownButton}> 
                                                           archive
                                    </button>


                                </div>

				</OutsideAlerter>    

                            }





                          </div>
 

                </div>


                <div className={classes.lowerPartInfo3}>
	                {props.Course.teacher.usertitle} {props.Course.teacher.firstname} {props.Course.teacher.lastname} 
                </div>


                <div className={classes.InfoDivLowest}>

	            <div className={classes.InfoDivLowest_left}>
                      { !props.Course.enrolled && !props.Course.enrollementRequestSent &&
	                 <button type="button" className={classes.enrolldisplayButton1} onClick={enrollFormHandler}> enroll </button>
                      }
                 
	              { !props.Course.enrolled && props.Course.enrollementRequestSent &&
                         <div  className={classes.enrolldisplayButton2} >
				   <span>   pending  </span>
				   <span  className={classes.requestSentMessage}> You have sent enrollment request. Wait for response </span>

		         </div>
                      }

                      { props.Course.enrolled &&

                        <button type="button" className={classes.enrolldisplayButton3} onClick={courseSwitchHandler}> go to course </button>

		      }






	             <div className={classes.lowerPartInfo2}> 
                        <div className={classes.oneTool}> <RiVideoAddFill/> </div>
                        <div className={classes.oneTool}> <BsCameraVideoFill/> </div>
                        <div className={classes.oneTool}> <BsFillBasketFill/> </div>
                        <div className={classes.oneTool}> <BsFillBasketFill/> </div>
	             </div>
              

	            </div>
                    <div className={classes.InfoDivLowest_right}>
                      <div className={classes.upcomingClassTime}> {props.Course.designedFor} </div>
	              <div className={classes.upcomingClassTime}> {props.Course.enrolled_students.length} Students</div>
                      <div className={classes.courseCode}> {props.Course.courseGlobalCode} </div>
	              <div className={classes.upcomingClassTime}>
                         <GiTeacher/> <span> 9:30 am, Today</span>
                      </div>
	            </div>
                </div>





	  </div>
      </div>     
        
    
      <div className={classes.lowerPart}>
           <div className={classes.lowerPart_left}>
	        <div className={classes.lowerPartTitle}><b>Course Progress</b> </div>
	        <div className={classes.lowerPartInfo1}> 
	             
	             <div className={classes.progressBar}> 
	                  <div className={classes.progressWidth}> </div>
	             </div>
		     
	        </div>
	   </div>

      </div> 


  </div>
  


</div>


);

}

export default CourseViewDashboard;
