import React from "react";
import classes from '../../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../../CommonAppUtilities/TopInfoBarInstructor';
import TopInfoBarButton from '../../CommonAppUtilities/TopInfoBarButton.js';
import { useHistory } from 'react-router-dom';

const  TopInfoBarRead =(props) =>  {

   let history = useHistory();

   const moveToFindBook=()=>{
   history.push('/books/findbook');
   }

   const moveToInsights=()=>{
   history.push('/books/insights');
   }










  return (

  <div className={classes.topInfoBar}>

       <TopInfoBarInstructor selectedCourse={props.selectedCourse}/>


        {/*      
       <TopInfoBarButton  onPress={moveToFindBook}  buttonName={'FindBook'}/>

       <TopInfoBarButton  styles={props.styles} buttonName={'Read'}/>

       <TopInfoBarButton onPress={moveToInsights}   buttonName={'Insights'}/>
	 */}  




  </div>

);	
}

export default TopInfoBarRead;
