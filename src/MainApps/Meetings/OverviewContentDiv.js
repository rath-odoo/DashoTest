import React,{useState,useEffect} from 'react';
import classes from './OverviewContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';

import TopToolBar from './components/TopToolBarV1';
import MeetingsGridContainerTeacher from './components/MeetingsGridContainer'
import {getuser} from '../../CommonApps/AllAPICalls';


const OverviewContentDiv=(props)=>{



    const [rerender,setRerender] = useState(false);
    const reRenderHandler=()=>{
      setRerender(!rerender);
      props.onPress();
    }


    const [toolBox1PageMounted, setToolBox1PageMounted] = useState(false);
    const [toolBox2PageMounted, setToolBox2PageMounted] = useState(false);
    const [toolBox3PageMounted, setToolBox3PageMounted] = useState(false);
    const [toolBox4PageMounted, setToolBox4PageMounted] = useState(false);
    const [toolBox5PageMounted, setToolBox5PageMounted] = useState(false);




     const showToolBox1PageContentHandler=()=>{
     }

     const showToolBox2PageContentHandler=()=>{
     }

     const showToolBox3PageContentHandler=()=>{
     }

     const showToolBox4PageContentHandler=()=>{
     }

     const showToolBox5PageContentHandler=()=>{
     }
















return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>

 <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> Meetings </i>   </div>


                  <TopToolBar
                               userData = {props.userData}
                               onPress= {props.rerender}
                               showToolBox1PageContent = {showToolBox1PageContentHandler}
                               showToolBox2PageContent = {showToolBox2PageContentHandler}
                               showToolBox3PageContent = {showToolBox3PageContentHandler}
                               showToolBox4PageContent = {showToolBox4PageContentHandler}
                               showToolBox5PageContent = {showToolBox5PageContentHandler}
                               toolBox1PageMounted = {toolBox1PageMounted}
                               toolBox2PageMounted = {toolBox2PageMounted}
                               toolBox3PageMounted = {toolBox3PageMounted}
                               toolBox4PageMounted = {toolBox4PageMounted}
                               toolBox4PageMounted = {toolBox5PageMounted}
                               selectedCourse = {props.selectedCourse}
                               />

   
                  <MeetingsGridContainerTeacher 
	                     rerender={reRenderHandler} 
	                     courseData={props.dashboardCourses} 
	                     userData={props.userData}
	                     selectedCourse={props.selectedCourse}
	                 /> 



</div>


</div>	

);

}


export default OverviewContentDiv;
