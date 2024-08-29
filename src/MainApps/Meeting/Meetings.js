import React,{useEffect,useRef, useState} from "react";
import classes from './Meetings.module.css';
import MeetingsContainer from './MeetingsContainer';
import {Route,Switch} from 'react-router-dom';
import CreateMeetingForm from './Forms/CreateMeetingForm_v1';




const Meetings=(props)=>{

  {/*
   const isMounted = useRef(false);

    useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
            isMounted.current = false
            props.passMountInfo(false);
    }
   }, [props]);
   */}


   const [showCreateMeetingForm, setShowCreateMeetingForm] = useState(false);


  const closeCreateMeetingForm=()=>{

  setShowCreateMeetingForm(false);
  props.rerender();

  }


  let selectedCourse=[]



return (
	<>

   <div className={classes.switchBar}>
      <button className={classes.createMeetingButton} type="button" onClick={()=>setShowCreateMeetingForm(true)}> 
        	<b>+Create a meeting</b>
      </button>
   </div>


     { showCreateMeetingForm && 

      <CreateMeetingForm onPress={closeCreateMeetingForm} 
	              selectedCourse={selectedCourse} 
	              userData={props.userData}
	             />
    }

    <div className={classes.meetings}>               
                <MeetingsContainer userData={props.userData}
                   passMeetingMountInfo={props.passMeetingMountInfo}
                   passOneMeetingMountInfo={props.passOneMeetingMountInfo}
	           userData={props.userData}
	         />             
    </div>


</>);		

}

export default Meetings;
