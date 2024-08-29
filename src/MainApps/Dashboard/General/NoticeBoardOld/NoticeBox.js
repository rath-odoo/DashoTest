import React,{useState,useEffect} from 'react';
import classes from './NoticeBox.module.css';
import {BsCheckCircle} from 'react-icons/bs';


const NoticeBox =(props)=>{



const [bkgColor, setBkgColor] = useState('white');




useEffect(()=>{

	props.read && setBkgColor(bkgColor=>'#E8E8E8');

},[props.read]);	






return (

<div className={classes.noticeBox} style={{backgroundColor:bkgColor}}>


<div className={classes.topSection}> 
	<i className={classes.noticeID}>Notice ID: EDR-{props.Notice.id}</i>  
	<i className={classes.creationTime}> Created at: 2pm , 27th Jan 2020</i>  

</div>


<div className={classes.midSection}> <div> <h2>  {props.Notice.noticeTitle}   </h2> <p>{props.Notice.noticeText}</p></div></div>

<div className={classes.buttomSection}> 

<button className={classes.noticeBoxButtonView}> <i>detail view</i></button>


{props.read &&  <BsCheckCircle className={classes.noticeReadIcon}/>}	


	{!props.read && <button className={classes.noticeBoxButtonRead} onClick={props.markAsRead}> 

 	<i>mark as read</i>

        </button>}

<button className={classes.noticeBoxButtonHide}> <i>hide</i></button>


</div>	




</div>

);

}


export default NoticeBox;
