import React, { useEffect, useState } from "react";
import classes from './AboutBasic.module.css';


import UnitBar from './UnitBar';
import UnitBarFirstName from './UnitBarFirstName';
import UnitBarLastName from './UnitBarLastName';
import UnitBarRole from './UnitBarRole';
import UnitBarEMail from './UnitBarEMail';
import UnitBarUsername from './UnitBarUsername';

import UnitBarTitle from './UnitBarTitle';

import UnitBarClass from './UnitBarClass';
import UnitBarSchool from './UnitBarSchool';
import UnitBarCity from './UnitBarCity';
import UnitBarState from './UnitBarState';
import UnitBarCountry from './UnitBarCountry';
import UnitBarIDDoc from './UnitBarIDDoc';

import UnitBarDOB from './UnitBarDOB';



import UnitBarGenDOB from './UnitBarGenDOB';
import UnitBarGender from './UnitBarGender';
import UnitBarPosiEmail from './UnitBarPosiEmail';


import UnitAboutIcon from './UnitAboutIcon';
import UnitEducationIcon from './UnitEducationIcon';
import UnitContactIcon from './UnitContactIcon';
import UnitSkillIcon from './UnitSkillIcon';


import UnitBarInstDegree from './UnitBarInstDegree';
import UnitBarAddress from './UnitBarAddress';




import UnitBarAchievement from './UnitBarAchievement';

import UnitAddressIcon from './UnitAddressIcon';

import profileImage from "./teach.jpg";
import aboutIcon from "./user.png";
import educationIcon from "./graduation-cap.png";
import skillsIcon from "./trophy.png";
import locationImage from "./boston.png";
import certificateImage from "./Cert.jpg";
import pythonIcon from "./python.png";
import certificateIcon from "./certificate.png";
import universityImage from "./london.jpg";

import p1 from "./pancard.jpg";
import p2 from "./1.jpg";
import p3 from "./contact.png";
import p4 from "./location.png";
import p5 from "./officialletter.png";
import p6 from "./creative-thinking.png";
import ProfileImage from "../ProfileImageSec/ProfileImage";
import EducationDetails from "../Basic/Forms/EducationDetails";
import EducationList from "../Basic/Forms/EducationList";
import { FaPlus } from "react-icons/fa";
import { getuser } from "../../../../CommonApps/AllAPICalls";
import Experience from "../Basic/Forms/AddExperience";
import ExperienceList from "../Basic/Forms/ExperienceList";
import Certificate from "../Basic/Forms/AddCertificate";
import CertificateList from "../Basic/Forms/CertificateList";
import { BsCamera, BsFilter } from "react-icons/bs";
import WarningBlock from "../ProfileImageSec/warningBlock";
import Publication from "../Basic/Forms/AddPublication";
import PublicationList from "../Basic/Forms/PublicationList";
import AboutUsView from "../Basic/Forms/AboutUsView";
import AddressList from "./Forms/AddressList";
import AddressNew from "./Forms/AddressNew";
// import AddressNew from "./Forms/AddressNew";
// import AddressList from "./Forms/AddressList";
import { useHistory } from "react-router-dom";



const AboutBasic = (props) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const [aboutData, setAboutData] = useState(null);

  const [showAboutUs, setShowAboutUs] = useState(false);
  const [showEducation, setshowEducation] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showExperience, setShowExperience] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showPublication, setShowPublication] = useState(false);


  const [showWarning, setShowWarning] = useState(false);
  let history = useHistory();
  const viewPublicProfileHandler = () => {
    history.push({
      pathname: `/public/profile/${props.userData.id}`,
      state: { userData: props.userData },
    });
  };
  console.log("this is props", props);


  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getuser();
        if (isMounted) {
          setData(data);
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
  }, [props]);

  const userImage = props.userData.profile_image;


  const userId = data.id;
  // const userImage = props.data.profile_image;
  console.log("this is userImage", props.data.profile_image);




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


  const handleProfileImageClick = () => {
    setShowWarning(true);
  };
  const handleCloseButtonClick = () => {
    setShowWarning(false);
  };
  const handleCloseWarningBlock = () => {
    setShowWarning(false);
  };


  const handleAddressClick = () => {
    setShowAddress(true);
  }

  const handleCloseAddress = () => {
    setShowAddress(false);
  }


  return (

    <div className={classes.Parent}>


      <div className={classes.Container}>


        <div className={classes.profileBox}>
          <div className={classes.profileInfoBox}>
            <div className={classes.Profile}>
 
 
              <div className={classes.Profileimage}>
                <img alt="profile_photo" src={userImage} className={classes.Image} />
                <button className={classes.uploadButton} onClick={handleProfileImageClick} > <BsCamera
                  className={classes.cameraIcon}

                /></button>
              </div>


              <div className={classes.Name}> {props.data.firstname} {props.data.lastname}</div>

              
            </div>
          </div>

          <div className={classes.ProfileDetails}>
                {/* <div className={classes.status}>
                  Status:
                  <div className={classes.Active}>Active</div>
                </div> */}
                <div className={classes.status}>
                  <button className={classes.Active} onClick={viewPublicProfileHandler}>Public View 
                  <BsFilter size={17} color="black" /></button>
                </div>
              </div>

        </div>

        <div className={classes.ProfileHighlights}>

          <div className={classes.divkk}>|| {props.data.firstname} {props.data.lastname} || {props.data.city} || {props.data.position} ||

          </div>
          <UnitAboutIcon userDataUpdated={props.userDataUpdated} />
          {/* <div className={classes.editButtonDiv}> 
          <UnitAboutIcon  userDataUpdated={props.userDataUpdated}/>
          </div> */} 
        </div>


        <div className={classes.ContactInfo}>
          <div className={classes.contactprivate}><div className={classes.text}>
            <img src={p3} alt="Contact Info Icon" className={classes.Icon} />
            Contact Information :
          </div>
            <div className={classes.status}>

              <div className={classes.Active}>Private</div>
            </div>
          </div>
          <div className={classes.infoBoxContact}>
            <div className={classes.ContactNumber}>Contact Number: {props.data.phoneno}</div>
            <div className={classes.Email}>Email: {props.data.email}</div>
            <div className={classes.DOB}>Date of Birth: {props.data.dateofbirth}</div>
          </div>
        </div>

        <div className={classes.Address}>
          <div className={classes.text}>
            <img src={p4} alt="Address Icon" className={classes.Icon} />
            Address :
            <button className={classes.editButton2} onClick={handleAddressClick}> <FaPlus className={classes.editIcon} /></button>
            {showAddress && <AddressNew userDataUpdated={props.userDataUpdated} aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleCloseAddress} />}
            <div className={classes.status}>
            <div className={classes.Active}>Private</div>
            </div>
          </div>


          <div className={classes.infoBox}>
            <AddressList rerender={props.rerender} userId={userId} userData={props.data} />
          </div>
        </div>

        <div className={classes.About}>
          <div className={classes.text}>
            <img src={p2} alt="About Icon" className={classes.Icon} />
            <div>About</div>

          </div>
          <div className={classes.infoBox}>
            <AboutUsView rerender={props.rerender} data={props.data} userData={props.data} />
            <div>
              {props.userData.about}

            </div>
          </div>
          <div className={classes.WorkingIcon}></div>
        </div>

        <div className={classes.Education}>
          <div className={classes.text}>
            <img src={p3} alt="Education Icon" className={classes.Icon} />
            Education
            <button className={classes.editButton} onClick={handleEducationDetail} > < FaPlus className={classes.editIcon} /></button>
            {showEducation && <EducationDetails aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleEducationDetailClose} />}

          </div>
          <div className={classes.infoBox}>

            <EducationList rerender={props.rerender} data={props.data} userId={userId} userData={props.data} />


          </div>

        </div>

        {/* <div className={classes.Skills}>
          <div className={classes.text}>
            <img src={skillsIcon} alt="Skills Icon" className={classes.Icon} />
            Skills :
          </div>
          <div className={classes.infoBox}>

          {
                    props.data.achievements.map((achievement, index)=>{

                    return  <UnitBarAchievement  key={index}
                                 achievementId={achievement.id}
                                 achievementname={achievement.name}
                                 duration={achievement.startDate+" - "+achievement.endDate}
                                 logo={props.data.profile_image}
                                 />





                    })

              }

            <div>Programming Languages: JavaScript, Python, Java</div>
            <div>Frameworks: React, Django, Spring</div>
          </div>
        </div> */}

        <div className={classes.Experience}>
          <div className={classes.text}>
            <img src={p4} alt="Experience Icon" className={classes.Icon} />
            Experience
            <button className={classes.editButton} onClick={handleExperienceClick}> <FaPlus className={classes.editIcon} /></button>
            {showExperience && <Experience userDataUpdated={props.userDataUpdated} aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleCloseExperience} />}
          </div>

          <div className={classes.infoBox}>
            <ExperienceList rerender={props.rerender} userId={userId} userData={props.data} />
          </div>
        </div>

        <div className={classes.Certificates}>
          <div className={classes.text}>
            <img src={certificateIcon} alt="Skills Icon" className={classes.Icon} />
            License & Certification
            <button className={classes.editButton} onClick={handleCertificate} > <FaPlus className={classes.editIcon} /></button>
            {showCertificate && <Certificate aboutData={aboutData} userData={props.data} rerender={props.rerender} onClose={handleCloseCertificate} />}
          </div>

          <CertificateList rerender={props.rerender} userId={userId} userData={props.data} />

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

        {/* <div className={classes.OfficialDocument}>
          <div className={classes.text}>
            <img
              src={p5}
              alt="Official Document Icon"
              className={classes.Icon}
            />
            Official Documents :
          </div>
          <div className={classes.infoBox}>
          <UnitBarIDDoc  docType={"Office ID"} data={props.data.officeId_doc} idtype={"officeid"} />

          <UnitBarIDDoc docType={"Govt ID"} data={props.data.govtId1_doc} idtype={"govtid1"} />

          <UnitBarIDDoc docType={"Date of birth Cert."} data={props.data.dobCert_doc} idtype={"dobdoc"} />
            <div className={classes.document1}>
              <img src={p1} className={classes.Pancard} />
            </div>

            <div className={classes.document2}>
              <img src={p2} className={classes.Aadharcard} />
            </div>
          </div>
          <button className={classes.uploadButton1}>Upload Document</button>
        </div> */}

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

    </div>


  );


}


export default AboutBasic;
