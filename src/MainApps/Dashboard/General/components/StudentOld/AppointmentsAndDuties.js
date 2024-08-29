import React from 'react';
import classes from './AppointmentsAndDuties.module.css';
import {BsChevronDoubleDown} from 'react-icons/bs'; 




const AppointmentsAndDuties =()=>{


//const [show, setShow]=useState(false);


const showAppointmentsHandler = ()=>{

//setShow(true);
}



return (

<div className={classes.appointmentsAndDuties}>
  
  <h3>Appointments and duties</h3>	

  <button className={classes.showButton}  onClick={showAppointmentsHandler}> <BsChevronDoubleDown/></button>

  

</div>
);




}


export default AppointmentsAndDuties
