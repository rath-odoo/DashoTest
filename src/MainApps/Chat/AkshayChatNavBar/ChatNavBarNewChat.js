import React,{useState,useEffect} from "react";
import classes from "./ChatNavBar.module.css";
import {AiOutlineClose} from "react-icons/ai";
import {BsArrowLeft} from "react-icons/bs";
import {createchatgroup,getfewusers, usersearchgeneral, checkifuseradded} from '../../../CommonApps/AllAPICalls';

import UserContainerNewChat from './UserContainerNewChat';

import {AiOutlineReload} from 'react-icons/ai';


const ChatNavBarNewChat=(props)=>{


    const [searchedUsers, getSearchedUsers] = useState(null);
    const [searchString, setSearchString] =  useState("");
    const [userExists, setUserExists ] = useState(false);
    const [pageNo , setPageNo] = useState(1);
    const [rerender, setRerender] = useState(false); 



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

     let pageno=pageNo;
     usersearchgeneral({pageno,searchString, getSearchedUsers});
     return ()=>{
         getSearchedUsers(searchedUsers=>null);

        }

         getSearchedUsers(searchedUsers=>null);

   },[searchString,pageNo, rerender]);


   const createGroupHandler = (userId) =>{


   }



   const loadNextPageDataHandler=()=>{
     //console.log("more user data requested");
     setPageNo(pageNo=>pageNo+1);
   }


   const loadPrevPageDataHandler=()=>{
     //console.log("more user data requested");
     setPageNo(pageNo=>pageNo-1);
   }





   console.log("searchedUsers: ", searchedUsers);




return <div className={classes.chatnavbar}>


    <div className={classes.topBarLeft}>

        <div className={classes.circleImage}>
              <button type="button" className={classes.backButtonNewChat} onClick={BackButtonHandler}>
               <BsArrowLeft size={25}/>
	      </button>	
        </div>


        <div className={classes.btnContainer}>


        </div>

    </div>

    <div className={classes.newChatNewGroup}>

      Add users to your chat		

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

    <div className={classes.newChatScroll}> 

    { pageNo >1 &&
        <button type="button" onClick={loadPrevPageDataHandler} className={classes.loadMoreDataButton}>
          <AiOutlineReload/ > <span>Load previous data</span>
        </button>
     }




      { searchedUsers !==null && searchedUsers.results !==null &&

                      searchedUsers.results.map((user, index)=>{

                           return    <UserContainerNewChat key={index} userImage={user.profile_image}
			               user = {user}
                                       userName={user.firstname !==""  && user.lastname !==""? user.firstname+" "+user.lastname: user.username}
                                       onPress={()=>createGroupHandler(user.id)}
			               userData={props.userData}
                                       setRerender={setRerender}
                                       />

                      })

      }


      { searchedUsers !==null && searchedUsers.results !==null && searchedUsers.next !==null &&

         <button type="button" onClick={loadNextPageDataHandler} className={classes.loadMoreDataButton}>

              <AiOutlineReload/ > <span> Load more data</span>

         </button>

      }


    </div>



</div>

}

export default ChatNavBarNewChat
