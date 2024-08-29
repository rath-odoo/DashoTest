import React, { useState, CSSProperties, useEffect, useRef } from "react";
import classes from "./warningBlock.module.css";
import basewebURL from "../../../../basewebURL";
import { uploadprofieimage } from "../../../../CommonApps/AllAPICalls.js";
import FadeLoader from "react-spinners/FadeLoader";
import Logo from "../../../../CommonApps/Logo";
import { FaTimes } from "react-icons/fa";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const WarningBlock = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUpload, setImageUploaded] = useState("notUploaded");
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  console.log(props);

  let imageurl = props.userData.profile_image;
  let color = "#2626BA";

  const handleCloseButtonClick = () => {
    props.onClose();
  };

  const handleChange = (e) => {
    if (e.target && e.target.files[0]) {
      setSelectedFile({
        image: e.target.files,
        name: e.target.files[0].name,
        size: e.target.files[0].size,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageformData = new FormData();
    imageformData.append("profile_image", selectedFile.image[0]);
    setImageUploaded("uploading");

    await uploadprofieimage({
      imageformData,
      setImageUploaded: (status) => {
        if (isMounted.current) setImageUploaded(status);
      },
      cancelHandler,
      props,
    });

    if (isMounted.current) handleCloseButtonClick();
  };

  const cancelHandler = () => {
    if (isMounted.current) {
      setSelectedFile(null);
      setImageUploaded("notUploaded");
    }
    props.rerender();
  };

  const formatFileSize = (size) => {
    if (size >= 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + " MB";
    } else {
      return (size / 1024).toFixed(2) + " KB";
    }
  };

  return (
    <div className={classes.profileImageDiv}>
      {!selectedFile && (
        <img className={classes.userImage} src={imageurl} alt="edr Logo" />
      )}

      {selectedFile && (
        <div className={classes.afterSelect}>
          <img
            alt="not found"
            width={"280px"}
            src={URL.createObjectURL(selectedFile.image[0])}
            className={classes.userImage}
          />
          <div className={classes.imageUploadName}>
            {selectedFile.name}
            <FaTimes className={classes.crossIcon} onClick={cancelHandler} />
          </div>
          <button className={classes.submit_button} onClick={handleSubmit}>
            <b>Upload</b>
          </button>
        </div>
      )}

      {imageUpload === "uploading" && (
        <div className={classes.registerDiv}>
          <div style={{ margin: "auto", zIndex: "9999" }}>
            <FadeLoader color={color} loading={true} cssOverride={override} size={50} strokeWidth={2} />
          </div>
        </div>
      )}

      {!selectedFile && (
        <div className={classes.bottomDiv}>
          <input
            type="file"
            onChange={handleChange}
            name="profile_image"
            accept="image/*"
            className={classes.image_field}
          />
        </div>
      )}
    </div>
  );
};

export default WarningBlock;
