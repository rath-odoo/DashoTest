import React,{useState,useEffect} from 'react';
import base from '../CommonAppUtilities/AppContentDiv.module.css';
import classes from './VATChatContentDiv.module.css';
import ChatNavBar from './ChatNavBar/ChatNavBar';
//import ChatWindow from './ChatWindow/ChatWindowNew';
//import ChatWindow from './ChatWindow/ChatWindowNewBackUp';
import ChatWindow from './ChatWindow/ChatWindowTest';
import {getallusers,getuser} from '../../CommonApps/AllAPICalls';
import AChatWindow from './AkshayChatWindow/ChatWindow';
import AChatNavBar  from './AkshayChatNavBar/ChatNavBarV1';


const VATChatContentDiv=(props)=>{





    const [clickedGroupId,setClickedGroupId]=useState(0);
	const [splender,setSplender] = useState(false);

    //const delay = ms => new Promise(res => setTimeout(res, ms));

    const switchGroupHandler=async(groupId)=>{
            //console.log("group Id ", groupId);      
	    //setClickedGroupId(groupId);
	    //localStorage.setItem('clickedChatGroupId',groupId );
	    //await delay(3000);
	    setClickedGroupId(groupId);
    }

	const switchRenderHandler=async(lender)=>{
	setSplender(lender);
}








return (

<div className={base.appContentDiv}>

 <div className={classes.contentDiv}>

   
   <AChatNavBar userData={props.userData} 
	       switchGroupHandler={switchGroupHandler}
	       selectedCourse={props.selectedCourse}
		   splender={splender}
	       />	
	 	
   <AChatWindow userData={props.userData}
	       clickedGroupId={clickedGroupId}
			setSplender={switchRenderHandler}
	       />
       
 </div>
</div>

);

}


export default VATChatContentDiv;
