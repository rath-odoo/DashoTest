import React from 'react';
import classes from './DetailContentDiv.module.css';
import base from '../../CommonAppUtilities/AppContentDiv.module.css';
import DetailChildContentDivTeacher from './components/Teacher/DetailChildContentDiv';
import { useHistory } from "react-router-dom";

const DetailContentDiv=(props)=>{

  let history = useHistory();

  const goBackToMeetings=()=>{

   history.push("/meetings/overview");


  }




return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>

 




  
     <div className={base.pwdAppDirectory}> 
	  <i className={base.pwdAppDirectoryText}> 
	    <span onClick={goBackToMeetings} className={classes.moveToMeetings}> Meetings </span>  
	    <span className={classes.detailMeeting}> Detail View </span> 
	  </i>   
     </div>
   



	      <DetailChildContentDivTeacher
               userData={props.userData}
               selectedCourse={props.selectedCourse}

	     />




</div>


</div>	

);

}


export default DetailContentDiv;
