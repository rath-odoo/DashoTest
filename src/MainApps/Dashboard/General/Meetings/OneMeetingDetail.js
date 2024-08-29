import React,{useRef,useEffect} from 'react';
import MeetingDetail from './DetailChildContentDiv';

const OneMeetingDetail=(props)=>{
	
 const isMounted = useRef(false);

 useEffect(() => {
    isMounted.current = true;
    props.passOneMeetingMountInfo(true);
    
    return () => {
            isMounted.current = false
            props.passOneMeetingMountInfo(false);
    }
   }, [props]);









return (

<div>

<MeetingDetail userData={props.userData}
          meetingId={props.meetingId}
	  selectedCourse={props.selectedCourse}
	/>

</div>



);

}


export default OneMeetingDetail;
