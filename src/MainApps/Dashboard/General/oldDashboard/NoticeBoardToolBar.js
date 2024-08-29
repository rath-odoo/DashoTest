import React,{useState} from 'react';
import classes from './NoticeBoardToolBar.module.css';
import {BsTelegram, BsArrowLeft} from 'react-icons/bs';


const NoticeBoardToolBar =(props) =>{


   const [showForm, setShowForm] = useState(false);




   const showNoticeForm=()=>{

    setShowForm(true);

   }





return(

<div className={classes.noticeBoardToolBar}>


<button className={classes.noticeBoardButton} onClick={props.closeNoticeBoard}><BsArrowLeft className={classes.backArrow}/>  </button>

<button className={classes.noticeBoardButton} disabled={true}> <b> NOTICE BOARD</b> </button>

    <button className={classes.noticeBoardButton} onClick={showNoticeForm}> 
	  <BsTelegram className={classes.postNoticeIcon}/> 
    </button>	


</div>	

);

}

export default NoticeBoardToolBar;
