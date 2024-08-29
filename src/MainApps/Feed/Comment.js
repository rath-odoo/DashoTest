import { useState } from 'react';
import classes from './comment.module.css';
import { AiTwotoneDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { deleteComment, updateComment } from '../../CommonApps/AllAPICalls';
import { TfiLayoutMenuSeparated } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { FiSend } from "react-icons/fi";


const Comment = (props) => {
    const [editComment, setEditComment] = useState(false);
    const [dropbox, setDropbox] = useState(false);
    const [content, setContent] = useState(null);

    const editHandler = () => {
        setDropbox(false);
        setEditComment(!editComment);
        
    }
    const dropboxHandler = () => {
        setDropbox(!dropbox);
    }
    const editCommentHandler = () => {
        let postId = props.comment.post;
        let userId = props.userData.id;
        let commentId = props.comment.id;
        let comment = content;
        console.log(comment);
        updateComment({ postId, userId, commentId, comment })
        setEditComment(!editComment);
        props.changeRender();
        props.closeComment();
    }
    const deleteHandler = async () => {
        let userId = props.userData.id;
        let commentId = props.comment.id;
        await deleteComment({ userId, commentId });
        setDropbox(false);
        props.changeRender();
        props.closeComment();

    }
    const handleChange = (e) => {
        setContent(e.target.value);
    }
    return (
        <div className={classes.commentContainer}>
            <div className={classes.commentDiv}>
                <div className={classes.commenterDiv}>
                    <div className={classes.imageDiv}>
                        <img className={classes.imageInput} src={props.comment.author.profile_image} />
                    </div>
                    <div className={classes.commenterProfile}>
                        <div className={classes.commenterProfileContainer}>
                            <div className={classes.commenterName}>
                            {props.comment.author.firstname + " " + props.comment.author.lastname}
                            </div>
                            {props.ownerId === props.comment.author.id &&
                            
                            <div className={classes.commenterRole}>
                                Author
                            </div>
                            }
                            
                        </div>
                        <div className={classes.commenterDesignationContainer}>
                            Web Development | Java | Python | Mysql
                        </div>

                    </div>
                    <button className={classes.optionsContainer} onClick={dropboxHandler}>
                        <TfiLayoutMenuSeparated className={classes.optionsDiv} size={15} />
                    </button>
                    {dropbox &&
                        <div className={classes.dropBoxContainer}>
                            <div className={classes.editContainer} onClick={editHandler}>
                                <FiEdit size={15} /> Edit
                            </div>
                            <div className={classes.deleteContainer} onClick={deleteHandler}>
                                <AiTwotoneDelete size={19} />   Delete
                            </div>
                        </div>

                    }
                </div>
                {!editComment &&

                    <div className={classes.commentContent}>
                        <div className={classes.contentDiv}>
                            {props.comment.content}
                        </div>
                    </div>

                }

                {editComment &&


                    <div className={classes.commentContent}>
                        <IoMdClose className={classes.closeButton} onClick={editHandler}/>

                        <textarea className={classes.editContentDiv} onChange={handleChange}>
                            {props.comment.content}
                        </textarea>

                        <FiSend className={classes.sendButton} onClick={editCommentHandler}/>
                    </div>


                }
                {/* <div className={classes.authorName}>
                    {props.comment.author}
                </div>
                {!editComment &&
                    <div className={classes.content}>
                        {props.comment.content}
                    </div>}
                {editComment &&
                    <div className={classes.content}>
                        <input
                            className={classes.editInput}
                            name='content'
                            defaultValue={props.comment.content}
                            onChange={handleChange}
                        />
                        <button className={classes.editSendDiv} onClick={editCommentHandler}>
                            <MdOutlineArrowRightAlt size={30}/>
                        </button>
                    </div>}
                <div className={classes.options}>
                    <button className={classes.approveButton} onClick={editHandler}>
                        <FiEdit size={25} />
                    </button>
                    <button className={classes.declineButton} onClick={deleteHandler}>
                        <AiTwotoneDelete size={30} />
                    </button>
                </div> */}
            </div>
        </div>
    );
}

export default Comment;