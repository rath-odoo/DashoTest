import React,{useState} from 'react';
import classes from './NoticeBoxContainer.module.css';
import NoticeBox from './NoticeBox';
import NoticeBoardToolBar from './NoticeBoardToolBar';


const NoticeBoxContainer =(props)=>{


const [read, setRead]=useState(false);
const [unread, setUnRead]=useState(true);



return (

<div className={classes.noticeBoxContainer}>


   <NoticeBoardToolBar closeNoticeBoard={props.closeNoticeBoard}/>

   <NoticeBox read={unread}/>

   <NoticeBox read={read}/>

   <NoticeBox read={read}/>

   <NoticeBox read={unread}/>






</div>

);

}


export default NoticeBoxContainer;
