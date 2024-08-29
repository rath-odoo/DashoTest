import classes from "./ASetting.module.css";
import {
  BsChevronRight,
  BsFillPersonFill,
  BsPhone,
  BsLaptop,
  BsFillCameraVideoFill,
  BsReverseLayoutTextWindowReverse,
  BsClipboard2Minus,
  BsFileRuledFill,
  BsCardList,
} from "react-icons/bs";
import { MdPassword, MdEmail } from "react-icons/md";
import ReactSwitch from "react-switch";
import React, { useState } from "react";
import Switch from "react-switch";
import axios from "axios";
import { updateEmail, updatePhone } from "../../../CommonApps/AllAPICalls";

function App(props) {

  const [newEmail, setNewEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  const [showUserNameForm, setShowUserNameForm] = useState(false);
  const [hideUserNameForm, setHideUserNameForm] = useState(true);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [hideEmailForm, setHideEmailForm] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [hidePasswordForm, setHidePasswordForm] = useState(true);
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [hidePhoneForm, setHidePhoneForm] = useState(true);
  const [editMode, setEditMode] = useState(false);


  const handleNewEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleConfirmEmailChange = (event) => {
    setConfirmEmail(event.target.value);
  };
  const handleNewPhoneChange = (event) => {
    const value = event.target.value;
    let phoneValue;
    if (!value.startsWith('+91')) {
      phoneValue = `+91${value}`;
    } else {
      phoneValue = value;
    }

    // Extract the actual phone number part after +91
    const phoneNumber = phoneValue.replace('+91', '');

    // Check if the phone number part exceeds 10 digits
    if (phoneNumber.length > 10) {
      alert('Phone number should not exceed 10 digits.');
    } else {
      setNewPhone(phoneValue);
    }
  };
  const [phoneButtonText, setPhoneButtonText] = useState("Save");
  const [isPhoneSubmitting, setIsPhoneSubmitting] = useState(false);

  const handleConfirmPhoneChange = (event) => {
    const value = event.target.value;
    let phoneValue;
    if (!value.startsWith('+91')) {
      phoneValue = `+91${value}`;
    } else {
      phoneValue = value;
    }

    // Extract the actual phone number part after +91
    const phoneNumber = phoneValue.replace('+91', '');

    // Check if the phone number part exceeds 10 digits
    if (phoneNumber.length > 10) {
      alert('Phone number should not exceed 10 digits.');
    } else {
      setConfirmPhone(phoneValue);
    }
  };

  const [buttonText, setButtonText] = useState("Save");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newEmail !== confirmEmail) {
      alert("New email and confirm email must match!");
      return;
    }
    setIsSubmitting(true);
    setButtonText("Saving...");
    const userId = props.userData.id;
    updateEmail(userId, newEmail, props)
      .then(data => {
        console.log("Email updated successfully:", data);
        setButtonText("Saved");
        setTimeout(() => {
          CloseEmailForm();
          setIsSubmitting(false);
          setButtonText("Save");
        }, 1000);
      })
      .catch(error => {
        console.error("Error updating email:", error);
        alert("Failed to update email.May be because an account already exists with this email.");
        setIsSubmitting(false);
        setButtonText("Save");
      });
  };


  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    const newPhoneNumber = newPhone.replace('+91', '');
    const confirmPhoneNumber = confirmPhone.replace('+91', '');

    if (newPhoneNumber.length !== 10 || confirmPhoneNumber.length !== 10) {
      alert("Phone number should be exactly 10 digits.");
      return;
    }

    if (newPhone !== confirmPhone) {
      alert("New phone number and confirm phone number must match!");
      return;
    }
    if (!/^\+91\d+$/.test(newPhone) || !/^\+91\d+$/.test(confirmPhone)) {
      alert("Phone number must be numeric and start with +91!");
      return;
    }
    setIsPhoneSubmitting(true);
    setPhoneButtonText("Saving...");

    const userId = props.userData.id;
    updatePhone(userId, newPhone, props)
      .then(data => {
        console.log("Phone number updated successfully:", data);
        setPhoneButtonText("Saved");
        setTimeout(() => {
          closePhoneForm();
          setIsPhoneSubmitting(false);
          setPhoneButtonText("Save");
        }, 1000);
      })
      .catch(error => {
        console.error("Error updating phone number:", error);
        const errorMessage = error.response?.data?.errors?.phoneno?.[0] || "Failed to update phone number. May be because an account already exists with this phone number.";
        alert(errorMessage);
        setIsPhoneSubmitting(false);
        setPhoneButtonText("Save");
      });

  };



  const showUserNameFormHandler = () => {
    setShowUserNameForm(true);
  };

  const hideUserNameFormHandler = () => {
    setShowUserNameForm(false);
  };

  const showEmailFormHandler = () => {
    setShowEmailForm(true);
  };

  const hideEmailFormHandler = () => {
    setShowEmailForm(false);
  };

  const showPasswordFromHandler = () => {
    setShowPasswordForm(true);
  };

  const hidePasswordFromHandler = () => {
    setShowPasswordForm(false);
  };

  const showPhoneFormHandler = () => {
    setShowPhoneForm(true);
  };

  const hidePhoneFormHandler = () => {
    setShowPhoneForm(false);
  };


  const handleChangeEditMode = () => {
    setEditMode((editMode) => !editMode);
  };

  const CloseEmailForm = () => {
    setShowEmailForm(false);
    setNewEmail('');
    setConfirmEmail('');
  }

  const closePhoneForm = () => {
    setShowPhoneForm(false);
    setNewPhone('');
    setConfirmPhone('');
  }


  return (
    <div className={classes.parentSetting}>
      <div className={classes.accountTitle}>My Account :</div>

      <div className={classes.accountContainer}>
        <div className={classes.subcontainer}>

          {/* <button
            onClick={showPasswordFromHandler}
            className={classes.passwordContainer}
          >
            <div className={classes.mainContainer}>
              <MdPassword className={classes.icondiv} />

              <div className={classes.title1}>Change Password</div>
            </div>

            <div className={classes.arrowiconContainer}>
              <BsChevronRight className={classes.arrowIcon} />
            </div>
          </button> */}

          {/* {showPasswordForm && (
            <div className={classes.changePasswordform}>
              <div className={classes.horiLine}></div>

              <div className={classes.oldPasswordContainer}>
                <div className={classes.oldTitle}>Old Password :</div>

                <input
                  placeholder="Enter Old Password"
                  type="text"
                  className={classes.oldPasswordEditBox}
                />
              </div>

              <div className={classes.newPasswordContainer}>
                <div className={classes.newTitle}>New Password :</div>

                <input
                  placeholder="Enter New Password"
                  type="text"
                  className={classes.newPasswordEditBox}
                />
              </div>

              <div className={classes.confPasswordContainer}>
                <div className={classes.newTitle}>Confirm Password :</div>

                <input
                  placeholder="Enter New Password"
                  type="text"
                  className={classes.oldPasswordEditBox}
                />
              </div>

              <div className={classes.buttonContainer}>
                {hidePasswordForm && (
                  <button
                    onClick={hidePasswordFromHandler}
                    className={classes.cancelBtn}
                  >
                    Cancel
                  </button>
                )}

                <button className={classes.submitBtn}>Save</button>
              </div>
            </div>
          )} */}

          {/* <div className={classes.horiLine}></div> */}

          {/* <button
            onClick={showUserNameFormHandler}
            className={classes.usernameContainer}
          >
            <div className={classes.mainContainer}>
              <BsFillPersonFill className={classes.icondiv} />

              <div className={classes.title1}>Change Username</div>
            </div>

            <div className={classes.arrowiconContainer}>
              <BsChevronRight className={classes.arrowIcon} />
            </div>
          </button> */}

          {/* {showUserNameForm && (
            <div className={classes.changeUsernameform}>
              <div className={classes.horiLine}></div>

              <div className={classes.oldUsernameContainer}>
                <div className={classes.oldTitle}>Old Username :</div>

                <input
                  placeholder="Enter Old Username"
                  type="text"
                  className={classes.oldUsernameEditBox}
                />
              </div>

              <div className={classes.newUsernameContainer}>
                <div className={classes.newTitle}>New Username :</div>

                <input
                  placeholder="Enter New Username"
                  type="text"
                  className={classes.newUsernameEditBox}
                />
              </div>

              <div className={classes.confUsernameContainer}>
                <div className={classes.confTitle}>Confirm Username :</div>

                <input
                  placeholder="Enter New Username"
                  type="text"
                  className={classes.confUserEditBox}
                />
              </div>

              <div className={classes.buttonContainer}>
                {hideUserNameForm && (
                  <button
                    onClick={hideUserNameFormHandler}
                    className={classes.usercancelBtn}
                  >
                    Cancel
                  </button>
                )}

                <button className={classes.usersubmitBtn}>Save</button>
              </div>
            </div>
          )} */}

          {/* <div className={classes.horiLine}></div> */}

          <button
            onClick={showEmailFormHandler}
            className={classes.emailContainer}
          >
            <div className={classes.mainContainer}>
              <MdEmail className={classes.icondiv} />

              <div className={classes.title1}>Change Email</div>
            </div>

            <div className={classes.arrowiconContainer}>
              <BsChevronRight className={classes.arrowIcon} />
            </div>
          </button>

          {showEmailForm && (
            <div className={classes.changeEmailform}>
              <form onSubmit={handleSubmit}>
                <div className={classes.horiLine}></div>
                <div className={classes.oldEmailContainer}>
                  <div className={classes.oldTitle}>Old Email :</div>
                  <input
                    type="text"
                    name="oldEmail"
                    placeholder="Old Email"
                    className={classes.oldEmailEditBox}
                    disabled
                    value={props.userData.email}
                  />
                </div>

                <div className={classes.newEmailContainer}>
                  <div className={classes.newTitle}>New Email :</div>
                  <input
                    type="email"
                    name="newEmail"
                    placeholder="New Email"
                    className={classes.newEmailEditBox}
                    value={newEmail}
                    onChange={handleNewEmailChange}
                  />
                </div>

                <div className={classes.confEmailContainer}>
                  <div className={classes.newTitle}>Confirm Email :</div>
                  <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm New Email"
                    className={classes.confEmailEditBox}
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                  />
                </div>

                <div className={classes.buttonContainer}>
                  <button
                    onClick={() => {
                      setShowEmailForm(false);
                      setIsSubmitting(false);
                      setButtonText("Save");
                    }}
                    className={classes.emailcancelBtn}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={classes.emailsubmitBtn} disabled={isSubmitting} >
                    {buttonText}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={classes.horiLine}></div>

          <button
            onClick={showPhoneFormHandler}
            className={classes.phoneNumberContainer}
          >
            <div className={classes.mainContainer}>
              <BsPhone className={classes.icondiv} />

              <div className={classes.title1}>Change Phone Number</div>
            </div>

            <div className={classes.arrowiconContainer}>
              <BsChevronRight className={classes.arrowIcon} />
            </div>
          </button>

          {showPhoneForm && (
            <div className={classes.changePhoneform}>
              <form onSubmit={handlePhoneSubmit}>
                <div className={classes.horiLine}></div>
                <div className={classes.oldPhoneContainer}>
                  <div className={classes.oldTitle}>Old Phone Number :</div>
                  <input
                    type="text"
                    name="oldPhone"
                    placeholder="Old Phone Number"
                    className={classes.oldPhoneEditBox}
                    disabled
                    value={props.userData.phoneno}
                  />
                </div>

                <div className={classes.newPhoneContainer}>
                  <div className={classes.newTitle}>New Phone Number :</div>
                  <input
                    type="text"
                    name="newPhone"
                    placeholder="New Phone Number"
                    className={classes.newPhoneEditBox}
                    value={newPhone}
                    onChange={handleNewPhoneChange}
                  />
                </div>

                <div className={classes.confPhoneContainer}>
                  <div className={classes.confTitle}>Confirm Phone Number :</div>
                  <input
                    type="text"
                    name="confirmPhone"
                    placeholder="Confirm New Phone Number"
                    className={classes.confPhoneEditBox}
                    value={confirmPhone}
                    onChange={handleConfirmPhoneChange}
                  />
                </div>

                <div className={classes.buttonContainer}>
                  <button
                    onClick={() => {
                      setShowPhoneForm(false);
                      setIsPhoneSubmitting(false);
                      setPhoneButtonText("Save");
                    }}
                    className={classes.phonecancelBtn}>
                    Cancel
                  </button>
                  <button type="submit" className={classes.phonesubmitBtn} disabled={isPhoneSubmitting}>
                    {phoneButtonText}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>

      {/* <div className={classes.notificationTitle}>Notify Me On :</div> */}

      {/* <div className={classes.norificationContainer}>
        <div className={classes.subcontainer}>
          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsFileRuledFill className={classes.icondiv} />

              <div className={classes.title1}>New Enrollment Request</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>

          <div className={classes.horiLine}></div>

          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsFillCameraVideoFill className={classes.icondiv} />

              <div className={classes.title1}>New Meeting</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>

          <div className={classes.horiLine}></div>

          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsLaptop className={classes.icondiv} />

              <div className={classes.title1}>New Class</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>

          <div className={classes.horiLine}></div>

          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsCardList className={classes.icondiv} />

              <div className={classes.title1}>New Exam</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>

          <div className={classes.horiLine}></div>

          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsClipboard2Minus className={classes.icondiv} />

              <div className={classes.title1}>New Notice</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>

          <div className={classes.horiLine}></div>

          <div className={classes.passwordContainer}>
            <div className={classes.mainContainer}>
              <BsReverseLayoutTextWindowReverse className={classes.icondiv} />

              <div className={classes.title1}>New Assignment</div>
            </div>

            <div className={classes.arrowiconContainer1}>
              <div className={classes.toggleSwitch}>
                {<Switch onChange={handleChangeEditMode} checked={editMode} />}
                {editMode &&  <span> Edit mode ON  </span>}
                {!editMode && <span> Edit mode OFF </span>}
              </div>
            </div>
          </div>
          
        </div>

      </div> */}

    </div>
  );
}

export default App;
