import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
import { useHistory } from 'react-router-dom';


const  TopInfoBarSpecifics =(props) =>  {

   let history = useHistory();

   const moveToOverview=()=>{
   history.push('/class/overview');
   }

   const moveToDetail=()=>{
   history.push('/class/detail');
   }










  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
      
       <TopInfoBarButton  onPress={moveToOverview}  buttonName={'Overview'}/>

       <TopInfoBarButton  onPress={moveToDetail} buttonName={'Detail'}/>

       <TopInfoBarButton styles={props.styles}  buttonName={'Insights'}/>
	  




  </div>

);	
}

export default TopInfoBarSpecifics;
