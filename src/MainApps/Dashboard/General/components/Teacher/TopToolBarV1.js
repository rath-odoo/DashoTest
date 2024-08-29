import React,{useState,useEffect, useCallback, useMemo} from 'react';
import classes from './TopToolBarV1.module.css';
import TopToolBox from './TopToolBoxV1';
//import CreateCourseForm from './CourseCreate/CreateCourseForm';
import {BsLayoutTextSidebarReverse, BsFillCameraReelsFill,
	BsCameraVideo, BsPencilSquare,BsSearch, 
	BsCalendar4Event, BsGrid} from 'react-icons/bs';
import {GiTeacher} from "react-icons/gi";
import {CgClipboard} from 'react-icons/cg';
import {MdOutlineDashboard} from 'react-icons/md';
import TopToolBarLeft from './TopToolBarLeft';





const TopToolBar =(props)=>{




    let ActiveButtonStyle = {
               highLightColor:"var(--toolButtonDashUnderlineColorActive)",
               iconColor:"var(--toolButtonDashIconColorActive)",
               iconTitleColor:"var(--toolButtonDashTextColorActive)",
               backgroundColor:"var(--toolButtonDashBkgColorActive)",
               boxShadow: "var(--toolButtonDashBoxShadowActive)",
	       fontWeight:"bold",
	       borderWidth:"1px",
	       borderColor:"lightgrey"
    }

    let InActiveButtonStyle = {
               highLightColor:"var(--toolButtonDashUnderlineColorInActive)",
               iconColor:"var(--toolButtonDashIconColorInActive)",
               iconTitleColor:"var(--toolButtonDashTextColorInActive)",
               backgroundColor:"var(--toolButtonDashBkgColorInActive)",
               boxShadow: "var(--toolButtonDashBoxShadowInActive)",
	       fontWeight: "normal",
	       borderWidth:"1px",
	       borderColor:"lightgrey"
    }







    const [toolBoxStyle1, setToolBoxStyle1] = useState(ActiveButtonStyle );
    const [toolBoxStyle2, setToolBoxStyle2] = useState(InActiveButtonStyle );
    const [toolBoxStyle3, setToolBoxStyle3] = useState(InActiveButtonStyle );
    const [toolBoxStyle4, setToolBoxStyle4] = useState(InActiveButtonStyle );
    const [toolBoxStyle5, setToolBoxStyle5] = useState(InActiveButtonStyle );






    const showCoursesHandler = useCallback(()=>{
       setToolBoxStyle1( ActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );	
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );	    
       props.showCourses();	    
    },[ ])


   const setCoursesColorHandler = useCallback(()=>{
       setToolBoxStyle1( ActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );
      
    },[ ])








    const showClassesHandler = useCallback(() =>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( ActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );

       props.showClasses();

    },[])


    const setClassesColorHandler = useCallback(() =>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( ActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );


    },[])







    const showExamsHandler = useCallback(() =>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( ActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );


       props.showExams();
    },[])


    const setExamsColorHandler = useCallback(() =>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( ActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );


    },[])










    const showNoticesHandler = useCallback(()=>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( ActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );

       props.showNoticeBoard();

   },[])


    const setNoticesColorHandler = useCallback(()=>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( ActiveButtonStyle );
       setToolBoxStyle5( InActiveButtonStyle );

   },[])



    const showMeetingHandler=useCallback(()=>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( ActiveButtonStyle );  
       props.showMeetings();
    },[])



   const setMeetingsColorHandler=useCallback(()=>{
       setToolBoxStyle1( InActiveButtonStyle );
       setToolBoxStyle2( InActiveButtonStyle );
       setToolBoxStyle3( InActiveButtonStyle );
       setToolBoxStyle4( InActiveButtonStyle );
       setToolBoxStyle5( ActiveButtonStyle );
    },[])







    const coursesStyle = useMemo(()=>{

      return toolBoxStyle1;

    },[toolBoxStyle1])


   
    const classesStyle = useMemo(()=>{

      return toolBoxStyle2;

    },[toolBoxStyle2])





    const examsStyle = useMemo(()=>{

      return toolBoxStyle3;

    },[toolBoxStyle3])




    const noticesStyle = useMemo(()=>{

      return toolBoxStyle4

    },[toolBoxStyle4])


    const meetingsStyle = useMemo(()=>{

      return toolBoxStyle5;

    },[toolBoxStyle5])





    const showMeetingHandlerColor=useCallback(()=>{
       setToolBoxStyle5( {  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
       setToolBoxStyle1( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle2( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle3( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle4( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});

    },[])	   



   const showClassHandlerColor=useCallback(()=>{
       setToolBoxStyle2( {  highLightColor:"var(--themeColor)",iconColor:"var(--themeColor)",iconTitleColor:"var(--themeColor)"});
       setToolBoxStyle1( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle5( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle3( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});
       setToolBoxStyle4( {  highLightColor:"white",iconColor:"grey",iconTitleColor:"black"});

    },[])





    console.log("oneClass Mounted: ", props.generalOneClassMounted);






    useEffect(()=>{
  
        //console.log("Top Tool Bar: useEffect-3");
        props.generalOneMeetingMounted && setMeetingsColorHandler();

    },[props.generalOneMeetingMounted, setMeetingsColorHandler ]);


    useEffect(()=>{

      props.generalOneClassMounted && setClassesColorHandler();


    },[props.generalOneClassMounted, setClassesColorHandler]);


  







    useEffect(()=>{

        //console.log("Top Tool Bar: useEffect-4");
        props.generalMeetingsMounted &&  showMeetingHandler();
        props.generalCoursesMounted &&  showCoursesHandler(); 
	props.generalClassesMounted &&  setClassesColorHandler();
        props.generalExamsMounted &&  showExamsHandler();
	props.generalNoticesMounted &&  showNoticesHandler();

    },[props.generalMeetingsMounted,
	    props.generalCoursesMounted,
	    props.generalClassesMounted,
	    props.generalExamsMounted,
	    props.generalNoticesMounted,
	    showMeetingHandler,
            showCoursesHandler,
            showClassesHandler,
            showExamsHandler,
            showNoticesHandler
            ]);


   let coursesUnread=0;
   let noticeUnread =  props.dashboardNotice !==null? props.dashboardNotice.unread_count: 0;
   let classesUnread = 0;
   let examsUnread = 0;
   let meetingsUnread = 0;



return (


<div className={classes.topToolBar}>


    <div className={classes.iconContainerBox}>


         
         <TopToolBarLeft userData={props.userData}/>
          
         <div className={classes.buttonsContainer}>

         <TopToolBox toolBoxStyle = {coursesStyle} 
	             onPress = {showCoursesHandler} 
	             icon={BsGrid} 
	             iconName="My Courses"
	             notificationNum={coursesUnread}
	             />
         <TopToolBox toolBoxStyle = {classesStyle} 
	             onPress = {showClassesHandler} 
	             icon={GiTeacher} 
	             iconName="Classes"
	             notificationNum={classesUnread}
	             />
	  
         <TopToolBox toolBoxStyle = {examsStyle} 
	             onPress = {showExamsHandler} 
	             icon={BsPencilSquare} 
	             iconName="Exams"
	             notificationNum={examsUnread}
	             />
          
	 <TopToolBox toolBoxStyle = {noticesStyle} 
	             onPress = {showNoticesHandler} 
	             icon={BsCalendar4Event} 
	             iconName="Notices"
	             notificationNum={noticeUnread}
	             />


	{/* 
         <TopToolBox toolBoxStyle = {meetingsStyle} 
	             onPress = {showMeetingHandler} 
	             icon={BsCameraVideo} 
	             iconName="Meet"
	             notificationNum={meetingsUnread}
	             />
        */}



         </div>

    </div>
   
   
</div>


);


}

export default TopToolBar;


