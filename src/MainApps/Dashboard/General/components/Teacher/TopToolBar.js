import React,{useState,useEffect} from 'react';
import classes from './TopToolBar.module.css';
import TopToolBox from './TopToolBox';
import CreateCourseForm from './CourseCreate/CreateCourseForm';


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
	topRightNumber:numOngoing	
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
        topRightNumber:'0'
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
        topRightNumber:'0'
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
});





    const [showCreateCourseForm, setShowCreateCourseForm] = useState(false);



    const showcreateCourseForm =()=>{
      setToolBoxStyle1( {...toolBoxStyle1,  buttonBkgColor:"var(--clickBtnColorDashBackground)",buttonTxtColor:"var(--clickBtnColorDash)"});
      setToolBoxStyle2( {...toolBoxStyle2,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});	 
      setToolBoxStyle3( {...toolBoxStyle3,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"})
      setToolBoxStyle4( {...toolBoxStyle4,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"})	    
      setShowCreateCourseForm(true);
      props.showCourses();	    
    }

    const closecreateCourseForm =()=>{
        setShowCreateCourseForm(false);
        props.onPress();
    }




    const showClassesHandler = () =>{
    setToolBoxStyle2( {...toolBoxStyle2,  buttonBkgColor:"var(--clickBtnColorDashBackground)", buttonTxtColor:"var(--clickBtnColorDash)"});
    setToolBoxStyle1( {...toolBoxStyle1,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle3( {...toolBoxStyle3,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle4( {...toolBoxStyle4,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});	    
    props.showClasses();

    }


    const showExamsHandler = () =>{

    setToolBoxStyle3( {...toolBoxStyle3,  buttonBkgColor:"var(--clickBtnColorDashBackground)", buttonTxtColor:"var(--clickBtnColorDash)"});
    setToolBoxStyle1( {...toolBoxStyle1,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle2( {...toolBoxStyle2,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle4( {...toolBoxStyle4,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});


    }



   const showNoticeBoardHandler=()=>{

    setToolBoxStyle4( {...toolBoxStyle4,  buttonBkgColor:"var(--clickBtnColorDashBackground)",buttonTxtColor:"var(--clickBtnColorDash)"});
    setToolBoxStyle1( {...toolBoxStyle1,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle2( {...toolBoxStyle2,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});
    setToolBoxStyle3( {...toolBoxStyle3,  buttonBkgColor:"#92b3f0", buttonTxtColor:"white"});	   

    props.showNoticeBoard();
	   

   }






return (


<div className={classes.topToolBar}>

  <TopToolBox toolBoxStyle = {toolBoxStyle1} onPress = {showcreateCourseForm} />

      {showCreateCourseForm && <CreateCourseForm onPress = {closecreateCourseForm} /> }         


  <TopToolBox toolBoxStyle = {toolBoxStyle2} onPress = {showClassesHandler} />
  <TopToolBox toolBoxStyle = {toolBoxStyle3} onPress = {showExamsHandler} />
  <TopToolBox toolBoxStyle = {toolBoxStyle4} onPress = {showNoticeBoardHandler} />

</div>


);


}

export default TopToolBar;


