import React,{useState,useEffect} from 'react';
import classes from './NoticeBox.module.css';
import {BsCheckCircle} from 'react-icons/bs';


const NoticeBox =(props)=>{



const [bkgColor, setBkgColor] = useState('white');




useEffect(()=>{

	{props.read && setBkgColor(bkgColor=>'#E8E8E8')}

},[props.read]);	






return (

<div className={classes.noticeBox} style={{backgroundColor:bkgColor}}>


<div className={classes.topSection}> 
	<i className={classes.noticeID}>Notice ID: EDR-10122021</i>  
	<i className={classes.creationTime}> Created at: 2pm , 27th Jan 2020</i>  

</div>


<div className={classes.midSection}> <p> All classes are cancelled on the month June 2022 due to covid ourbreak! Enjoy the holidays. All classes are cancelled on the month June 2022 due to covid ourbreak! Enjoy the holidaysAll classes are cancelled on the month June 2022 due to covid ourbreak! Enjoy the holidays</p></div>

<div className={classes.buttomSection}> 

<button className={classes.noticeBoxButtonView}> <i>detail view</i></button>

<button className={classes.noticeBoxButtonRead}> 

 { !props.read &&	<i>mark as read</i> }

 {props.read &&  <BsCheckCircle className={classes.noticeReadIcon}/>}	

</button>

<button className={classes.noticeBoxButtonHide}> <i>hide</i></button>


</div>	




</div>

);

}


export default NoticeBox;
