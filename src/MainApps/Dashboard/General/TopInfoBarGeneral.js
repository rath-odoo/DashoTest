import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
//import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarInstructor from './TopInfoBarInstructor';

//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarGeneral =(props) =>  {
   /*
   let history = useHistory();

   const moveToSubject=()=>{
   history.push('/dashboard/subject');
   }

   const moveToNews=()=>{
   history.push('/dashboard/news');
   }
   */










  return (

  <div className={classes.topInfoBar}>
                
       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
        


        {/*   
       <TopInfoBarButton  styles={props.styles}  buttonName={'General'}/>

       <TopInfoBarButton  onPress={moveToSubject} buttonName={'Subject'}/>

       <TopInfoBarButton onPress={moveToNews}   buttonName={'Insights'}/>
	*/}  


  </div>

);	
}

export default TopInfoBarGeneral;
