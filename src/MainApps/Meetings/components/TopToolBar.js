import React,{useState,useEffect} from 'react';
import classes from './TopToolBar.module.css';
import TopToolBox from './TopToolBox';
import CreateCourseForm from './Forms/CreateCourseForm';


const TopToolBar =(props)=>{





const [numUpcoming, setNumUpcoming] = useState(0);


 //console.log("props selected Course: ", props.selectedCourse.length> 0 ? props.selectedCourse[0].meetings : "course length zero");



const [toolBoxStyle1, setToolBoxStyle1] = useState(
{
	buttonBkgColor:'#00AFF0',//#0498cf'
        boxBkgColor:'#e8f9ff',//#def3fa',
	rightTopBoxColor: 'green',
        buttonText:'+CREATE A MEETING',
	mainText:'All Meetings',
	mainNumber:12,
	topRightText:'Upcoming',
	topRightNumber:numUpcoming	
});



 

   //const selCourseClasses = props.selectedCourse.length > 0 ? props.selectedCourse[0].classes:[] ;
   	

   useEffect(()=>{

    {
      // console.log("hey hey ehy", props.selectedCourse[0].hasOwnProperty('meetings') );	  	     
	 props.selectedCourse !==null && props.selectedCourse.length > 0 &&    
         props.selectedCourse[0].meetings.map((meeting,index)=>{
     	    if(meeting.classStatus==="scheduled"){
                  setNumUpcoming(numUpcoming=>numUpcoming+1);
     	    }
        });
  
    }	    
  	    
   

   if(props.selectedCourse !==null && props.selectedCourse.length>0){

     setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,mainNumber:props.selectedCourse[0].meetings.length }));

   }

   return ()=>{
     setNumUpcoming(numUpcoming=>0);
   }


},[ props.selectedCourse ]);




useEffect(()=>{

setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,topRightNumber:numUpcoming }));

},[props.dashboardCourses, numUpcoming]);









//const [toolBoxStyle2, setToolBoxStyle2] = useState()
let toolBoxStyle2 = {
        buttonBkgColor:'grey',
        boxBkgColor:'lightgrey',
        rightTopBoxColor: 'grey',
        buttonText:'UPCOMING MEETINGS',
        mainText:"Next Meeting",
        mainNumber:'N/A',
        topRightText:'Attended',
        topRightNumber:'N/A'
};



//const [toolBoxStyle3, setToolBoxStyle3] = useState()
let toolBoxStyle3 = {
        buttonBkgColor:'grey',
        boxBkgColor:'lightgrey',
        rightTopBoxColor: 'green',
        buttonText:'MEETING INSIGHTS',
        mainText:"Avg. Credit Score",
        mainNumber:'N/A',
        topRightText:'Over',
        topRightNumber:'N/A'
};







//const [toolBoxStyle4, setToolBoxStyle4] = useState()
let toolBoxStyle4 = {
        buttonBkgColor:'grey',//#8c488c
        boxBkgColor:'lightgrey',//#f0d5f0
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

  <TopToolBox toolBoxStyle = {toolBoxStyle1} onPress = {showcreateCourseForm} />

      {showCreateCourseForm && <CreateCourseForm onPress={closecreateCourseForm} selectedCourse={props.selectedCourse} userData={props.userData} /> }         


  <TopToolBox toolBoxStyle = {toolBoxStyle2} onPress = {showClasses} />
  <TopToolBox toolBoxStyle = {toolBoxStyle3} onPress = {showExams} />
  {/*	
  <TopToolBox toolBoxStyle = {toolBoxStyle4} onPress = {props.showNoticeBoard} />
  */}
</div>


);


}

export default TopToolBar;


