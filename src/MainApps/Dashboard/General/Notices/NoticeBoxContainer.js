import React,{useRef,useEffect, useState} from 'react';
import classes from './NoticeBoxContainer.module.css';
import NoticeBox from './NoticeBox';
import { marknoticeasread,marknoticeasunread} from '../../../../CommonApps/AllAPICalls';



function containsObject(obj, list) {


    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return true;
        }
    }

    return false;
}






const NoticeBoxContainer =(props)=>{


   //console.log("NoticeBox Container rendering. . .");


   const isMounted = useRef(false);

    useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
            isMounted.current = false
            props.passMountInfo(false);
    }
   }, [props]);





   const markAsReadHandler=(noticeId)=>{
	   marknoticeasread({noticeId,props});	  
   }


  const markAsUnReadHandler=(noticeId)=>{
           marknoticeasunread({noticeId,props});
   }









return (

<div className={classes.noticeBoxContainer}>


   {  props.dashboardNotice !==null && props.dashboardNotice.map((notice, index)=>{

         let noticeId = notice.id;
         return <NoticeBox read={notice.read}
	                   Notice={notice}
	                   key={index}
	                   markAsRead={()=>markAsReadHandler(noticeId)}
	                   markAsUnread={()=>markAsUnReadHandler(noticeId)}
	                   rerender={props.rerender}
	                   userData={props.userData}
		   />
        }) 

   }


</div>

);

}


export default NoticeBoxContainer;
