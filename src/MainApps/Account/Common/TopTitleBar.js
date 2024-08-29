import React from "react";

import classes from './TopTitleBar.module.css';
import { useHistory } from "react-router-dom";


import {BsArrowLeft} from 'react-icons/bs';


const TopTitleBar=(props)=>{

let history = useHistory();


	
const goBackHandler=()=>{


history.push("/dashboard/general");


}	




return (

<div className={classes.topTitleBar}>

	{props.title}

</div>

);

}


export default TopTitleBar;
