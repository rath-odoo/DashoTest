import React, { useState, useEffect, useRef } from "react";
import classes from './Videos.module.css';
import OneVideoBox from './OneVideoBox';
import OneVideoReactPlayer from './OneVideoReactPlayer';
import { BsUpload, BsYoutube } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';
import CourseEditForm from './Forms/CourseEditForm';
import { getvideosbyCourseId } from '../../../../../CommonApps/AllAPICalls';

import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from 'react-icons/ai';

const Videos = (props) => {


  console.log("Videos rendering ");

  const [showAddVideoOptions, setShowAddVideoOptions] = useState(false);
  const [showAddVideoForm, setShowAddVideoForm] = useState(false);

  const [videosData, getVideosData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [isDeleted, setIsDeleted] = useState(false);



  const addVideoHandler = () => {

    setShowAddVideoOptions(showAddVideoOptions => !showAddVideoOptions);

  }

  const addYoutubeVideoHandler = () => {

    setShowAddVideoForm(true);

  }

  const closeFormHandler = () => {
    setShowAddVideoForm(false);
  }

  useEffect(() => {
    console.log("new pageNo", pageNo);
    let courseId = props.selectedCourse[0].id;
    getvideosbyCourseId({ pageNo, courseId, getVideosData });

  }, [pageNo, showAddVideoForm, isDeleted]);


  //  useEffect(()=>{
  //     if( videosData !==null && videosData.next !==null){
  //        setPageNo(pageNo=>pageNo+1);
  //props.setVideoPageNo(pageNo=>pageNo+1);
  //     }


  // },[]);
  //props.reachedBotton

  //useEffect(()=>{
  //  if( videosData !==null && videosData.previous !==null){
  ///      setPageNo(pageNo=>pageNo-1);
  //props.setVideoPageNo(pageNo=>pageNo-1);
  //    }


  //  },[props.reachedTop]);

  //props.reachedTop



  const prevButtonHandler = () => {

  }

  const nextButtonHandler = () => {

  }

  const middleButtonHandler = () => {

  }





  console.log("videoData ", videosData);
  console.log("parent video", props);



  return (
    <div className={classes.videos} >

      <div className={classes.toolsDiv}>


        {showAddVideoForm &&
          <CourseEditForm userData={props.userData}
            Course={props.selectedCourse[0]}
            rerender={props.rerender}
            onPress={closeFormHandler}
          />
        }


        {(props.isOwner || props.isAdmin || props.isTeacher) &&
          <button type="button" className={classes.uploadButton} onClick={addVideoHandler}> + Add a video </button>
        }


        {/*
     <div className={classes.pageNos}> 
        <button type="button" className={classes.leftNavButton} onClick={prevButtonHandler}><AiOutlineDoubleLeft/></button>
	<button type="button" className={classes.middleNavButton} onClick={middleButtonHandler}>9</button>
	<button type="button" className={classes.rightNavButton} onClick={nextButtonHandler}><AiOutlineDoubleRight/></button>
     </div>
     */}

        {showAddVideoOptions &&

          <OutsideAlerter setDropDown={setShowAddVideoOptions}>
            <div className={classes.addVideoOptions}>
              {/*
	<button type="button" className={classes.videoOptionButton}>
	     <BsUpload className={classes.uploadIcon}/> Upload from your computer
	</button>
         */}


              <button type="button" className={classes.videoOptionButton} onClick={addYoutubeVideoHandler}>
                <BsYoutube className={classes.youtubeIcon} />Add a youtube video
              </button>

            </div>
          </OutsideAlerter>
        }
      </div>


      <div className={classes.videoBoxContainer}>



        {videosData !== null && videosData.results.map((video, index) => {

          return <OneVideoBox key={index}
            video={video}
            rerender={props.rerender}
            userData={props.userData}
            Course={props.selectedCourse[0]}
            isAdmin={props.isAdmin}
            isTeacher={props.isTeacher}
            isStudent={props.isStudent}
            isOwner={props.isOwner}
            setIsDeleted={setIsDeleted}
            isDeleted={isDeleted}
          />

        })

        }



      </div>



    </div>
  );

}

export default Videos;
