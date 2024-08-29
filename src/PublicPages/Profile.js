/// import "./App.css";
import classes from "./Profile.module.css";
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { FaBeer } from "react-icons/fa";
import {
  BsFillPersonFill,
  BsFillFileEarmarkPdfFill,
  BsFillAwardFill,
  BsFillGeoAltFill,
  BsFillTrash3Fill,
  BsPlusCircle,
  BsTrash,
  BsCloudUpload,
  BsPencilSquare,
  BsFillMortarboardFill,
  BsGeo,
  BsHouseCheck,
  BsCamera,
  BsXCircle,
} from "react-icons/bs";
// import "typeface-roboto";

import { FaExternalLinkAlt, FaGraduationCap } from 'react-icons/fa';

import ProfileImage from "./profile1.jpg";
import SchoolImage from "./school.jpg";
import SkillImage from "./skill.jpg";
import InstituteImage from "./institute.jpg";

import p1 from "./teach.jpg";
import p2 from "./user.png";
import p3 from "./graduation-cap.png";
import p4 from "./trophy.png";
import p5 from "./boston.png";
import p6 from "./Cert.jpg";
import p7 from "./python.png";
import p8 from "./certificate.png";
import p9 from "./london.jpg";
import { useEffect, useState } from "react";
import { fetchAboutUsData, fetchAcademicDetails, fetchCertificateList, fetchExperienceList, fetchPublicationList } from "../CommonApps/AllAPICalls";
import { MdCheckCircle } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";


function App() {

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };


  const [rerender, setRerender] = useState(false);
  const [aboutUsInfo, setAboutUsInfo] = useState(null);
  const [academicDetails, setAcademicDetails] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [publications, setPublications] = useState([]);


  useEffect(() => {
    const userId = userData.id;
    fetchAboutUsData(userId)
      .then(response => {
        if (response.about_us && response.about_us.length > 0) {
          setAboutUsInfo(response.about_us[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching about us data:', error);
      });
  }, []);


  useEffect(() => {
    const userId = userData.id;
    fetchAcademicDetails(userId)
      .then(data => {
        setAcademicDetails(data);
      })
      .catch(error => {
        console.error('Error fetching academic details:', error);
      });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("id", props.userData.id)
        // console.log(data.id);
        const userId = userData.id;
        const experienceList = await fetchExperienceList(userId);
        setExperiences(experienceList);
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userData.id;
        const certificateList = await fetchCertificateList(userId);
        setCertificates(certificateList);
      } catch (error) {
        console.error("Error fetching certificate list", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = userData.id;
        const publicationList = await fetchPublicationList(userId);
        setPublications(publicationList);
      } catch (error) {
        console.error('Error fetching publication list:', error);
      }
    };
    fetchData();
  }, []);



  // const { userId } = useParams();
  const { userId } = useParams();
  const location = useLocation();

  const userData = location.state.userData;

  const formatEducationDate = (startDate, endDate) => {
    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const startYear = new Date(startDate).getFullYear();
    const endMonth = new Date(endDate).toLocaleString('default', { month: 'short' });
    const endYear = new Date(endDate).getFullYear();

    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  };


  return (
    <div className={classes.Parent}>

      <div className={classes.Container}>
        <div className={classes.Buttons}>
          <button className={classes.PublicButton} onClick={handleGoBack}><IoMdArrowRoundBack className={classes.backArrow} /></button>
          {/* <button className={classes.PrivateButton}>Private</button> */}
        </div>

        <div class={classes.profileBox}>
          <div class={classes.profileInfoBox}>
            <div class={classes.Profile}>
              <div class={classes.Profileimage}>
                <img src={userData.profile_image} class={classes.Image} alt="Profile" />
                <div class={classes.ProfileContent}>
                  {/* <button class={classes.uploadButton}>Upload</button> */}
                </div>
              </div>
              <div class={classes.Name}>{userData.firstname} {userData.lastname} </div>
            </div>
          </div>

          <div class={classes.statusEditBox}>
            <div class={classes.ProfileDetails}>
              <div class={classes.header1}>
                {/* <button class={classes.editButton1}>Edit</button> */}
              </div>
              <div class={classes.status}>
                Status:
                <div class={classes.Active}>Active</div>
              </div>
              <div class={classes.Since}>
                Joined Since:
                <div class={classes.date}>01-01-2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className={classes.ProfileHighlights}>
          <div>|| {userData.firstname} {userData.lastname}   ||  {userData.city === "" ? null : `${userData.city} ||`}{userData.position === "" ? null : `${userData.position} ||`}</div>
        </div>

        <div className={classes.About}>
          <div className={classes.text}>
            <img src={p2} alt="About Icon" className={classes.Icon} />
            About
          </div>
          <div className={classes.infoBox}>
            <div className={classes.aboutUsContent}>

              <div>
                {userData.about}
              </div>
              <div className={classes.skillsContent}>
                {aboutUsInfo && aboutUsInfo.skills && aboutUsInfo.skills.length > 0 && (
                  <div className={classes.idClass}>
                    <MdCheckCircle className={classes.editIcon} />
                    <div>Top Skills:</div>
                    {aboutUsInfo.skills.map((skill, index) => (
                      <span key={skill.id}>
                        {skill.name}
                        {index !== aboutUsInfo.skills.length - 1 && ','}
                      </span>
                    ))}
                  </div>
                )}
              </div>


            </div>
          </div>
          <div className={classes.WorkingIcon}></div>
        </div>

        <div className={classes.Education}>
          <div className={classes.text}>
            <img src={p3} alt="Education Icon" className={classes.Icon} />
            Education
          </div>
          <div className={classes.infoBox}>
            <div className={classes.educationDiv}>
              {academicDetails.map((detail, index) => (
                <div className={classes.eduInnerDiv} key={index}>
                  <div className={classes.div}>
                    <div className={classes.divOne}>{detail.school_name}</div>

                  </div>
                  <div>{detail.degree_name}, {detail.field_of_study}</div>
                  <div className={classes.dateEdu}>{formatEducationDate(detail.start_date, detail.end_date)}</div>
                  <div className={classes.skillListOuter}>
                    {detail.skills.map((skill, skillIndex) => (
                      <div className={classes.skillList} key={skill.id}>
                        {skillIndex === 0 && <MdCheckCircle className={classes.skillIcon} />}
                        {skill.name}
                        {skillIndex < detail.skills.length - 1 && ','}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>



        <div className={classes.Experience}>
          <div className={classes.text}>
            <img src={p4} alt="Experience Icon" className={classes.Icon} />
            Experience
          </div>

          <div className={classes.infoBox}>
            <div className={classes.experienceList} >
              {experiences.map(experience => (
                <div className={classes.mainDiv} key={experience.id}>
                  {/* <div>{experience.id}</div> */}

                  <div className={classes.title}> {experience.title}</div>
                  <div className={classes.divText}>
                    <div className={classes.sameOne}> {experience.company_name} - {experience.employment_type}</div>
                    <div className={classes.sameTwo}> {formatEducationDate(experience.start_date, experience.end_date)}</div>
                    <div className={classes.sameThree} > {experience.location} - {experience.location_type}</div>

                    {/* <strong>Skills:</strong> */}
                    {/* <div>
                {experience.skills.map(skill => (
                  <div key={skill.id}>Skills: {skill.name}</div>
                ))}
              </div> */}

                    {/* <div className={classes.skillListOuter}>
                {experience.skills.map((skill, skillIndex) => (
                  <div className={classes.skillList} key={skill.id}>
                    {skillIndex === 0 && <MdCheckCircle className={classes.skillIcon} />}
                    {skill.name}
                    {skillIndex < experience.skills.length - 1 && ','}
                  </div>
                ))}
              </div> */}

                  </div>



                </div>
              ))}
            </div>

          </div>
        </div>



        <div className={classes.Skills}>
          <div className={classes.text}>
            <img src={p4} alt="Skills Icon" className={classes.Icon} />
            License & Certification
          </div>
          <div className={classes.infoBox}>
            <div className={classes.Certificate}>
              <div>
                {certificates.map(certificate => (
                  <div className={classes.mainDivCert} key={certificate.id}>
                    <div className={classes.mediaPreview}>
                      {certificate.media && (
                        <>

                          <img src={certificate.media} alt="certificate media" className={classes.mediaImage} />

                          <a href={certificate.media_url} target="_blank" rel="noopener noreferrer">
                            {/* <button className={classes.viewMediaBtn}>View Media</button> */}
                          </a>
                        </>
                      )}
                    </div>
                    <div className={classes.innerMainDiv}>
                      <div className={classes.title}>
                        {certificate.name}

                      </div>
                      <div className={classes.divText}>
                        <div className={classes.sameOne}>{certificate.issuing_organisation}</div>
                        <div className={classes.sameTwoCert}>Issued {(certificate.issue_date)}</div>
                        <div className={classes.sameThreeCert}>
                          {certificate.credentials_url && (
                            <a href={certificate.credentials_url} target="_blank" rel="noopener noreferrer">
                              <button className={classes.credentialsBtn}>Show Credentials <FaExternalLinkAlt /></button>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>


                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>




        <div className={classes.Skills}>
          <div className={classes.textPublication}>
            <img src={p4} alt="Skills Icon" className={classes.Icon} />
            Publications
          </div>
          <div className={classes.infoBox}>
            <div>
              {publications.map(publication => (
                <div className={classes.mainDiv} key={publication.id}>
                  <div className={classes.title}>
                    {publication.title}
                  </div>
                  <div className={classes.divText}>
                    <div className={classes.sameOne}></div>
                    <div className={classes.sameTwo}>{publication.publication_date}</div>
                    <div className={classes.sameThree}>{publication.description}</div>
                    <div className={classes.authors}>
                      {publication.author_usernames.map((username, index) => (
                        <span key={index} className={classes.author}>
                          {username}
                          {index !== publication.author_usernames.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>

  );
}

export default App;
