import React, { useEffect, useRef, useState } from 'react';
import classes from './Notices.module.css';
import CreateNoticeForm from './CreateNoticeForm';
import { deleteNotice, getinstitutebatches, getinstitutebatches2, getNotices } from '../../CommonApps/AllAPICalls';
import { BsPersonCircle, BsThreeDotsVertical } from 'react-icons/bs';
import EditNoticeForm from './EditNoticeForm';

const Notices = (props) => {
  const [rerender, setRerender] = useState(false);
  const [editFormshow, seteditFormshow] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);  
  const [instituteBatches, setInstituteBatches2] = useState(null);
  const [notices, setNotices] = useState([]);
  const [showNoticeForm, setShowNoticeForm] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null);  
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); 
  const [noticeToDelete, setNoticeToDelete] = useState(null); 
  const [deletingState, setDeletingState] = useState(''); 
  const dropdownRef = useRef(null);
  const [instituteBatches2, setInstituteBatches] = useState(null);

  useEffect(() => {
    const instituteId = props.selectedInstitute.id;
    getinstitutebatches2({ instituteId, getInstituteBatches2: setInstituteBatches2 });
    getNotices(instituteId)
      .then(data => setNotices(data))
      .catch(error => console.error("Error fetching notices:", error));
  }, [props]);

  useEffect(() => {
    let instituteId = props.selectedInstitute.id;
    getinstitutebatches({ instituteId, getInstituteBatches: setInstituteBatches });
  }, [props]);

  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const noticeFormHandler = () => {
    setShowNoticeForm(true);
  };

  const closenotice = () => {
    setShowNoticeForm(false);
    props.rerender();
  };

  const closenoticeEdit = () => {
    seteditFormshow(false);
    props.rerender();
  };

  const editFormHandler = (noticeId) => {
    const notice = notices.find(notice => notice.id === noticeId);
    setSelectedNotice(notice);
    
    seteditFormshow(true);
  };

  const toggleDropdown = (noticeId) => {
    setDropdownVisible(prevState => (prevState === noticeId ? null : noticeId));
  };

  const closeDropdown = () => {
    setDropdownVisible(null);
  };

  const showDeleteConfirmation = (noticeId) => {
    setNoticeToDelete(noticeId);
    setDeleteConfirmationVisible(true);
    setDeletingState('');

  };

  const handleDeleteCancel = () => {
    setDeleteConfirmationVisible(false);
    setNoticeToDelete(null);
  };

  const deleteNoticeHandler = () => {
    setDeletingState('Deleting...');
    const userId = props.userData.id;
    deleteNotice({ noticeId: noticeToDelete, userId, props ,setDeletingState , handleDeleteCancel })
     
  };

  return (
    <div className={classes.container}>
      {props.isAdminOrOwner && (
        <div className={classes.btnContainer}>
          <button className={classes.schedule} type="button" onClick={noticeFormHandler}>
            Create a Notice
          </button>
        </div>
      )}
      <div>
        <div className={classes.noticesHeading}>
          <h1>Notices</h1>
        </div>

        <div className={classes.batch}>
          {notices.map((notice) => (
            <div className={classes.noticeBox} key={notice.id}>
              <div className={classes.batchContainer}>
                <div className={classes.batchInfo}>
                  <div className={classes.noticeID}>Batches:</div>
                  <div className={classes.batchNames}>
                    {notice.batches.map(batch => batch.name).join(', ')}
                  </div>
                  {props.isAdminOrOwner && (
                    <div className={classes.bottomRightView}>
                      <BsThreeDotsVertical className={classes.menuIcon} onClick={() => toggleDropdown(notice.id)} />
                      {dropdownVisible === notice.id && (
                        <div className={classes.dropdownMenu} ref={dropdownRef}>
                          <button className={classes.dropdownItem} onClick={() => showDeleteConfirmation(notice.id)}>
                            Delete
                          </button>
                          <button className={classes.dropdownItem} onClick={() => editFormHandler(notice.id)}>
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={classes.midSection}>
                <div className={classes.midSection__title}>
                  <b>{notice.noticeTitle}</b>
                </div>
                <div className={classes.noticeText}>{notice.noticeText}</div>
              </div>

              <div className={classes.bottomSection}>
                <div className={classes.noticeBoxButtonView}>
                  <div className={classes.postedByTextContainer}>
                    <BsPersonCircle className={classes.iconPost} />
                    <div className={classes.postedByText}>Posted By:</div>
                    {notice.creater.firstname} {notice.creater.lastname}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNoticeForm && (
        <CreateNoticeForm
          userData={props.userData}
          onPress={closenotice}
          courseData={props.userData.dashboard_courses}
          selectedInstitute={props.selectedInstitute}
          instituteBatches={instituteBatches2}
        />
      )}

      {editFormshow && selectedNotice && (
        <EditNoticeForm
          userData={props.userData}
          onPress={closenoticeEdit}
          courseData={props.userData.dashboard_courses}
          selectedInstitute={props.selectedInstitute}
          instituteBatches={instituteBatches2}
          selectedNotice={selectedNotice} 
        />
      )}

      {deleteConfirmationVisible && (
        <div className={classes.overLay}>
          <div className={classes.confirmDialog}>
            <p className={classes.p}>Are you sure you want to delete this notice?</p>
            <div className={classes.div}>
              <button
                className={classes.deleteYes}
                onClick={deleteNoticeHandler}
                disabled={deletingState === 'Deleting...'}
              >
                {deletingState || 'Delete'}
              </button>
              <button className={classes.deleteNo} onClick={handleDeleteCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
 
    </div>
  );
}

export default Notices;
