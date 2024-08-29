import React,{useState,useEffect} from 'react';
import classes from './TopToolBar.module.css';
import TopToolBox from './TopToolBox';
//import CreateCourseForm from './CourseCreate/CreateCourseForm';


const TopToolBar =(props)=>{





//const [numOngoing, setNumOngoing] = useState(0);

let numOngoing=0;	

//console.log("props course: ", props.selectedCourse.classes);


const [toolBoxStyle1, setToolBoxStyle1] = useState(
{
	buttonBkgColor:'#00AFF0',//#0498cf'
        boxBkgColor:'white',//#def3fa',
	rightTopBoxColor: 'green',
        buttonText:'CREATE A CLASS',
	mainText:'Total Classes',
	mainNumber:12,
	topRightText:'Upcoming',
	topRightNumber:numOngoing	
});



 

   	

   useEffect(()=>{


   // props.dashboardCourses.map((course,index)=>{
   //	    if(course.courseStatus==="ongoing"){
   //               setNumOngoing(numOngoing=>numOngoing+1);
   //	    }
   // });
   

   if(props.selectedCourse !==null){

     setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,mainNumber:props.selectedCourse[0].classes.length }));

   }

   return ()=>{
     //setNumOngoing(numOngoing=>0);
   }


},[ props.selectedCourse ]);




useEffect(()=>{

setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,topRightNumber:numOngoing }));

},[props.dashboardCourses, numOngoing]);









//const [toolBoxStyle2, setToolBoxStyle2] = useState()
let toolBoxStyle2 = {
        buttonBkgColor:'grey',
        boxBkgColor:'white',
        rightTopBoxColor: 'grey',
        buttonText:'VIEW CLASSES',
        mainText:"Today's Classes ",
        mainNumber:'3',
        topRightText:'Attended',
        topRightNumber:'1'
};



//const [toolBoxStyle3, setToolBoxStyle3] = useState()
let toolBoxStyle3 = {
        buttonBkgColor:'grey',
        boxBkgColor:'white',
        rightTopBoxColor: 'green',
        buttonText:'VIEW EXAMS',
        mainText:"Total Exams",
        mainNumber:'3',
        topRightText:'Over',
        topRightNumber:'1'
};







//const [toolBoxStyle4, setToolBoxStyle4] = useState()
let toolBoxStyle4 = {
        buttonBkgColor:'grey',//#8c488c
        boxBkgColor:'white',//#f0d5f0
        rightTopBoxColor: 'grey',
        buttonText:'NOTICE BOARD',
        mainText:'Total Notices',
        mainNumber:'15',
        topRightText:'Unread',
        topRightNumber:'6'
};



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


    //const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);



    const showcreateCourseForm =()=>{
      //setShowCreateCourseForm(true);
    }

    //const closecreateCourseForm =()=>{
       //setShowCreateCourseForm(false);
       //props.onPress();
    //}




    const showClasses =()=>{

    }


    const showExams=()=>{

    }







return (


<div className={classes.topToolBar}>

  <TopToolBox toolBoxStyle = {toolBoxStyle1} onPress = {showcreateCourseForm} />

      {/*showCreateCourseForm && <CreateCourseForm onPress={closecreateCourseForm} selectedCourse={props.selectedCourse}/> */}         


  <TopToolBox toolBoxStyle = {toolBoxStyle2} onPress = {showClasses} />
  <TopToolBox toolBoxStyle = {toolBoxStyle3} onPress = {showExams} />
  <TopToolBox toolBoxStyle = {toolBoxStyle4} onPress = {props.showNoticeBoard} />

</div>


);


}

export default TopToolBar;


