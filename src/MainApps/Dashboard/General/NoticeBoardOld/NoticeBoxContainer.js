import React,{useRef,useEffect} from 'react';
import classes from './NoticeBoxContainer.module.css';
import NoticeBox from './NoticeBox';
import NoticeBoardToolBar from './NoticeBoardToolBar';
//import {getdashboardnotice} from '../../../../CommonApps/AllAPICalls';
//getuser, getnotice,getnoticebyId


import {marknoticeasread} from '../../../../CommonApps/AllAPICalls';

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


   console.log("NoticeBox Container rendering. . .");


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
          //console.log("mark as read", noticeId);     	   
	  // putnoticeIddash({noticeId});	  
	  // window.location.reload(false);
   }










/*
useEffect(()=>{


   //getnotice({getNoticeData});
        let noticeIdArray=[];
	let propsCourseData = props.courseData;
	   propsCourseData.forEach((course, index)=>{
                       //console.log("noticeobjects",course.noticeobjects[0])
                       course.noticeobjects.forEach((noticeId, indexI)=>{  
			      // console.log('noticeId: ', noticeId)
                             if ( noticeIdArray.indexOf(noticeId) < 0){noticeIdArray.push(noticeId)}

		       })
		                                                    



	          }
	    );   
        

    getNoticeIds(noticeIds=>noticeIdArray);	

 return ()=>{
  getNoticeIds(noticeIds=>[]);

 }


},[ props.courseData]);




useEffect(()=>{

   noticeIds.forEach((noticeid, index)=>{

      getnoticebyId({noticeid, getNoticeData});

   });

  return ()=>{
           getNoticeData(noticeData=>[]);
       }

},[noticeIds]);


*/


















return (

<div className={classes.noticeBoxContainer}>


   <NoticeBoardToolBar closeNoticeBoard={props.closeNoticeBoard} 
	               courseData = {props.courseData}
	               socketObj = {props.socketObj}
	               userData = {props.userData}
	               rerender = {props.rerender}
	/>



   { props.dashboardNotice !==null && props.dashboardNotice.dashnotices !==null &&  props.dashboardNotice.dashnotices.map((notice, index)=>{

           let list = props.userData.noticeids;
	   let isRead = containsObject(notice, list);
           let noticeId = notice.id;
          return <NoticeBox read={!isRead} 
	                    Notice={notice} 
	                    key={index}
                            markAsRead={()=>markAsReadHandler(noticeId)}

		   />

      })
   }




</div>

);

}


export default NoticeBoxContainer;
