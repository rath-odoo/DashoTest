import React,{useState,useEffect,useRef} from "react";
import classes from "../../CommonAppUtilities/MainAppContainer.module.css"
import TopInfoBarDetail from './TopInfoBarDetail';
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import DetailContentDiv from './DetailContentDiv';


const Detail=(props)=>{

   
   const [sideNavBarWidth,setSideNavBarWidth]=useState("calc( 0.5% + "+props.sideNavBarWidth+" )");
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







   //let title="Detail"	
   let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
	   {/*
      <TopInfoBarDetail styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>
      
      <TopTitleBar title={title}/>
      */}

      <DetailContentDiv userData={props.userData} selectedCourse={props.selectedCourse}/>

      </div>

   );
}

export default Detail;

