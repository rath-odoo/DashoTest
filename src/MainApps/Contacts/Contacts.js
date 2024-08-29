import React,{useState,useEffect, useRef} from "react";
import classes from '../CommonAppUtilities/MainAppContainer.module.css';


//import TopTitleBar from '../Account/Common/TopTitleBar';
import ContentDivContacts from './ContentDivContacts';



const Contacts = (props) =>{

  let title="My Contacts";	


  const [sideNavBarWidth,setSideNavBarWith]=useState("calc( 0.5% + "+props.sideNavBarWidth+" )");

  const [profileWidth,setProfileWith]=useState('calc( 99% - var(--sideNavBarWidth) )')	

  const isMounted = useRef(false);

  useEffect(() => {
      setSideNavBarWith("calc( 0.5% + "+props.sideNavBarWidth+" )");
      if(props.sideNavBarWidth==="var(--sideNavBarWidth)"){setProfileWith('calc( 99% - var(--sideNavBarWidth) )');}
      if(props.sideNavBarWidth==="var(--sideNavBarWidthOnContract)"){setProfileWith('calc( 99% - var(--sideNavBarWidthOnContract) )');}




   }, [props.sideNavBarWidth]);

   useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
            isMounted.current = false
            props.passMountInfo(false);
    }
   }, [props]);










  const styles = {color: 'white',backgroundColor: '#919191'}




return (
  

	
<div className={classes.mainAppContainer} style={{left:sideNavBarWidth, width:profileWidth}}>
   
    {/* 
       <TopInfoBarUserProfile styles={styles} selectedCourse={props.selectedCourse}/>      
       <TopTitleBar title={title} userData={props.userData}/>	  
    */}

    
    <ContentDivContacts userData={props.userData} rerender={props.rerender}/>
   


	
</div>

);

}



export default Contacts;


