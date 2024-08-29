import React, { useState, CSSProperties } from "react";
import classes from "./NoticeBox.module.css";
import { BsEnvelope, BsEnvelopeOpen, BsTrash, BsPersonCircle } from "react-icons/bs";
import { TbCalendarTime } from "react-icons/tb";
import ClipLoader from "react-spinners/ClipLoader"; // Updated loader
import { deletenoticebyId } from "../../../../CommonApps/AllAPICalls";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "var(--themeColor)",
};

const NoticeBox = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { read, Notice, markAsRead, markAsUnread } = props;
  let bkgColor = read ? "white" : "#cadffa";
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
    setExpanded(false);
  };

  const handleMarkAsRead = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await markAsRead();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsUnread = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    try {
      await markAsUnread();
    } catch (error) {
      console.error("Error marking as unread:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const noticeCreationTime = ({ datetime }) => {
    let DatetimeLocalFull = new Date(datetime);
    let DatetimeLocalFullStr = String(DatetimeLocalFull);
    let dateStr = DatetimeLocalFullStr.split(" ").at(2);
    let month = DatetimeLocalFullStr.split(" ").at(1);
    let year = DatetimeLocalFullStr.split(" ").at(3);
    let fullTimeLocal = DatetimeLocalFullStr.split(" ").at(4);
    let localTimeHour = fullTimeLocal.split(":").at(0);
    let localTimeMin = fullTimeLocal.split(":").at(1);
    let ampm = "am";

    if (localTimeHour == 12) {
      ampm = "pm";
    } else if (localTimeHour == 0) {
      localTimeHour = 12;
    } else if (localTimeHour > 12) {
      localTimeHour -= 12;
      ampm = "pm";
    }

    let time = `${localTimeHour}:${localTimeMin}${ampm}, ${dateStr} ${month} ${year}`;
    return time;
  };

  const getDisplayCourseIds = () => {
    if (expanded) {
      return Notice.postCourses.map(courseId => `100${courseId}`).join(", ");
    } else {
      const courseIds = Notice.postCourses.slice(0, 1).map(courseId => `100${courseId}`);
      return courseIds.join(", ") + (Notice.postCourses.length >= 1 ? ", ..." : "");
    }
  };

  const getDisplayTitle = () => {
    if (expanded) {
      return Notice.noticeTitle;
    } else {
      return Notice.noticeTitle.length > 40 ? Notice.noticeTitle.substring(0, 40) + "..." : Notice.noticeTitle;
    }
  };

  let color = "var(--themeColor);";
  const datetime = Notice.creationTime;

  const deleteNoticeHandler = async () => {
    setIsDeleting(true);
    try {
      await deletenoticebyId({ noticeId: Notice.id, props });
      console.log("Notice deleted successfully");
      setShowDeleteConfirm(false);
      props.rerender();
    } catch (error) {
      console.error("Error deleting notice:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleExpand = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
    handleMarkAsRead(e);
  };

  return (
    <div
      className={`${classes.noticeBox} ${expanded ? classes.expanded : ""}`}
      style={{ backgroundColor: bkgColor }}
      onClick={toggleExpand}
    >
      <div className={classes.contentContainer}>
        <div className={classes.midSection}>
          <div className={classes.allids}>
            <div className={classes.noticeID}>Notice ID: EDR-{Notice.id}</div>
            <div className={classes.noticeID}>Course ID: {getDisplayCourseIds()}</div>
            {!expanded && (
              <div className={classes.midSection__title}>
                <b>{getDisplayTitle()}</b>
              </div>
            )}
          </div>

          <div className={classes.rightSection}>
            <div className={classes.iconContainer}>
              {isLoading ? (
                <ClipLoader color={color} size={20} loading={true} css={override} />
              ) : (
                !read ? (
                  <div className={classes.iconWithText} onClick={handleMarkAsRead}>
                    <BsEnvelopeOpen className={classes.icon} />
                    Mark As Read
                  </div>
                ) : (
                  <div className={classes.iconWithText} onClick={handleMarkAsUnread}>
                    <BsEnvelope className={classes.icon} />
                    Unread
                  </div>
                )
              )}
              {props.userData !== null &&
                Number(props.userData.id) === Number(props.Notice.creater.id) && (
                  <BsTrash
                    className={classes.icon}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConfirm();
                    }}
                  />
                )}
              {showDeleteConfirm && (
                <div className={classes.overLay}>
                  <div className={classes.confirmDialog}>
                    <p className={classes.p}>
                      {isDeleting ? (
                        <div>
                          <p style={{ display: "flex", justifyContent: "center", alignItems: "center", textAlign: "center", color: "var(--redColor1)" }}>Deleting...</p>
                        </div>
                      ) : "Are you sure you want to delete this Notice?"}
                    </p>
                    {!isDeleting && (
                      <div className={classes.div}>
                        <button
                          className={classes.deleteNo}
                          onClick={() => {
                            setShowDeleteConfirm(false);
                            setExpanded(false);
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className={classes.deleteYes}
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNoticeHandler();
                          }}
                        >
                          Yes, Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={classes.creationTime}>
              <TbCalendarTime className={classes.timenDateIcon} />{" "}
              {noticeCreationTime({ datetime })}
            </div>
          </div>
        </div>

        {expanded && (
          <div className={classes.expandedContent}>
            <div className={classes.midSection_itle}>
              <b>{Notice.noticeTitle}</b>
            </div>
            <div className={classes.noticeText}>{Notice.noticeText}</div>
            <div className={classes.postedByTextContainer}>
              <div className={classes.postedByTextName}>
                <BsPersonCircle className={classes.iconPost} />
                <div className={classes.postedByText}>Posted By:</div>
              </div>
              {Notice.creater.firstname !== ""
                ? `${Notice.creater.firstname} ${Notice.creater.lastname}`
                : Notice.creater.username}
            </div>
          </div>
        )}
      </div>
    </div >
  );
};

export default NoticeBox;
