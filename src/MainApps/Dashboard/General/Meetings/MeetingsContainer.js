import React,{useEffect,useState} from 'react';
import classes from './MeetingsContainer.module.css';
//import ClassViewShort from './ClassViewShort';
import {getgeneralmeetings } from '../../../../CommonApps/AllAPICalls';
import {Route,Switch, useHistory} from 'react-router-dom';
import AllMeetingBoxes from './AllMeetingBoxes';
import OneMeetingDetail from './OneMeetingDetail';





const MeetingsContainer =(props)=>{

   const history = useHistory();



  const rerender=()=>{

  }

   const loadHandler=()=>{

   //history.push('/dashboard/general/meetings/2');

   }

  const [meetingId,setMeetingId] = useState(null);	

  const [meetingURL, setMeetingURL] = useState(null);

  const [meetingPath, setMeetingPath]= useState(null);

  const goToMeetingHandler=({meetingId})=>{
      setMeetingId(meetingId);
      setMeetingPath(`/meetings/${meetingId}`);
      history.push(`/meetings/${meetingId}`);	   
  }


   let selCourse=[];	


  
   	
    useEffect(()=>{
 
     let meetingURL=window.location.href;	        
     let pattern = '/meetings/[1-9]+';
     let result = meetingURL.match(pattern);

     if (result) {
       let urlarray=meetingURL.split("/");

       let meeting_Id=urlarray[urlarray.length-1];
       //console.log("url array: ", meeting_Id);	 
	     
       setMeetingId(meeting_Id);    

       setMeetingPath("/meetings/"+meeting_Id+"/");



    
     }

    },[]);




   //console.log("MEETING CONTAINER LOADED",meetingPath);
   //console.log("MEETING ID", meetingId);


//return <MeetingViewShort key={index} Class={meeting}  userData={props.userData} rerender={rerender} />
return (


<div className={classes.meetingsContainer}>


	<Route  exact path='/meetings' >
            <AllMeetingBoxes passMeetingMountInfo={props.passMeetingMountInfo}
	                     goToMeeting={goToMeetingHandler}
	                     userData={props.userData}

	          />
            
        </Route>
       
        
	<Route  exact path={meetingPath} >
            <OneMeetingDetail
                              passOneMeetingMountInfo={props.passOneMeetingMountInfo}
	                      userData={props.userData}
	                      meetingId={meetingId}
	                      selectedCourse={selCourse}
	                      />
	</Route>
        

</div>


);


}

export default MeetingsContainer;

