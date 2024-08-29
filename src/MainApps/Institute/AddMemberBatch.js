import React, { useState, useEffect } from 'react'; 
import classes from './AddMemberBatch.module.css';
import { AiFillCloseCircle, AiOutlineDownload } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineUpload } from 'react-icons/ai'; // Import upload icon
import OneFriend from './OneFriendBatch';
import { addMembersToBatch, uploadBatchMembers, usersearchgeneral } from '../../CommonApps/AllAPICalls'; 

const AddMemberBatch = (props) => { 
  const [searchedUsers, getSearchedUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedMembers, setAddedMembers] = useState([]);
  const [currentTab, setCurrentTab] = useState("view"); // State for managing tabs
  const [excelFile, setExcelFile] = useState(null);

  const [pageNo, setPageNo] = useState(1);
  const [rerender, setRerender] = useState(false);

  const handleChange = (e) => {
    let searchString = e.target.value;
    let pageno = pageNo;
    usersearchgeneral({ pageno, searchString, getSearchedUsers });
  }

  useEffect(() => {
    let pageno = pageNo;
    let searchString = "";
    usersearchgeneral({ pageno, searchString, getSearchedUsers });
    console.log("search results reloaded");
  }, [rerender, pageNo]);

  const handleAddMember = (userId) => { 
    addMembersToBatch(props.batchId, props.userData.id, [userId], props)
      .then(response => {
        console.log('Member added successfully:', response);
        setAddedMembers(prevAdded => [...prevAdded, userId]);
      })
  };

  const handleExcelUpload = (e) => {
    setExcelFile(e.target.files[0]);
  };

  const handleExcelSubmit = (e) => {
    e.preventDefault(); 
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
  
    setUploading(true);
    setError(null);
  
    uploadBatchMembers(props.batchId, props.userData.id, selectedFile)
      .then(data => {
        console.log('File uploaded successfully:', data.message);
        setUploading(false);
        setSelectedFile(null);
        alert(`File uploaded successfully: ${data.message}`);  
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        alert(`Failed to upload file: ${error.message}`);   
        setUploading(false);
      });
  };
  
  

  const sampleExcelUrl = 'sample_batch_members.csv';  

  return (
    <div className={classes.addContactForm}>
      <div className={classes.tabs}>
        <button
          className={currentTab === "view" ? classes.activeTab : classes.tab}
          onClick={() => setCurrentTab("view")}
        >
           Add Members
        </button>
        <button
          className={currentTab === "excel" ? classes.activeTab : classes.tab}
          onClick={() => setCurrentTab("excel")}
        >
          Add via Excel
        </button>
        <button onClick={props.onClose} className={classes.closeFormButton}>
                <AiFillCloseCircle className={classes.closeButtonIcon} />
              </button>
      </div>
      {currentTab === "view" ? (
        <>
          <form className={classes.aboutEditForm}>
            <div className={classes.closeButtonDiv}>
              <div className={classes.titleSec}>Add new Member</div>
             
            </div>
            <div className={classes.searchBarDiv}>
              <div className={classes.searchIconDiv}>
                <BsSearch size={25} />
              </div>
              <input
                type="text"
                onChange={handleChange}
                name="inputText"
                className={classes.input_field}
                placeholder="Search by name"
              />
            </div>
          </form>
          <div className={classes.searchedUsersGrid}>
            {searchedUsers !== null && searchedUsers.results !== null &&
              searchedUsers.results.map((user, index) => (
                <OneFriend
                  key={index}
                  userImage={user.profile_image}
                  idUser={user.id}
                  userName={user.firstname !== "" && user.lastname !== "" ? user.firstname + " " + user.lastname : user.username}
                  onAdd={handleAddMember}
                  isAdded={addedMembers.includes(user.id)}
                />
              ))
            }
          </div>
        </>
      ) : (
        <>
          <form onSubmit={handleFileUpload} className={classes.uploadSection}>

          <div className={classes.sampleFileLink}>
                  <label className={classes.label}>Download Accepted Excel File Format</label>

                  <div className={classes.downLoadBtn}> 
                  <label>{sampleExcelUrl}</label>
                 
                  <button className={classes.downloadButton} onClick={() => window.open(sampleExcelUrl, '_blank')}>
                  <AiOutlineDownload className={classes.downloadIcon} />  
                  </button>
                  </div>
                </div>


          <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="fileUpload">Upload Excel File</label>
          <input type="file" id="fileUpload" onChange={handleFileChange} />
        </div>
        {error && <div className={classes.errorMessage}>{error}</div>}
        <div className={classes.formActions}>
          <button type="submit" className={classes.submitButton} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddMemberBatch;
