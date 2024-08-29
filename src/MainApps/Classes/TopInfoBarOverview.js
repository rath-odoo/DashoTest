import React from "react";
import classes from '../CommonAppUtilities/TopInfoBar.module.css';
import TopInfoBarInstructor from '../CommonAppUtilities/TopInfoBarInstructor';


const  TopInfoBarOverview =(props) =>  {







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
