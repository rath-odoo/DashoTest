import { useRef, useState } from "react";
import classes from "./NewUpdateForm.module.css";
import {
    BsCardImage,
    BsXCircle,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const NewUpdateForm = (props) => {
    const [postStatus, setPostStatus] = useState("Not Posted");
    const [name, setName] = useState("");
    const [imageInput, setImageInput] = useState(null);
    const fileInput = useRef();
    const [file, setFile] = useState(null);


    const closeCreateMeetingForm = () => {

    };

    const closeForm = () => {

    };

    const handleChange = (e) => {

    }

    const handleButtonClick = (e) => {

    };

    const handleFileChange = async (event) => {

    };
    const closeImageHandler = () => {

    }

    const handlePost = async (e) => {

    }


    return (
        <div className={classes.postForm} onPress={closeCreateMeetingForm}>
            <div className={classes.postformmainContainer}>
                <div className={classes.topSec}>
                    <div className={classes.leftCon}>
                        <img src={props.post.author.profile_image} className={classes.pic} />

                        <div className={classes.rightSection}>
                            <div className={classes.nameofuser}>
                                Bibhuprasad Mahakud
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
                            placeholder="mention the title of the post"
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
                                <button className={classes.postButton} >POSTING</button>

                            }

                        </div>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default NewUpdateForm;