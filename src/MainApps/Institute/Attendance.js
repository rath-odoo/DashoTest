import { useState, useEffect, useRef } from 'react';
import classes from "./Attendance.module.css";
import User2 from './User2';
import User from "./User"; 
import { getApproverOfAttendance, getCombinedAttendanceLeave } from '../../CommonApps/AllAPICalls';
import { IoCaretDown } from "react-icons/io5";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import AdminAllStudentView from './AdminAllStudentView';

const App = (props) => {
  const isMounted = useRef(false);
  const [allAttendanceLeave, setAttendanceLeave] = useState(null);
  const [status, setStatus] = useState("pad");
  const [allApproverOfAttendance, getAllApproverOfAttendance] = useState(null);
  const [showApproverDropDown, setShowApproverDropDown] = useState(false);
  const [shiftAdminView, setShiftAdminView] = useState(true);
  const [render, setRender] = useState(true);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState('user'); 
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  useEffect(() => {
    const fetchAttendance = async () => {
      let instituteId = props.institute.id;
      let userId = props.userData.id;
      await getCombinedAttendanceLeave({ instituteId, userId, page, setAttendanceLeave });
    };

    fetchAttendance();
  }, [render, page]);

  useEffect(() => {
    const fetchApproverOfAttendance = async () => {
      let instituteId = props.institute.id;
      let userId = props.userData.id;
      await getApproverOfAttendance({ instituteId, userId, status, getAllApproverOfAttendance });
    };

    fetchApproverOfAttendance();
  }, [render]);

  const isAdmin = true;

  const handleNextPage = () => {
    if (allAttendanceLeave && allAttendanceLeave.next) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowAdminDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.parentbox}>
      {isAdmin && (
        <div className={classes.toggleAdminContainer}>
          {props.isAdminOrOwner && (
            <div
              onClick={() => setViewMode('user')}
              className={`${classes.shift} ${viewMode === 'user' ? classes.activeButton : ''}`}
            >
              My Daily Check-In
            </div>
          )}

          {props.isAdminOrOwner && (
            <div
       
              className={`${classes.shift} ${(viewMode === 'admin' || viewMode === 'adminAll') ? classes.activeButton : ''}`}
              onClick={() => setShowAdminDropdown(!showAdminDropdown)}
            >
              <div className={classes.mana}>Management</div>
              <IoCaretDown className={showAdminDropdown ? classes.rotate : ""} />
            </div>
          )}

          {showAdminDropdown && (
            <div className={classes.adminDropdown2}       ref={dropdownRef}>
              <div
                className={`${classes.dropdownItem} ${viewMode === 'admin' ? classes.activeButton : ''}`}
                onClick={() => {
                  setViewMode('admin');
                  setShowAdminDropdown(false);
                }}
              >
                Approval Requests
              </div>
              <div
                className={`${classes.dropdownItem} ${viewMode === 'adminAll' ? classes.activeButton : ''}`}
                onClick={() => {
                  setViewMode('adminAll');
                  setShowAdminDropdown(false);
                }}
              >
                Admin View
              </div>
            </div>
          )}
        </div>
      )}

      {viewMode === 'admin' && (
        <div className={classes.mainContainer}>
          {/* <div className={classes.topMainCont}> */}
            {/* <div className={classes.sideDiv}></div> */}
          {/* </div> */}
          <div className={classes.approvalLabel}>Approval Requests</div>
          <div className={classes.mainDataParent}>
            <div className={classes.mainData1}>
              <div className={classes.date}>Date</div>
              <div className={classes.name}>Full Name</div>
              <div className={classes.inTime}>In Time</div>
              <div className={classes.outTime}>Out Time</div>
              <div className={classes.absent}>
                <div className={classes.absentMainContainer}>
                  <div className={classes.absentInnerContainer}>
                    <div className={classes.allAbsentContainer}>Status</div>
                    {/* <div className={classes.nameAbsentContainer}>Absent / Present</div> */}
                  </div>
                  <IoCaretDown className={classes.downIcons} />
                </div>
              </div>
              <div className={classes.absent}>
                <div className={classes.absentMainContainer}>
                  {status === "pad" && (
                    <div className={classes.absentInnerContainer}>
                      <div className={classes.allAbsentContainer}>Approval  (All)</div>
                    </div>
                  )}
                  {status === "pending" && <div className={classes.pending}>Pending</div>}
                  {status === "approved" && <div className={classes.pending}>Accepted</div>}
                  {status === "rejected" && <div className={classes.pending}>Denied</div>}
                  <IoCaretDown
                    className={`${classes.downIcons} ${
                      showApproverDropDown ? classes.rotate : ""
                    }`}
                    onClick={() => setShowApproverDropDown(!showApproverDropDown)}
                  />
                  <div className={classes.emptyContainer}>
                    <div
                      className={`${classes.approveStatusDiv} ${
                        showApproverDropDown ? classes.scale : ""
                      }`}
                    >
                      <div
                        className={classes.absentInnerContainer}
                        onClick={() => {
                          setStatus("pad");
                          setRender(!render);
                          setShowApproverDropDown(!showApproverDropDown);
                        }}
                      >
                        <div className={classes.allAbsentContainer}>All</div>
                        {/* <div className={classes.nameAbsentContainer}>
                          Pending / Accepted / Declined
                        </div> */}
                      </div>
                      <div
                        className={classes.pending}
                        onClick={() => {
                          setStatus("pending");
                          setRender(!render);
                          setShowApproverDropDown(!showApproverDropDown);
                        }}
                      >
                        Pending
                      </div>
                      <div
                        className={classes.pending}
                        onClick={() => {
                          setStatus("approved");
                          setRender(!render);
                          setShowApproverDropDown(!showApproverDropDown);
                        }}
                      >
                        Accepted
                      </div>
                      <div
                        className={classes.pending}
                        onClick={() => {
                          setStatus("rejected");
                          setRender(!render);
                          setShowApproverDropDown(!showApproverDropDown);
                        }}
                      >
                        Denied
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.Edit}>Edit</div>
            </div>
            <div className={classes.scrollContent}>
              {allApproverOfAttendance !== null &&
                allApproverOfAttendance.results.map((item, index) => (
                  <User2
                    key={index}
                    item={item}
                    render={() => {
                      setRender(!render);
                    }}
                    userData={props.userData}
                  />
                ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'adminAll' && (
        <div className={classes.mainContainer}>
          <AdminAllStudentView 
            instituteId={props.institute.id} />
        </div>
      )}

      {viewMode === 'user' && (
        <div className={classes.mainContainer}>
          <div className={classes.topMainCont}> 
          </div>
          <div className={classes.mainDataParent}>
            <div className={classes.mainData}>
              <div className={classes.date}>Date</div>
              <div className={classes.name}>Full Name</div>
              <div className={classes.inTime}>In Time</div>
              <div className={classes.outTime}>Out Time</div>
              <div className={classes.absent}>Absent/Present</div>
              <div className={classes.absent}>Approval</div>
              <div className={classes.Edit}>Edit</div>
            </div>
            <div className={classes.scrollContent}>
              {allAttendanceLeave !== null &&
                allAttendanceLeave.results.map((attendance, index) => (
                  <User
                    key={index}
                    isAdmin={shiftAdminView}
                    attendance={attendance}
                    reRender={() => setRender(!render)}
                  />
                ))}
            </div>
            <div className={classes.paginationContainer}>
              <BsChevronDoubleLeft  
                className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled}
                onClick={handlePreviousPage}
              />
              <span className={classes.span}>{`Page ${page}`}</span>
              <BsChevronDoubleRight
                className={allAttendanceLeave && allAttendanceLeave.next ? classes.arrowIcon : classes.arrowIconDisabled}
                onClick={handleNextPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
