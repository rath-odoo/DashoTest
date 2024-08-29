import React, { useEffect, useState } from "react";
import classes from "./DetailsPeopleBatch.module.css";
import profileImage from "./img.jpg"; 
import callIcon from "./call.png";
import chatIcon from "./chat (2).png";
import mailIcon from "./email.png";
import p1 from "./graph.png";
import p2 from "./user (1).png";
import p3 from "./education.png";
import p4 from "./contact (1).png";
import p5 from "./document.png";
import p6 from "./home-address.png";
import p7 from "./education.png";
import p8 from "./graph (1).png";
import p9 from "./documentation.png";
import p10 from "./user-data.png";
import p11 from "./online-education.png";
// import { fetchAboutUsData, fetchAcademicDetails, fetchCertificateList, fetchExperienceList, fetchPublicationList, getMemberDetails, getParentDetails, getallusers } from "../../CommonApps/AllAPICalls";
import { MdCheckCircle } from "react-icons/md";
import { FaExternalLinkAlt, FaPlus } from "react-icons/fa";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import { BiBookAdd, BiCartAdd, BiEdit, BiEditAlt } from "react-icons/bi";
import { fetchAddressList, getMemberDetailsforBatch } from "../../CommonApps/AllAPICalls";
// import EditParPeopleDetailsentDetails from "./Forms/EditParentDetails";
// import Logo from "../../CommonApps/Logo";
// import { deleteBankDetails, editBankDetails, getBankDetails, getMemberDetails, getParentDetails } from "../../CommonApps/AllAPICalls";
// import EditParentDetails from "./Forms/EditParentDetails";
// import CreateBankDetails from "./Forms/CreateBankDetails";
// import AddAddressMember from "./Forms/AddAddressMember";
// import AddrDetails from "./AddrDetailsMember";
// import EducationDetails from "./Forms/AddAcademics";
// import EducationInfo from "./EducationInfo";
// import AddExperience from "./Forms/AddExperience";
// import ExperienceList from "./ExperienceList";
// import HealthData from "./healthData";
// import AddAcademics from "./Forms/AddAcademics";
// import AddDocument from "./Forms/AddAcademics";
// import AddDocumentInstitute from "./Forms/AddAcademics";
// import DocumentList from "./DocumentList";
// import AddDocumentInstitute from "./Forms/AddAcademic";
// import DocumentList from "./DocumentList";
// import HealthData from "./HealthData";
// import CreateBankDetails from "./Forms/CreateBankDetails";

function App(props) {

  const [parentDetails, setParentDetails] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showEducation , setshowEducation] = useState(false);
  const [showDoc , setShowDoc] = useState(false);

  const [memberDetails, setMemberDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleMedia, setVisibleMedia] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showParentForm, setShowParentForm] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [editingBankDetails, seteditingBankDetails] = useState(null);
  const [showAddress , setShowAddress] = useState(false);
  const [showExperience , setShowExperience] = useState(false);
  const [showCertificate , setshowCertificate] = useState(false);
  const [showCourse , setshowCourse] = useState(false);
  const [addresses1, setAddresses] = useState([]);




 
 
  
 
   

    const handleBack = () => {
        props.onBack();
      };
 

   
 

  const handleEditParent = () => {
    setShowParentForm(prevState => !prevState);
  };


  const handleAddBank = () => {
    setShowAddForm(prevState => !prevState);
  }


  
 
 
 
 
 

  const handleAddressClick = () => {
    setShowAddress(true);
  }
  
  const handleCloseAddress = () => {
    setShowAddress(false);
  }

  const handleEducationDetail = () => {
    setshowEducation(true);
  }
   
  const handleEducationDetailClose = () => {
    setshowEducation(false);
  }


const handleExperienceClick = () => {
  setShowExperience(true);
}
const handleCloseExperience = () => {
  setShowExperience(false);
}


const handleAddDoc = () => {
  setShowDoc(true);
}
 
const handleDocClose = () => {
  setShowDoc(false);
}
  

console.log('props from the people Details', props.selectedInstitute.id , props.oneMember.id);

//if isAdminOrOwner:true then only show the Edit Parent button and i have one more condition if props.oneMember.user_id is matched to props.userData.id  then also show the Edit Parent button  
  
 
useEffect(() => {
  console.log('props from the people Details', props.selectedInstitute.id , props.oneMember.id);

  getMemberDetailsforBatch(props.oneMember.id, props.selectedInstitute.id)
    .then(data => {
      setMemberDetails(data);
      setParentDetails(data.parent_details);
      setshowEducation(data.academic_details);
      setShowExperience(data.experiences);
      setshowCertificate(data.licenses_certificates);
      setshowCourse(data.courses);
      
     
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
}, [props.oneMember.id, props.selectedInstitute.id]);


useEffect(() => {
  let isMounted = true;

 
    const userId = props.oneMember.id;
    fetchAddressList(userId)
      .then(data => {
        if (isMounted) {
          setAddresses(data.addresses);
        }
      })
 

  return () => {
    isMounted = false;
  };
}, [ props]);  


if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error.message}</div>;
}

console.log("this is education", showEducation);


  return (
    <div className={classes.Profile}>

      <div className={classes.profileInner}> 
                  <button className={classes.gobackBtn} onClick={handleBack}><BsArrowLeft /></button> 
      <div className={classes.Role}>
        {/* <h3>Role:</h3> */}
    
      </div>
      <div className={classes.ProfileBox}>
        <div className={classes.profileContainer}> 
        <img
          src={memberDetails.user.profile_image}
          alt="Profile"
          className={classes.ProfileImage}
        />
        </div>
        <div className={classes.sidetext}>
          <h2 className={classes.ProfileName}> </h2>
        </div>
      </div>
      <div className={classes.Section}>
        <h2>Profile Info</h2>
        <div className={classes.info}>
          <div className={classes.PersonalDetails}>
            <div className={classes.seticon}>
              <h3>Personal Details</h3>
              <img src={p10} className={classes.icon} />
            </div>

            <div>
          <div className={classes.listContainer}>
        

          
          <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Name:</strong> <div>{memberDetails.user.firstname} {memberDetails.user.lastname}</div></div>
           <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Date of Birth:</strong> <div>{memberDetails.user.dateofbirth}</div></div>
           <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Gender:</strong> <div>{memberDetails.user.gender}</div></div>
           <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Contact Number:</strong> <div> <a className={classes.hrefLink} href="#"> {memberDetails.user.phoneno}</a> </div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={callIcon} alt="Call" /></div>  </div>
           <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Email:</strong> <div> <a className={classes.hrefLink} href="#">  {memberDetails.user.email} </a></div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={mailIcon} alt="Call" /></div> </div>
           {/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Address:</strong> <div>{memberDetails.user.city},{memberDetails.user.state} {memberDetails.user.country}</div></div> */}
           {/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Address:</strong> <div> </div></div> */}
           {/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Father's Name:</strong> <div> {memberDetails.parent_details[0].father_name}</div></div> */}
           {/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Mother's Name:</strong> <div> {memberDetails.parent_details[0].mother_name}</div></div> */}
          </div>
           
        </div>



{/* 
            <ul className={classes.list}>
              <li>
                <strong>Name:</strong> John Wick
              </li>
              <li>
                <strong>Date of Birth:</strong> January 1, 2000
              </li>
              <li>
                <strong>Gender:</strong> Male
              </li>
              <li>
                <strong>Contact Number:</strong>{" "}
                <a href="#" onClick={handleCall}>
                  +91-878456890 <img src={callIcon} alt="Call" />
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="#" onClick={handleEmail}>
                  johnwicke@gmail.com <img src={mailIcon} alt="Email" />
                </a>
              </li>
              <li>
                <strong>Address:</strong> 123 Main St, Cityville, State, 12345
              </li>
              <li>
                <strong>Father's Name:</strong> Jhoshon Wick Sr.
              </li>
              <li>
                <strong>Mother's Name:</strong> Jenny Dov
              </li>
            </ul> */}

          </div>
          <div className={classes.AcademicDetails}>
            <div className={classes.seticon}>
              <h3>Academic Details</h3>
              <img src={p7} className={classes.icon} />


            <div className={classes.editContainer}> 
          {/* <button className={classes.editButton} onClick={handleEducationDetail}> <FaPlus className={classes.editIcon} /></button> */}
          </div>

           
        {/* {showEducation && <EducationDetails    memberDetails={memberDetails} rerender={props.rerender}   onClose={handleEducationDetailClose} />} */}
    
       

              
            </div>
            
 
            <div className={classes.listContainer}>

            <div className={classes.educationDiv}> 
          {showEducation.map((detail, index) => (
            <div className={classes.eduInnerDiv} key={index}>
              <div className={classes.div}>
                <div className={classes.divOne}>{detail.school_name}</div>
              
                {/* <button onClick={() => applyLeaveHandler(detail)} className={classes.editBtn}>
                  <BiEditAlt />
                </button> */}
              </div>
              <div>{detail.degree_name}, {detail.field_of_study}</div>
              <div className={classes.dateEdu}>{detail.start_date}</div>
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


      {/* <EducationInfo rerender={props.rerender}   memberDetails={memberDetails}     userData={props.data}/> */}
{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>University/College:</strong> <div>University of Delhi</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Degree:</strong> <div>Bachelor of Science</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Major:</strong> <div>Computer Science</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>CGPA:</strong> <div>8.8</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Graduation Year:</strong> <div>2012</div></div> */}
</div>
 
 
            {/* <ul>
              <li>
                <strong>University/College:</strong> University of Delhi
              </li>
              <li>
                <strong>Degree:</strong> Bachelor of Science
              </li>
              <li>
                <strong>Major:</strong> Computer Science
              </li>
              <li>
                <strong>CGPA:</strong> 8.8
              </li>
              <li>
                <strong>Graduation Year:</strong> 2012
              </li>
            </ul> */}
          </div>
        </div>
      </div>
  
      <div className={classes.Address}>
        <div className={classes.seticon}>
          <h3>Address</h3>
          <img src={p6} className={classes.icon} />

          

            <div className={classes.editContainer}> 
          {/* <button className={classes.editButton} onClick={handleAddressClick}> <FaPlus className={classes.editIcon} /></button> */}
          </div>
        {/* {showAddress && <AddAddressMember userDataUpdated={props.userDataUpdated}    memberDetails={memberDetails} rerender={props.rerender}   onClose={handleCloseAddress} />} */}
    
       
        </div>

        <div className={classes.listContainer}>

        <div>
        {addresses1.map(addr => (
          <div className={classes.mainDiv} key={addr.id}>
            <div className={classes.title}>
              {addr.addressType}  
            </div>
            <div className={classes.divText}>
              <div className={classes.sameOne}>
                {addr.houseno}, {addr.streetno ? addr.streetno : 'N/A'}
              </div>
              <div className={classes.sameTwo}>
                {addr.city ? addr.city + ', ' : ''}{addr.state ? addr.state + ', ' : ''}{addr.country ? addr.country + ' - ' : ''}{addr.pincode ? addr.pincode : 'N/A'}
              </div>
              <div className={classes.sameThree}>
                {addr.addressType ? addr.addressType : 'N/A'}
              </div>

              <div className={classes.sameThree}>
               careof:{addr.careof ? addr.careof : 'N/A'}
              </div>
            
            </div>
          </div>
        ))}
        </div>

       

        {/* <AddrDetails rerender={props.rerender}  memberDetails={memberDetails}/> */}

{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Permanent Address:</strong> <div>123 Main St, Cityville, State,
            12345</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Present Address:</strong> <div>456 Park Ave, Townsville, State,
            54321</div></div> */}

</div>
        {/* <ul>
          <li>
            <strong>Permanent Address:</strong> 123 Main St, Cityville, State,
            12345
          </li>
          <li>
            <strong>Present Address:</strong> 456 Park Ave, Townsville, State,
            54321
          </li>
        </ul> */}
      </div>
      {/* <div className={classes.ParentsDetails}>
        <div className={classes.seticon}>
          <h3>Parents Details</h3>
          <img src={p4} className={classes.icon} />

          {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
          <button className={classes.editBtn} onClick={handleEditParent}>
            <BiEdit className={classes.editInner} />
          </button>
     )}  


        </div>


      
            <div className={classes.listContainer}>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Name:</strong> <div></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Name:</strong> <div></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Phone:</strong> <div> <a className={classes.hrefLink} href="#"> </a> </div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={callIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Phone:</strong> <div> <a className={classes.hrefLink} href="#"> </a> </div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={callIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Email:</strong> <div> <a className={classes.hrefLink} href="#"> </a></div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={mailIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Email:</strong> <div> <a className={classes.hrefLink} href="#"> </a></div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={mailIcon} alt="Call" /></div></div>
            </div>
         
     
        <ul>
          <li>
            <strong>Father's Name:</strong> John Doe Sr.
          </li>
          <li>
            <strong>Mother's Name:</strong> Jane Doe
          </li>
          <li>
            <strong>Contact Number:</strong>{" "}
            <a href="#" onClick={handleCall}>
              +91-783456789 <img src={callIcon} alt="Call" />
            </a>
          </li>
          <li>
            <strong>Email:</strong>{" "}
            <a href="#" onClick={handleEmail}>
              john.doe@gmail.com <img src={mailIcon} alt="Email" />
            </a>
          </li>
          <li>
            <strong>Address:</strong> 789 Elm St, Suburbia, State, 54321
          </li>
        </ul>

      </div> */}
     
          <div className={classes.Section}>
            <h2>Additional Info</h2>
            <div className={classes.info}>
              <div className={classes.Achievements}>
                <div className={classes.seticon}>
                  <h3>Certificate</h3>
                  <img src={p1} className={classes.icon} />
                </div>


        <div className={classes.listContainer}>

        <div>
        {showCertificate.map(certificate => (
          <div className={classes.mainDiv2} key={certificate.id}>
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
                <div className={classes.sameTwo}>Issued{certificate.issue_date}</div>
                <div className={classes.sameThree}>
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

{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Dean's List:</strong> <div> React University, April 2022 </div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Scholarships:</strong> <div> Merit Scholarship</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Honors:</strong> <div>Gold Medalist</div></div> */}
</div>
                {/* <ul>
                  <li>
                    <strong>Dean's List:</strong> React University, April 2022
                    <p>Spring 2020, Fall 2021</p>
                  </li>
                  <li>
                    <strong>Scholarships:</strong> Merit Scholarship
                  </li>
                  <li>
                    <strong>Honors:</strong> Gold Medalist
                  </li>
                </ul> */}
              </div>
     
              {/* <div className={classes.HealthData}>
                <div className={classes.seticon}>
                  <h3>Health Data</h3>
                  <img src={p5} className={classes.icon} />
                </div>

                <div className={classes.listContainer}>

                <HealthData rerender={props.rerender}  isAdminOrOwner={props.isAdminOrOwner} oneMember={props.oneMember} userData={props.userData}  memberDetails={memberDetails} />

<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Blood Group:</strong> <div> A+ </div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Height:</strong> <div> 5'10"</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Weight:</strong> <div>70 kg</div></div>
</div>
               
              </div> */}
              {/* <div className={classes.AttendanceData}>
                <div className={classes.seticon}>
                  <h3>Attendance Data</h3>
                  <img src={p2} className={classes.icon} />
                </div>


                
                <div className={classes.listContainer}>

<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Week 1:</strong> <div> 90%</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Week 2:</strong> <div> 92%</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Week 3:</strong> <div> 95%</div></div>
</div>
                <ul>
                  <li>
                    <strong>Week 1:</strong> 90%
                  </li>
                  <li>
                    <strong>Week 2:</strong> 92%
                  </li>
                  <li>
                    <strong>Week 3:</strong> 95%
                  </li>
                </ul>

                <p>
                  Progress Improvement:{" "}
                  <span style={{ color: "green" }}>+5%</span>
                </p>
              </div> */}
              
              {/* <div className={classes.ProgressReport}>
                <div className={classes.seticon}>
                  <h3>Course Enrolled</h3>
                  <img src={p11} className={classes.icon} />
                </div>

                <div className={classes.listContainer}>
                {showCourse.map((course, index) => (
            <div className={classes.eduInnerDiv} key={index}>
              <div className={classes.div}>
              <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>{course.courseGlobalCode}-   </strong> <div>  {course.courseShortName}</div></div>
   
               
              </div>
            
            </div>
          ))}

<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 1:</strong> <div> Fundamental of Mathematics</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 2:</strong> <div> Micro Biology</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 3:</strong> <div> Concept of Physics</div></div>
</div>
                <ul>
                  <li>
                    <strong>Course 1:</strong> Fundamental of Mathematics
                  </li>
                  <li>
                    <strong>Course 2:</strong> Micro Biology
                  </li>
                  <li>
                    <strong>Course 3:</strong> Concept of Physics
                  </li>
                </ul>
              </div> */}
            </div>
            {/* <div className={classes.Documents}>
              <div className={classes.divDocument}> 
            <h3>Documents</h3>

            <div className={classes.editContainer}> 
          
          {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
           <button className={classes.editButton} > <FaPlus className={classes.editIcon} /></button>
        )}
          </div>
          </div>
        {showDoc && <AddDocumentInstitute  memberDetails={memberDetails} rerender={props.rerender}   onClose={handleDocClose} />}


        <DocumentList isAdminOrOwner={props.isAdminOrOwner} oneMember={props.oneMember}  rerender={props.rerender}  userData={props.userData}  memberDetails={memberDetails} />


  {certificates.map(certificate => (
  <div  key={certificate.id}> 
          <div className={classes.seticon}>
            
            <h3>Documents</h3>
            <img src={p9} className={classes.icon} />
          </div>
          <ul>
            <li>
              <strong>{certificate.name}</strong>
              <p>{certificate.issuing_organisation} , {(certificate.issue_date)}</p>
              <button onClick={() => handleViewClick(certificate.id)}>
            View
          </button>
          {visibleMedia[certificate.id] && (
            <div>
              <img src={certificate.media} alt={certificate.title} />
             
            </div>
          )}
            </li>
            
          </ul>
          </div>
              ))}

      </div> */}
            {/* <div className={classes.CoursesEnrolled}>
              <div className={classes.seticon}>
                <h3>Progress report</h3>
                <img src={p8} className={classes.icon} />
              </div>

              <div className={classes.listContainer}>

<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 1:</strong> <div> Fundamental of Mathematics</div></div>
<div className={classes.listProgress}> 
<progress value="70" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "red" }}>-10%</span>
                  </p>
                  </div>

                  <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 2:</strong> <div> Fundamental of Mathematics</div></div>
<div className={classes.listProgress}> 
<progress value="80" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "green" }}>+8%</span>
                  </p>
                  </div>

                  <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 3:</strong> <div> Fundamental of Mathematics</div></div>
<div className={classes.listProgress}> 
<progress value="60" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "green" }}>+15%</span>
                  </p>
                  </div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 2:</strong> <div> Micro Biology</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Course 3:</strong> <div> Concept of Physics</div></div>
</div>

              <ul>
                <li>
                  <strong>Course 1:</strong> Fundamental of Mathematics
                  <progress value="70" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "red" }}>-10%</span>
                  </p>
                </li>
                <li>
                  <strong>Course 2:</strong> Micro Biology
                  <progress value="80" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "green" }}>+8%</span>
                  </p>
                </li>
                <li>
                  <strong>Course 3:</strong> Concept of Physics
                  <progress value="60" max="100"></progress>
                  <p>
                    Progress Improvement:{" "}
                    <span style={{ color: "green" }}>+15%</span>
                  </p>
                </li>
              </ul>
            
        </div> */}
      </div>

      <div className={classes.Section}>
        <h2>Experience</h2>
        
      
          <div className={classes.Achievements}>
            <div className={classes.seticon}>
            <h3 className={classes.headingAcc}>Experience</h3>
            {/* <button className={classes.editButton} onClick={handleExperienceClick}> <FaPlus className={classes.editIcon} /></button> */}
        {/* {showExperience && <AddExperience  memberDetails={memberDetails}  rerender={props.rerender}  onClose={handleCloseExperience} />} */}
            </div>


        <div className={classes.listContainer}>

        <div >
        {showExperience.map(experience => (
          <div className={classes.mainDiv}  key={experience.id}>
            {/* <div>{experience.id}</div> */}
            
            <div className={classes.title}> {experience.title}  
         
         </div>
            <div className={classes.divText}>
            <div className={classes.sameOne}> {experience.company_name} - {experience.employment_type}</div>   
            <div className={classes.sameTwo}> { experience.start_date}</div>
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

        {/* <ExperienceList rerender={props.rerender}   memberDetails={memberDetails} /> */}

{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Position:</strong> <div> </div></div> */}
{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Duration:</strong> <div>  </div></div> */}
{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Skills:</strong> <div> </div></div> */}
{/*  */}
{/* <ol className={classes.oltag}>
  <li>Assisted in developing web applications using React.js</li> <li>Participated in daily stand-up meetings</li>
                  <li>Collaborated with team members to solve technical challenges</li>
</ol> */}

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

            {/* <ul>
              <li>
                <strong>Position:</strong> Software Developer Intern
              </li>
              <li>
                <strong>Duration:</strong> June 2021 - August 2021
              </li>
              <li>
                <strong>Responsibilities:</strong>
                <ul>
                  <li>Assisted in developing web applications using React.js</li>
                  <li>Participated in daily stand-up meetings</li>
                  <li>Collaborated with team members to solve technical challenges</li>
                </ul>
              </li>
            </ul> */}

          </div>

          {/* <div className={classes.HealthData}> */}
            {/* <div className={classes.seticon}>
              <h3>Part-time Job at XYZ Technologies</h3>
            </div>


            <div className={classes.listContainer}>

<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Position:</strong> <div> Frontend Developer </div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Duration:</strong> <div>  January 2020 - Present</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Responsibilities:</strong> <div> </div></div>

<ol className={classes.oltag}>
<li>Developing and maintaining user interfaces for web applications</li>
                  <li>Optimizing website performance and responsiveness</li>
                  <li>Collaborating with backend developers .</li>
</ol>
   
</div> */}

            {/* <ul>
              <li>
                <strong>Position:</strong> Frontend Developer
              </li>
              <li>
                <strong>Duration:</strong> January 2020 - Present
              </li>
              <li>
                <strong>Responsibilities:</strong>
                <ul>
                  <li>Developing and maintaining user interfaces for web applications</li>
                  <li>Optimizing website performance and responsiveness</li>
                  <li>Collaborating with backend developers to integrate frontend components</li>
                </ul>
              </li>
            </ul> */}
          {/* </div> */}
        
        
      </div>


{/* <div className={classes.bankDetails}> 
<div className={classes.bankDetailsHeading}> 
<h2>Bank Details</h2>
</div>
      <div className={classes.Section1}>
        <div className={classes.infoBox}>


    <div className={classes.bankDetailFlex}> 
          <h3 className={classes.headingAcc}>Account Details</h3>
        <div className={classes.addStudentbtnContainer}  >
            

            {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
            <div className={classes.btnAddBankDetails} onClick={handleAddBank}  >< FaPlus  className={classes.editIcon} /></div>
        )} 
           {showAddForm &&
            <CreateBankDetails onClose={handleAddBank}   memberDetails={memberDetails} rerender={props.rerender}   />
            } * 
          </div>
     </div>

{bankDetails.map((bank) => (
          <div className={classes.bankDetailList} key={bank.id}>

            <div className={classes.listBank}>
            <div><strong className={classes.name}>Bank Name:      </strong>   {bank.bank_name}</div>
            <div><strong className={classes.name}>Account Number: </strong>  {bank.bank_account_number}</div>
            <div><strong className={classes.name}>IFSC Code:      </strong> {bank.ifsc_code}</div>
            <div><strong className={classes.name}>UPI ID:         </strong> {bank.upi_id}</div>
            <div><strong className={classes.name}>Phone Number:   </strong> {bank.phone_number} </div>
            </div>

<div className={classes.btnDiv}>

          
            {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
               <button className={classes.editBtnBank}onClick={() => editBankHandler(bank)} ><BiEditAlt /></button>
        )}
      
           

                {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
                <button className={classes.deleteBank} onClick={() => handleDeleteCertificate(bank.id)}>
                <BsTrash className={classes.trashBtn} />
              </button>
        )}
                </div>

           
          </div>
          
        ))}


        </div>
      </div>
      </div> */}

      {/* <div className={classes.Section1}>
        <div className={classes.seticon1}>
          <h2>Contact</h2>
          <img src={p4} className={classes.icon1} />
        </div>
        <div className={classes.SubjectExpert}>
          <button onClick={handleCall}>
            <img src={callIcon} alt="Call" />
          </button>
          <button onClick={handleChat}>
            <img src={chatIcon} alt="Chat" />
          </button>
          <button onClick={handleEmail}>
            <img src={mailIcon} alt="Email" />
          </button>
        </div>
      </div> */}

      </div>

    </div>
  );
}

export default App;
