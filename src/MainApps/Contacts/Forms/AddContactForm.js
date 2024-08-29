import React,{useState, useEffect} from 'react';
import classes from './AddContactForm.module.css';
import {AiFillCloseCircle} from 'react-icons/ai';
import {BsSearch} from 'react-icons/bs'
import {usersearchgeneral} from '../../../CommonApps/AllAPICalls.js';
import OneFriend from './OneFriend';



const AddContactForm=(props)=>{


  const [searchedUsers, getSearchedUsers] = useState(null)

  const [pageNo, setPageNo] = useState(1);

  const [rerender, setRerender] = useState(false);

  const handleChange=(e)=>{

     let searchString = e.target.value;
     let pageno = pageNo;
     usersearchgeneral({pageno, searchString, getSearchedUsers});

  }

  useEffect(()=>{
     let pageno = pageNo;
     let searchString = ""      	  
     usersearchgeneral({pageno, searchString, getSearchedUsers});
     console.log("search resulted reloaded");	  
  },[rerender, pageNo ]);


  const handleSubmit=()=>{


  }

  console.log("rerender: ", rerender);
  console.log("searchedUsers: ", searchedUsers);

// onPress={()=>createGroupHandler(user.id)}

return (

<div className={classes.addContactForm}>
 
   <form className={classes.aboutEditForm} onSubmit={handleSubmit}>	
      <div className={classes.closeButtonDiv}>
	  <div className={classes.titleSec}> Add new contact </div>
          <button onClick={props.onPress} 
	          className={classes.closeFormButton}> 
	          <AiFillCloseCircle 
	              className={classes.closeButtonIcon}
	          /> 
	  </button>
      </div>


    <div className={classes.searchBarDiv}>

        <div className={classes.searchIconDiv}>
	    <BsSearch size={25}/>
	</div>
        <input
              type="text"
              onChange={handleChange}
              name="inputText"
              className={classes.input_field}
              placeholder="Search by name"
              
            />


    </div>

   </form>



   <div className={classes.searchedUsersGrid}>

         { /*
              searchUsers.map((contact, index)=>{

                return <div className={classes.oneFriend} key={index}>


                       <div>


                     })
         */ }


              {/*
              searchUsers.map((contact, index)=>{

                         return <OneFriend key={index}
                         contact={contact}
		         userData={props.userData} 
                         />
                     })
                */}


              { searchedUsers !==null && searchedUsers.results !==null &&

                      searchedUsers.results.map((user, index)=>{

                           //if (user.firstname==="")return null;

                           return    <OneFriend key={index} userImage={user.profile_image}
                                       contact = {user}
                                       userName={user.firstname !==""  && user.lastname !==""? user.firstname+" "+user.lastname: user.username}
                                       userData={props.userData}
                                       setRerender={setRerender}
                                       rerender={props.rerender}
                                       />



                      })

               } 









   </div>





</div>

);


}

export default AddContactForm;
