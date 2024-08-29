import React,{useState,useRef} from 'react';

import classes from './ClassShortViewTeacher.module.css';
import {BsFillTrashFill, BsPeopleFill} from 'react-icons/bs';
import {BiEdit} from 'react-icons/bi';
import { useHistory } from "react-router-dom";


const ClassShortViewTeacher =()=>{

const ref = useRef(null);

//const [width ,setWidth]=useState(null);

let history = useHistory();	


// useEffect(() => {
    //console.log('width', ref.current ? ref.current.offsetWidth : 0);

 // }, [ref.current]);



//const switchHandler = () =>{

//history.push('/class/detail');

//}



return (


<div   ref={ref} className={classes.classShortViewTeacher} >


    <div className={classes.topBar}>
        <i> <span className={classes.classNo}> 1 </span> CLASS ID: 2122432  </i>

        <i> TIME: 9am-10am, 27/02/2022 </i>

       <span>
         <span>  <BsPeopleFill className={classes.participantIcon}/> <span className={classes.numParticipant}>37 </span> </span>
	 <button className={classes.deleteButton}> <BiEdit/> </button>
	 <button className={classes.deleteButton}> <BsFillTrashFill/> </button>
       </span>
    </div>

    <div className={classes.topicsBar}>
        <i>TOPICS: Wave functions, uncertainty principle ,Wave functions functions, uncertainty principle ,Wave functions functions, uncertainty principle ,Wave functions </i>
   
   </div>


    <div className={classes.topicsBar}>
       <i>MODE: offline</i>

       <i> PREREQUISITES: none </i>

       <i> HOME WORK: 27 completed </i>	
    </div>



   <div className={classes.topicsBar}>
       <i>VIDEO: 1 </i>

       <i> FILE: 2 </i>

       <button className={classes.joinClass}> Join Class </button>
   </div>








</div>

);

}

export default ClassShortViewTeacher;
