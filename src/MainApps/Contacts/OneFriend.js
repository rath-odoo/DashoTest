
import classes from './OneFriend.module.css';

import Bibhuti from './Bibhuti.jpeg';

import { BsChatDots } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";

import { useHistory } from "react-router-dom";
import { useState } from 'react';
import { deleteContact } from '../../CommonApps/AllAPICalls';
import { HiDotsVertical } from 'react-icons/hi';
import OutsideAlerter from '../../CommonApps/OutsideAlerter';



const OneFriend=(props)=>{


// console.log('contact: ',props.contact);

//console.log('contact: ', props.contact.profile_image);
   let history = useHistory();

   const viewPublicProfileHandler=()=>{
    //  history.push("/public/profile");

    //  history.push(`/public/profile/${props.contact.id}`);
    //  state: { userData: props.contact } 

    history.push({
      pathname: `/public/profile/${props.contact.id}`,
      state: { userData: props.contact } // Pass user data as state
    });
     //window.open("/some-link", "_blank");
   }

   const [menuVisible, setMenuVisible] = useState(false); 

  const deleteContactHandler = () => {
    setEditState("Removing");
    deleteContact(props.contact.id, setEditState, props)
    setShowDeleteConfirm(false);
    setMenuVisible(false);
      
  };

  const closeDropDownHandler = () => {
    setMenuVisible(false);
      
  };
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
    setEditState('notRemove');
  }
  const handleClose = () => {
    setShowDeleteConfirm(false);
  };
  const [editState, setEditState] = useState("notRemove");



return (

  <div className={classes.oneFriend}>
  <img src={props.contact.profile_image} className={classes.friendImage} alt="Friend" />

  <div className={classes.iconContainer}>
    <div className={classes.chat}>
      <BsChatDots color="#5e5d5d" size={18} />
    </div>
    <button className={classes.profile} onClick={viewPublicProfileHandler}>Profile</button>
    {/* <button className={classes.delete} onClick={deleteContactHandler}>Delete</button> */}

    <div className={classes.optionsContainer}>
    <span className={classes.threeDots} onClick={() => setMenuVisible(!menuVisible)}>
                <HiDotsVertical />
              </span>
          
            <OutsideAlerter setDropDown={closeDropDownHandler}>
              {menuVisible && (
                <div className={classes.dropdownMenu}>
                  {/* <div className={classes.dropdownItem} onClick={handleEditClick}>Edit</div> */}
                  <div className={classes.dropdownItem} onClick={handleDeleteConfirm}>Delete</div>
                </div>
              )}
            </OutsideAlerter>
            </div>

            
  </div>

  <div className={classes.lineHorizontal}></div>

  <div className={classes.InfoBox}>
    <i>
      {props.contact.firstname !== "" ? props.contact.firstname + " " + props.contact.lastname : props.contact.username}
    </i>
  </div>
  {showDeleteConfirm && (
                  <div className={classes.overLay}>
                    <div className={classes.confirmDialog}>
                      <p className={classes.p}>Are you sure you want to Delete this Contact?</p>
                      <div className={classes.div1}>
                        <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        {editState === "Removing" &&
                          <button type="submit" className={classes.submit_button} disabled={true}>
                            {/* <FadeLoader color={color} loading={true} css={override} size={10} /> */}
                            Deleting...
                          </button>
                        }
                        {editState === "notRemove" &&
                          <button type="submit" className={classes.deleteYes} onClick={deleteContactHandler}><b>
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
</div>
);


}

export default OneFriend;
