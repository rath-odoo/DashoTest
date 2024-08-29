import React,{useState} from 'react';
import classes from './Overview.module.css';

import InstructorUnit from './InstructorUnit';
import InfoUnit from './InfoUnit';

import About from './About';
import {GiDogHouse,GiProgression,GiTeacher} from 'react-icons/gi';
import {BsPeopleFill,BsFillSquareFill,BsPenFill,BsUiChecksGrid,BsBookFill} from 'react-icons/bs';
import {FaHandPointRight,FaCodiepie,FaRegCreditCard,FaChartBar} from 'react-icons/fa';
import {GrStatusGoodSmall} from 'react-icons/gr';
import {FaBarcode} from 'react-icons/fa';
import {AiOutlineFieldTime} from 'react-icons/ai';

import {MdTimelapse} from 'react-icons/md';

import {ImArrowRight} from 'react-icons/im';

import RecoBooks from './RecoBooks';

import {FcSalesPerformance} from 'react-icons/fc';

import OneStudentCreditScore from './OneStudentCreditScore';

import CourseEditForm from './Forms/CourseEditForm';


const Overview=(props)=>{


  //console.log("overview rendering");

   let monthMap={"01":"Jan","02":"Feb","03":"March",
              "04":"April", "05":"May", "06":"June","07":"July",
               "08":"Sept","09":"Oct", "10":"Oct","11":"Nov","12":"Dec"}


   let startTime= props.selectedCourse[0].courseStartDate;
   let endTime = props.selectedCourse[0].courseEndDate;

   let startYear= startTime !==null? startTime.split("-").at(0):"N/A";
   let startMonth= startTime !==null? monthMap[startTime.split("-").at(1)]:"N/A";
   let startDay=startTime !==null? startTime.split("-").at(2):"N/A";	

   let endYear= endTime !==null? endTime.split("-").at(0):"N/A";
   let endMonth= endTime !==null? monthMap[endTime.split("-").at(1)]:"N/A";
   let endDay=endTime !==null? endTime.split("-").at(2):"N/A";	

   const [showCourseEditForm, setShowCourseEditForm] = useState(false);


   const closeCourseEditForm=()=>{
    setShowCourseEditForm(false);

   }	

  
   const showCourseEditFormHandler=()=>{
     setShowCourseEditForm(true);
   }



return (

<div className={classes.overview}>

     <div className={classes.instructorGrid}>
        <InstructorUnit selectedCourse={props.selectedCourse}/>
     </div>

    

     { showCourseEditForm && props.selectedCourse !==null &&
         
           <CourseEditForm onPress={closeCourseEditForm}
                           Course={props.selectedCourse[0]}
                           userData={props.userData}
	                   rerender={props.rerender}
	                   />
     }


     
     <div className={classes.editDiv}>	
            <button type="button" className={classes.editBasicInfoButton} onClick={showCourseEditFormHandler}>
	      Edit
	    </button>
     </div>
     

     <div className={classes.generalInfoGrid}>

          <InfoUnit 
	         name="Institute" 
	         value={props.selectedCourse[0].instituteName}
	         icon={GiDogHouse}
	         />

          <InfoUnit
                  name="Designed for"
                  value={props.selectedCourse[0].designedFor}
	          icon={FaHandPointRight}
                  />

           <InfoUnit
                   name="Subject"
                   value={props.selectedCourse[0].subject}
                   icon={BsFillSquareFill}
                  />

	 <InfoUnit
                  name="No. of Students"
                  value={props.selectedCourse[0].enrolled_students.length}
	          icon={BsPeopleFill}
                  />
      
          <InfoUnit
	           name="Status"
	           value={props.selectedCourse[0].courseStatus}
	           icon={GrStatusGoodSmall}
	          />

          <InfoUnit
                   name="Institute code"
                   value={props.selectedCourse[0].courseLocalCode}
	           icon={FaBarcode}
                  />

          <InfoUnit
                   name="Duration"
                   value={startDay+" "+startMonth+" "+startYear+" To "+ endDay+" "+endMonth+" "+endYear}
                   icon={FaCodiepie}
                  />

          <InfoUnit
                   name="Progress"
                   value="Not available"
                   icon={GiProgression}
                  />

          <InfoUnit
                   name="Upcoming class"
                   value="9:30 am, Monday"
                   icon={GiTeacher}
                  />

          <InfoUnit
                   name="Credit"
                   value={props.selectedCourse[0].coursecredit}
                   icon={FaRegCreditCard}
                  />

          <InfoUnit
                   name="No. of Exams"
                   value="Not available"
                   icon={BsPenFill}
                  />

	  <InfoUnit
                   name="Pending Assignments"
                   value="Not available"
                   icon={BsUiChecksGrid}
                  />


     </div>






     <div className={classes.aboutTheCourse}>
          <About icon={ImArrowRight} aboutText={props.selectedCourse[0].abouttheCourse}/>
     </div>






     <div className={classes.recoBooksTitle}>
        <BsBookFill/><span className={classes.recoBookTitleSpan}>Recommended Books</span>
     </div>
     <div className={classes.recoBooks}>
        
	<RecoBooks icon={BsBookFill}/>
	<RecoBooks icon={BsBookFill}/>

     </div>








     
     <div className={classes.recoBooksTitle}>
        <FaChartBar/><span className={classes.recoBookTitleSpan}>Students Credit Score</span>
     </div>


     <div className={classes.creditScore}>

        <OneStudentCreditScore
	 scoreValue='20'
	/>
        <OneStudentCreditScore
         scoreValue='70'
        />
        <OneStudentCreditScore
         scoreValue='50'
        />
        <OneStudentCreditScore
         scoreValue='40'
        />
        <OneStudentCreditScore
         scoreValue='90'
        />
        <OneStudentCreditScore
         scoreValue='75'
        />
        <OneStudentCreditScore
         scoreValue='60'
        />
        <OneStudentCreditScore
         scoreValue='65'
        />

        <OneStudentCreditScore
         scoreValue='100'
        />
	<OneStudentCreditScore
         scoreValue='14'
        />





     </div>




</div>

);

}

export default Overview;
