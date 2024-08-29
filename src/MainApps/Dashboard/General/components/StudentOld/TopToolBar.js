import React,{useState} from 'react';
import classes from './TopToolBar.module.css';
import TopToolBox from './TopToolBox';
import CreateCourseForm from './CourseCreate/CreateCourseForm';


const TopToolBar =(props)=>{




//const [toolBoxStyle1, setToolBoxStyle1] = useState(

let toolBoxStyle1 = {
	buttonBkgColor:'var(--themeColor)',//'#5177bd',//#0498cf',
        boxBkgColor:'white',//'#e0ebff',//#def3fa',
	rightTopBoxColor: 'green',
        buttonText:'+Add a Course',
	mainText:'TOTAL COURSES',
	mainNumber:'5',
	topRightText:'Ongoing',
	topRightNumber:'3'	
}



let toolBoxStyle2 = {
        buttonBkgColor:'grey',
        boxBkgColor:'white',//'#b3fff6',
        rightTopBoxColor: 'grey',
        buttonText:'View Classes',
        mainText:"TODAY'S CLASSES ",
        mainNumber:'0',
        topRightText:'Attended',
        topRightNumber:'0'
}



let toolBoxStyle3 = {
        buttonBkgColor:'grey',
        boxBkgColor:'white',//'lightgrey',
        rightTopBoxColor: 'green',
        buttonText:'View Exams',
        mainText:"TOTAL EXAMS",
        mainNumber:'0',
        topRightText:'Over',
        topRightNumber:'0'
}




let toolBoxStyle4 = {
        buttonBkgColor:'grey',//'#ff5349',
        boxBkgColor:'white',//'#ffd4d1',
        rightTopBoxColor: 'grey',
        buttonText:'View Notice Board',
        mainText:'TOTAL NOTICES',
        mainNumber:'0',
        topRightText:'Unread',
        topRightNumber:'0'
}



/*const initialFormData = Object.freeze(
      {
        "teacher": 1,
        "courseShortName": "Quantum Mechanics-I",
        "courseFullName": "Basic Quantum Mechanics Course for BSc 1st Year",
        "courseGlobalCode": "321212",
        "courseLocalCode": "QM-132",
        "courseStatus": "ongoing",
        "courseStartDate": "2022-02-05T22:41:05Z",
        "courseEndDate": "2022-02-05T22:41:05Z",
        "designedFor": 1,
        "abouttheCourse": "d",
        "instituteName": "IIT Bhubaneswar",
        "instituteCity": "Odisha",
        "instituteCountry": "India",
        "enrolledstudents": [
            2
        ],
        "enrolementrequests": [
            3
        ]
    }
  );
*/


    const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);



    const showcreateCourseForm =()=>{
       setShowCreateCourseForm(true);
    }

    const closecreateCourseForm =()=>{
       setShowCreateCourseForm(false);
       props.onPress();
    }




   const showClasses =()=>{


   }


  const showExams=()=>{



  }



return (


<div className={classes.topToolBar}>

  <TopToolBox toolBoxStyle = {toolBoxStyle1} onPress={showcreateCourseForm} />

      {showCreateCourseForm && <CreateCourseForm onPress={closecreateCourseForm}/> }         


  <TopToolBox toolBoxStyle = {toolBoxStyle2} onPress={showClasses} />
  <TopToolBox toolBoxStyle = {toolBoxStyle3} onPress={showExams} />
  <TopToolBox toolBoxStyle = {toolBoxStyle4} onPress={props.showNoticeBoard} />

</div>


);


}

export default TopToolBar;


