import React,{useState} from "react";
import classes from "./ChatNavBar.module.css"
import TopIdBarLeft from "./TopIdBarLeft"
import TopBackBarLeft from "./AddUser/TopBackBarLeft"
import TopLeftSearchBar from "./TopLeftSearchBar";
//import TopLeftSearchBarNewUser from "./AddUser/TopLeftSearchBarNewUser";
import LeftUserBoxContainer from "./LeftUserBoxContainer";
import LeftNewUserBoxContainer from "./AddUser/LeftNewUserBoxContainer";
//import {CSSTransition} from 'react-transition-group';
import AddUserorGroup from "./AddUserorGroup";



const ChatNavBar = (props) =>{


    const [showAllUsers, setShowAllUsers] = useState(true);	


    const addUserHandler =()=>{
      setShowAllUsers(false);
    }

    const topBackBar =()=>{
     setShowAllUsers(true);
    } 





return(

<div className={classes.chatNavBar}>

    { showAllUsers && <>

        <TopIdBarLeft userData = {props.userData} 
	              onPress = {addUserHandler}
	              />

        <TopLeftSearchBar/>

        <LeftUserBoxContainer  userData={props.userData} 
	                       switchGroupHandler={props.switchGroupHandler}
	                       selectedCourse={props.selectedCourse}
	                       />
       </>	  
    }






   {!showAllUsers && <div className={classes.showUserAddView}  >

       <TopBackBarLeft data={props.userData} onPress={topBackBar}/>

       <AddUserorGroup/>     
     
       <LeftNewUserBoxContainer userData={props.userData} 
	                        onPress={props.onPress}
		              />

       </div>

   }





 








</div> );
	

}

export default ChatNavBar;
