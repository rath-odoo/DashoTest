import { useEffect, useState } from "react";
import { BsImage, BsPlus } from "react-icons/bs";
import { getuser, postticketcomment } from '../../../CommonApps/AllAPICalls';
import classes from "./AddComment.module.css";

const AddComment = (props) => {
  const [textBox, showTextBox] = useState(false);
  const [formData, updateFormData] = useState({ comment: "", image: null });
  const [submissionState, setSubmissionState] = useState("notPosting"); // New state for submission

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    updateFormData({
      ...formData,
      image: e.target.files[0] || null,
    });
  };

  const textBoxHandler = () => {
    showTextBox(true);
  };

  const [data, setData] = useState({});
  useEffect(() => {
    getuser({ setData });
  }, []);

  const [ticketId, setTicketId] = useState(props.ticketId);
  useEffect(() => {
    setTicketId(props.ticketId);
  }, [props.ticketId]);

  const [userId, setUserId] = useState(data.id);
  useEffect(() => {
    setUserId(data.id);
  }, [data.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { comment, image } = formData;

    setSubmissionState("Posting");

    try {
      await postticketcomment({
        ticketId,
        userId,
        comment,
        attachments: image,
        props
      });

      updateFormData({ comment: "", image: null });
      showTextBox(false);
      setSubmissionState("notPosting");
    } catch (error) {
      console.error("Error posting comment:", error);
      setSubmissionState("notPosting");
    }
  };

  return (
    <div className={classes.ticketComments}>
      <div className={classes.commentTitle}>
        {!textBox && (
          <button className={classes.commenterButton} onClick={textBoxHandler}>
            <BsPlus /><span style={{ color: "white" }}>Add a comment</span>
          </button>
        )}
      </div>

      {textBox && (
        <div className={classes.descriptionTextBox}>
          <form className={classes.addCommentForm} onSubmit={handleSubmit} encType="multipart/form-data">
            <div className={classes.textarea_Div}>
              <textarea
                type="text"
                onChange={handleChange}
                name="comment"
                className={classes.inputText_field}
                placeholder="Write your comment"
                value={formData.comment}
              />
            </div>
            <div className={classes.imageDiv}>
              <div className={classes.imageUpload}>
                <label className={classes.imageUploadLabel}>
                  <BsImage /> Add Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={classes.imageInput}
                  />
                </label>
              </div>
              <button type="submit" className={classes.submit_button} disabled={submissionState === "Posting"}>
                {submissionState === "Posting" ? "Posting..." : "Post comment"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddComment;
