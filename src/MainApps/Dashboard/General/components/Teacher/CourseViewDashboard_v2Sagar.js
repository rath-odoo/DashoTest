import React,{useState,useEffect, memo} from 'react'
import classes from './CourseViewDashboard_v2.module.css';
import {BsFillCheckSquareFill,BsThreeDotsVertical, 
	BsCameraVideoFill,BsFillBasketFill, BsPersonPlusFill, 
	BsUiChecksGrid,BsCurrencyDollar} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill} from 'react-icons/bs';
import {BiEdit, BiVideoPlus} from 'react-icons/bi';
import {putcourseenroll, getuserbyId, deletedashboardcourses,deleteacourse} from '../../../../../CommonApps/AllAPICalls';
import {RiVideoAddFill} from 'react-icons/ri';
import coursePic from './coursePic.jpg';
import {MdDoubleArrow} from 'react-icons/md';
import SelectScreen from './SelectScreen';
//import { useMediaPredicate } from "react-media-hook";
import {GiTeacher} from "react-icons/gi";
import CourseCardDropDown from './CourseCardDropDown';
import CourseEditForm from './Forms/CourseEditForm';
import CardImageUploadForm from './Forms/CourseImageUploadForm';
import {BsCamera} from 'react-icons/bs';
import {RiVideoAddLine} from 'react-icons/ri';
import EnrollForm from './Forms/EnrollForm';


const CourseViewDashboard = (props)=>{

    console.log("course card rerendering");

    //const smallerThan1400px = useMediaPredicate("(max-width: 1400px )");

    let history = useHistory();

    let selectedCourse = localStorage.getItem('preferredCourseId');

    const [statusBkgColor, setStatusBkgColor] = useState('#25D366'); 
   

    let enrolledstudents = props.Course.enrolled_students;
 

    const ApproveHandler = (userId)=>{
        let enrollId = userId;
        let courseId = props.Course.id;	
       // enrolledstudents.push(enrollId);
       // putcourseenroll({courseId, enrolledstudents});
    }


    const courseSwitchHandler = ()=>{

      localStorage.setItem('preferredCourseId', props.Course.id);
      //window.location.reload(false);
      props.rerender();
      history.push('/course/summary');	    
    }



    const courseSwitchAndMoveHandler = ()=>{
     //localStorage.setItem('preferredCourseId', props.Course.id);	    	    
     //setShowSelectScreen(showSelectScreen=>false);
     localStorage.setItem('preferredCourseId', props.Course.id);
     props.rerender();	    
     history.push('/course/summary');
     

    }



    const deleteCourseHandler=()=>{
	console.log("delete handler recreated");    
       alert("Are you sure you want to delete the course?");
       let courseId = props.Course.id;
       deleteacourse({courseId, props});
    }





   const [showDropDown, setShowDropDown] = useState(false);

   const showActionToolsHandler=()=>{
     setShowDropDown(true);
   }


    const [showCourseEditForm, setShowCourseEditForm] = useState(false);


    const [showCourseCardImageUploadForm, setShowCourseCardImageUploadForm] = useState(false); 


    const showCourseEditFormHandler=()=>{     	    
       setShowCourseEditForm(showCourseEditForm=>true);
       setShowDropDown(showDropDown=>false);
       //console.log("oho baby");	    
    }


    //console.log("showDropDown: ", showDropDown);
   
    const closeCourseEditForm=()=>{       
       setShowCourseEditForm(false);
       props.rerender();
    }


    const showCourseCardImageUploadFormHandler=()=>{
       setShowCourseCardImageUploadForm(true); 
    }


    let styleTeaching = {color:"var(--themeColor)", borderStyle:"solid",borderWidth:"1px",borderRadius:"5px"}
    let styleStudying = {color:"black",borderStyle:"solid",borderWidth:"1px",borderRadius:"5px"}

    let styleGen = ( props.Course.association === "Teaching" ? styleTeaching: styleStudying );


    const [showEnrollForm, setShowEnrollForm] = useState(false);

    const enrollFormHandler=()=>{
       setShowEnrollForm(true);
    }

    const closeEnrollFormHandler=()=>{
       setShowEnrollForm(false);
    }




return (



<div className={classes.courseViewDashboard}  
	>

  
   <div className={classes.innerMarginDiv}>	

      <div className={classes.upperPart}> 
	  <div className={classes.picDiv}>

             { showCourseCardImageUploadForm && <CardImageUploadForm  onPress={()=>setShowCourseCardImageUploadForm(false)}
		                                                      Course={props.Course}
		                                                      rerender={props.rerender}
		                                />

	     }


             {showEnrollForm && <EnrollForm onPress={closeEnrollFormHandler} Course={props.Course} userData={props.userData}/>}


	     <img src={props.Course.card_cover_image} className={classes.picStyle} />

	     {/*props.Course.teachers.some(item => item.id === props.userData.id)*/}
	     { props.Course.creater !== null && (props.Course.creater.id === props.userData.id) && 
	         <button type="button" className={classes.uploadCourseImageButton} onClick={showCourseCardImageUploadFormHandler}>
	            <BsCamera/> 
	         </button>
	     }
	  </div>
	  <div className={classes.upperInfoDiv}>

            <div className={classes.courseNameDiv}>
                          <div className={classes.courseNameDiv_left}>                
                            <button className={classes.courseNameButton}
                                 onClick={courseSwitchHandler}
                               >
                               <b>{props.Course.courseLocalCode !=="N/A" && props.Course.courseLocalCode !==""? props.Course.courseLocalCode+": ":""} 
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

                                      <CourseCardDropDown setDropDown={setShowDropDown}
                                                     deleteCourseHandler={deleteCourseHandler}
                                                     showCourseEditFormHandler={showCourseEditFormHandler}
				                     userData={props.userData}
				                     Course ={props.Course}
				                     rerender={props.rerender}
                                                     />
                            }



                            {  showCourseEditForm &&
                                      <CourseEditForm onPress={closeCourseEditForm}
                                                            Course={props.Course}
                                                            userData={props.userData}
                                            />

                            }


                          </div>
 

                </div>


                <div className={classes.lowerPartInfo3}>
                  
	           { props.Course.teachers !== null && props.Course.teachers.map( (teacher, index)=>{

			   return <span key={index}> {teacher.firstname !=="" ? teacher.firstname+" "+teacher.lastname : teacher.username}{","}  </span>


		          }
		     )
		   }


                </div>


                <div className={classes.InfoDivLowest}>

	            <div className={classes.InfoDivLowest_left}>
                       { props.Course.association !=="N/A" &&
                       <button type="button" className={classes.courseGoToButton} onClick={courseSwitchHandler}>    
                            go to course
                       </button>
                       }

	               { props.Course.association ==="N/A" && !props.Course.enrolled && !props.Course.enrollementRequestSent &&

                             <button type="button" className={classes.courseGoToButton2} onClick={enrollFormHandler} style={{background:"var(--redColor1)"}}>
                                 enroll
                             </button>

		       }
                      

                       { props.Course.association ==="N/A" && !props.Course.enrolled && props.Course.enrollementRequestSent &&

                             <button type="button" className={classes.courseGoToButton2} onClick={courseSwitchHandler} style={{background:"orange"}}>
                                 pending
                             </button>

                       }




                      {/*
      	               <div className={classes.lowerPartInfo2}> 
                           <div className={classes.oneTool}> <RiVideoAddFill/> </div>
                           <div className={classes.oneTool}> <BsPersonPlusFill/> </div>
                           <div className={classes.oneTool}> <BsUiChecksGrid/> </div>
                           <div className={classes.oneTool}> <BsCurrencyDollar/> </div>
	               </div>
                      */}
	            </div>

                    <div className={classes.InfoDivLowest_right}>
	              <div className={classes.courseAssociation} style={styleGen}> <b>{props.Course.association}</b> </div>
                      <div className={classes.upcomingClassTime}> {props.Course.designedFor} </div>
	              <div className={classes.upcomingClassTime}> {props.Course.enrolled_students.length} Students</div>
                      <div className={classes.courseCode}> {props.Course.courseGlobalCode} </div>
	              {/*
	              <div className={classes.upcomingClassTime}>
                         <GiTeacher/> <span> 9:30 am, Today</span>
                      </div>
		      */}
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

export default memo(CourseViewDashboard);
