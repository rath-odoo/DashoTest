import {useState, useEffect } from 'react';
import classes from './InstituteNamesDropDown.module.css';
import OutsideAlerter from '../../CommonApps/OutsideAlerter';




const InstituteNamesDropDown=(props)=>{




  const selectInstituteHandler=(instituteId)=>{
      console.log("instituteId: ", instituteId);
      localStorage.setItem('selectedInstituteId',instituteId);
      window.location.reload();
  }




  console.log("myInstitutes: ", props.myInstitutes);

return <OutsideAlerter setDropDown={props.setDropDown}> 

   <div className={classes.instituteNamesDropDown}>


  { props.myInstitutes.map((institute, index)=>{		

	let instituteId = institute.id;
      return <button className={classes.oneInstitute} type="button" key={index} onClick={()=>selectInstituteHandler(instituteId)}>

               <div className={classes.logoDiv}> <img src={institute.logo} className={classes.logoImage} /></div>           		
               <div className={classes.instDiv}> 
                  <div className={classes.instNameText}> 
		     {institute.name}   
		  </div>
	          <div className={classes.instRelation}> You are {institute.relationship} of this institute </div>
               </div>
	   
             </button>

      })
    }	  
   </div>
</OutsideAlerter>		

}


export default InstituteNamesDropDown;
