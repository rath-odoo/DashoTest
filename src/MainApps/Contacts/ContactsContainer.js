import React from 'react';


import classes from './ContactsContainer.module.css';

import ContactTitleDiv from './ContactTitleDiv';

import AllFriends from './AllFriends';



const UserProfileContentFriends =(props)=>{

 console.log("userData: ", props.userData);


return (

<div className={classes.allContacts}>
    	
    <ContactTitleDiv userData={props.userData} rerender={props.rerender}/>
    <AllFriends userData={props.userData} rerender={props.rerender}/>
    
</div>
);	

}

export default UserProfileContentFriends;
