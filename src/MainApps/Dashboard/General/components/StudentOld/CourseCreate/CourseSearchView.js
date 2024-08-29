import React,{useState,useEffect} from 'react'
import classes from './CourseSearchView.module.css';
import {BsFillCheckSquareFill} from 'react-icons/bs';
import { BsPeopleFill} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import {getuser,putdashboardcourses} from '../../../../../../CommonApps/AllAPICalls';
//putcourseuser


const CourseViewDashboard = (props)=>{


 //const [style,setStyle]=useState(props.Course);


 let style = props.Course;


 const [data, setData ] = useState({

	 dashboardcourses:[]


 });


 const [disableButton, setDisableButton]= useState(false);

 const [btnStyle, setBtnStyle]=useState({

  backgroundColor:"var(--themeColor)",
  buttonText:"Add to Dashboard"	 

 });



useEffect(() =>{

   getuser({setData});

  

  },[]);



//console.log("f--", data);

	
useEffect(()=>{
let existCourseList=[];
let courseId =0;

courseId =props.Course.id;
existCourseList = data.dashboardcourses;


//console.log('ff: ', data.dashboardcourses);
//console.log('fff: ', existCourseList)

	
if ( existCourseList.length > 0 && existCourseList.indexOf(courseId) > -1 ){

setDisableButton(disableButton=>true);
setBtnStyle(btnStyle=>({backgroundColor:"grey", buttonText: "Already added"}));

};


},[props.Course.id, data.dashboardcourses]);








const addCourseHandler=(e)=>{
  e.preventDefault();

  //let courseCode= props.Course.courseGlobalCode;

  data.dashboardcourses.push(props.Course.id);	
  //putcourseuser({data});
  putdashboardcourses({data});	

  setDisableButton(disableButton=>true);
  setBtnStyle(btnStyle=>({backgroundColor:"grey", buttonText: "Already added"}));
  //props.onPress();


}






return (

<div className={classes.courseViewDashboard}>


   
   <div className={classes.infoUnitBarParent}  style={{backgroundColor: style.infoBarBkgColor}} >
	<div className={classes.infoUnitBar} style={{backgroundColor: style.infoBarBkgColor}}>


          {/*
          <div>SUBJECT: <span className={classes.courseName}>
                       <span className={classes.courseNameText}  style={{color:style.courseNameColor}}> {style.courseName}  </span>
                       <BsCheckCircleFill className={classes.signupStatus} style={{color:style.courseSignUpstatusColor}}/>
                  </span>
          </div>        
          <i className={classes.codeSec}>CODE: <span className={classes.courseCodeName}>CLM 221 (342101)</span></i>
          */}


        <div className={classes.subjectSection}> 
	   <span className={classes.signupIcon}> <BsFillCheckSquareFill/> </span>
	   <span className={classes.subjectTitle}> SUBJECT: </span>
	   <span className={classes.subjectName}>{props.Course.subject}</span>   

	</div>          


	<i className={classes.codeSection}>CODE: <span className={classes.courseCode}>{props.Course.courseLocalCode} ({props.Course.courseGlobalCode})</span></i>




      </div>
   </div>
    



   <div className={classes.genInfoBar}>
      <div className={classes.designedFor}>
        DESIGNED FOR: <i>{props.Course.designedFor}</i> 
      </div>

      <div className={classes.toolIcons}>
	{/*<span>  <BsPeopleFill className={classes.participantIcon}/> <span className={classes.numParticipant}>37 </span> </span>*/}
         <button className={classes.editButton}> <BiEdit/> </button>
	 {/*<button className={classes.deleteButton}> <BsFillTrashFill/> </button>*/}
       </div>

   </div>



   <div className={classes.genInfoBar}>
      <div className={classes.instructor}>
        INSTRUCTOR: <i>Prof. Seema Bahinipati</i>
      </div>

      <div className={classes.toolIcons}>
        {/*<span>  <BsPeopleFill className={classes.participantIcon}/> <span className={classes.numParticipant}>37 </span> </span>*/}
         <button className={classes.editButton}> <BsPeopleFill/> </button>
         {/*<button className={classes.deleteButton}> <BsFillTrashFill/> </button>*/}
       </div>

   </div>

   <div className={classes.genInfoBar}>
      <div className={classes.instructor}>
         DURATION: <i> 01/01/2022 --To--  27/04/2022</i>
      </div>


   </div>	

   <div className={classes.genInfoBar}>
       <div className={classes.status}>
        STATUS: <i> Ongoing</i>
       </div>


   </div>



   <div className={classes.genInfoBarAddCourse}>
      <button 
	className={classes.switchTo}  
	onClick={addCourseHandler} 
	disabled={disableButton} 
	style={{backgroundColor: btnStyle.backgroundColor}}

	>
	{btnStyle.buttonText} 
      </button>
   </div>






</div>


);

}

export default CourseViewDashboard;
