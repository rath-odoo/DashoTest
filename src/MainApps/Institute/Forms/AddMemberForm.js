import React, { useState } from "react";
import classes from "./EditMeetingForm.module.css";
import { AiFillCloseCircle, AiOutlineDownload } from "react-icons/ai";
import Logo from '../../../CommonApps/Logo';
import { getusersfromnames, addmembertoinstitute, uploadMembersViaExcel } from '../../../CommonApps/AllAPICalls';
import { TextInputAddMember, OptionField } from './../../../CommonApps/FormInputObjects'; 

const AboutEditForm = (props) => {
  const [currentTab, setCurrentTab] = useState("individual");
  const [addedUsers, setAddedUsers] = useState([]);
  const [submissionState, setSubmissionState] = useState("notSubmitted");
  const [excelFile, setExcelFile] = useState(null);

  const initialFormData = Object.freeze({
    role: "",
    employee_id: ""
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleExcelUpload = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionState("submitting");
  
    if (currentTab === "individual") {
      if (formData.role === "" || addedUsers.length === 0) {
        setSubmissionState("notSubmitted");
        return null;
      }
  
      const newArray = await Promise.all(addedUsers.map(async (item) => {
        let userObject = {
          userId: String(item.id),
          userType: formData.role,
        };
        if (formData.employee_id) {
          userObject.employee_id = formData.employee_id;
        }
        return userObject;
      }));
  
      let addingUserId = props.userData.id;
      let instId = props.selectedInstitute.id;
      addmembertoinstitute({ newArray, props, setSubmissionState, instId, addingUserId });
    } else if (currentTab === "excel") {
      if (!excelFile) {
        setSubmissionState("notSubmitted");
        return;
      }
      uploadMembersViaExcel({ file: excelFile, selectedInstituteId: props.selectedInstitute.id, userId: props.userData.id, props, setSubmissionState })
        .then(data => {
          console.log('File uploaded successfully:', data.message);
          console.log("Upload successful:", data);
          setSubmissionState("submitted");
          alert(`File uploaded successfully: ${data.message}`);  
        })
        .catch(() => setSubmissionState("notSubmitted"));
    }
  };
  

  let timeintervals = [
    { "name": "Owner", "id": "Owner" },
    { "name": "Admin", "id": "Admin" },
    { "name": "Teacher", "id": "Teacher" },
    { "name": "Student", "id": "Student" },
    { "name": "Staff", "id": "Staff" },
  ];

  const [searchUsers, getSearchUsers] = useState([]);

  const handleChangeSearch = (e) => {
    let namestring = e.target.value;
    getusersfromnames({ namestring, getSearchUsers });
  };

  const selectSpeakerHandler = ({ user }) => {
    setAddedUsers(addedUsers => {
      if (!addedUsers.some(olduser => olduser.id === user.id)) {
        return [...addedUsers, user];
      } else {
        return addedUsers;
      }
    });
  };

  const sampleExcelUrl = 'sample_batch_members.csv';

  return (
    <div className={classes.aboutEditFormDivParent}>
      <form className={classes.aboutEditForm} onSubmit={handleSubmit} style={{ height: "600px" }}>
        <div className={classes.innerDiv}>
          <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}>
              <AiFillCloseCircle className={classes.closeButtonIcon} />
            </button>
          </div>
          <div className={classes.logoAndTitleContainer}>
            <div className={classes.titleDiv}><i style={{ fontStyle: "normal", marginTop: "30px" }}> Add member to your institute </i></div>
            <div className={classes.tabs}>
              <button
                className={currentTab === "individual" ? classes.activeTab : classes.tab}
                onClick={() => setCurrentTab("individual")}
                disabled={submissionState === "submitting"}
              >
                Add Manually
              </button>
              <button
                className={currentTab === "excel" ? classes.activeTab : classes.tab}
                onClick={() => setCurrentTab("excel")}
                disabled={submissionState === "submitting"}
              >
                Add via Excel
              </button>
            </div>
          </div>

          {currentTab === "individual" ? (
            <>
              <OptionField
                handleChange={handleChange}
                label="Role"
                name="role"
                options={timeintervals}
                defaultValue={""}
                width="100%"
                disabled={submissionState === "submitting"}
              />
              <TextInputAddMember
                handleChange={handleChangeSearch}
                label="Member Names"
                name="speaker"
                placeholder="Search by firstname"
                searchUsers={searchUsers}
                selectSpeaker={selectSpeakerHandler}
                addedUsers={addedUsers}
                getSearchUsers={getSearchUsers}
                setAddedUsers={setAddedUsers}
                width="100%"
                disabled={submissionState === "submitting"}
              />

              <div className={classes.uploadSection}>
                <label htmlFor="employee_id" className={classes.uploadLabel}>Employee id</label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id"
                  onChange={handleChange}
                  className={classes.uploadInput2}
                  disabled={submissionState === "submitting"}
                />
              </div>

              <div className={classes.submitButtonDiv}>
                <button type="submit" className={classes.submit_button} disabled={submissionState === "submitting"}>
                  <b>{submissionState === "submitting" ? "Submitting..." : "submit"}</b>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className={classes.sampleFileLink}>
                <label className={classes.label}>Download Accepted Excel File Format</label>
                <div className={classes.downLoadBtn}>
                  <label>{sampleExcelUrl}</label>
                  <button className={classes.downloadButton} onClick={() => window.open(sampleExcelUrl, '_blank')}>
                    <AiOutlineDownload className={classes.downloadIcon} />
                  </button>
                </div>
              </div>

              <div className={classes.uploadSection}>
                <label htmlFor="excelFile" className={classes.uploadLabel}>Upload Excel File</label>
                <input
                  type="file"
                  id="excelFile"
                  name="excelFile"
                  accept=".xlsx, .xls"
                  onChange={handleExcelUpload}
                  className={classes.uploadInpu}
                  disabled={submissionState === "submitting"}
                />
              </div>
              <div className={classes.submitButtonDiv}>
                <button type="submit" className={classes.submit_button} disabled={submissionState === "submitting"}>
                  <b>{submissionState === "submitting" ? "Uploading..." : "Upload"}</b>
                </button>
              </div>
            </>
          )}
          {submissionState === "submitted" && <div className={classes.successMessage}>Members have been successfully added!</div>}
        </div>
      </form>
    </div>
  );
};

export default AboutEditForm;