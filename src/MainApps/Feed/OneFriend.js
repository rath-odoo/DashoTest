import classes from './OneFriend.module.css';
import { BsPerson } from "react-icons/bs";
import { deleteContact } from '../../CommonApps/AllAPICalls';
import { HiDotsVertical } from 'react-icons/hi';
import { useState, CSSProperties } from 'react';
import { useHistory } from "react-router-dom";
import OutsideAlerter from '../../CommonApps/OutsideAlerter';
import FadeLoader from "react-spinners/BeatLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize: "10px",
};

const OneFriend = (props) => {
  let history = useHistory();

  const [menuVisible, setMenuVisible] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editState, setEditState] = useState("notRemove");
  let color = "white";

  const viewPublicProfileHandler = () => {
    history.push({
      pathname: `/public/profile/${props.contact.id}`,
      state: { userData: props.contact }
    });
  };

  const deleteContactHandler = async () => {
    setEditState("Removing");
    try {
      await deleteContact(props.contact.id, props);
      setEditState("Removed");
      props.rerender();
    } catch (error) {
      console.error("Error deleting contact:", error);
      setEditState("notRemove");
    }
    setShowDeleteConfirm(false);
    setMenuVisible(false);
  };

  const closeDropDownHandler = () => {
    setMenuVisible(false);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  return (
    <div className={classes.oneFriend}>
      <img src={props.contact.profile_image} className={classes.friendImage} alt="Friend" />
      <div className={classes.iconContainer}>
        <div className={classes.InfoBox}>
          <span>
            {props.contact.firstname !== "" ? `${props.contact.firstname} ${props.contact.lastname}` : props.contact.username}
          </span>
        </div>
        <button className={classes.profile} onClick={viewPublicProfileHandler}>Profile</button>
        <div className={classes.optionsContainer}>
          <span className={classes.threeDots} onClick={() => setMenuVisible(!menuVisible)}>
            <HiDotsVertical />
          </span>

          <OutsideAlerter setDropDown={closeDropDownHandler}>
            {menuVisible && (
              <div className={classes.dropdownMenu}>
                <div className={classes.dropdownItem} onClick={handleDeleteConfirm}>Delete</div>
                {showDeleteConfirm && (
                  <div className={classes.overLay}>
                    <div className={classes.confirmDialog}>
                      <p className={classes.p}>Are you sure you want to delete this contact?</p>
                      <div className={classes.div1}>
                        <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                        {editState === "Removing" ? (
                          <button type="submit" className={classes.deleteYes} disabled={true}>
                            {/* <FadeLoader color={color} loading={true} css={override} size={10} /> */}
                            Deleting....
                          </button>
                        ) : editState === "Removed" ? (
                          <button type="submit" className={classes.deleteYes} disabled={true}>
                            Deleted
                          </button>
                        ) : (
                          <button type="submit" className={classes.deleteYes} onClick={deleteContactHandler}>
                            Yes, Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </OutsideAlerter>
        </div>
      </div>
    </div>
  );
};

export default OneFriend;
