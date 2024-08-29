import React, { useState } from "react";
import classes from "./Notices.module.css";
import CreateNoticeForm from "./CreateNoticeForm";
import NoticeBoxContainer from "./NoticeBoxContainer";

const Notices = (props) => {
  const [showCreateNoticeForm, setShowCreateNoticeForm] = useState(false);

  const closeNoticeForm = () => {
    setShowCreateNoticeForm(false);
  };

  return (
    <>
      <div className={classes.switchBar}>
        <button
          className={classes.createNoticeButton}
          type="button"
          onClick={() => setShowCreateNoticeForm(true)}
        >
          <div className={classes.createNoticeTitle}>+ Create a notice </div>
        </button>

        <span className={classes.noticeBoardMessage}>
          {" "}
          Notices from all your courses!
        </span>
      </div>

      {showCreateNoticeForm && (
        <CreateNoticeForm
          onPress={closeNoticeForm}
          courseData={props.courseData}
          socketObj={props.socketObj}
          userData={props.userData}
          rerender={props.rerender}
        />
      )}

      <div className={classes.notices}>
        <NoticeBoxContainer
          userData={props.userData}
          closeNoticeBoard={props.closeNoticeBoard}
          userData={props.userData}
          courseData={props.courseData}
          rerender={props.rerender}
          dashboardNotice={props.dashboardNotice}
          passMountInfo={props.passMountInfo}
        />
      </div>
    </>
  );
};

export default Notices;
