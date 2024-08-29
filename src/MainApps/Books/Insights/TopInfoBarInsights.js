import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
import { useHistory } from 'react-router-dom';


const  TopInfoBarInsights =(props) =>  {

   let history = useHistory();

   const moveToFindBook=()=>{
   history.push('/books/findbook');
   }

   const moveToRead=()=>{
   history.push('/books/read');
   }










  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>
      
       <TopInfoBarButton  onPress={moveToFindBook}  buttonName={'FindBook'}/>

       <TopInfoBarButton  onPress={moveToRead} buttonName={'Read'}/>

       <TopInfoBarButton styles={props.styles}  buttonName={'Insights'}/>
	  




  </div>

);	
}

export default TopInfoBarInsights;
