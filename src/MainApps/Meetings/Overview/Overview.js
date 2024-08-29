import React,{useState,useEffect,useRef} from "react";
import classes from "../CommonAppUtilities/MainAppContainer.module.css"
import TopInfoBarOverview from './TopInfoBarOverview';
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import OverviewContentDiv from './OverviewContentDiv';
import Separator from "../CommonAppUtilities/Separator";

const Overview=(props)=>{

   
   const [sideNavBarWidth,setSideNavBarWidth]=useState(props.sideNavBarWidth);
   const [mainAppContainerWidth,setMainAppContainerWidth]=useState('calc( 100% - var(--sideNavBarWidth) )');	

   const isMounted = useRef(false);


   useEffect(() => {
      isMounted.current = true;	   
      setSideNavBarWidth(props.sideNavBarWidth);
      if(props.sideNavBarWidth==="var(--sideNavBarWidth)"){setMainAppContainerWidth('calc( 100% - var(--sideNavBarWidth) )');}
      if(props.sideNavBarWidth==="var(--sideNavBarWidthOnContract)"){setMainAppContainerWidth('calc( 100% - var(--sideNavBarWidthOnContract) )');}


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







   //let title="Overview"	
   let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
      <TopInfoBarOverview styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>

      
      <Separator/>

      	    
      <OverviewContentDiv 
	   userData={props.userData} 
	   onPress={props.onPress} 
	   dashboardCourses={props.dashboardCourses}
	   selectedCourse={props.selectedCourse}
	   />
      
      </div>
      

   );
}

export default Overview;

