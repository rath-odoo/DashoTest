import React,{useState,useEffect,useRef} from "react";
import classes from "../../CommonAppUtilities/MainAppContainer.module.css"
import TopInfoBarRead from './TopInfoBarRead';
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import ReadContentDiv from './ReadContentDiv';
import Separator from "../../CommonAppUtilities/Separator";

const Read=(props)=>{

   
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







   //let title="Read"	
   let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
	  
      <TopInfoBarRead styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>


      <Separator/>	   

      {/* 
      <TopTitleBar title={title}/>
      */}

      <ReadContentDiv/>

      </div>

   );
}

export default Read;

