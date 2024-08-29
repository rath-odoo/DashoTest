import React, { useEffect, useState } from "react";
import classes from "./PeopleDetails.module.css";
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
// import EditParPeopleDetailsentDetails from "./Forms/EditParentDetails";
import Logo from "../../CommonApps/Logo";
import { deleteBankDetails, editBankDetails, fetchAddressList, getBankDetails, getMemberDetails, getParentDetails } from "../../CommonApps/AllAPICalls";
import EditParentDetails from "./Forms/EditParentDetails";
import CreateBankDetails from "./Forms/CreateBankDetails";
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
import AddDocumentInstitute from "./Forms/AddAcademic";
import DocumentList from "./DocumentList";
import HealthData from "./HealthData";
// import CreateBankDetails from "./Forms/CreateBankDetails";

function App(props) {

  const [parentDetails, setParentDetails] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [showEducation , setshowEducation] = useState([]);
  const [showDoc , setShowDoc] = useState(false);

  const [memberDetails, setMemberDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleMedia, setVisibleMedia] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [showParentForm, setShowParentForm] = useState(false);
  const [bankDetails, setBankDetails] = useState([]);
  const [showCourse, setcourses  ] = useState([]);
  const [ShowCertificates, setShowCertificates  ] = useState([]);


  const [editingBankDetails, seteditingBankDetails] = useState(null);
  const [showAddress , setShowAddress] = useState(false);
  const [showExperience , setShowExperience] = useState([]);
  const [addresses1, setAddresses] = useState([]);


  const [formData, setFormData] = useState({
    bank_name: '',
    bank_account_number: '',
    ifsc_code: '',
    upi_id: '', 
    phone_number: '',
    
   
  });


  useEffect(() => {
    const userId =  props.oneMember.user_id;
    getParentDetails(userId  , props)
      .then(data => setParentDetails(data))
      .catch(err => setError(err));
  }, [props]);

 
  useEffect(() => {
    const userId =  props.oneMember.user_id;
    const instituteId = props.selectedInstitute.id;
  
    getMemberDetails(userId , instituteId)
      .then(data => {
        setMemberDetails(data);
        setshowEducation(data.academic_details);
        setShowExperience(data.experiences);
        setShowCertificates(data.licenses_certificates);
        setcourses(data.courses);
      })
      .catch(err => {
        setError(err);
      });
  }, [props]);

  useEffect(() => {
    // Fetch bank details when the component mounts
    fetchBankDetails();
  }, [props]);

  useEffect(() => {
    let isMounted = true;
  
   
    const userId =  props.oneMember.user_id;
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

  const fetchBankDetails = async () => {
    try {
      const userId =  props.oneMember.user_id;
      const instituteId = props.selectedInstitute.id;
      const response = await getBankDetails(instituteId , userId);
      setBankDetails(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!memberDetails) {
    return <div>Loading...</div>;
  }


  
 
   

    const handleBack = () => {
        props.onBack();
      };

  const handleCall = () => {
 
  };

  const handleChat = () => {
    
  };

  const handleEmail = () => {
  
  };


   

  const handleViewClick = (id) => {
    setVisibleMedia((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const handleEditParent = () => {
    setShowParentForm(prevState => !prevState);
  };


  const handleAddBank = () => {
    setShowAddForm(prevState => !prevState);
  }


  const handleDeleteCertificate = async (id) => {
    try {
      const userId =  props.oneMember.user_id;
      const instituteId = props.selectedInstitute.id;
      await deleteBankDetails(id, userId, instituteId, props);
    } catch (error) {
      console.error("Error deleting certificate", error);
      alert("You don't have the persmission to perform this action ");
    }
  };
 
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
 
 
 

  const closeWarningHandler = () => {
    
    setShowWarning(false);
  };

  const editBankHandler = (bank) => {
    seteditingBankDetails(bank);
    setFormData({
      bank_name: bank.bank_name,
      bank_account_number: bank.bank_account_number,
      ifsc_code: bank.ifsc_code,
      upi_id: bank.upi_id,
      phone_number: bank.phone_number,
     

 
        
    });
    setShowWarning(true);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId =  props.oneMember.user_id;
      const instituteId = props.selectedInstitute.id;
      const data = new FormData();
      data.append('bank_name', formData.bank_name);
      data.append('bank_account_number', formData.bank_account_number);
      data.append('ifsc_code', formData.ifsc_code);
      if (formData.expiration_date) data.append('upi_id', formData.upi_id);
      if (formData.credentials_id) data.append('phone_number', formData.phone_number);
     
      await editBankDetails(editingBankDetails.id, userId, data ,instituteId ,props);
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing certificate:', error);
    }
  };
  

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
  

console.log('props from the people Details', props);

//if isAdminOrOwner:true then only show the Edit Parent button and i have one more condition if props.oneMember.user_id is matched to props.userData.id  then also show the Edit Parent button  
  
 
  return (
    <div className={classes.Profile}>

      <div className={classes.profileInner}> 
                  <button className={classes.gobackBtn} onClick={handleBack}><BsArrowLeft /></button> 
      <div className={classes.Role}>
        <h3>Role:</h3>
        <h3>  {memberDetails.user_type}</h3>
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
          <h2 className={classes.ProfileName}>{memberDetails.user.firstname} {memberDetails.user.lastname}</h2>
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
          <div className={classes.mainDiv2} key={addr.id}>
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
      <div className={classes.ParentsDetails}>
        <div className={classes.seticon}>
          <h3>Parents Details</h3>
          <img src={p4} className={classes.icon} />

          {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
          <button className={classes.editBtn} onClick={handleEditParent}>
            <BiEdit className={classes.editInner} />
          </button>
        )}


        </div>


        {showParentForm ? (
             
             <EditParentDetails onClose={handleEditParent} memberDetails={memberDetails} rerender={props.rerender}   />
               
          ) : (
            <div className={classes.listContainer}>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Name:</strong> <div>{parentDetails[0].father_name}</div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Name:</strong> <div>{parentDetails[0].mother_name}</div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Phone:</strong> <div> <a className={classes.hrefLink} href="#"> {parentDetails[0].father_phone} </a> </div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={callIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Phone:</strong> <div> <a className={classes.hrefLink} href="#"> {parentDetails[0].mother_phone} </a> </div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={callIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Father's Email:</strong> <div> <a className={classes.hrefLink} href="#"> {parentDetails[0].father_email} </a></div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={mailIcon} alt="Call" /></div></div>
              <div className={classes.listTwo}> <div>●</div> <strong className={classes.name}>Mother's Email:</strong> <div> <a className={classes.hrefLink} href="#"> {parentDetails[0].mother_email} </a></div> <div className={classes.imgContainer}><img className={classes.imgIcon} src={mailIcon} alt="Call" /></div></div>
            </div>
          )}
     
        {/* <ul>
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
        </ul> */}

      </div>
     
          <div className={classes.Section}>
            <h2>Additional Info</h2>
            <div className={classes.info}>
              <div className={classes.Achievements}>
                <div className={classes.seticon}>
                  <h3>Certificates</h3>
                  <img src={p1} className={classes.icon} />
                </div>



        <div className={classes.listContainer}>

        <div>
        {ShowCertificates.map(certificate => (
          <div className={classes.mainDiv} key={certificate.id}>
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
     
              <div className={classes.HealthData}>
                <div className={classes.seticon}>
                  {/* <h3>Health Data</h3> */}
                  {/* <img src={p5} className={classes.icon} /> */}
                </div>

                <div className={classes.listContainer}>

                <HealthData rerender={props.rerender}  isAdminOrOwner={props.isAdminOrOwner} oneMember={props.oneMember} userData={props.userData}  memberDetails={memberDetails} />

{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Blood Group:</strong> <div> A+ </div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Height:</strong> <div> 5'10"</div></div>
<div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Weight:</strong> <div>70 kg</div></div> */}
</div>
               
              </div>


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
              </div>
               */}
              {/* <div className={classes.ProgressReport}>
                <div className={classes.seticon}>
                  <h3>Course Enrolled</h3>
                  <img src={p11} className={classes.icon} />
                </div>

                <div className={classes.listContainer}>

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






            <div className={classes.Documents}>
              <div className={classes.divDocument}> 
            <h3>Documents</h3>

            <div className={classes.editContainer}> 
          
          {(props.isAdminOrOwner || props.oneMember.user_id === props.userData.id) && (
           <button className={classes.editButton} onClick={handleAddDoc}> <FaPlus className={classes.editIcon} /></button>
        )}
          </div>
          </div>
        {showDoc && <AddDocumentInstitute  memberDetails={memberDetails} rerender={props.rerender}   onClose={handleDocClose} />}


        <DocumentList isAdminOrOwner={props.isAdminOrOwner} oneMember={props.oneMember}  rerender={props.rerender}  userData={props.userData}  memberDetails={memberDetails} />


  {/* {certificates.map(certificate => (
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
              ))} */}

      </div>
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
        {showExperience.map(experience => (
          <div className={classes.mainDiv2}  key={experience.id}>
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

{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Position:</strong> <div> </div></div> */}
{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Duration:</strong> <div>  </div></div> */}
{/* <div className={classes.listTwo}>  <div>●</div> <strong className={classes.name}>Skills:</strong> <div> </div></div> */}

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


<div className={classes.bankDetails}> 
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
            }
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

                {showWarning && (
         <div className={classes.overlay}>
         <div className={classes.warningBlock}>
           <div className={classes.outerOneDiv}>
             <div>
               <button className={classes.closeBtn} onClick={closeWarningHandler}>
                 <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="CreateCourseForm_closeButtonIcon__3mLN8" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 0 1-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z"></path></svg>
               </button>
             </div>
   
   
             <div className={classes.logo}   >
                 <Logo />
               </div>
   
             <div className={classes.heading}>
               Edit Certificate
             </div>
             <form className={classes.form} onSubmit={handleSubmit}  encType="multipart/form-data">
               <div className={classes.divSix}>
                 <label className={classes.label} htmlFor="Bank Name"><span className={classes.redStar}>*</span>Bank Name:</label>
                 <input className={classes.borderBox}
                   type="text"
                   name="bank_name"
                   value={formData.bank_name}
                   onChange={handleFormChange}
                 />
               </div>
   
               <div className={classes.divFour}>
                 <label className={classes.label} htmlFor="Bank Account Number"><span className={classes.redStar}>*</span>Bank Account Number:</label>
                 <input className={classes.borderBox}
                   type="number"
                   name="bank_account_number"
                   value={formData.bank_account_number}
                   onChange={handleFormChange}
                 />
               </div>
    
                 <div className={classes.divFour}>
                   <label className={classes.label} htmlFor="IFSC code"><span className={classes.redStar}>*</span>IFSC Code:</label>
                   <input className={classes.borderBox}

                     type="text"
                     name="ifsc_code"
                     value={formData.ifsc_code}
                     onChange={handleFormChange}
                   />
                 </div>
   
                 <div className={classes.divFour}>
                   <label className={classes.label} htmlFor="UPI ID"><span className={classes.redStar}>*</span>UPI ID:</label>
                   <input className={classes.borderBox}
                     type="text"
                     name="upi_id"
                     value={formData.upi_id}
                     onChange={handleFormChange}
                   />
                 </div>
                
   
               <div className={classes.divSix}>
                 <label className={classes.label} htmlFor="PhoneNo">Phone no:</label>
                 <input className={classes.borderBox}
                   type="number"
                   name="phone_number"
                   value={formData.phone_number}
                   onChange={handleFormChange}
                 />
               </div>   
               <button className={classes.submitBtn} encType="multipart/form-data" type="submit">Submit</button>
             </form>
           </div>
         </div>
       </div>
      )}
          </div>
          
        ))}


        </div>
      </div>
      </div>

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
