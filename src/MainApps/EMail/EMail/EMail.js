import React,{useState,useEffect,useRef} from "react";
import classes from "../CommonAppUtilities/MainAppContainer.module.css"
//import TopInfoBarEMail from './TopInfoBarEMail';
import TopInfoBarGeneral from '../Dashboard/General/TopInfoBarGeneral';
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import EMailContentDiv from "./EMailContentDiv";
import Separator from "../CommonAppUtilities/Separator";



const Email=(props)=>{

   
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







   //let title="Email"	
   let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
 

      {/*
      <TopTitleBar title={title}/>
       */}

      <EMailContentDiv/>	   


      </div>

   );
}

export default Email;

