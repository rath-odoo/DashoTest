import React from 'react';
import classes from './DetailContentDiv.module.css';
import base from '../../CommonAppUtilities/AppContentDiv.module.css';
import DetailChildContentDivTeacher from './components/Teacher/DetailChildContentDiv';


const DetailContentDiv=(props)=>{




return (

<div className={base.appContentDiv}>


<div className={classes.contentDiv}>
     {/*
        <div className={base.pwdAppDirectory}> <i className={base.pwdAppDirectoryText}>Dashboard / Subject </i>   </div>
     */}



	      <DetailChildContentDivTeacher
               userData={props.userData}
               selectedCourse={props.selectedCourse}

	     />















</div>


</div>	

);

}


export default DetailContentDiv;
