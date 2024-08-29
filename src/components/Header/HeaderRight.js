import classes from './HeaderRight.module.css';
import React from 'react';

import ActionItemsHead from './HeaderRight/ActionItemsHead/ActionItemsHead';
import NotificationsHead from './HeaderRight/NotificationsHead/NotificationsHead';
import MessagesHead from './HeaderRight/MessagesHead/MessagesHead';
import UserHead from './HeaderRight/UserHead/UserHead';


import {FaUsers} from 'react-icons/fa';

function HeaderRight(props){



return (

<div className={classes.headerRight}>






  <ActionItemsHead
	userData={props.userData}
	dashboardCourses={props.dashboardCourses}
	rerender={props.rerender}
	/>

  <NotificationsHead/>  
 
  <MessagesHead/>	

  <UserHead userData={props.userData}/>	
  
	

</div>

);


}

export default HeaderRight;
