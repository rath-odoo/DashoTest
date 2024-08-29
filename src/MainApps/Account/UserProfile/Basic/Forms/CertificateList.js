import React, { useState, useEffect } from 'react';
import { fetchCertificateList, deleteCertificate, editCertificate } from '../../../../../CommonApps/AllAPICalls';
import classes from "./CertificateList.module.css";
import { BsTrash, BiEditAlt, FaExternalLinkAlt } from "react-icons/all";
import Logo from '../../../../../CommonApps/Logo';

const CertificateList = (props) => {
  const [certificates, setCertificates] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [editingCertificate, seteditingCertificate] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    expiration_date: '',
    issuing_organisation: '',
    issue_date: '', 
    credentials_id: '',
    credentials_url: '',
    media:null ,
  });


  const applyLeaveHandler = (certificate) => {
    seteditingCertificate(certificate);
    setFormData({
      name: certificate.name,
      expiration_date: certificate.expiration_date,
      issuing_organisation: certificate.issuing_organisation,
      issue_date: certificate.issue_date,
      credentials_id: certificate.credentials_id,
      credentials_url: certificate.credentials_url,
      // media: certificate.media , 
        
    });
    setShowWarning(true);
  };


  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
 
 
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const userId = props.userData.id;
      
  //     await editCertificate(editingCertificate.id, userId, formData);
  //     console.log(formData);
  //     setRerender(prev => !prev);
  //     closeWarningHandler();
  //   } catch (error) {
  //     console.error('Error editing experience:', error);
  //   }
  // };

  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setFormData(prevFormData => ({
      ...prevFormData,
      media: file
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const userId = props.userData.id;
      const data = new FormData();
      data.append('name', formData.name);
      data.append('issuing_organisation', formData.issuing_organisation);
      data.append('issue_date', formData.issue_date);
      if (formData.expiration_date) data.append('expiration_date', formData.expiration_date);
      if (formData.credentials_id) data.append('credentials_id', formData.credentials_id);
      if (formData.credentials_url) data.append('credentials_url', formData.credentials_url);
      if (formData.media) data.append('media', formData.media);
  
      await editCertificate(editingCertificate.id, userId, data ,props);

    setIsSubmitting(false);
      closeWarningHandler();
    } catch (error) {
      console.error('Error editing certificate:', error);
    }
  };

  useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
        if (props.userData && props.userData.id) {
          const userId = props.userData.id;
          const certificateList = await fetchCertificateList(userId);
          if (isMounted) {
            setCertificates(certificateList);
          }
        }
      } catch (error) {
        console.error("Error fetching certificate list", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, [rerender, props]); 
  
  const handleDeleteCertificate = async (id) => {
    try {
      const userId = props.userData.id;
      await deleteCertificate(id, userId, props);
    } catch (error) {
      console.error("Error deleting certificate", error);
    }
  };

  const formatCertificateDate = (startDate) => {
    const startMonth = new Date(startDate).toLocaleString('default', { month: 'short' });
    const startYear = new Date(startDate).getFullYear();
    return `${startMonth} ${startYear}`;
  };

 
 

  const closeWarningHandler = () => {
    
    setShowWarning(false);
  };
  const openImageInNewTab = (url) => {
    window.open(url, '_blank');
  };
  
  return (
    <div>
      <div>
        {certificates.map(certificate => (
          <div className={classes.mainDiv} key={certificate.id}>
            <div className={classes.mediaPreview} onClick={() => openImageInNewTab(certificate.media)}> 
              {certificate.media && (
                <>
                   
                    <img src={certificate.media} alt="certificate media" className={classes.mediaImage} />
                  
                  <a href={certificate.media_url} target="_blank" rel="noopener noreferrer"> 
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
                <div className={classes.sameTwo}>Issued {formatCertificateDate(certificate.issue_date)}</div>
                <div className={classes.sameThree}>
                  {certificate.credentials_url && (
                    <a href={certificate.credentials_url} target="_blank" rel="noopener noreferrer">
                      <button className={classes.credentialsBtn}>Show Credentials <FaExternalLinkAlt /></button>
                    </a>
                  )}
                </div>
              </div>
            </div>


            <div className={classes.titleTwo}>
            <button className={classes.deleteBtn} onClick={() => handleDeleteCertificate(certificate.id)}>
                  <BsTrash className={classes.trashBtn} />
                </button>
                <button className={classes.editBtn}onClick={() => applyLeaveHandler(certificate)} ><BiEditAlt /></button>
            </div>
          </div>
        ))}
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
                 <label className={classes.label} htmlFor="certificate_name"><span className={classes.redStar}>*</span>Certificate Name:</label>
                 <input className={classes.borderBox}
                   type="text"
                   name="name"
                   value={formData.name}
                   onChange={handleFormChange}
                 />
               </div>
   
               <div className={classes.divFour}>
                 <label className={classes.label} htmlFor="issuing_organization"><span className={classes.redStar}>*</span>Issuing Organization:</label>
                 <input className={classes.borderBox}
                   type="text"
                   name="issuing_organisation"
                   value={formData.issuing_organisation}
                   onChange={handleFormChange}
                 />
               </div>
   
               <div className={classes.divDate}>
                 <div className={classes.divOne}>
                   <label className={classes.label} htmlFor="issue_date"><span className={classes.redStar}>*</span>Issue Date:</label>
                   <input className={classes.date}

                     type="date"
                     name="issue_date"
                     value={formData.issue_date}
                     onChange={handleFormChange}
                   />
                 </div>
   
                 <div className={classes.divOne}>
                   <label className={classes.label} htmlFor="expiration_date"><span className={classes.redStar}>*</span>Expiration Date:</label>
                   <input className={classes.date}
                     type="date"
                     name="expiration_date"
                     value={formData.expiration_date}
                     onChange={handleFormChange}
                   />
                 </div>
               </div>
   
               <div className={classes.divSix}>
                 <label className={classes.label} htmlFor="credential_id">Credential ID:</label>
                 <input className={classes.borderBox}
                   type="text"
                   name="credentials_id"
                   value={formData.credentials_id}
                   onChange={handleFormChange}
                 />
               </div>
   
               <div className={classes.divSix}>
                 <label className={classes.label} htmlFor="credential_url">Credential URL:</label>
                 <input className={classes.borderBox}
                   type="url"
                   name="credentials_url"
                   value={formData.credentials_url}
                   onChange={handleFormChange}
                 />
               </div>

               <div className={classes.divOne}>
            <label className={classes.label} htmlFor="media">Media (Optional):</label>
            <input type="file" name="media" onChange={handleMediaChange} accept="image/*, video/*, .pdf, .doc, .docx" />
          </div>
       


               
   
               {/* <div className={classes.mediaSkills}> 
               
   
               <div className={classes.divSkills}>
                 <label className={classes.label} htmlFor="skills">Skills:</label>
                 <div className={classes.skillInputContainer}>
                   <input className={classes.borderBox}
                     type="text"
                     value={skillInput}
                     onChange={handleSkillInputChange}
                   />
                   <button type="button" className={classes.addSkillBtn} onClick={handleAddSkill}>Add</button>
                 </div>
                 <div className={classes.skillList}>
                   {formData.skills.map((skill, index) => (
                     <div key={index} className={classes.skillItem}>
                       {skill} <button type="button" className={classes.removeBtn} onClick={() => handleRemoveSkill(index)}><BsX /></button>
                     </div>
                   ))}
                 </div>
               </div>
   
               <div className={classes.divOne}>
                 <label className={classes.label} htmlFor="media">Media:</label>
                 <input type="file" name="media" onChange={handleMediaChange} accept="image/*, video/*, .pdf, .doc, .docx" />
               </div>
               
               </div> */}
   
                                  

        <button className={classes.submitBtn}    encType="multipart/form-data" type="submit"               disabled={isSubmitting}
        >{isSubmitting ? 'Submitting...' : 'Submit'}</button>
             </form>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default CertificateList;
