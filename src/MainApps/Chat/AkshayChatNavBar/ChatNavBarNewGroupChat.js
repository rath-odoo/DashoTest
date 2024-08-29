import React,{useState,useEffect,useRef} from "react";
import classes from "./ChatNavBar.module.css";
import {AiOutlineClose} from "react-icons/ai";
import {BsArrowLeft, BsArrowRight, BsPlusCircle} from "react-icons/bs";
import {createchatgroup,getfewusers, usersearchgeneral, 
	checkifuseradded, personalchatgroupsearch, contactsusersearch, 
	getpersonalgeneralchatgroups,personalchatgroupsearchNoappend } from '../../../CommonApps/AllAPICalls';
import UserContainerNewChat from './UserContainerNewChat';
import UserContainer from './UserContainerNewGroup';
import {AiOutlineReload} from 'react-icons/ai';

import OneSelectedUser from './OneSelectedUser';


const ChatNavBarNewChat=(props)=>{


    const [chatGroups, getChatGroups]= useState([]);	
    const [searchedUsers, getSearchedUsers] = useState(null);

    const [searchedChatGroups, getSearchedChatGroups] = useState([]);	

    const [searchString, setSearchString] =  useState("");
    const [userExists, setUserExists ] = useState(false);
    const [pageNo , setPageNo] = useState(1);
    const [rerender, setRerender] = useState(false); 

    const [pageNoPC , setPageNoPC] = useState(1);	
    const [pageNoPCS, setPageNoPCS] = useState(1);


    const [selectedUsers, setSelectedUsers] = useState([]);


    const listInnerRef = useRef();

    const prevPageNoPCS = useRef(pageNoPCS);
    const prevSearchString = useRef(searchString);


    const handleChange=(e)=>{
       setSearchString(searchString=>e.target.value);
       setPageNo(1);
    }

    const handleClearClick =()=>{
      setSearchString(searchString=>"");
    }


    const BackButtonHandler=()=>{
      // props.setShowNewChat(false);
      props.backToAllChats();
    }



    useEffect(()=>{
     
     let courseId = props.selectedCourse !==null ? props.selectedCourse[0].id: null;
     courseId === null && searchString === "" && getpersonalgeneralchatgroups({getChatGroups, pageNoPC});

      //console.log("searchString, prevSearchString: ", searchString,"---",prevSearchString);	    

      if (prevPageNoPCS.current !== pageNoPCS) {
	      //console.log("page increase activated inside useEffect");
	      courseId === null && searchString !== "" && personalchatgroupsearch({searchString,pageNoPCS, getSearchedChatGroups});
      }
    
      if (prevSearchString.current !== searchString){
	      //console.log("search string activated inside useEffect");
	      courseId === null && searchString !== "" && personalchatgroupsearchNoappend({searchString, pageNoPCS, getSearchedChatGroups});
      }	    

     prevSearchString.current = searchString;
     prevPageNoPCS.current = pageNoPCS;	    


     return ()=>{

        }


   },[searchString,pageNoPC,pageNoPCS, rerender]);


   const createGroupHandler = (userId) =>{


   }



   const loadNextPagePCDataHandler=()=>{
      console.log("chatGroups.at(-1).next:  ",chatGroups.at(-1).next);

     if ( chatGroups !==null && chatGroups.length > 0 && chatGroups.at(-1).next !==null ){ setPageNoPC(pageNoPC+1); }

   }


  const loadNextPagePCSDataHandler=()=>{
    
    console.log("next page search");	  

   if ( searchedChatGroups !==null && searchedChatGroups.length > 0 &&searchedChatGroups.at(-1).next !==null ){ 
	   console.log("passing all conditions next page");
	   setPageNoPCS(pageNoPCS+1); 
      }

  }	

 

   console.log("pageNoPCS: ", pageNoPCS);



   const handleChangeGroupName=()=>{


   }	





   const onScrollHandler=(event)=>{

      

       const chatLog = event.target;        
       // console.log("chatLog.scrollTop + chatLog.clientHeight:  ", Math.round(chatLog.scrollTop),'+', chatLog.clientHeight,' = ', Math.round(chatLog.scrollTop)+chatLog.clientHeight);
       //console.log("chatLog.scrollHeight: ", chatLog.scrollHeight);  


       let scrollTopInt = Math.trunc(chatLog.scrollTop);

       if( searchString ==="" && scrollTopInt+chatLog.clientHeight ===  chatLog.scrollHeight ){
           loadNextPagePCDataHandler();
       }

       if( searchString !=="" && scrollTopInt+chatLog.clientHeight ===  chatLog.scrollHeight ){
           loadNextPagePCSDataHandler();
       }



   }



    const addUserToGroupHandler=(userDisplayObject)=>{

     if( !selectedUsers.includes(userDisplayObject) ) { 
	     setSelectedUsers( selectedUsers=>[...selectedUsers, userDisplayObject] );
     }

       console.log("userDisplayObject: ", userDisplayObject);

    }



    console.log("selectedUsers: ",selectedUsers );
    



return <div className={classes.chatnavbar} >

    <div className={classes.topBarLeft}>

        <div className={classes.circleImage}>
              <button type="button" className={classes.backButtonNewChat} onClick={BackButtonHandler}>
               <BsArrowLeft size={25}/>
	      </button>	
        </div>

        <div className={classes.btnContainer}>

            <input
               type="text"
               placeholder =" Group Chat Title"
	       className={classes.newGroupNameInput}
               onChange={handleChangeGroupName}         
               />

	    <div className={classes.createGroupButtonParent}>	
               <button type="button" className={classes.createGroupButton}>
                 <BsPlusCircle size={25} />
               </button>
               <div className={classes.createGroupButtonInfoDiv}> Create new group  </div>
	    	
	    </div>	

        </div>

    </div>

    <div className={classes.newChatNewGroup}>
        Add contacts to group chat	
    </div>

    <div className={classes.selectedUsers}>
     {selectedUsers.map((oneUser, index)=>{


	  return <OneSelectedUser key={index}
		                  oneUser={oneUser}
		                  />    

     })

      }	     
     
    </div>

    <div className={classes.searchContainer}>
        <input
          type="text"
          placeholder =  " Search ... "
          className={searchString === "" ? classes.SearchInputNoString : classes.SearchInputString}
          onChange={handleChange}
          value ={searchString}
        />

        { searchString !=="" &&
           <button onClick={handleClearClick} className={classes.closeSearchButton} onClick={handleClearClick}>
             <AiOutlineClose/>
           </button>
        }

    </div>

    <div className={classes.newChatScroll}
	 onScroll = {onScrollHandler}
         ref = {listInnerRef}
	 > 


         { searchString ==="" && props.selectedCourse === null && chatGroups.length > 0 &&


               chatGroups.map((OnePageChatGroup, index )=>{


                return  OnePageChatGroup.results.map((group, index)=>{

                       if(group.groupType==="oneoone" && group.groupuserObjects.length === 2){

                           return   <UserContainer key={index}
                                         userData={props.userData}
                                         group={group}
                                         addUserToGroupHandler={addUserToGroupHandler}
                                         msgNum="0"
				         selectedUsers={selectedUsers}
                                         />
                        }

                  })

             })

         }



         { searchString !=="" && props.selectedCourse === null && searchedChatGroups.length > 0 &&


               searchedChatGroups.map((OnePageChatGroup, index )=>{


                return  OnePageChatGroup.results.map((group, index)=>{

                       if(group.groupType==="oneoone" && group.groupuserObjects.length === 2){

                           return   <UserContainer key={index}
                                         userData={props.userData}
                                         group={group}
                                         addUserToGroupHandler={addUserToGroupHandler}
                                         msgNum="1"
                                         />
                        }

                  })

             })

        }

    </div>





</div>

}

export default ChatNavBarNewChat
