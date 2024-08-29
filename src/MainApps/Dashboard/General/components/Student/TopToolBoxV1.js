import React,{useState} from 'react';
import classes from './TopToolBoxV1.module.css';
import {BsLayoutTextSidebarReverse} from 'react-icons/bs';



const TopToolBoxV1=(props)=>{


const TheIcon = props.icon;
//let Icon={props.toolBoxStyle.icon}




 const sectionHandler=()=>{
    props.onPress();

 }




return (

<div className={classes.parentDivBtn}>
  <button className={classes.topToolBoxV1} onClick={sectionHandler}>
      <TheIcon className={classes.toolBoxIcon} style={{color:props.toolBoxStyle.iconColor}}/>
      <div  style={{borderStyle: "none", 
		      margin:"auto", 
		      display:"flex",
		      justifyContent:"center",
		      fontSize:"20px",
		      color:props.toolBoxStyle.iconTitleColor}}>
	<b>{props.toolBoxStyle.iconName}</b>
      </div>	
  </button>
  
  <div className={classes.highLightDiv} style={{background: props.toolBoxStyle.highLightColor}}>

  </div>	
  

</div>

);

}

export default TopToolBoxV1;
