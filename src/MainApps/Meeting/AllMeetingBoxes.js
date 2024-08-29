import React,{useRef, useState, useEffect} from 'react';
import MeetingViewShort from './MeetingViewShort';
import MeetingViewShort_v2 from './MeetingViewShort_v2';


import {getgeneralmeetings } from '../../CommonApps/AllAPICalls';


const AllMeetingBoxes=(props)=>{


  {/*	
  const isMounted = useRef(false);

    useEffect(() => {
    isMounted.current = true;
    props.passMeetingMountInfo(true);
    return () => {
            isMounted.current = false
            props.passMeetingMountInfo(false);
    }
   }, [props]);
  */}


  const [generalMeetings, getGeneralMeetings]= useState(null);

  const [rerender, setRerender]= useState(false);



  useEffect(()=>{


  getgeneralmeetings({getGeneralMeetings});


   },[getGeneralMeetings, rerender, props.userData]);


  const rerenderHandler=()=>{
   setRerender(rerender=>!rerender);
  }






return (

<div  >

   { generalMeetings !==null && generalMeetings.generalmeetings.length > 0 &&     
            generalMeetings.generalmeetings.map((meeting,index)=>{
                    
                    return <MeetingViewShort_v2 key={index} 
		                         Meeting={meeting}  
		                         userData={props.userData} 
		                         rerender={rerenderHandler}
		                         goToMeetingDetail={props.goToMeeting}
			     />

             }) 
   }


</div>

);

}


export default AllMeetingBoxes;
