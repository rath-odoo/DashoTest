import React, { useEffect } from "react";
import classes from './AboutBasic.module.css';


import UnitBar from './UnitBar';
import UnitBarFirstName from './UnitBarFirstName';
import UnitBarLastName from './UnitBarLastName';
import UnitBarRole from './UnitBarRole';
import UnitBarEMail from './UnitBarEMail';

import UnitBarClass from './UnitBarClass';
import UnitBarSchool from './UnitBarSchool';
import UnitBarCity from './UnitBarCity';
import UnitBarState from './UnitBarState';
import UnitBarCountry from './UnitBarCountry';
import UnitBarTitle from './UnitBarTitle';


import UnitBarGenDOB from './UnitBarGenDOB';
import UnitBarGender from './UnitBarGender';
import UnitBarPosiEmail from './UnitBarPosiEmail';


import UnitAboutIcon from './UnitAboutIcon';
import UnitEducationIcon from './UnitEducationIcon';
import UnitContactIcon from './UnitContactIcon';
import UnitBarInstDegree from './UnitBarInstDegree';




import UnitBarAchievement from './UnitBarAchievement';

import UnitSkillIcon from '../Advanced/UnitSkillIcon';

import p1 from "./teach.jpg";
import p2 from "./user.png";
import p3 from "./graduation-cap.png";
import p4 from "./trophy.png";
import p5 from "./boston.png";
import p6 from "./Cert.jpg";
import p7 from "./python.png";
import p8 from "./certificate.png";
import p9 from "./london.jpg";
import ProfileImage from "../ProfileImageSec/ProfileImage";
import { useState } from 'react';
import warningBlockOne from "./../ProfileImageSec/warningBlock";
import WarningBlock from "./../ProfileImageSec/warningBlock";
import { BsCamera, BsPencil } from "react-icons/bs";
import AboutUs from "./Forms/AboutUs";
import { fetchAboutUsData, fetchAcademicDetails, getuser } from "../../../../CommonApps/AllAPICalls";
import EducationDetails from "./Forms/EducationDetails";
import Experience from "./Forms/AddExperience";
import ExperienceList from "./Forms/ExperienceList";
import EditAboutForm from "./Forms/EditAboutForm";
import { BiEditAlt } from "react-icons/bi";
import EducationList from "./Forms/EducationList";
import { FaPlus } from "react-icons/fa";
import Certificate from "./Forms/AddCertificate";
import CertificateList from "./Forms/CertificateList";
import Publication from "./Forms/AddPublication";
import PublicationList from "./Forms/PublicationList";
import AboutUsView from "./Forms/AboutUsView";
import SkillsView from "./Forms/SkillsList";


const AboutBasic = (props) => {

  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showEducation, setshowEducation] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showPublication, setShowPublication] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(null);

  const [rerender, setRerender] = useState(false);



  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getuser();
        if (isMounted) {
          setAboutData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);


  const rerenderHandler = () => {
    props.rerender();
  }



  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };



  const handleProfileImageClick = () => {
    setShowWarning(true);
  };


  const dateformat = (date) => {

    let date_ = String(date);

    if (date_ !== null) {

      let year = date_.split("-").at(0);
      let month = date_.split("-").at(1);
      let day = date_.split("-").at(2);

      let monthMap = {
        "01": "Jan", "02": "Feb", "03": "March",
        "04": "April", "05": "May", "06": "Jun", "07": "July",
        "08": "Sept", "09": "Oct", "10": "Oct", "11": "Nov", "12": "Dec"
      }
      let monthName = monthMap[month];

      let reObj = monthName + " " + year;

      return reObj;

    }
    return "N/A"


  }

  const handleCloseButtonClick = () => {
    setShowWarning(false);
  };


  const handleAboutUsButtonClick = () => {
    setShowAboutUs(true);
  };

  const handleExperienceClick = () => {
    setShowExperience(true);
  }
  const handleEducationDetail = () => {
    setshowEducation(true);
  }

  const handleCloseAboutUs = () => {
    setShowAboutUs(false);
  };

  const handleEducationDetailClose = () => {
    setshowEducation(false);
  }

  const handleCloseExperience = () => {
    setShowExperience(false);
  }

  const handleCertificate = () => {
    setShowCertificate(true);
  }
  const handleCloseCertificate = () => {
    setShowCertificate(false);
  }

  const hnadlePublication = () => {
    setShowPublication(true);
  }
  const handleClosePublication = () => {
    setShowPublication(false);
  }



  const handleCloseWarningBlock = () => {

    setShowWarning(false);
  };
  console.log(props.data)

  return (

    <div className={classes.Parent}>
      <div className={classes.Container}>
        {/* <div className={classes.Buttons}>
      <button className={classes.PublicButton}>Public</button>
      <button className={classes.PrivateButton}>Private</button>
    </div> */}

        <div className={classes.profileBox}>
          <div className={classes.profileInfoBox}>
            <div className={classes.Profile}>
              <div className={classes.Profileimage}  >
                {/* <img src={props.data.profile_image} class={classes.Image} alt="Profile" />
            <div class={classes.ProfileContent}>
              <button class={classes.uploadButton}>Upload</button>
            </div> */}

                <ProfileImage userData={props.data} rerenderHandler={rerenderHandler} rerender={props.rerender} />
                <div>
                  <div className={classes.cameraIconContainer}>
                    <BsCamera
                      className={classes.cameraIcon}
                      onClick={handleProfileImageClick}
                    />
                  </div>
                </div>

              </div>
              <div className={classes.Name}> {props.data.firstname} {props.data.lastname}</div>
            </div>


          </div>

          <div className={classes.statusEditBox}>
            <div className={classes.ProfileDetails}>
              <div className={classes.header1}>
                {/* <button class={classes.editButton1}>Edit</button> */}
                <UnitAboutIcon userDataUpdated={props.userDataUpdated} />
              </div>
              <div className={classes.status}>
                Status:
                <div className={classes.Active}>Active</div>
              </div>
              <div className={classes.Since}>
                Joined Since:
                <div className={classes.date}>01-01-2024</div>
              </div>
            </div>
          </div>
        </div>
        {showWarning && (
          <div className={classes.overlay}>
            <div className={classes.WarningBlock}>


              <div className={classes.cancelBtn}>

                <button className={classes.btnCrossMark} onClick={handleCloseButtonClick}>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateClassForm_closeButtonIcon__23ZZp" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
                </button>
                <div className={classes.profileTitle}>Change Profile Photo</div>
              </div>
              <WarningBlock userData={props.data} rerender={props.rerender} onClose={handleCloseWarningBlock} />

            </div>
          </div>
        )}


        <div className={classes.ProfileHighlights}>
          <div>|| {props.data.firstname} {props.data.lastname} || {props.data.position === "" ? "" : `${props.data.position} ||`} {props.data.city === "" ? "" : `${props.data.city} ||`} </div>
        </div>

        <div className={classes.About}>
          <div className={classes.text}>
            <img src={p2} alt="About Icon" className={classes.Icon} />
            <div>About</div>

          </div>
          <div className={classes.infoBoxAboutUs}>
            {props.userData.about}

            <div className={classes.aboutContainer}>
              <AboutUsView rerender={props.rerender} data={props.data} userData={props.data} />
            </div>
            <div>

            </div>
          </div>
          <div className={classes.WorkingIcon}></div>
        </div>

        {/* <div className={classes.Skills}>
      <div className={classes.text}>
        <img src={p4} alt="Skills Icon" className={classes.Icon} />
        Skills
        <button className={classes.editButton} > <BsPencil className={classes.editIcon} /></button>
      </div>
      <div className={classes.infoBox}>
      <SkillsView rerender={props.rerender} data={props.data}   userData={props.data}/>
     
      </div>
    </div> */}

        <div className={classes.Education}>
          <div className={classes.text}>
            <img src={p3} alt="Education Icon" className={classes.Icon} />
            Education
            <button className={classes.editButton} onClick={handleEducationDetail} > < FaPlus className={classes.editIcon} /></button>
            {showEducation && <EducationDetails aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleEducationDetailClose} />}

          </div>
          <div className={classes.infoBox}>

            <EducationList rerender={props.rerender} data={props.data} userData={props.data} />


          </div>

        </div>



        <div className={classes.Experience}>
          <div className={classes.text}>
            <img src={p4} alt="Experience Icon" className={classes.Icon} />
            Experience
            <button className={classes.editButton} onClick={handleExperienceClick}> <FaPlus className={classes.editIcon} /></button>
            {showExperience && <Experience userDataUpdated={props.userDataUpdated} aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleCloseExperience} />}
          </div>

          <div className={classes.infoBox}>
            <ExperienceList rerender={props.rerender} userData={props.data} />
          </div>
        </div>

        <div className={classes.Certificates}>
          <div className={classes.text}>
            <img src={p8} alt="Skills Icon" className={classes.Icon} />
            License & Certification
            <button className={classes.editButton} onClick={handleCertificate} > <FaPlus className={classes.editIcon} /></button>
            {showCertificate && <Certificate aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleCloseCertificate} />}
          </div>

          <CertificateList rerender={props.rerender} userData={props.data} />

          {/* <div className={classes.CertificateList}>
        <div className={classes.CertificateItem}>
          <img src={p6} alt="Certificate 1" />
          <div> Python Programming </div>
          <div> Feb. 2020- June. 2022</div>
        </div>
        <div className={classes.CertificateItem}>
          <img src={p7} alt="Certificate 2" />
          <div> Certificate of Advance Education.</div>
          <div> March. 2022- Feb. 2024</div>
        </div>
      </div> */}
        </div>


        <div className={classes.Skills}>
          <div className={classes.text}>
            <img src={p4} alt="Skills Icon" className={classes.Icon} />
            Publications
            <button className={classes.editButton} onClick={hnadlePublication} > <FaPlus className={classes.editIcon} /></button>
            {showPublication && <Publication aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleClosePublication} />}
          </div>
          <div className={classes.infoBox}>
            <PublicationList rerender={props.rerender} userData={props.data} />

          </div>
        </div>

      </div>

    </div>

  );


}


export default AboutBasic;
