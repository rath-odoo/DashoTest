import { useState } from 'react';
import { BsGear } from "react-icons/bs";
import classes from "./singleUserDetails.module.css";
import PeopleDetails from "./PeopleDetails";
import MemberSettingsForm from './Forms/MemberSettingsForm';
// import PeopleDetails from './PeopleDetails';



const SingleUserDetails = (props) => {


  const [showSettingsForm, setShowSettingsForm] = useState(false);
  const [showPeopleProfile, setShowPeopleProfile] = useState(false);


  const settingsFormHandler = () => {

    // setShowSettingsForm(true);
    if (props.isOwner) { setShowSettingsForm(true); } else {
      alert("Only Owners have edit and delete permissions");
    }

  }

  const settingsFormCloseHandler = () => {
    setShowSettingsForm(false);
    props.rerender();
  }

  const handleClick = () => {
    setShowPeopleProfile(true);
  };

  const handleBackFromPeopleDetails = () => {
    setShowPeopleProfile(false);
  };











  return (
    <>
      {!showPeopleProfile && (
        <div className={classes.parentDiv}  >
          {showSettingsForm && (
            <MemberSettingsForm
              onPress={settingsFormCloseHandler}
              oneMember={props.oneMember}
              selectedInstitute={props.selectedInstitute}
              isAdminOrOwner={props.isAdminOrOwner}
              userData={props.userData}
            />
          )}

          <button className={classes.parentClass} onClick={handleClick} >
            <div className={classes.userContainer}>
              <div className={classes.namenimagediv}>
                <img src={props.oneMember.profile_image} className={classes.pic} alt="User" />
                <div className={classes.nameContainer}>{props.oneMember.firstname} {props.oneMember.lastname}</div>
              </div>
            </div>

            <div className={classes.rolwContainer}>{props.oneMember.role}</div>
            <div className={classes.dateContainer}>{props.oneMember.employee_id}</div>
            <div className={classes.statusContainer}>{props.oneMember.status}</div>
          </button>

          {props.isAdminOrOwner && (
          <button className={classes.settingGear} type="button" onClick={settingsFormHandler}>
            <BsGear />
          </button>
          )}
        </div>
      )}


      {showPeopleProfile && (
        <PeopleDetails
          onBack={handleBackFromPeopleDetails}

          oneMember={props.oneMember}
          selectedInstitute={props.selectedInstitute}
          isAdminOrOwner={props.isAdminOrOwner}
          userData={props.userData}
          rerender={props.rerender}
        />
      )}

    </>


  );
}

export default SingleUserDetails;
