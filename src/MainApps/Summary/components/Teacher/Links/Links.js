import React, { useState, useEffect } from "react";
import classes from "./Links.module.css";
import CourseAddLinkForm from "./Forms/CourseAddLinkForm";
import { getlinksbyCourseId, deleteLinkById } from "../../../../../CommonApps/AllAPICalls";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { BiCopy, BiCheck } from "react-icons/bi";


async function copyToClipboard(link) {
  try {
    await navigator.clipboard.writeText(link);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text to clipboard: ', err);
  }
}

const Links = (props) => {
  console.log("Links Rendering");

  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [linksData, getLinksData] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [copiedLinkId, setCopiedLinkId] = useState(null); // Keep track of the copied link ID
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editState, setEditState] = useState("notRemove");
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  }
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };


  useEffect(() => {
    console.log("new pageNo", pageNo);
    let courseId = props.selectedCourse[0].id;
    getlinksbyCourseId({ pageNo, courseId, getLinksData });
  }, [props.userData, pageNo, showAddLinkForm, isDeleted]);

  const addLinkHandler = () => {
    setShowAddLinkForm(true);
  };
  const [render, setRender] = useState(false);
  const Render = () => {
    setRender(!render);
  }


  const openLinkInNewTabHandler = ({ link_ }) => {
    let meetingLink = link_;
    window.open(meetingLink, "_blank");
  };

  const closeFormHandler = () => {
    setShowAddLinkForm(false);
    // props.rerender();
  };

  const deleteLinkHandler = (linkId) => {
    deleteLinkById(linkId, setIsDeleted, isDeleted);
  };

  const copyToClipBoardHandler = (link_, linkId) => {
    copyToClipboard(link_);
    setCopiedLinkId(linkId); // Set the ID of the copied link
    setTimeout(() => {
      setCopiedLinkId(null); // Reset after 4 seconds
    }, 4000);
  };

  console.log("linksData: ", linksData);

  return (
    <div className={classes.links}>
      <div className={classes.toolsDiv}>
        {showAddLinkForm && (
          <CourseAddLinkForm
            userData={props.userData}
            Course={props.selectedCourse[0]}
            onPress={closeFormHandler}
            setRender={Render}
          />
        )}

        <div className={classes.addLinkbtn}>
          {(props.isOwner || props.isAdmin || props.isTeacher) &&
            <button
              type="button"
              className={classes.linkButton}
              onClick={addLinkHandler}
            >
              {" "}
              + Add a link{" "}
            </button>
          }
        </div>

        <ol>
          {linksData !== null &&
            linksData.results.map((linkObj, index) => {
              let link_ = linkObj.link;
              return (
                <div className={classes.parentDiv} key={index}>
                  <div className={classes.mainContainer}>
                    <li key={index}>
                      <div className={classes.topContainers}>
                        <div className={classes.titleContainer}>
                          <button
                            type="button"
                            className={classes.linkBoxContainer}
                            onClick={() => openLinkInNewTabHandler({ link_ })}
                          >
                            {linkObj.name}
                          </button>
                        </div>

                        <div className={classes.allThreeBtn}>
                          {(props.isOwner || props.isAdmin || props.isTeacher) &&
                            <button
                              className={classes.delete}
                              onClick={handleDeleteConfirm}
                            >
                              <AiFillDelete className={classes.deleteicon} />
                            </button>
                          }
                          {showDeleteConfirm && (
                            <div className={classes.overLay}>
                              <div className={classes.confirmDialog}>
                                <p className={classes.p}>Are you sure you want to Delete this Course?</p>
                                <div className={classes.div1}>
                                  <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                  {editState === "Removing" &&
                                    <button type="submit" className={classes.submit_button} disabled={true}>

                                      Deleting...
                                    </button>
                                  }
                                  {editState === "notRemove" &&
                                    <button type="submit" className={classes.deleteYes} onClick={() => deleteLinkHandler(linkObj.id)}><b>
                                      Yes,Delete </b>
                                    </button>
                                  }
                                  {editState === "Removed" &&
                                    <button type="submit" className={classes.deleteYes}><b>
                                      Deleted</b>
                                    </button>
                                  }

                                </div>
                              </div>
                            </div>
                          )}

                          <button
                            className={`${classes.copy} ${copiedLinkId === linkObj.id ? classes.copied : ''}`}
                            type="button"
                            onClick={() => copyToClipBoardHandler(linkObj.link, linkObj.id)}
                          >
                            {copiedLinkId === linkObj.id ? (
                              <BiCheck className={classes.copyicon} />
                            ) : (
                              <BiCopy className={classes.copyicon} />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className={classes.descText}>
                        {" "}
                        {linkObj.description}
                      </div>
                    </li>
                  </div>
                </div>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Links;
