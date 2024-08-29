import React,{useState} from "react";
import classes from "./TopLeftSearchBarNewUser.module.css"
import {BsSearch} from "react-icons/bs";




const TopLeftSearchBar = (props) =>{


   const handleChange=(e)=>{

     props.setSearchString(searchString=>e.target.value);	    
     props.setPageNo(1);

   }



return(

<div className={classes.topLeftSearchBar}>


  <div className={classes.innerRoundedBox}>
       <div>
          <BsSearch className={classes.searchIcon}/>
       </div>

       	
          <input
               type="text"
               onChange={handleChange}
               name="inputText"
               className={classes.input_field}
               placeholder="..phone or email or name"
          />
       


  </div>

</div>

);

}

export default TopLeftSearchBar;
