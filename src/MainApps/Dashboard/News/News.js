import React,{useState,useEffect,useRef} from "react";
import classes from "../../CommonAppUtilities/MainAppContainer.module.css"
import TopInfoBarNews from './TopInfoBarNews';
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import NewsContentDiv from './NewsContentDiv';


const News=(props)=>{

   
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







   //let title="News & Articles"	
   let mainAppContainerStyle={left:sideNavBarWidth, width:mainAppContainerWidth}
   const infoBarActiveButtonColor = {color: 'white',backgroundColor: '#919191'}







   return(

      <div className={classes.mainAppContainer} style={mainAppContainerStyle} >
      <TopInfoBarNews styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>
      {/*
      <TopTitleBar title={title}/>
        */}

      <NewsContentDiv/>

      </div>

   );
}

export default News;

