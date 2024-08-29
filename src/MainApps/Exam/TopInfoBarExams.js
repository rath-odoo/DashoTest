import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';
//import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
//import { useHistory } from 'react-router-dom';


const  TopInfoBarFindBook =(props) =>  {
   /*
   let history = useHistory();

   const moveToRead=()=>{
   history.push('/books/read');
   }

   const moveToInsights=()=>{
   history.push('/books/insights');
   }
  */









  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
       {/*      
       <TopInfoBarButton  styles={props.styles}  buttonName={'FindBook'}/>

       <TopInfoBarButton  onPress={moveToRead} buttonName={'Read'}/>

       <TopInfoBarButton onPress={moveToInsights}   buttonName={'Insights'}/>
       */}	  




  </div>

);	
}

export default TopInfoBarFindBook;
