import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
import { useHistory } from 'react-router-dom';


const  TopInfoBarNews =(props) =>  {

   let history = useHistory();

   const moveToGeneral=()=>{
   history.push('/dashboard/general');
   }

   const moveToSubject=()=>{
   history.push('/dashboard/subject');
   }










  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
      
       <TopInfoBarButton  onPress={moveToGeneral}  buttonName={'General'}/>

       <TopInfoBarButton  onPress={moveToSubject} buttonName={'Subject'}/>

       <TopInfoBarButton styles={props.styles}  buttonName={'Insights'}/>
	  




  </div>

);	
}

export default TopInfoBarNews;
