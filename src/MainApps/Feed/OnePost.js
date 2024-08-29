import classes from "./OnePost.module.css";
import BajrangImg from "./Bajarang.jpg";

import PostImage from "./postimg.jpeg";
import { CiMenuKebab } from "react-icons/ci";
import BibhuImg from "./Bibhu.jpeg";

import ImageBigView from './ImageBigView';
import { useHistory } from "react-router-dom";


import {
  BsPlusCircle,
  BsHandThumbsUp,
  BsShare,
  BsChatDots,
  BsFillSendFill,
  BsXCircle,
  BsCardImage,
} from "react-icons/bs";
import { addCommentToPost, deletePost, likePost, updatePost } from "../../CommonApps/AllAPICalls";
import { useRef, useState, useEffect } from "react";
import UpdatePostForm from "./UpdatePostForm";
import OneComment from './Comment';

const OnePost = (props) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [showEditForm, setEditShowForm] = useState(false);
  const [dropbox, setDropbox] = useState(false);
  const [allComments, setAllComments] = useState(null);
  const [like, setLike] = useState(false);
  const [likeCount, commentCount] = [props.post.like_count, props.post.comment_count];

  const commentHandler = async () => {
    let postId = props.post.id;
    let userId = props.userData.id;

    setShowComments(!showComments);
    await addCommentToPost({ postId, userId, comment });
    setComment("");
    setShowComments(!showComments);
    props.changeRender();
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const dropboxHandler = () => {
    setDropbox(!dropbox);
  }

  const editHandler = () => {
    setEditShowForm(!showEditForm)


    console.log("inside edit")
  }
  const followHandler = () => {
    alert("Currently follow button is disabled")
  }

  const deleteHandler = async () => {
    setEditState("Removing");
    try {
      let postId = props.post.id;
      let userId = props.userData.id;
      await deletePost({ postId, userId });
      setEditState("Removed");
      props.changeRender();
    } catch (error) {
      console.error("Error deleting post:", error);
      setEditState("notRemoved");
    }
    setShowDeleteConfirm(false);
    setDropbox(false);
    setEditState("notRemove");
  };

  const likeHandler = () => {
    setLike(!like);
    let postId = props.post.id;
    let userId = props.userData.id;
    likePost({ userId, postId })
  }

  const commentShowHandler = () => {
    setShowComments(!showComments);
    setAllComments(props.post.comments);
  }

  const [imageBigView, setImageBigView] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editState, setEditState] = useState("notRemove");

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const showBiggerImageHandler = () => {
    setImageBigView(true);
  }

  const closeBigViewHandler = () => {
    setImageBigView(false);
  }
  let history = useHistory();
  const viewPublicProfileHandler = () => {

    history.push({
      pathname: `/public/profile/${props.userData.id}`,
      state: { userData: props.userData }
    });
    //window.open("/some-link", "_blank");
  }
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropbox(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  console.log("props.post.author: ", props.post.author);



  return (
    <div className={classes.onePost}>


      {imageBigView &&
        <ImageBigView image={props.post.attachment}
          onPress={closeBigViewHandler}
        />
      }




      <div className={classes.topTitleDiv}>
        <div className={classes.topLeftContainer}>
          <img src={props.post.author.profile_image} className={classes.posterImage} />

          <div className={classes.leftContainer}>
            <div className={classes.detailsBlock}>
              <button className={classes.postTitleDiv} onClick={viewPublicProfileHandler}> {props.post.author.firstname + " " + props.post.author.lastname}</button>
              {/* <div className={classes.status}>Teacher</div> */}
            </div>

            <div className={classes.aboutDetail}>
              {props.post.author.about}
            </div>
          </div>
        </div>
        {props.post.author.id === props.userData.id && (
          <button className={classes.optionsContainer} onClick={dropboxHandler}>
            <CiMenuKebab className={classes.optionsDiv} size={20} />
          </button>
        )}
        {dropbox &&
          <div className={classes.dropBoxContainer} ref={dropdownRef}>
            <div className={classes.editContainer} onClick={editHandler}>
              Edit
            </div>
            <div className={classes.editContainer} onClick={handleDeleteConfirm}>
              Delete
            </div>
            {showDeleteConfirm && (
              <div className={classes.overLay}>
                <div className={classes.confirmDialog}>
                  <p className={classes.p}>Are you sure you want to delete this contact?</p>
                  <div className={classes.div1}>
                    <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    {editState === "Removing" ? (
                      <button type="submit" className={classes.deleteYes} disabled={true}>
                        {/* <FadeLoader color={color} loading={true} css={override} size={10} /> */}
                        Deleting....
                      </button>
                    ) : editState === "Removed" ? (
                      <button type="submit" className={classes.deleteYes} disabled={true}>
                        Deleted
                      </button>
                    ) : (
                      <button type="submit" className={classes.deleteYes} onClick={deleteHandler}>
                        Yes, Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        }
        {props.post.author.id !== props.userData.id && (<button className={classes.followBtnContainer} onClick={followHandler}>
          <BsPlusCircle className={classes.addImg} />

          <div className={classes.followText}>Follow</div>
        </button>)}




      </div>

      <div className={classes.horizontalLIne}></div>
      <div className={classes.titleDivContainer}>
        {props.post.title}
      </div>

      <div className={classes.textDiv}>
        {props.post.content}
      </div>

      <button type="button" className={classes.ImageDiv} onClick={showBiggerImageHandler}>
        <img src={props.post.attachment} className={classes.postImage} />
      </button>
      <div className={classes.countLikeCommentDiv}>
        {likeCount !== 0 && <div className={classes.countLikeDiv}>
          {likeCount} Likes
        </div>}
        {commentCount !== 0 && <div className={classes.countCommentDiv}>
          {commentCount} Comments
        </div>}
      </div>
      <div className={classes.horizontalLIne}></div>

      <div className={classes.likeCommentDiv}>

        <button className={classes.LikeContainer} onClick={likeHandler}>
          <BsHandThumbsUp className={classes.likeImg}
            style={{
              color: like ? 'Red' : 'black',
            }} />
          <div className={classes.likeText}>Like</div>
        </button>

        <button className={classes.commentContainer} onClick={commentShowHandler}>
          <BsChatDots className={classes.commentImg1} />
          <div className={classes.commentText}>Comment</div>
        </button>


        <button className={classes.shareContainer}>

          <BsShare className={classes.shareImg} />

          <div className={classes.shareText}>Share</div>
        </button>


      </div>


      <div className={classes.horizontalLIne}></div>

      <div className={classes.commentShowDiv}>
        {allComments !== null && showComments &&
          allComments.map((comment, index) => {
            return <OneComment
              key={index}
              ownerId={props.post.author.id}
              comment={comment}
              userData={props.userData}
              changeRender={props.changeRender}
              closeComment={commentShowHandler}
            />
          })
        }
      </div>

      <div className={classes.commentView}>
        <img src={props.userData.profile_image} className={classes.userimgComment}></img>

        <input
          className={classes.commentInputBox}
          type="text"
          placeholder="Write Comment ..."
          name="comment"
          onChange={handleCommentChange}
          value={comment}
        />
        <BsFillSendFill className={classes.sendCommentButtonDiv} onClick={commentHandler} />
      </div>

      {showEditForm &&
        <UpdatePostForm
          post={props.post}
          userData={props.userData}
          changeRender={props.changeRender}
          onPress={editHandler}

        />
      }
    </div>
  );
};

export default OnePost;
