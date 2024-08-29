import React,{useState, useEffect} from 'react';
import classes from './UserHead.module.css';
import { FaCaretDown } from "react-icons/fa";
import UserHeadDropDown from './UserHeadDropDown';
//import basewebURL from '../../../../basewebURL';
//import {getuser} from '../../../../CommonApps/AllAPICalls';
//import Greeting from './Greeting';



const UserHead =(props)=>{

   const [dropDown, setDropDown] = useState(false);


   const clickHandler = () =>{
     setDropDown(true);
   }


   const clickItem = ()=>{
     setDropDown(false);
   }


   let imageurl;
   imageurl= props.userData.profile_image;






return (



<div className={classes.UserHeadDiv}>




<button className={classes.UserHeadButton} onClick={clickHandler}>
  <i className={classes.UserFirstName}> 
    	{props.userData.firstname}

  </i>	
	
  <FaCaretDown className={classes.UsersIconHead} />         
	<img className={classes.userImage} src={imageurl} alt='edr Logo' />
	{/*
        <span className={classes.userType}>
	     { props.userData.usertype===1 && <i><b>T</b></i>}
	     { props.userData.usertype===2 && <i><b>S</b></i>}
	     { props.userData.usertype===3 && <i><b>M</b></i>}
	     { props.userData.usertype===4 && <i><b>E</b></i>}
	</span>  
	*/}
</button>

  { dropDown && <UserHeadDropDown  buttonClick={dropDown} clickItem={clickItem} setDropDown={setDropDown}   />}


</div>


);

}


export default UserHead;

