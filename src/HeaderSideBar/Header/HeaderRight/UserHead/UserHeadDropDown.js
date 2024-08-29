import React, { useState } from 'react';
import classes from './UserHeadDropDown.module.css';
import { FaRegUser } from "react-icons/fa";
import { FiSettings,FiHelpCircle,FiLogOut } from "react-icons/fi";
import { useHistory } from 'react-router-dom';
import OutsideAlerter from "./OutsideAlerter";
import {Logout} from '../../../../CommonApps/Logout';

import {AiOutlineDollarCircle} from 'react-icons/ai';


const UserHeadDropDown = (props) =>{


 let history = useHistory();




 const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
 const logoutPopup =()=>{
  setShowDeleteConfirm(true);
}



 const logoutHandler =()=>{


   Logout();

 }


  const ProfileHandler =()=>{
    localStorage.removeItem('preferredCourseId');
    props.clickItem();
    history.push('/account/userprofile');
  }


  const settingsHandler =()=>{
    localStorage.removeItem('preferredCourseId');
    props.clickItem();
    history.push('/account/settings');
  }


 const billingHandler =()=>{
   localStorage.removeItem('preferredCourseId');
   props.clickItem();
   history.push('/account/billing');	
 }

 const helpCentreHandler =()=>{
   localStorage.removeItem('preferredCourseId');
   props.clickItem();
 }




return (

<OutsideAlerter setDropDown={props.setDropDown}>

<div className={classes.DropDown} >
  <i className={classes.profile} onClick={ProfileHandler} > <FaRegUser className={classes.icons}/>Profile</i>
  <i onClick={settingsHandler}> <FiSettings className={classes.icons}/>Settings </i>
  	
  <i onClick={billingHandler}> <AiOutlineDollarCircle className={classes.icons}/>Billing</i>
  
  <i onClick={helpCentreHandler}> <FiHelpCircle className={classes.icons}  />Help Center</i>
  <i className={classes.logout}  onClick={logoutPopup}><FiLogOut className={classes.icons}  />Logout</i>

{showDeleteConfirm && (
            <div className={classes.overLay}>
              <div className={classes.confirmDialog}>
                <p className={classes.p}>Are you sure you would like to Logout?</p>
                <div className={classes.div}>
                  <button
                    className={classes.deleteNo}
                    onClick={() => {
                      setShowDeleteConfirm(false); 
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className={classes.deleteYes}
                    onClick={logoutHandler}
                  >
                    Yes, Logout
                  </button>
                </div>
              </div>
            </div>
          )}
</div>	


</OutsideAlerter>


);

}


export default UserHeadDropDown;

