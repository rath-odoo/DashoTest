import React,{useState} from 'react';
import classes from './NoticeBoardToolBar.module.css';
import {BsTelegram, BsArrowLeft} from 'react-icons/bs';
import CreateNoticeForm from './CreateNoticeForm';



const NoticeBoardToolBar =(props) =>{


   




   const [showForm, setShowForm] = useState(false);


   const showNoticeForm=()=>{

    setShowForm(true);

   }

   const closeNoticeForm=()=>{

    setShowForm(false);

   }





return(

<div className={classes.noticeBoardToolBar}>


<button className={classes.noticeBoardButton} onClick={props.closeNoticeBoard}><BsArrowLeft className={classes.backArrow}/>  </button>

<button className={classes.noticeBoardButton} disabled={true}> <b> NOTICE BOARD</b> </button>

    <button className={classes.noticeBoardButton} onClick={showNoticeForm}> 
	 Create New Notice <BsTelegram className={classes.postNoticeIcon}/> 
    </button>	

    {showForm && <CreateNoticeForm onPress={closeNoticeForm} 
	           courseData={props.courseData}
	           socketObj = {props.socketObj}
	           userData = {props.userData}
	           rerender = {props.rerender}
	         />
    }

</div>	

);

}

export default NoticeBoardToolBar;
