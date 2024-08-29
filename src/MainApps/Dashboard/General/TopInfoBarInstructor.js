import React,{useState,useEffect} from "react";
import classes from './TopInfoBarInstructor.module.css';
//import {getuserbyId} from '../../CommonApps/AllAPICalls';
import {BsClock} from 'react-icons/bs';

const TopInfoBarInstructor = ( props) => {

    const [userData, setUserData]=useState({
	usertitle: "",
	firstname:" N/A ",
	lastname:""

    });

   const [dt, setDt] = useState(new Date().toLocaleString());

   /*
   useEffect(() => {
    let secTimer = setInterval( () => {
      setDt(new Date().toLocaleString())
    },10000)

    return () => clearInterval(secTimer);
   }, []);
   */





   const current = new Date();
   const time = current.toLocaleTimeString("en-US");




return (


  <div className={classes.topInfoBar__instructor}> 
	<i className={classes.topInfoBar__time}>
	  diracAI 
	</i>
  </div>


);	



}


export default TopInfoBarInstructor;

