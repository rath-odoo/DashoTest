import React,{useState,memo} from 'react';
import classes from './TopToolBoxV1.module.css';
import {BsLayoutTextSidebarReverse} from 'react-icons/bs';



const TopToolBoxV1=(props)=>{

console.log("Top One Tool Box Rendering");


const TheIcon = props.icon;
//let Icon={props.toolBoxStyle.icon}




 const sectionHandler=()=>{
    props.onPress();

 }




return (

<div className={classes.parentDivBtn}>

   { props.notificationNum !=="0" &&	
   <div className={classes.notificationBox}>
      <i>{props.notificationNum}</i>
   </div>
   }
  <button className={classes.topToolBoxV1} onClick={sectionHandler}>
      <TheIcon className={classes.toolBoxIcon} style={{color:props.toolBoxStyle.iconColor}}/>
      <div  style={{borderStyle: "none", 
		      margin:"auto", 
		      display:"flex",
		      justifyContent:"center",
		      fontSize:"var(--topRightButtonTextFontSize_Course)",
		      color:props.toolBoxStyle.iconTitleColor}}
	              >
	<b>{props.iconName}</b>
      </div>	
  </button>
  
  <div className={classes.highLightDiv} style={{background: props.toolBoxStyle.highLightColor}}>

  </div>	
  
</div>

);

}

export default memo(TopToolBoxV1);
