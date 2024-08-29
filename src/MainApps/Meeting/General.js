import React,{useState,useEffect,useRef} from "react";
//import classes from "./MainAppContainer.module.css"
//import classes from "./MainAppContainer.module.css"
import classes from "../CommonAppUtilities/MainAppContainer.module.css"

//import TopInfoBarGeneral from './TopInfoBarGeneral';
//import TopTitleBar from '../CommonAppUtilities/TopTitleBar';
import GeneralContentDiv from './GeneralContentDiv';
import {BsLayoutTextSidebarReverse, BsFillCameraReelsFill, BsPencilSquare} from 'react-icons/bs';
import {GiTeacher} from "react-icons/gi";
import {CgClipboard} from 'react-icons/cg';
import Separator from "../CommonAppUtilities/Separator";
//import TopToolBox from './components/Teacher/TopToolBoxV1';
import {Route,Switch, useHistory} from 'react-router-dom';



const General=(props)=>{

    
   const [sideNavBarWidth,setSideNavBarWidth]=useState( "calc( 0.5% + "+props.sideNavBarWidth+" )");
   const [mainAppContainerWidth,setMainAppContainerWidth]=useState('calc( 99% - var(--sideNavBarWidth) )');	

   const isMounted = useRef(false);


   useEffect(() => {
      isMounted.current = true;	   
      setSideNavBarWidth("calc( 0.5% + "+props.sideNavBarWidth+" )");
      if(props.sideNavBarWidth==="var(--sideNavBarWidth)"){setMainAppContainerWidth('calc( 99% - var(--sideNavBarWidth) )');}
      if(props.sideNavBarWidth==="var(--sideNavBarWidthOnContract)"){setMainAppContainerWidth('calc( 99% - var(--sideNavBarWidthOnContract) )');}


      return () => { 
      }

   }, [props.sideNavBarWidth]);


   useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);	   
    return () => { 
	    isMounted.current = false 
            props.passMountInfo(false);
    }
   }, [props]);



   let title="General"	
   let mainAppContainerStyle = {
	   left: sideNavBarWidth, 
	   width: mainAppContainerWidth
   }
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}

   const showcreateCourseForm=()=>{

   }

      const [toolBoxStyle1, setToolBoxStyle1] = useState(
      {
         buttonBkgColor: 'var(--clickBtnColorDashBackground)',
         buttonTxtColor:'var(--clickBtnColorDash)',
         boxBkgColor: 'white',
         boxTxtColor:'var(--themeColor)',
         rightTopBoxColor: 'green',
         buttonText:'+Create a Course',
         mainText:'TOTAL COURSES',
         mainNumber:1,
         topRightText:'Ongoing',
         topRightNumber:1,
         icon:{BsLayoutTextSidebarReverse},
         iconName:"Courses"
      });


   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >


          {/*     	    
          <TopInfoBarGeneral styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>	          
          <Separator/>	    	    
          <TopTitleBar title={title}/>
	  */}  


	   <GeneralContentDiv 
	     dashboardCourses={props.dashboardCourses}
	     socketObj = {props.socketObj}
	     userData = {props.userData}
	     rerender={props.rerender}
	     passMeetingMountInfo={props.passMeetingMountInfo}
	     />
          








        </div>
      

   );
}

export default General;

