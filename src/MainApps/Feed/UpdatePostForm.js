import { useRef, useState } from 'react';
import classes from './UpdatePostForm.module.css';
import { updatePost } from '../../CommonApps/AllAPICalls';
import { BsCardImage } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const UpdatePostForm = (props) => {
    const [isChange, setChange] = useState(false);
    const [isPosting, setPosting] = useState(false); // Added loading state

    const initialFormData = Object.freeze({
        title: props.post.title,
        content: props.post.content,
        attachment: props.post.attachment,
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    }

    const handleSubmit = async () => {
        setPosting(true); // Set loading state
        try {
            let postId = props.post.id;
            let userId = props.userData.id;
            const form = new FormData();
            form.append('title', formData.title);
            form.append('content', formData.content);
            if (file) form.append('attachment', file); // Append file if it exists

            await updatePost({ postId, userId, form });
            props.changeRender(); // Refresh the post list
            props.onPress(); // Close the form
        } catch (error) {
            console.error('Update failed:', error);
        } finally {
            setPosting(false); // Reset loading state
        }
    }

    const closeHandler = () => {
        props.onPress();
    }

    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        updateFormData({
            ...formData,
            attachment: selectedFile,
        });
        setChange(true);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className={classes.mainContainer}>
            <div className={classes.innerContainer}>
                <IoMdClose className={classes.closeButton} onClick={closeHandler} />
                <div className={classes.titleContainer}>
                    <div className={classes.titleText}>Update Title</div>
                    <input
                        type="text"
                        placeholder="mention the title of the post"
                        className={classes.titleInput}
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.contentContainer}>
                    <div className={classes.contentText}>Update Description</div>
                    <textarea
                        type="text"
                        placeholder="mention the description of the post"
                        className={classes.contentInput}
                        name="content"
                        rows={5}
                        cols={50}
                        value={formData.content}
                        onChange={handleChange}
                    />
                </div>

                <div className={classes.changeImageButton}>
                    <div className={classes.imgContainer}>
                        <img
                            className={classes.imgTag}
                            src={isChange ? URL.createObjectURL(file) : formData.attachment}
                            alt="Post Attachment"
                        />
                    </div>
                    <button className={classes.changeImage} onClick={handleButtonClick}>
                        Change Image
                    </button>
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <div className={classes.postContainer}>
                    <button
                        className={classes.postButton}
                        onClick={handleSubmit}
                        disabled={isPosting} // Disable button while posting
                    >
                        {isPosting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdatePostForm;
