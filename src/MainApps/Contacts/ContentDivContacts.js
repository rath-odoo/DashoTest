import React, { useState,useEffect } from 'react';
import classes from './ContentDivContacts.module.css';

import ContactsContainer from './ContactsContainer';


import {getmycontacts} from '../../CommonApps/AllAPICalls';

const ContentDivUserProfile=(props)=>{


  //const [myContacts, getMyContacts] = useState(null);


  //useEffect(()=>{
  //   getmycontacts({getMyContacts});
  //},[]);


  //console.log("myContacts:ateeb ", myContacts);





return (

<div className={classes.contentDivUserProfile}>

 
    <ContactsContainer userData={props.userData} rerender={props.rerender}
	               />	

  
</div>

);

}


export default ContentDivUserProfile;
