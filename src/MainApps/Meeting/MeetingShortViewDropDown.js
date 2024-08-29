
import classes from './MeetingShortViewDropDown.module.css';
import OutsideAlerter from '../../CommonApps/OutsideAlerter';
import { deletemeeting } from '../../CommonApps/AllAPICalls';
import React, { useState, CSSProperties } from 'react';
import FadeLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        fontSize: "10px",
};


const MeetingShortViewDropDown = (props) => {



        const [editState, setEditState] = useState("notRemove");
        const editMeetingCardButtonHandler = () => {

        }


        const deleteMeetingHandler = () => {

                let meetingid = props.Meeting.id;
                setEditState("Removing");
                deletemeeting({ meetingid, setEditState, props });
                setTimeout(() => {
                        setShowDeleteConfirm(false);
                }, 1000);


        }
        const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
        const handleDeleteConfirm = () => {
                setShowDeleteConfirm(true);
        }
        const handleClose = () => {
                setShowDeleteConfirm(false);
        };
        let color = "white";




        return (

                <OutsideAlerter setDropDown={props.setDropDown}>

                        <div className={classes.dropdownButtons}>

                                <button type="button"
                                        className={classes.dropdownButton}
                                        onClick={props.editMeetingHandler}>
                                        Edit
                                </button>
                                <button type="button"
                                        className={classes.dropdownButton}
                                        onClick={handleDeleteConfirm}>
                                        Delete
                                </button>
                                {showDeleteConfirm && (
                                        <div className={classes.overLay}>
                                                <div className={classes.confirmDialog}>
                                                        <p className={classes.p}>Are you sure you want to Delete this Course?</p>
                                                        <div className={classes.div1}>
                                                                <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                                                                {editState === "Removing" &&
                                                                        <button type="submit" className={classes.submit_button} disabled={true}>
                                                                                <FadeLoader color={color} loading={true} css={override} size={10} />
                                                                                Deleting...
                                                                        </button>
                                                                }
                                                                {editState === "notRemove" &&
                                                                        <button type="submit" className={classes.deleteYes} onClick={deleteMeetingHandler}><b>
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

                                {/*
                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             publish
                                    </button>

                                    <button type="button"
                                            className={classes.dropdownButton}>
                                             archive
                                    </button>
				    */}

                        </div>


                </OutsideAlerter>


        );










}

export default MeetingShortViewDropDown;
