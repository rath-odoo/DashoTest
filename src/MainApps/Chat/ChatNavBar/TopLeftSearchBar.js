import React from "react";

import classes from "./TopLeftSearchBar.module.css"

import {BsSearch} from "react-icons/bs";

const TopLeftSearchBar = () =>{

return(

<div className={classes.topLeftSearchBar}>


  <div className={classes.innerRoundedBox}>

   <BsSearch className={classes.searchIcon}/>



  </div>

</div>

);

}

export default TopLeftSearchBar;
