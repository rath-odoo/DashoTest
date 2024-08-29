import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarOverview =(props) =>  {
   /*
   let history = useHistory();

   const moveToDetail=()=>{
   history.push('/class/detail');
   }

   const moveToSpecifics=()=>{
   history.push('/class/specifics');
   }
   */









  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
       {/*      
       <TopInfoBarButton  styles={props.styles}  buttonName={'Overview'}/>

       <TopInfoBarButton  onPress={moveToDetail} buttonName={'Detail'}/>

       <TopInfoBarButton onPress={moveToSpecifics}   buttonName={'Insights'}/>
      */}




  </div>

);	
}

export default TopInfoBarOverview;
