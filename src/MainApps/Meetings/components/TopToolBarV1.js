import React,{useState,useEffect, useCallback, useMemo} from 'react';
import classes from './TopToolBarV1.module.css';
import TopToolBox from './TopToolBoxV1';
import {BsFillGrid3X3GapFill, BsFillCameraReelsFill, BsPencilSquare,BsSearch} from 'react-icons/bs';
import {GiTeacher} from "react-icons/gi";
import {CgClipboard} from 'react-icons/cg';
import {FaList,FaSearch} from 'react-icons/fa';
import {AiFillNotification} from 'react-icons/ai';
import {RiVideoLine} from 'react-icons/ri';
import {AiOutlineFile} from 'react-icons/ai';
import {BsLink45Deg} from 'react-icons/bs';
import {CgNotes} from 'react-icons/cg';
import CreateMeetingForm from './Forms/CreateCourseForm';






const TopToolBar =(props)=>{




    console.log('Top Tol bar teacher rendering');


    const [toolBoxStyle1, setToolBoxStyle1] = useState(
      {
	highLightColor:"var(--topRightButtonUnderlineColorActive)",
        iconColor:"var(--topRightButtonIconColorActive)",
        iconTitleColor:"var(--topRightButtonTextColorActive_Course)"     
      });



    const [toolBoxStyle2, setToolBoxStyle2] = useState(
      {
	highLightColor:"var(--topRightButtonUnderlineColorInActive)",
        iconColor:"var(--topRightButtonIconColorInActive)",
        iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
    });



    const [toolBoxStyle3, setToolBoxStyle3] = useState({
        highLightColor:"var(--topRightButtonUnderlineColorInActive)",
        iconColor:"var(--topRightButtonIconColorInActive)",
        iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"


    });




    const [toolBoxStyle4, setToolBoxStyle4] = useState({
       highLightColor:"var(--topRightButtonUnderlineColorInActive)",
        iconColor:"var(--topRightButtonIconColorInActive)",
        iconTitleColor:"var(--topRightButtonTextColorInActive_Course)" 
    });



    const [toolBoxStyle5, setToolBoxStyle5] = useState(
     {
	highLightColor:"var(--topRightButtonUnderlineColorInActive)",
        iconColor:"var(--topRightButtonIconColorInActive)",
        iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
    });













    const showToolBox1Handler = useCallback(()=>{
       setToolBoxStyle1( {
	        highLightColor:"var(--topRightButtonUnderlineColorActive)",
                iconColor:"var(--topRightButtonIconColorActive)",
                iconTitleColor:"var(--topRightButtonTextColorActive_Course)"
                });
       setToolBoxStyle2( {
	       highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });	 
       setToolBoxStyle3( {
	       highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle4( {
	       highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle5( {
	       highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });	    
       props.showToolBox1PageContent();	    
    },[])




    const showToolBox2Handler = useCallback(() =>{
         setToolBoxStyle2( {
                highLightColor:"var(--topRightButtonUnderlineColorActive)",
                iconColor:"var(--topRightButtonIconColorActive)",
                iconTitleColor:"var(--topRightButtonTextColorActive_Course)"
                });
       setToolBoxStyle1( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
       setToolBoxStyle3( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle4( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle5( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });

	 props.showToolBox2PageContent();

    },[])


    const showToolBox3Handler = useCallback(() =>{
       setToolBoxStyle3( {
                highLightColor:"var(--topRightButtonUnderlineColorActive)",
                iconColor:"var(--topRightButtonIconColorActive)",
                iconTitleColor:"var(--topRightButtonTextColorActive_Course)"
                });
       setToolBoxStyle2( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
       setToolBoxStyle1( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle4( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle5( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
       props.showToolBox3PageContent();
    },[])


       const showToolBox4Handler = useCallback(()=>{
         setToolBoxStyle4( {
                highLightColor:"var(--topRightButtonUnderlineColorActive)",
                iconColor:"var(--topRightButtonIconColorActive)",
                iconTitleColor:"var(--topRightButtonTextColorActive_Course)"
                });
       setToolBoxStyle2( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
       setToolBoxStyle3( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle1( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle5( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });

         props.showToolBox4PageContent();

   },[])


   const showToolBox5Handler=useCallback(()=>{
        setToolBoxStyle5( {
                highLightColor:"var(--topRightButtonUnderlineColorActive)",
                iconColor:"var(--topRightButtonIconColorActive)",
                iconTitleColor:"var(--topRightButtonTextColorActive_Course)"
                });
       setToolBoxStyle2( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
       setToolBoxStyle3( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle4( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               })
       setToolBoxStyle1( {
               highLightColor:"var(--topRightButtonUnderlineColorInActive)",
               iconColor:"var(--topRightButtonIconColorInActive)",
               iconTitleColor:"var(--topRightButtonTextColorInActive_Course)"
               });
        props.showToolBox5PageContent();
    },[])










    const toolBox1Style = useMemo(()=>{

      return {
              highLightColor: toolBoxStyle1.highLightColor, 
	      iconColor: toolBoxStyle1.iconColor, 
	      iconTitleColor: toolBoxStyle1.iconTitleColor
             }

    },[toolBoxStyle1.highLightColor, toolBoxStyle1.iconColor, toolBoxStyle1.iconTitleColor])






    const toolBox2Style = useMemo(()=>{

      return {
              highLightColor: toolBoxStyle2.highLightColor, 
	      iconColor: toolBoxStyle2.iconColor, 
	      iconTitleColor: toolBoxStyle2.iconTitleColor
             }

    },[toolBoxStyle2.highLightColor, toolBoxStyle2.iconColor, toolBoxStyle2.iconTitleColor])





    const toolBox3Style = useMemo(()=>{

      return {
              highLightColor: toolBoxStyle3.highLightColor, 
	      iconColor: toolBoxStyle3.iconColor, 
	      iconTitleColor: toolBoxStyle3.iconTitleColor
             }

    },[toolBoxStyle3.highLightColor, toolBoxStyle3.iconColor, toolBoxStyle3.iconTitleColor])




    const toolBox4Style = useMemo(()=>{

      return {
              highLightColor: toolBoxStyle4.highLightColor, 
	      iconColor: toolBoxStyle4.iconColor, 
	      iconTitleColor: toolBoxStyle4.iconTitleColor
             }

    },[toolBoxStyle4.highLightColor, toolBoxStyle4.iconColor, toolBoxStyle4.iconTitleColor])


    const toolBox5Style = useMemo(()=>{

      return {
              highLightColor: toolBoxStyle5.highLightColor, 
	      iconColor: toolBoxStyle5.iconColor, 
	      iconTitleColor: toolBoxStyle5.iconTitleColor
             }

    },[toolBoxStyle5.highLightColor, toolBoxStyle5.iconColor, toolBoxStyle5.iconTitleColor])




   
    useEffect(()=>{

        //console.log("Top Tool Bar: useEffect-4");
        props.toolBox1PageMounted &&  showToolBox1Handler(); 
	props.toolBox2PageMounted &&  showToolBox2Handler();
        props.toolBox3PageMounted &&  showToolBox3Handler();
	props.toolBox4PageMounted &&  showToolBox4Handler();
	props.toolBox5PageMounted &&  showToolBox5Handler();    

    },[props.toolBox1PageMounted,
	    props.toolBox2PageMounted,
	    props.toolBox3PageMounted,
	    props.toolBox4PageMounted,
	    props.toolBox5PageMounted,
	    showToolBox5Handler,
            showToolBox1Handler,
            showToolBox2Handler,
            showToolBox3Handler,
            showToolBox4Handler
            ]);

     const delay = ms => new Promise(res => setTimeout(res, ms));


     const [showCreateMeetingForm, setShowCreateMeetingForm] = useState(false);



    const showCreateMeetingFormHandler =()=>{
      setShowCreateMeetingForm(true);
    }

    const closeCreateMeetingFormHandler =()=>{
       setShowCreateMeetingForm(false);
       //props.onPress();
    }









return (


<div className={classes.topToolBar}>



   {showCreateMeetingForm && <CreateMeetingForm onPress={closeCreateMeetingFormHandler} selectedCourse={props.selectedCourse} userData={props.userData} /> }


    <div className={classes.innerBoxTopBar}>

         <div className={classes.leftInnerBoxTopBar}>
        	<div className={classes.TitleBox1}> 
	           
	               Meetings in your course 
	          
	        </div>
	        
	        <div className={classes.TitleBox2}> 
	        
                   <button type="button" className={classes.createMeetingButton} onClick={showCreateMeetingFormHandler}> +Create a meeting </button>

	        </div>
		
         </div>


         <div className={classes.rightButtonsBox}>         
              <TopToolBox toolBoxStyle = {toolBox1Style} 
	             onPress = {showToolBox1Handler} 
	             icon={BsFillGrid3X3GapFill} 
	             iconName="Upcoming"
	             notificationNum="0"
	             />
              <TopToolBox toolBoxStyle = {toolBox2Style} 
	             onPress = {showToolBox2Handler} 
	             icon={CgNotes} 
	             iconName="Previous"
	             notificationNum="0"
	             />
             <TopToolBox toolBoxStyle = {toolBox3Style} 
	             onPress = {showToolBox3Handler} 
	             icon={RiVideoLine} 
	             iconName="All"
	             notificationNum="0"
	             />

	     {/*
             <TopToolBox toolBoxStyle = {toolBox4Style}
                     onPress = {showToolBox4Handler} 
                     icon={AiOutlineFile}
                     iconName="Files"
                     notificationNum="0"
                     />

	    <TopToolBox toolBoxStyle = {toolBox5Style}
                     onPress = {showToolBox5Handler}
                     icon={BsLink45Deg}
                     iconName="Links"
                     notificationNum="0"
                     />
             */}		     
        </div>







    </div>
   
   
</div>


);


}

export default TopToolBar;


