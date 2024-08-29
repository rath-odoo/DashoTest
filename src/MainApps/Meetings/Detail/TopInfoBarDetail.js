import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarDetail =(props) =>  {

   {/*	
   let history = useHistory();

   const moveToOverview=()=>{
   history.push('/class/overview');
   }

   const moveToSpecifics=()=>{
   history.push('/class/specifics');
   }
   */}









  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
       {/*      
       <TopInfoBarButton  onPress={moveToOverview}  buttonName={'Overview'}/>

       <TopInfoBarButton  styles={props.styles} buttonName={'Detail'}/>

       <TopInfoBarButton onPress={moveToSpecifics}   buttonName={'Insights'}/>
	*/}  




  </div>

);	
}

export default TopInfoBarDetail;
