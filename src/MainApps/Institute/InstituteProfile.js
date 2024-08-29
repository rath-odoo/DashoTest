import { useState, useEffect, useRef } from 'react';

import classes from "./InstituteProfile.module.css";
import logo from "./instituteIICON.jpeg";
import OfficialPersonBlock from "./OfficialPersonBlock";
import Twitter from "./twitter.png";
import Facebook from "./facebook.png";
import Instagram from "./instagram.png";
import Linkedin from "./linkedin.png";
import YouTube from "./youtube.png";
import Document from "./Document";
import InstituteCertificate from "./InstituteCertificate";
import Achivement from "./Achivements";
import DocInstitute from './Forms/AddDocumentInInstitute';

import AddSocialMediaIconForm from './Forms/AddSocialMediaIconForm';

import { FaFacebook, FaLinkedin, FaInstagramSquare, FaYoutube } from "react-icons/fa";

import { editinstituteaddress, editinstituteweburl, deleteSocialMediaToInstitute, putFileInAInstitute, deleteinstitute, createinstituteofficial, editinstituteofficial, geteditinstituteofficial, deleteinstituteofficial } from '../../CommonApps/AllAPICalls';

import EditInstituteForm from "./Forms/EditInstituteForm";
import OfficialPersonInstitue from './OfficialPersonInstitue';

const InstituteProfile = (props) => {
  const [isEditable, setIsEditable] = useState(true);

  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  const socialMediaHandler = (socialMediaLink) => {
    let fullUrl = socialMediaLink;
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = "https://" + fullUrl;
    }
    window.open(fullUrl, "_blank");
  };

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  const [showEditInstituteForm, setShowEditInstituteForm] = useState(false);
  const [showEditInstituteAddressForm, setShowEditInstituteAddressForm] = useState(false);
  const [showEditInstituteWebAddressForm, setShowEditInstituteWebAddressForm] = useState(false);
  const [editAddressState, setEditAddressState] = useState("addressNotSaved");
  const [editWebAddressState, setEditWebAddressState] = useState("addressNotSaved");
  const [showAddSocialMediaIconForm, setShowAddSocialMediaIconForm] = useState(false);
  const [showDocUploaderForm, setShowDocUploaderForm] = useState(false);
  const [showInstititeOfficialForm, setShowInstititeOfficialForm] = useState(false);

  const addDocHandler = () => {
    setShowDocUploaderForm(true);
  };

  const closeAddDocUploaderForm = () => {
    setShowDocUploaderForm(false);
  };

  const handleFileChange = (event) => {
    let instituteId = props.selectedInstitute;
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('docfile', file);
      formData.append('name', file.name);
      let userId = props.userData.id;
      putFileInAInstitute({ userId, instituteId, formData });
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const docInputRef = useRef(null);

  const editInstituteHandler = () => {
    setShowEditInstituteForm(true);
  };

  const [deleteState, setDeleteState] = useState('notDeleted');
  const [confirmDeletePage, setConfirmDeletePage] = useState(false);

  const showConfirmDeletePage = () => {
    setConfirmDeletePage(true);
  };

  const cancelDeleteHandler = () => {
    setConfirmDeletePage(false);
  };

  const deleteHandler = () => {
    setDeleteState("deleting");
    let institute_id = props.selectedInstitute.id;
    deleteinstitute({ institute_id, setDeleteState, props });
  };

  const closeEditInstituteFormHandler = () => {
    setShowEditInstituteForm(false);
    props.rerender();
  };

  const editInstituteFormHander = () => {
    setShowEditInstituteAddressForm(true);
  };

  const editInstituteWebFormHander = () => {
    setShowEditInstituteWebAddressForm(true);
  };
  const editInstituteOfficialFormHander = () => {
    setShowInstititeOfficialForm(true);
  };

  const [formAddress, setAddressForm] = useState(props.selectedInstitute.address);
  const [formWebAddress, setWebAddressForm] = useState(props.selectedInstitute.websiteurl);
  const [formValues, setFormValues] = useState({
    name: '',
    designation: '',
    contact_email: '',
    official_phone: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  const handleChangeAddress = (e) => {
    e.preventDefault();
    setAddressForm(e.target.value.trim());
  };

  const handleChangeWebAddress = (e) => {
    e.preventDefault();
    setWebAddressForm(e.target.value.trim());
  };

  const saveInstituteAddressHandler = () => {
    setShowEditInstituteAddressForm(false);
    let instId = props.selectedInstitute.id;
    editinstituteaddress({ formAddress, props, setEditAddressState, instId });
  };

  const saveInstituteWebAddressHandler = () => {
    setShowEditInstituteWebAddressForm(false);
    let instId = props.selectedInstitute.id;
    editinstituteweburl({ formWebAddress, props, setEditWebAddressState, instId });
  };
  const saveInsituteOfficialHandler = () => {
    let instId = props.selectedInstitute.id;
    let userId = props.userData.id;
    createinstituteofficial({ instId, userId, serialNum: 1, formValues, props });
    setShowInstititeOfficialForm(false);
    setRender(!render);
  }
  const [render, setRender] = useState(false);
  const [editOfficial, getEditOfficial] = useState(null);
  const getOfficialDetails = () => {
    let instId = props.selectedInstitute.id;
    geteditinstituteofficial({ instId, getEditOfficial });
  }
  useEffect(() => {
    let instId = props.selectedInstitute.id;

    geteditinstituteofficial({ instId, getEditOfficial });
  }, [props, render])
  let isAdminOrOwner = (props.selectedInstitute.relationship === "Owner" || props.selectedInstitute.relationship === "Admin");
  let isOwner = props.selectedInstitute.relationship === "Owner";

  const socialMediaIconAddHandler = () => {
    setShowAddSocialMediaIconForm(true);
  };

  const closeAddSocialMediaFormHandler = () => {
    setShowAddSocialMediaIconForm(false);
    props.rerender();
  };

  const deleteSocialMediaIconHandler = (socialIconId) => {
    let instituteId = props.selectedInstitute.id;
    let socialMediaIconId = socialIconId;
    deleteSocialMediaToInstitute({ instituteId, socialMediaIconId, props });
  };

  const openWebsiteHandler = () => {
    let fullUrl = props.selectedInstitute.websiteurl;
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = "https://" + fullUrl;
    }
    window.open(fullUrl, "_blank");
  };
  console.log(props);
  return (
    <div className={classes.parentInstitute}>
      {isAdminOrOwner && (
        <button onClick={toggleEditMode} className={classes.toggleEditModeBtn}>
          {isEditable ? "Disable Edit Mode" : "Enable Edit Mode"}
        </button>
      )}

      {confirmDeletePage &&
        <div style={{ width: "100vw", height: "100vh", position: "fixed" }}>
          <div style={{
            width: "350px",
            height: "400px",
            backgroundColor: "white",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            borderRadius: "7px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "40px"
          }}>
            <div style={{
              height: "40px",
              display: "flex",
              color: "var(--themeColor)",
              justifyContent: "space-between"
            }}>
              <h3> Are you sure to delete the institute? </h3>
            </div>
            <div style={{
              marginTop: "50px",
              width: "100%",
              borderStyle: "none",
              display: "flex",
              justifyContent: "space-between"
            }}>
              {deleteState === "notDeleted" &&
                <button type="button" style={{
                  height: "40px",
                  width: "120px",
                  backgroundColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "red",
                  color: "red",
                  borderRadius: "10px",
                  cursor: "pointer"
                }} onClick={deleteHandler}> Yes, Delete </button>
              }
              {deleteState === "deleting" &&
                <button type="button" style={{
                  height: "40px",
                  width: "120px",
                  backgroundColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "red",
                  color: "red",
                  borderRadius: "10px",
                  cursor: "pointer"
                }} disabled={true}> Deleting... </button>
              }
              <button type="button" style={{
                height: "40px",
                width: "120px",
                backgroundColor: "white",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "var(--themeColor)",
                color: "var(--themeColor)",
                borderRadius: "10px",
                cursor: "pointer",
              }} onClick={cancelDeleteHandler}> No, Cancel </button>
            </div>
          </div>
        </div>
      }
      <div className={classes.ABlock}>
        <div className={classes.lcontainer}>
          <img src={props.selectedInstitute.logo} className={classes.logo}></img>
          <div className={classes.instituteTitle}>
            {props.selectedInstitute.name}
          </div>
        </div>
        {/* {isEditable && isOwner &&
          <button className={classes.deleteBtn} type="button" onClick={showConfirmDeletePage} >
            Delete
          </button>
        } */}
        {isEditable && isAdminOrOwner &&
          <button className={classes.editBtn} type="button" onClick={editInstituteHandler}>
            Edit
          </button>
        }
      </div>
      {showEditInstituteForm &&
        <EditInstituteForm userData={props.userData}
          selectedInstitute={props.selectedInstitute}
          onPress={closeEditInstituteFormHandler} />
      }
      <div className={classes.BBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Institute Address :</div>
          {isEditable && isAdminOrOwner && !showEditInstituteAddressForm &&
            <button className={classes.editBtn} type="button" onClick={editInstituteFormHander}>
              Edit
            </button>
          }
          {isEditable && isAdminOrOwner && showEditInstituteAddressForm &&
            <button className={classes.editBtn} type="button"
              onClick={saveInstituteAddressHandler}
              style={{ color: "white", backgroundColor: "var(--themeColor)" }}
            >
              Save
            </button>
          }
        </div>
        {!showEditInstituteAddressForm &&
          <div className={classes.addressInst}>
            {props.selectedInstitute.address}
          </div>
        }
        {isEditable && isAdminOrOwner && showEditInstituteAddressForm &&
          <input
            type="text"
            onChange={handleChangeAddress}
            name="hourlyrate"
            className={classes.value_field}
            placeholder="580"
            defaultValue={formAddress}
          />
        }
      </div>

      {/*	  
      <div className={classes.GBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Achivements :</div>
          <button className={classes.editBtn} type="button">
            Edit
          </button>
        </div>

        <div className={classes.officalAchivementBlock}>
          <Achivement />
          <Achivement />
          <Achivement />
          <Achivement />
          <Achivement />
          <Achivement />
        </div>
      </div>
      */}
      <div className={classes.B1Block}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Website :</div>
          {isEditable && isAdminOrOwner && !showEditInstituteWebAddressForm &&
            <button className={classes.editBtn} type="button" onClick={editInstituteWebFormHander}>
              Edit
            </button>
          }
          {isEditable && isAdminOrOwner && showEditInstituteWebAddressForm &&
            <button className={classes.editBtn} type="button"
              onClick={saveInstituteWebAddressHandler}
              style={{ color: "white", backgroundColor: "var(--themeColor)" }}
            >
              Save
            </button>
          }
        </div>
        {!showEditInstituteWebAddressForm &&
          <div className={classes.websiteLink}>
            <button type="button" className={classes.websiteButton} onClick={openWebsiteHandler}> {props.selectedInstitute.websiteurl} </button>
          </div>
        }
        {/*
      <div className={classes.EBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Institute Certificates :</div>
          <button className={classes.editBtn} type="button">
             Edit
          </button>
        </div>

        <div className={classes.mainBlock}>
          <div className={classes.name}>Name</div>
          <div className={classes.date}>Date</div>
          <div className={classes.link}>Link</div>
        </div>

        
        <div className={classes.certificatesBlock}>
          <div className={classes.AofficalPersonBlock}>
            <InstituteCertificate />
            <InstituteCertificate />
            <InstituteCertificate />
            <InstituteCertificate />
            <InstituteCertificate />
          </div>
        </div>
        
      </div>
      */}
        {isEditable && isAdminOrOwner && showEditInstituteWebAddressForm &&
          <input
            type="text"
            onChange={handleChangeWebAddress}
            name="hourlyrate"
            className={classes.value_field}
            placeholder="580"
            defaultValue={formWebAddress}
          />
        }
      </div>
      <div className={classes.CBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Social Media :</div>
          {isEditable && isAdminOrOwner &&
            <button className={classes.editBtn} type="button" onClick={socialMediaIconAddHandler}>
              Add
            </button>
          }
        </div>
        <div className={classes.SocialmediaIconContainer}>
          {props.selectedInstitute.socialmedialinks.map((oneMedia, index) => {
            let socialIconId = oneMedia.id;
            let socialMediaLink = oneMedia.link;
            return <div className={classes.parentSocialMediaDiv} key={index}>
              <button type="button" className={classes.socialMediaButton} onClick={() => socialMediaHandler(socialMediaLink)} >
                {oneMedia.name === "x" && <img src={Twitter} className={classes.linkContainer}></img>}
                {oneMedia.name === "linkedIn" && <img src={Linkedin} className={classes.linkContainer}></img>}
                {oneMedia.name === "facebook" && <img src={Facebook} className={classes.linkContainer}></img>}
                {oneMedia.name === "instagram" && <img src={Instagram} className={classes.linkContainer}></img>}
                {oneMedia.name === "youtube" && <img src={YouTube} className={classes.linkContainer}></img>}
              </button>
              {isEditable && isAdminOrOwner &&
                <button type="button" className={classes.deleteSocialMediaButton} onClick={() => deleteSocialMediaIconHandler(socialIconId)}>
                  Delete
                </button>
              }
            </div>
          })}
        </div>
      </div>
      {showAddSocialMediaIconForm &&
        <AddSocialMediaIconForm userData={props.userData}
          onPress={closeAddSocialMediaFormHandler}
          selectedInstitute={props.selectedInstitute}
        />
      }
      <div className={classes.DBlock}>
        <div className={classes.topmainContainer}>

          <div className={classes.title}>Institute Officials :</div>
          {isEditable && isAdminOrOwner && !showInstititeOfficialForm &&
            <button className={classes.editBtn} type="button" onClick={editInstituteOfficialFormHander}>
              Add
            </button>
          }

        </div>

        {isEditable && isAdminOrOwner && showInstititeOfficialForm && <div> <div className={classes.formRow}>
          <input type="text" placeholder="Name" className={classes.inputField} name='name' onChange={handleChange} />
          <input type="text" placeholder="Designation" className={classes.inputField} name='designation' onChange={handleChange} />
          <input type="email" placeholder="Email" className={classes.inputField} name='contact_email' onChange={handleChange} />
          <input type="tel" placeholder="Phone Number" className={classes.inputField} name='official_phone' onChange={handleChange} />
        </div> <button className={classes.editBtn} type="button"
          onClick={saveInsituteOfficialHandler}
          style={{ color: "white", backgroundColor: "var(--themeColor)", marginTop: '5px' }}
        >
            Save
          </button></div>}
        {!showEditInstituteAddressForm &&
          <div className={classes.addressInst}>
            {editOfficial !== null && editOfficial.map((person, index) => {
              return <OfficialPersonInstitue userId={props.userData.id} isEditable={isEditable} getOfficialDetails={getOfficialDetails} person={person} selectedInstitute={props.selectedInstitute} name={person.name} role={person.designation} phone={person.official_phone} email={person.contact_email} mail={person.email} key={index} />
            })}
          </div>
        }
      </div>
      {isEditable && isAdminOrOwner && showEditInstituteAddressForm &&
        <input
          type="text"
          onChange={handleChangeAddress}
          name="hourlyrate"
          className={classes.value_field}
          placeholder="580"
          defaultValue={formAddress}
        />
      }


      <div className={classes.officalPersonBlock}>

        {props.selectedInstitute.keypeople.map((person, index) => {
          return <OfficialPersonBlock person={person} key={index} />
        })}
      </div>



      {isAdminOrOwner && <div className={classes.HBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Documents :</div>
          {isEditable && isAdminOrOwner &&
            <button className={classes.editBtn} type="button" onClick={addDocHandler}>
              Add
            </button>
          }
          <input
            type="file"
            ref={docInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        {isEditable && <div className={classes.mainBlock}>
          <div className={classes.name}>Name</div>
          <div className={classes.date}>Date</div>
          <div className={classes.link}></div>
        </div>}


        <div className={classes.DofficalPersonBlock}>
          {props.selectedInstitute.keydocuments.map((onedoc, index) => {
            return <Document key={index}
              onedoc={onedoc}
              rerender={props.rerender}
              isAdminOrOwner={isAdminOrOwner}
              isEditable={isEditable}
            />
          })}
        </div>
      </div>
      }
      {showDocUploaderForm &&
        <DocInstitute onPress={closeAddDocUploaderForm}
          selectedInstitute={props.selectedInstitute}
          userData={props.userData}
          rerender={props.rerender}
        />
      }


      {/*	  
      <div className={classes.IBlock}>
        <div className={classes.topmainContainer}>
          <div className={classes.title}>Departments :</div>
            <button className={classes.editBtn} type="button">
               Edit
            </button>
        </div>
      </div>
      */}
    </div>
  );
}

export default InstituteProfile;
