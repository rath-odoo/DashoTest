import React,{useState,useEffect} from 'react';
import classes from './OverviewContentDiv.module.css';
import base from '../CommonAppUtilities/AppContentDiv.module.css';

import TopToolBarTeacher from './components/TopToolBar';
import MeetingsGridContainerTeacher from './components/MeetingsGridContainer'
import {getuser} from '../../CommonApps/AllAPICalls';


const OverviewContentDiv=(props)=>{



    const [rerender,setRerender] = useState(false);
    const reRenderHandler=()=>{
      setRerender(!rerender);
      props.onPress();
    }


    const [showNoticeBoard, setShowNoticeBoard]= useState(false);


    const showTNoticeBoard=()=>{
        setShowNoticeBoard(true);
    }

    const [data, setData] = useState({
       "dashboardcourses": []
    });

    useEffect(()=>{
        getuser({setData});
    },[rerender])





return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>

 <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}> Meetings </i>   </div>




   <TopToolBarTeacher 
	onPress={reRenderHandler}  
	showNoticeBoard={showTNoticeBoard}  
	dashboardCourses={props.dashboardCourses}
        selectedCourse={props.selectedCourse}
	userData={props.userData}
	/>

   


</div>


</div>	

);

}


export default OverviewContentDiv;
