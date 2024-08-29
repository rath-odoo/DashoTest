import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarSubject =(props) =>  {
   /*
   let history = useHistory();

   const moveToGeneral=()=>{
   history.push('/dashboard/general');
   }

   const moveToNews=()=>{
   history.push('/dashboard/news');
   }
   */









  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>

       {/*	  
       <TopInfoBarButton  onPress={moveToGeneral}  buttonName={'General'}/>

       <TopInfoBarButton  styles={props.styles} buttonName={'Subject'}/>

       <TopInfoBarButton onPress={moveToNews}   buttonName={'Insights'}/>
        */}




  </div>

);	
}

export default TopInfoBarSubject;
