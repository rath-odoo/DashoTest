import React, { useEffect, useRef, useState } from "react";

import classes from "./FeedContentDiv.module.css";
import base from "../CommonAppUtilities/AppContentDiv.module.css";

import FeedTitleDiv from "./ContactTitleDiv";

import BibhuImg from "./Bibhu.jpeg";

import OnePost from "./OnePost";
import Single_user from "./Single_user_latest_post";

import CoursePost from "./CoursePost";
import { IoMdClose } from "react-icons/io";
import {
  BsFillImageFill,
  BsCameraVideoFill,
  BsCalendar2DayFill,
  BsPostcardFill,
  BsFillChatSquareDotsFill,
  BsGearFill,
  BsFillPeopleFill,
  BsDiagram3Fill,
  BsPersonFill,
  BsCalendarPlusFill,
  BsFillFileEarmarkTextFill,
  BsPeopleFill,
  BsPatchQuestionFill,
  BsInfoCircleFill,
  BsFillFileRuledFill,
  BsShieldFill,
  BsFillFileRichtextFill,
  BsSearch,
  BsFillSuitHeartFill,
  BsHospitalFill,
  BsCardImage,
  BsXCircle,
} from "react-icons/bs";

import { MdGroups } from "react-icons/md";

import FeedleftSidemenu from "./FeedleftSideMenu";

import { createPostConnect, getAllPost } from "../../CommonApps/AllAPICalls";

const FeedContentDiv = (props) => {
  const [showCreateMeetingForm, setShowCreateMeetingForm] = useState(false);

  const initialFormData = Object.freeze({

    title: "",
    content: "",
    attachment: null,
    author: 0,

  });

  const [formData, updateFormData] = useState(initialFormData);

  const [file, setFile] = useState(null);

  const [imageInput, setImageInput] = useState(null);

  const [render, setRender] = useState(false);

  const [name, setName] = useState("");
  const [preview, setPreview] = useState(null);

  const [postStatus, setPostStatus] = useState("Not Posted");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const allPost = getAllPost({page,pageSize});

  const [allPost, getallpost] = useState(null);

  useEffect(() => {
    getAllPost({ page, pageSize, getallpost });
  }, [render])



  const changeRender = () => {
    setRender(!render);
    console.log(render);
  }
  const fileInput = useRef();
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handleButtonClick = (e) => {
    e.preventDefault();

    fileInput.current.click();
  };

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setName(selectedFile.name);
  };
  const closeImageHandler = () => {
    setFile(null);
    setName("");
  }

  const handlePost = async (e) => {
    e.preventDefault();
    if (!formData.content) {
      alert("Please add content before submitting.");
      return;
    }

    setPostStatus("Posting");
    let userId = props.userData.id;
    updateFormData({
      ...formData,
      ["author"]: userId,
    });
    let fileFormData = new FormData();
    if (formData.title) {
      fileFormData.append("title", formData.title);
    }
    fileFormData.append("content", formData.content);
    if (file) {
      fileFormData.append("attachment", file);
    }
    fileFormData.append("author", userId);
    try {

      await createPostConnect({ userId, fileFormData });


      setPostStatus("Not Posted");
      setFile(null);
      setName("");
      changeRender();
      closeCreateMeetingForm();
    } catch (error) {

      console.error("Error posting:", error);
      setPostStatus("Not Posted");
    }
  }


  console.log("allPost:  ", allPost);


  const tempObject = {
    "id": 47,
    "author": {
      "id": 92,
      "firstname": "Reshwanth",
      "lastname": "Kumar",
      "profile_image": "https://sgp1.digitaloceanspaces.com/edrspace/edrcontainer1/codingwithmitch/logo_1080_1080.png?AWSAccessKeyId=UCW66UXZOVY3QVYQLSEK&Signature=p29UGDP0wHPM4jTF1S8RbM%2BzGW8%3D&Expires=1717353820"
    },
    "title": "1",
    "content": "One",
    "created_at": "2024-06-02T16:41:41.647955Z",
    "updated_at": "2024-06-02T16:41:41.647976Z",
    "attachment": "https://sgp1.digitaloceanspaces.com/edrspace/edrcontainer1/Screenshot_from_2024-05-31_14-24-24.png?AWSAccessKeyId=UCW66UXZOVY3QVYQLSEK&Signature=WSvaBJKwqmJqIvDJvLY1jSdVGr0%3D&Expires=1717353820",
    "like_count": 10,
    "comment_count": 10,
    "comments": [{
      "id": 18,
      "post": 44,
      "author": {
        "id": 92,
        "firstname": "Reshwanth",
        "lastname": "Kumar",
        "profile_image": "https://sgp1.digitaloceanspaces.com/edrspace/edrcontainer1/codingwithmitch/logo_1080_1080.png?AWSAccessKeyId=UCW66UXZOVY3QVYQLSEK&Signature=p29UGDP0wHPM4jTF1S8RbM%2BzGW8%3D&Expires=1717353820"
      },
      "content": "let comment and edit",
      "created_at": "2024-05-27T15:01:39.715860Z",
      "updated_at": "2024-05-27T15:01:39.715948Z"
    }]
  }


  const closeCreateMeetingForm = () => {
    setShowCreateMeetingForm(false);
    //props.rerender();
  };

  const closeForm = () => {
    //event.stopPropagation();
    setShowCreateMeetingForm(false);
    //props.rerender(); // Assuming you have a rerender function passed as a prop
  };


  console.log("props.userData: ", props.userData);

  return (
    <div className={base.appContentDiv}>
      <FeedTitleDiv />

      <div className={classes.scrollDiv}>

        <div className={classes.leftsidemenuContainer}>
          <FeedleftSidemenu userData={props.userData} rerender={props.rerender} />
        </div>

        <div className={classes.leftBox}>
          <div className={classes.startPost}>
            <div className={classes.startPost_MarginDiv}>
              <img src={props.userData.profile_image} className={classes.PosterImage} />
              <button
                type="button"
                className={classes.postbtn}
                onClick={() => setShowCreateMeetingForm(true)}
              >
                Write Post...
              </button>
            </div>
          </div>

          <div className={classes.allpost}>
            {allPost !== null &&
              allPost.results.map((post, index) => {
                return <OnePost post={post} userData={props.userData} key={index} changeRender={changeRender} />
              })}
            {/*
            <OnePost post={tempObject} userData={props.userData} changeRender={changeRender}/>
            <CoursePost />
	    */}
          </div>

          {showCreateMeetingForm && (
            <div className={classes.postForm} onPress={closeCreateMeetingForm}>
              <div className={classes.postformmainContainer}>
                <div className={classes.topSec}>
                  <div className={classes.leftCon}>
                    <img src={props.userData.profile_image} className={classes.pic} />

                    <div className={classes.rightSection}>
                      <div className={classes.nameofuser}>
                        {props.userData.firstname + " " + props.userData.lastname}
                      </div>
                      <div className={classes.postto}>Post to Everyone</div>
                    </div>
                  </div>

                  <BsXCircle className={classes.pic2} onClick={closeForm} />
                </div>
                <form onSubmit={handlePost} >
                  <div className={classes.titleDiv}>
                    <input
                      type="text"
                      placeholder="Mention the title of the post"
                      className={classes.titleInput}
                      name="title"
                      onChange={handleChange}
                    />
                  </div>

                  <div className={classes.textAreaBox}>


                    <textarea
                      placeholder="What do you want to talk about?"
                      className={classes.textAreaBlock}
                      name="content"
                      onChange={handleChange}
                    ></textarea>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      name="attachment"
                      value={imageInput}
                      ref={fileInput}
                    />
                    {file !== null &&
                      <div className={classes.previewContainer}>
                        <div className={classes.previewDiv}>
                          <IoMdClose className={classes.closeButton} size={20} onClick={closeImageHandler} />
                          <img src={URL.createObjectURL(file)} className={classes.imgContainer} />

                        </div>
                      </div>

                    }
                    <div className={classes.bottomBar}>
                      <button className={classes.imgUploadContainer} onClick={handleButtonClick}>
                        <BsCardImage className={classes.imgUploadBtn} />
                      </button>

                      {name !== "" &&
                        <div className={classes.imgName}>
                          {name}
                        </div>

                      }

                      {postStatus === "Not Posted" &&
                        <button type="submit" className={classes.postButton} >POST</button>

                      }
                      {postStatus === "Posting" &&
                        <button className={classes.postButton} >POSTING...</button>

                      }

                    </div>
                  </div>
                </form>

              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default FeedContentDiv;
