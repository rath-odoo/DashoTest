import React,{useState, useEffect} from 'react'
import classes from './CourseViewDashboard.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import {BsFillTrashFill, BsPeopleFill} from 'react-icons/bs';
import {RiSendPlaneFill} from 'react-icons/ri';
import EnrollForm from './EnrollForm';
import {getuserbyId, deletedashboardcourses} from '../../../../../CommonApps/AllAPICalls';


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
     //let deepColor='#5177bd';
     //let lessDeep='#bbd2fa';
     //let lightColor='#e0ebff';










    const [enrollForm, showEnrollForm] = useState(false);
    const [enrolled, setEnrolled] = useState(false);
    //const [selectedCourse, setSelectedCourse] = useState(localStorage.getItem('preferredCourseId'));
   
    let selectedCourse = localStorage.getItem('preferredCourseId');	

    const [statusBkgColor, setStatusBkgColor] = useState('#25D366');

    const [userData, setUserData]= useState({
     usertitle:'',
     firstname:'',
     lastname:''
    });




    const moveToSubject=()=>{
       history.push('/dashboard/subject');
    }



    const enrollHandler =()=>{
        showEnrollForm(true);
    }

    const closeEnrollFormHandler = ()=>{
       showEnrollForm(false);
    }


    useEffect(()=>{

        let deepColor='#5177bd';
        let lessDeep='#bbd2fa';
        let lightColor='#e0ebff';



         if(props.Course.enrolledstudents.includes(props.data.id)){
              setEnrolled(enrolled=>true);
         }
         if(props.Course.courseStatus==="closed"){
            setStatusBkgColor(statusBkgColor=>'grey');
         }

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





    },[props.data.id,props.Course.enrolledstudents,selectedCourse, props.Course.id, props.Course.courseStatus]);



    useState(()=>{

     let userId = props.Course.teacher;
     getuserbyId({userId, setUserData});

    },[props.Course.teacher]);







    const courseSwitchHandler = ()=>{

      localStorage.setItem('preferredCourseId', props.Course.id);
      props.rerender();	    
      history.push('/dashboard/subject');	    
      //window.location.reload(false);
    }



   const deleteCourseHandler=()=>{


     alert("Are you sure you want to delete the course?");

     let dashboardcourses = props.data.dashboardcourses;


      if(dashboardcourses.indexOf(props.Course.id) > -1){
          let eleIndex=dashboardcourses.indexOf(props.Course.id);
          dashboardcourses.splice(eleIndex, 1);
          deletedashboardcourses({dashboardcourses});
          props.rerender();
      }

   }




















return (

<div className={classes.courseViewDashboard}
       style={{borderColor: style.secondary, backgroundColor:style.boxBkgColor}}


	>


   
   <div className={classes.infoUnitBarParent} onClick={moveToSubject} style={{backgroundColor: style.boxBkgColor}} >
	<div className={classes.infoUnitBar} style={{borderColor:style.topBarBottomColor,backgroundColor: style.boxBkgColor}}>




        <div className={classes.subjectSection}> 
	   <span className={classes.signupIcon}> <BsFillCheckSquareFill/> </span>
	   <span className={classes.subjectTitle} style={{color: style.subjectColor}} > SUBJECT: </span>
	   <span className={classes.subjectName} style={{color: style.rightButtonColor}}>{props.Course.subject}</span>   

	</div>          


	<i className={classes.codeSection} style={{color: style.codeColor}}>
	CODE: <span className={classes.courseCode}>
	         {props.Course.courseLocalCode} 
   	         (<b>{props.Course.courseGlobalCode}</b>)
	      </span>
	</i>




      </div>
   </div>
    



   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor }}>
      <div className={classes.designedFor} style={{backgroundColor:style.boxBkgColor}}>
        DESIGNED FOR: <i style={{color:style.codeColor,backgroundColor:'white' }}>{props.Course.designedFor}</i> 
      </div>

      <div className={classes.toolIcons}>

         {enrollForm && <EnrollForm onPress={closeEnrollFormHandler} Course={props.Course}/>}

         <button className={classes.editButton} onClick={enrollHandler} style={{color: style.rightButtonColor}}>

	      { enrolled && <i> enrolled </i>}

	      { !enrolled  && <i> enroll</i>}
	     <RiSendPlaneFill className={classes.enrollIcon}/> 
	 </button>
       </div>

   </div>


   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
       <div className={classes.status} style={{backgroundColor:style.boxBkgColor}}>
        STATUS: <i style={{backgroundColor: statusBkgColor}}> {props.Course.courseStatus}</i>
       </div>


   </div>






   <div className={classes.genInfoBar} style={{color: style.fieldColor, backgroundColor:style.boxBkgColor}}>
      <div className={classes.instructor} style={{backgroundColor:style.boxBkgColor}}>
        INSTRUCTOR: <i style={{color:style.fieldValueColor}}> {userData.usertitle} {userData.firstname} {userData.lastname}</i>
      </div>

      <div className={classes.toolIcons}>
         <button className={classes.editButton}> 
	     <BsPeopleFill/> 
	     <span className={classes.enrolledStuds}><i>{props.Course.enrolledstudents.length}</i></span>
	</button>
       </div>

   </div>

   <div className={classes.genInfoBar} style={{color: style.fieldColor , backgroundColor:style.boxBkgColor}}>
      <div className={classes.upcomingClass} style={{backgroundColor:style.boxBkgColor}}>
         UPCOMING CLASS: <i> 9:45 am |  27/02/2022</i>
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





      <div className={classes.viewDetail} style={{backgroundColor:style.boxBkgColor}}>
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

export default CourseViewDashboard;
