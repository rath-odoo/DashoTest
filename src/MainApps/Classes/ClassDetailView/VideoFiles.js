import {useState} from 'react';
import classes from "./VideoFiles.module.css";
import { BiEdit } from "react-icons/bi";
import VideoClickBox from "./VideoClickBox";

import { BsFillCameraVideoFill, BsPencilSquare } from "react-icons/bs";


import ClassVideoAddForm from './Forms/ClassVideoAddForm';


import OneVideoBox from '../../Summary/components/Teacher/Videos/OneVideoBox';


const VideoFiles=(props)=> {


   const [showForm, setShowForm] = useState(false);


   const showFormHandler=()=>{
  
     setShowForm(true);	   

   }


   const closeFormHandler=()=>{

   setShowForm(false);
   props.rerender();

   }

  //  if (!props.selectedCourse || !props.selectedCourse[0]) {
  //   return <div>Loading...</div>;
  // }
 
  //  let isOwner = Number(props.selectedCourse[0]?.creater?.id) === Number(props.userData.id) ? true : false;
  //  let isAdmin = props.selectedCourse[0]?.admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
  //  const teacherIds = (props.selectedCourse[0]?.teachers || []).map(teacher => teacher.id);
  //  const isTeacher = teacherIds.includes(props.userData.id);
 
   console.log("props.oneClass: ", props.oneClass);




  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topBar}>
          <div className={classes.leftContainer}>
            <div className={classes.topContainer}>
              <div className={classes.videoIcon}>
                <BsFillCameraVideoFill />
              </div>

              <div className={classes.mainTitle}>Video Lectures</div>
            </div>

            {(props.isOwner || props.isAdmin || props.isTeacher) &&
            <button className={classes.uploadButton} type="button" onClick={showFormHandler}>
	        +Upload
	    </button>
}

             { showForm &&
                 <ClassVideoAddForm oneClass={props.oneClass} onPress={closeFormHandler}/>
             }


          </div>
          {/*
          <button className={classes.editBtnContainer}>
            <BsPencilSquare className={classes.editbutton} />

            <div className={classes.editText}>Edit</div>
          </button>
	  */}
        </div>

        <div className={classes.textInfo}>
          {" "}
          Recorded Video Lectures will appear here{" "}
        </div>

          <div className={classes.videoMicroContainer}>
        
                  { props.oneClass !==null &&  props.oneClass.videos.map((video, index)=>{

                         return <OneVideoBox key={index}
                                          video={video}
                           />

                       })

                 }




          </div>
      </div>
    </div>
  );
}
export default VideoFiles;
