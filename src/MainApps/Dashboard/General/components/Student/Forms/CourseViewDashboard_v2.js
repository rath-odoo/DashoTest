import React,{useState,useEffect} from 'react'
import classes from './CourseViewDashboard_v2.module.css';
import {BsFillCheckSquareFill,BsThreeDotsVertical} from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill, BsCheckLg} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import {putcourseenroll, getuserbyId, deletedashboardcourses, addcoursetodashboard, checkcourseexistsindashboard} from '../../../../../../CommonApps/AllAPICalls';
import {MdDoubleArrow} from 'react-icons/md';
import SelectScreen from './SelectScreen';





const CourseViewDashboard = (props)=>{

    let history = useHistory();
    const [style,setStyle]=useState({
          primary:'lightgrey',
          courseNameColor:"black",
          courseNameTextDecoration:"none"

    });


    let enrolledstudents = props.Course.enrolled_students;

    const addCourseHandler=(e)=>{
         e.preventDefault();
	 let courseId = props.Course.id;   
         addcoursetodashboard({courseId, props});

        //setDisableButton(disableButton=>true);
        //setBtnStyle(btnStyle=>({backgroundColor:"grey", buttonText: "Already added"}));
     }


    const [courseExists, checkCourseExists]= useState(null);


    useEffect(()=>{

       //let userId = props.Course.teacher;
       let course=props.Course;
       let courseId=course.id;
       checkcourseexistsindashboard({courseId, checkCourseExists});

    },[props.Course]);



    const changeStyleOnMouseEnterHandler=()=>{
       setStyle( {...style,  courseNameColor:"var(--themeColor)", courseNameTextDecoration:"underline"});
    }


    const changeStyleOnMouseLeaveHandler=()=>{
       setStyle( {...style,  courseNameColor:"black",courseNameTextDecoration:"none"});
    }



   console.log("print course inside ad course : ", props.Course);



return (



<div className={classes.courseViewDashboard}  
	onMouseEnter={changeStyleOnMouseEnterHandler} 
	onMouseLeave={changeStyleOnMouseLeaveHandler}
	>

  
   <div className={classes.innerMarginDiv}>	

      <div className={classes.upperPart}> 
	  <div className={classes.picDiv}>
	     <img src={props.Course.card_cover_image} className={classes.picStyle} />
	  </div>
	  <div className={classes.upperInfoDiv}>

	        <div className={classes.courseNameDiv}>
                        <button type="button" style={{color:style.courseNameColor,
                                        textDecoration:style.courseNameTextDecoration}}
                                className={classes.courseNameButton}
                                disabled={true}
                               >
                               <b> {props.Course.courseShortName}</b>
                        </button>
                </div>
	        <div className={classes.topBar1}>
	             
	              <div> Instructor:  
	                  { props.Course.teachers !== null && props.Course.teachers.map( (teacher, index)=>{

                                  return <span key={index}> <b> {teacher.firstname !=="" ? teacher.firstname+" "+teacher.lastname : teacher.username}{","}  </b></span>

                                }
                               )
                          }

	              </div>

	              <div className={classes.topBar1_right}>  
                        <div className={classes.courseCode}> {props.Course.courseGlobalCode} </div>
	              </div>
	        </div>






                <div className={classes.middlePart}>  
	              <div className={classes.middlePart_left}>
	                    <div className={classes.designedForText}> Designed for: <b> {props.Course.designedFor}</b> </div>   
	                    <div className={classes.upcomingClassTime}> Start on: {props.Course.courseStartDate}  </div>
	                    <div className={classes.upcomingClassTime}> Ends on: {props.Course.courseEndDate}  </div>
	                    
	              </div>

	              <div className={classes.middlePart_right} >
                                { courseExists !==null  &&  props.Course.creater !==null && !courseExists[0].exists && Number(props.userData.id) !== Number(props.Course.creater.id) &&        
                                   <button type="button" className={classes.goToCourseButton} onClick={addCourseHandler}> 
	                               Add course 
	                           </button>
			        }


                                {/* courseExists !==null  &&  !courseExists[0].exists && Number(props.userData.id) === Number(props.Course.teacher.id) &&  
                                   <button type="button" className={classes.goToCourseButton} >
                                       You cannot add a course created by you.
                                   </button>
                                */}	                                                  


	                        { courseExists !==null  &&  courseExists[0].exists &&   
                                  <button type="button" className={classes.goToCourseButton1} disabled={true}>
                                      Added <BsCheckLg/>
                                  </button>
                                } 

	              </div>

	        </div>
	  </div>
      </div>     
        
   
  </div>


</div>


);

}

export default CourseViewDashboard;
