import React, { useState, useEffect, useRef } from "react";
import classes from "./TicketComments.module.css"
//import {BsChevronDoubleDown} from "react-icons/bs";
import { deleteticketcomment, updateticketcomment } from '../../../CommonApps/AllAPICalls';

import OutsideAlerter from '../../../CommonApps/OutsideAlerter';

import { BsThreeDotsVertical } from "react-icons/bs";
import ImageBigView from "../../Feed/ImageBigView";



const localTime = (serverTime) => {

   let timeData = new Date(serverTime);
   let timeDataStr = timeData.toString()
   let fulltime = timeDataStr.split(" ")[4];
   let hrmin = fulltime.split(":")[0] + ":" + fulltime.split(":")[1]
   let year = timeDataStr.split(" ")[3];
   let month = timeDataStr.split(" ")[1];
   let day = timeDataStr.split(" ")[2];

   let displayTime = hrmin + ", " + day + " " + month + " " + year;

   return displayTime;

}




const TicketComments = (props) => {

   let serverTime = props.commenttime;
   let commentTime = localTime(serverTime);


   const [showDropDown, setShowDropDown] = useState(false);

   const showDropDownHandler = () => {

      setShowDropDown(showDropDown => !showDropDown);

   }

   const deleteCommentHandler = () => {

      let comment_id = props.comment.id;
      deleteticketcomment({ comment_id, props });

   }

   const [commenteEdit, setCommentEdit] = useState(props.comment.commenttext);

   const onChangeHandler = (e) => {
      e.preventDefault();

      setCommentEdit(e.target.value);

   }

   const [savingStatus, setSavingStatus] = useState("notSaved");







   const [showEditForm, setShowEditForm] = useState(false);

   const editCommentHandler = () => {
      setShowEditForm(showEditForm => !showEditForm);
   }


   const concludeSaving = () => {

      props.newCommentAdded(current => !current);
      setShowEditForm(showEditForm => !showEditForm);
   }


   const saveCommentHandler = () => {

      let commentId = props.comment.id;
      let userId = props.userData.id;
      let comment = commenteEdit;
      let commenterId = props.comment.commenter.id;
      setSavingStatus("saving");
      updateticketcomment({ commentId, userId, commenterId, comment, concludeSaving, setSavingStatus });

   }
   const [imageBigView, setImageBigView] = useState(false);
   const showBiggerImageHandler = () => {
      setImageBigView(true);
   }

   const closeBigViewHandler = () => {
      setImageBigView(false);
   }
   const dropdownRef = useRef(null);
   useEffect(() => {
      const handleClickOutside = (event) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropDown(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);


   console.log("comment: ", props.comment);










   return (

      <div className={classes.ticketComments}>

         {imageBigView &&
            <ImageBigView image={props.comment?.commentfile?.url}
               onPress={closeBigViewHandler}
            />
         }
         <div className={classes.commentTitle}>
            <div className={classes.authorDiv}>
               <div className={classes.commenterTextDiv}><button type="button" className={classes.commenterButton}> {props.commenter.firstname} {props.commenter.lastname}  </button><span className={classes.addedComment}> {commentTime}</span></div>

               {props.comment?.commentfile === null ? null : <div onClick={showBiggerImageHandler}><img style={{ width: "100px", height: "100px", borderRadius: "5px", objectFit: "cover", cursor: "pointer", marginTop: "10px" }} src={props.comment?.commentfile?.url} /></div>}

               {!showEditForm &&
                  <div className={classes.descriptionContent}>
                     {props.commenttext}

                  </div>
               }
            </div>


            <div className={classes.dotsDropdown}>

               <button type="button" onClick={showDropDownHandler} className={classes.dropDownButton}> <BsThreeDotsVertical /> </button>

               {showDropDown && Number(props.userData.id) === Number(props.comment.commenter.id) &&
                  <div className={classes.dropDownMenu} ref={dropdownRef}>
                     <button type="button" className={classes.changeButton} onClick={editCommentHandler}> Edit </button>
                     <button type="button" className={classes.changeButton} onClick={deleteCommentHandler}> Delete </button>
                  </div>

               }

            </div>

         </div>


         {showEditForm && <div className={classes.editTextDiv}>
            <textarea
               type="text"
               name="edittext"
               className={classes.editCommentInput}
               defaultValue={props.comment.commenttext}
               onChange={onChangeHandler}
            />

            <div className={classes.editCommentButtonsDiv}>
               {savingStatus === "notSaved" &&
                  <button type="button" className={classes.saveButton} onClick={saveCommentHandler}> Save </button>
               }
               {savingStatus === "saving" &&
                  <button type="button" className={classes.saveButton} > Saving... </button>
               }

               {savingStatus === "saved" &&
                  <button type="button" className={classes.saveButton} > Saved! </button>
               }






               <button type="button" className={classes.cancelButton} onClick={editCommentHandler}> Cancel </button>
            </div>
         </div>
         }




         <div>
            <hr className={classes.hrLine} />
         </div>


      </div>



   );

}

export default TicketComments;


