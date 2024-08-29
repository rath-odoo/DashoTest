import React,{useState, useEffect} from 'react';
import classes from "./AddStudentForm.module.css";
import {AiFillCloseCircle} from 'react-icons/ai';
import {FaSearch} from 'react-icons/fa';
import { usersearchgeneral } from '../../../../CommonApps/AllAPICalls';

import UserBox from './UserBox';


const AddStudentForm=(props)=>{


   const [searchedUsers, getSearchedUsers] = useState(null)
   const [searchString, setSearchString] =  useState("+91");
   const [pageNo , setPageNo] = useState(1);


    useEffect(()=>{

     let pageno=pageNo;
     usersearchgeneral({pageno,searchString, getSearchedUsers});
     return ()=>{
         getSearchedUsers(searchedUsers=>null);
         }
         getSearchedUsers(searchedUsers=>null);

   },[searchString,pageNo]);










   const handleChange=(e)=>{

     setSearchString(searchString=>e.target.value);
     
   }


   const createGroupHandler=()=>{





   }



   console.log("searchedUsers: ",searchedUsers);




return (
<div className={classes.addStudentFormDiv}>


    <div className={classes.formDiv} >
          <div className={classes.closeButtonDiv}>
             <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
          </div>


          <div className={classes.InfoSearchStudent}>
               <b>Find a student and send invite to join your course</b>
          </div>
	  <div className={classes.searchBoxEnrolledStudents}>
                <FaSearch/>
                <input
               type="text"
               onChange={handleChange}
               name="inputText"
               className={classes.input_fieldSearch}
               placeholder="..phone or email or name"
               />

          </div>


          { searchedUsers !==null && searchedUsers.results !==null &&

                      searchedUsers.results.map((user, index)=>{

                           return    <UserBox key={index} userImage={user.profile_image}
                                       userName={user.firstname !==""  && user.lastname !==""? user.firstname+" "+user.lastname: user.username}
                                       onPress={()=>createGroupHandler(user.id)}
                                       user = {user}
                                       />



                      })

          }




    </div>	

</div>
);

}

export default AddStudentForm;
