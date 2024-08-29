import {useState, useEffect} from 'react';
import classes from './OneSlot.module.css';
import {useHistory} from 'react-router-dom';
import Login from '../../../CommonApps/Akshay/Login';
import { BsXLg } from "react-icons/bs";

import BookingForm from './BookingForm';

const formatLocalTime = ({datetime}) => {

    //const [userTimeZone, setUserTimeZone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);        


    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = new Date(datetime);
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));
    const formattedDate = localDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const formattedTime = localDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${formattedTime}, ${formattedDate}`;
  };



const formatLocalTime3 = ({ datetime }) => {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = new Date(datetime);
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));

    const formattedDate = localDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const daySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        const lastDigit = day % 10;
        switch (lastDigit) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const formattedTime = localDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const dayWithSuffix = localDate.getDate() + daySuffix(localDate.getDate());

    const monthName = localDate.toLocaleDateString('en-US', { month: 'short' });

    return `${formattedTime}, ${dayWithSuffix} ${monthName} ${formattedDate.substr(6)}`;
};





const formatLocalTime4 = ({ datetime, noOfMinutes }) => {
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const utcDate = new Date(datetime);
    const localDate = new Date(utcDate.toLocaleString('en-US', { timeZone: userTimeZone }));

    // Add minutes to the datetime
    localDate.setMinutes(localDate.getMinutes() + noOfMinutes);

    const formattedStartDate = localDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    // Create a new Date object for end time
    const endDate = new Date(localDate);
    endDate.setMinutes(endDate.getMinutes() + noOfMinutes);

    const formattedEndDate = endDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const formattedDate = localDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const daySuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return 'th';
        }
        const lastDigit = day % 10;
        switch (lastDigit) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    return `${formattedStartDate} - ${formattedEndDate}`;
};
























const OneSlot=(props)=>{

  const history = useHistory();

  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const bookNowButtonHandler=()=>{

     //history.push('/app/home/slots');

	console.log("button clicked"); 
	setShowLogin(showLogin=>true);
  }


  const closeLoginFormHandler=()=>{

	setShowLogin(showLogin=>false);  
  }




   let datetime = props.oneSlot.datetime;
   //<Login setLoggedIn={setLoggedIn} loadedUsername=""/>

   console.log("one slot: ", props.oneSlot);
   let noOfMinutes= props.oneSlot.duration;

return <> <button className={classes.oneSlot} onClick={bookNowButtonHandler}>

         <div className={classes.timeDiv}>		
		<span className={classes.timeSpan}> {formatLocalTime4({datetime, noOfMinutes})} </span> 
         </div>


         {/* showLogin &&
           <div className={classes.loginDiv}>
	     <button className={classes.closeLoginButton} onClick={closeLoginFormHandler}><BsXLg size={20} style={{color:"red"}}/> </button>	 
	     <Login setLoggedIn={setLoggedIn} loadedUsername=""/> 
           </div>
         */}



</button>

       { showLogin &&
            <BookingForm close={closeLoginFormHandler} oneSlot={props.oneSlot}/>
       }

</>


}


export default OneSlot;
