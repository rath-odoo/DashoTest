import React,{useState,useEffect} from 'react';
import classes from './TopToolBarV1.module.css';
import TopToolBox from './TopToolBoxV1';
import CreateCourseForm from './CourseCreate/CreateCourseForm';
import {BsLayoutTextSidebarReverse, BsFillCameraReelsFill, BsPencilSquare,BsSearch} from 'react-icons/bs';
import {GiTeacher} from "react-icons/gi";
import {CgClipboard} from 'react-icons/cg';





const TopToolBar =(props)=>{



   //console.log('Top Tol bar teacher rendering');

   const [numOngoing, setNumOngoing] = useState(0);





   const [toolBoxStyle1, setToolBoxStyle1] = useState(
     {
	buttonBkgColor: 'var(--clickBtnColorDashBackground)',
	buttonTxtColor:'var(--clickBtnColorDash)',
        boxBkgColor: 'white',
	boxTxtColor:'var(--themeColor)',
	rightTopBoxColor: 'green',
        buttonText:'+Create a Course',
	mainText:'TOTAL COURSES',
	mainNumber:props.dashboardCourses.length,
	topRightText:'Ongoing',
	topRightNumber:numOngoing,
	icon:{BsLayoutTextSidebarReverse},
	iconName:"Courses",
	highLightColor:"var(--themeColor)",
        iconColor:"var(--themeColor)",
        iconTitleColor:"var(--themeColor)"     
     });




useEffect(()=>{


    //props.dashboardCourses.map((course,index)=>{
	    
    //		    if(course.courseStatus === "ongoing"){  setNumOngoing(numOngoing=>numOngoing+1);}
	    
    //});


    props.dashboardCourses.forEach((course)=>{

	    if(course.courseStatus === "ongoing"){  setNumOngoing(numOngoing=>numOngoing+1); }

    });




   setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,mainNumber:props.dashboardCourses.length }));

   return ()=>{
     setNumOngoing(numOngoing=>0);
   }


},[props.dashboardCourses.length, props.dashboardCourses]);




   useEffect(()=>{

     setToolBoxStyle1(toolBoxStyle1=>({...toolBoxStyle1,topRightNumber:numOngoing }));

   },[props.dashboardCourses, numOngoing]);









const [toolBoxStyle2, setToolBoxStyle2] = useState(
 {
        buttonBkgColor:'#75a0f0',//#75a0f0
	buttonTxtColor:'white',
        boxBkgColor:'white',//'#b3fff6',
	boxTxtColor:'var(--themeColor)',
        rightTopBoxColor: 'grey',
        buttonText:'View Classes',
        mainText:"TODAY'S CLASSES",
        mainNumber:'0',
        topRightText:'Attended',
        topRightNumber:'0',
	icon:{GiTeacher},
	iconName:"Classes",
	highLightColor:"white",
        iconColor:"grey",
        iconTitleColor:"black"
});



const [toolBoxStyle3, setToolBoxStyle3] = useState(
{
        buttonBkgColor:'#75a0f0',
	buttonTxtColor:'white',
        boxBkgColor:'white',//'lightgrey',
	boxTxtColor:'var(--themeColor)',
        rightTopBoxColor: 'green',
        buttonText:'View Exams',
        mainText:"TOTAL EXAMS",
        mainNumber:'0',
        topRightText:'Over',
        topRightNumber:'0',
	icon:{BsPencilSquare},
	iconName:"Exams",
	highLightColor:"white",
        iconColor:"grey",
        iconTitleColor:"black"
});







const [toolBoxStyle4, setToolBoxStyle4] = useState(

 {
        buttonBkgColor:'#75a0f0',//'#ff5349',//#8c488c
	buttonTxtColor:'white',
        boxBkgColor:'white',//'#ffd4d1',//#f0d5f0
	boxTxtColor:'var(--themeColor)',
        rightTopBoxColor: 'grey',
        buttonText:'View Noticeboard',
        mainText:'TOTAL NOTICES',
        mainNumber:props.dashboardNotice !==null? props.dashboardNotice.dashnotices.length: 0,
        topRightText:'Unread',
        topRightNumber:props.userData !==null? props.userData.noticeids.length:0,
	icon:{BsFillCameraReelsFill},
	iconName:"Notices",
	highLightColor:"white",
        iconColor:"grey",
        iconTitleColor:"black"
});







const [toolBoxStyle5, setToolBoxStyle5] = useState(

 {
        buttonBkgColor:'#75a0f0',//'#ff5349',//#8c488c
        buttonTxtColor:'white',
        boxBkgColor:'white',//'#ffd4d1',//#f0d5f0
        boxTxtColor:'var(--themeColor)',
        rightTopBoxColor: 'grey',
        buttonText:'View Noticeboard',
        mainText:'TOTAL NOTICES',
        mainNumber:props.dashboardNotice !==null? props.dashboardNotice.dashnotices.length: 0,
        topRightText:'Unread',
        topRightNumber:props.userData !==null? props.userData.noticeids.length:0,
        icon:{BsFillCameraReelsFill},
        iconName:"Meetings",
	highLightColor:"white",
        iconColor:"grey",
        iconTitleColor:"black"
});










    //const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);






    const showCoursesHandler =()=>{
      setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
      setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});	 
      setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"})
      setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"})
      setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});	    
      props.showCourses();	    
    }

    //const closecreateCourseForm =()=>{
    //    setShowCreateCourseForm(false);
    //    props.onPress();
    //}




    const showClassesHandler = () =>{
    setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
    setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});	    
    props.showClasses();

    }


    const showExamsHandler = () =>{

    setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
    setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
     props.showExams();
    }



   const showNoticesHandler=()=>{

    setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
    setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});	   
    setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"}); 


    props.showNoticeBoard();
	   

   }


   const showMeetingHandler=()=>{
    setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
    setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    props.showMeetings();
   }



   const showMeetingHandlerColor=()=>{
    setToolBoxStyle5( {...toolBoxStyle5,  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
    setToolBoxStyle1( {...toolBoxStyle1,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle2( {...toolBoxStyle2,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle3( {...toolBoxStyle3,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
    setToolBoxStyle4( {...toolBoxStyle4,  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});


   }	   


   useEffect(()=>{


   props.generalOneMeetingMounted && showMeetingHandlerColor();



   },[props.generalOneMeetingMounted ]);





   
    useEffect(()=>{



        props.generalMeetingsMounted &&  showMeetingHandler();
        props.generalCoursesMounted &&  showCoursesHandler(); 
	props.generalClassesMounted &&  showClassesHandler();
        props.generalExamsMounted &&  showExamsHandler();
	props.generalNoticesMounted &&  showNoticesHandler();

    },[props.generalMeetingsMounted,props.generalCoursesMounted,props.generalClassesMounted,props.generalExamsMounted,props.generalNoticesMounted]);
































return (


<div className={classes.topToolBar}>


    <div className={classes.iconContainerBox}>

         <div className={classes.searchBoxParentDiv}>
   	        {/*<div className={classes.searchBoxDiv}> <span><BsSearch/> Search</span> </div>*/}
        	<div className={classes.searchBoxDiv}> <span>Dashboard</span> </div>
         </div>

         <TopToolBox toolBoxStyle = {toolBoxStyle1} onPress = {showCoursesHandler} icon={BsLayoutTextSidebarReverse}/>
         <TopToolBox toolBoxStyle = {toolBoxStyle2} onPress = {showClassesHandler} icon={GiTeacher}/>
         <TopToolBox toolBoxStyle = {toolBoxStyle3} onPress = {showExamsHandler} icon={BsPencilSquare}/>
         <TopToolBox toolBoxStyle = {toolBoxStyle4} onPress = {showNoticesHandler} icon={CgClipboard}/>
         <TopToolBox toolBoxStyle = {toolBoxStyle5} onPress = {showMeetingHandler} icon={BsFillCameraReelsFill}/>


    </div>
   
   {/*	
    <div className={classes.buttonsSubBoxDiv}>

	 <button className={classes.createCourseButton} type="button" onClick={()=>setShowCreateCourseForm(true)}> +Create a course</button>

    </div>

   showCreateCourseForm && <CreateCourseForm onPress = {closecreateCourseForm} />

   */}
   
</div>


);


}

export default TopToolBar;


