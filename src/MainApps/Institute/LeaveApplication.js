import classes from "./LeaveApplication.module.css";
import { useState, useEffect, useRef } from 'react';
import Upcomming from "./cs.png";
import OneLeave from "./Forms/OneLeave";
import CreateLeaveForm from "./Forms/CreateLeaveForm";
import CreateLeavePolicy from "./Forms/CreateLeavePolicy";
import { FaCaretDown } from "react-icons/fa";
import { createleaveInstitute, getApprovalsLeaveList, getLeavePolicyList, getUserLeaveList } from "./../../CommonApps/AllAPICalls";

import OneLeavePolicy from "./Forms/OneLeavePolicy";
import ApprovalsList from "./Forms/ApprovalsList";

const LeaveApplication = (props) => {



  const isMounted = useRef(false);
  const [leaves, setLeaves] = useState(null);
  const [isShowLeaveForm, setShowLeaveForm] = useState(false);
  const [render, setRender] = useState(false);
  const [currentPage, setCurrentPage] = useState("My Leaves");
  const [pageChangeDropDown, setPageChangeDropDown] = useState(false);
  const [leavePolicyList, setLeavePolicyList] = useState(null);
  const [isShowLeavePolicyForm, setShowLeavePolicyForm] = useState(false);


  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);


  useEffect(() => {
    let instituteId = props.institute.id;
    let userId = props.userData.id;
    getUserLeaveList({ instituteId, userId, setLeaves });
    getLeavePolicyList({ instituteId, setLeavePolicyList });
  }, [render]);

  console.log(leaves);


  const [isRotated, setIsRotated] = useState(true);

  const handleClick = () => {
    setIsRotated(!isRotated);
  };




  const createLeaveHandler = () => {
    setShowLeaveForm(!isShowLeaveForm);
    handleClick();
  }


  const policyHandler = () => {
    setShowLeavePolicyForm(!isShowLeavePolicyForm);
    handleClick();
  }


  const changePageHandler = () => {
    setPageChangeDropDown(!pageChangeDropDown);
  }
  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setPageChangeDropDown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={classes.demoText}>

      {
        currentPage === "My Leaves" &&
        <div className={classes.mainContainer}>

          <div className={classes.titleText}>
            My Leaves
          </div>
          <div className={classes.leaveListContainer}>
            {
              leaves !== null &&
              leaves.map((Leave, index) => {
                return <OneLeave
                  key={index}
                  leave={Leave}
                  userData={props.userData}
                  institute={props.institute}
                  render={() => { setRender(!render) }}
                />
              })
            }
          </div>
        </div>
      }


      {
        currentPage === "Leave Approvals" &&

        <div className={classes.mainContainer}>

          <div className={classes.titleText}>
            Leave Approvals
          </div>
          <div className={classes.oneLeaveContainer}>
            <ApprovalsList
              userData={props.userData}
              institute={props.institute}
            />
          </div>
        </div>
      }


      {
        currentPage === "Leave Policies" &&

        <div className={classes.mainContainer}>

          <div className={classes.titleText}>
            Leave Policies
          </div>
          <div className={classes.oneLeaveContainer}>
            {
              leavePolicyList !== null &&
              leavePolicyList.map((leavePolicy, index) => {
                return <OneLeavePolicy
                  key={index}
                  leavePolicy={leavePolicy}
                  userData={props.userData}
                  institute={props.institute}
                  render={() => { setRender(!render) }}
                />
              })
            }
          </div>
        </div>
      }
      {props.isAdminOrOwner &&

        <div className={classes.buttonDiv} onClick={changePageHandler} >
          {currentPage}
          <FaCaretDown className={`${classes.animeDown} ${pageChangeDropDown ? classes.spin : ""}`} ref={dropdownRef} />
        </div>
      }
      {
        !props.isAdminOrOwner &&
        <div className={classes.buttonDiv} >
          {currentPage}
        </div>
      }

      <div className={`${classes.pageDropDown} ${pageChangeDropDown ? classes.rotated : ''}`} ref={dropdownRef}>
        <div className={classes.myLeaveDropDownDiv} onClick={() => {
          setCurrentPage("My Leaves");
          changePageHandler();
        }}>
          My Leaves
        </div>
        <div className={classes.myLeaveDropDownDiv} onClick={() => {
          setCurrentPage("Leave Approvals");
          changePageHandler();
        }}>
          Leave Approvals
        </div>
        <div className={classes.myLeaveDropDownDiv} onClick={() => {
          setCurrentPage("Leave Policies");
          changePageHandler();
        }}>
          Leave Policies
        </div>
      </div>

      {
        isShowLeaveForm && <CreateLeaveForm
          userData={props.userData}
          institute={props.institute}
          render={() => { setRender(!render) }}
          onPress={() => { setShowLeaveForm(!isShowLeaveForm) }}
        />

      }

      {
        isShowLeavePolicyForm && <CreateLeavePolicy
          userData={props.userData}
          institute={props.institute}
          render={() => { setRender(!render) }}
          onPress={() => { setShowLeavePolicyForm(!isShowLeavePolicyForm) }}

        />
      }




      {/* <button
        className={`${classes.addButton} ${isRotated ? classes.rotated : ''}`}
        onClick={handleClick}
      >          <div className={classes.horizontal}>

        </div>
        <div className={classes.virtical}>

        </div>

      </button> */}

      {
        props.isAdminOrOwner &&

        <div className={`${classes.optionsDiv} ${isRotated ? classes.rotated : ''}`}>
          <div className={classes.manageDiv} onClick={createLeaveHandler}> Create Leave
          </div>

          <div className={classes.policyDiv} onClick={policyHandler}> Create Leave Policy
          </div>
        </div>
      }
      {
        !props.isAdminOrOwner &&

        <div className={`${classes.optionsDiv} ${isRotated ? classes.noRotated : ''}`}>
          <div className={classes.manageDiv} onClick={createLeaveHandler}> Create Leave
          </div>
          {/* <div className={classes.policyDiv} onClick={policyHandler}> Create Leave Policy
          </div> */}
        </div>
      }

    </div>
  );
}

export default LeaveApplication;
