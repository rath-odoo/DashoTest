import React,{useState,useEffect} from "react";
import classes from "./LeftUserBoxContainer.module.css"
import LeftNewUserBox from "./LeftNewUserBox";
//import classimg from '../../../../../images/groupImage.png';
import {createchatgroup,getfewusers, usersearchgeneral, checkifuseradded} from '../../../../CommonApps/AllAPICalls';
//import basewebURL from "../../../../../basewebURL";
import TopLeftSearchBarNewUser from "./TopLeftSearchBarNewUser";



const LeftUserBoxContainer = (props) =>{


   // const [usersData, setUsersData ] = useState(props.usersData);
   // const [data, setData]=useState(props.data );
   const [searchedUsers, getSearchedUsers] = useState(null)
   const [searchString, setSearchString] =  useState("+91");

   const [userExists, setUserExists ] = useState(false);

   const [pageNo , setPageNo] = useState(1);

   useEffect(()=>{

     let pageno=pageNo;
     usersearchgeneral({pageno,searchString, getSearchedUsers});
     return ()=>{
         getSearchedUsers(searchedUsers=>null);

        }
	 
	 getSearchedUsers(searchedUsers=>null);   

   },[searchString,pageNo]);


    const createOneOOneGroup=({userId})=>{
      
      	    
      
      let groupMembers = [userId, props.userData.id]; 
      const maxId = Math.max.apply(null, groupMembers);
      const minId = Math.min.apply(null, groupMembers);
      const groupname='a'+maxId+'a'+minId+'a';	    
      createchatgroup({groupname,groupMembers});

    }



   const createGroupHandler = (userId) =>{

     let guestId=userId;	   
     checkifuseradded({userId, setUserExists, createOneOOneGroup});

   }


  //console.log("userExists: ", userExists !==null ? userExists.exists:"Not Valid");


   const loadNextPageDataHandler=()=>{
     //console.log("more user data requested");
     setPageNo(pageNo=>pageNo+1); 
   }


   const loadPrevPageDataHandler=()=>{
     //console.log("more user data requested");
     setPageNo(pageNo=>pageNo-1);
   }




 // const [y, setY] = useState(0);

  const wheelHandler=()=>{/*

    console.log('onWheel: scrolling the list...', window.scrollY);
   if (y > window.scrollY) {
      console.log("scrolling up");
    } else if (y < window.scrollY) {
      console.log("scrolling down");
    }

    setY(window.scrollY);


  */}









   //console.log("search string:  ", searchString);
   //console.log("searchedUser.results: ", searchedUsers);

return(


<>

<TopLeftSearchBarNewUser setSearchString={setSearchString}  setPageNo={setPageNo}/>

<div className={classes.leftUserBoxContainer} onWheel={wheelHandler}>

     { pageNo >1 &&
     <button type="button" onClick={loadPrevPageDataHandler} className={classes.loadMoreDataButton}>

           Load previous data

      </button>
     }



      {/* in future change this logic. This must interfere performance*/}

      {/*usersData.filter(
           function(user) {
         if (user.id === data.id) {
              return false; 
              }
                  return true;
             })


            .map((user,index)=>{

	      
             return    <LeftNewUserBox key={index} userImage={user.profile_image} 
		                       userName={user.firstname !==""  && user.lastname !==""? user.firstname+" "+user.lastname: user.username} 
		                       userType={user.usetype}
		                       onPress={()=>createGroupHandler(user.id)}   
			               />
              

           }

      )*/}


      { searchedUsers !==null && searchedUsers.results !==null &&

		      searchedUsers.results.map((user, index)=>{

                           return    <LeftNewUserBox key={index} userImage={user.profile_image} 
                                            userName={user.firstname !==""  && user.lastname !==""? user.firstname+" "+user.lastname: user.username} 
                                            onPress={()=>createGroupHandler(user.id)}                                                                                                                 />

		      })

      }






     { searchedUsers !==null && searchedUsers.results !==null && searchedUsers.next !==null &&

      <button type="button" onClick={loadNextPageDataHandler} className={classes.loadMoreDataButton}>
           
	   Load more data

      </button>

     }


</div>

</>

);

}

export default LeftUserBoxContainer;
