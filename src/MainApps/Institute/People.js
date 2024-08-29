import { useEffect, useRef, useState } from 'react';
import classes from "./singleUser.module.css";
import SingleUserDetails from "./singleUserDetails";


import { getinstitutemembers } from '../../CommonApps/AllAPICalls';

import AddMemberForm from './Forms/AddMemberForm';



const People = (props) => {

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  const [instituteMembers, getInstituteMembers] = useState(null)

  const [showMemberAddForm, setShowMemberAddForm] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const addPeopleHandler = () => {
    setShowMemberAddForm(true);
  }

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const filterHandler = () => {
    setIsOpen(!isOpen);

  }
  let institute_id = props.selectedInstitute.id;
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    getinstitutemembers({ institute_id, role: option, getInstituteMembers });
    setIsOpen(false);
  };


  const [rerender, setRerender] = useState(false)


  useEffect(() => {


    getinstitutemembers({ institute_id, getInstituteMembers });

  }, [rerender]);



  const closeAddPeopleFormHandler = () => {
    setShowMemberAddForm(false);
    setRerender(rerender => !rerender);
  }



  const rerenderHandler = () => {

    setRerender(rerender => !rerender);
  }

  console.log("instituteMembers: ", instituteMembers);

  let isAdminOrOwner = (props.selectedInstitute.relationship === "Owner" || props.selectedInstitute.relationship === "Admin") ? true : false;

  let isOwner = props.selectedInstitute.relationship === "Owner" ? true : false;

  let isStudent = props.selectedInstitute.relationship === "Student" ? true : false;



  return (
    <div className={classes.parentClassmain}>

      <div className={classes.topNavigationBar}>
        {(props.selectedInstitute.relationship === "Owner" || props.selectedInstitute.relationship === "Admin") &&
          <>
            <button className={classes.schedule} type="button" onClick={addPeopleHandler}>+ Add</button>


          </>

        }
        <div className={classes.dropdownContainer} ref={dropdownRef}>
          <button className={classes.showSummary} type="button" onClick={() => setIsOpen(!isOpen)}>Filter</button>
          {isOpen && (
            <ul className={classes.dropdownMenu}>
              <li className={selectedOption === 'Admin' ? classes.selected : ''} onClick={() => handleOptionSelect('Admin')}>Admin</li>
              <li className={selectedOption === 'Owner' ? classes.selected : ''} onClick={() => handleOptionSelect('Owner')}>Owner</li>
              <li className={selectedOption === 'Student' ? classes.selected : ''} onClick={() => handleOptionSelect('Student')}>Student</li>
              <li className={selectedOption === 'Teacher' ? classes.selected : ''} onClick={() => handleOptionSelect('Teacher')}>Teacher</li>
              <li className={selectedOption === 'Staff' ? classes.selected : ''} onClick={() => handleOptionSelect('Staff')}>Staff</li>
              <li className={selectedOption === '' ? classes.selected : ''} onClick={() => handleOptionSelect('')}>All</li>
            </ul>
          )}
        </div>
      </div>
      <div className={classes.totalMembersInst}>{selectedOption === '' && "Total Members:" || selectedOption === 'Staff' && "Total Staff:" || selectedOption === 'Admin' && "Total Admins:" || selectedOption === 'Owner' && "Total Owners:" || selectedOption === 'Student' && "Total Students:" || selectedOption === 'Teacher' && "Total Teachers:"}<p>{instituteMembers !== null && instituteMembers.count}</p></div>

      <div className={classes.parentClass}>
        <div className={classes.nameContainer}>Name</div>
        <div className={classes.rolwContainer}>Role</div>
        {/* <div className={classes.dateContainer}>Date Joined</div> */}
        <div className={classes.statusContainer}>ID</div>
        <div className={classes.statusContainer}>Status</div>
      </div>




      {showMemberAddForm &&
        <AddMemberForm onPress={closeAddPeopleFormHandler}
          userData={props.userData}
          selectedInstitute={props.selectedInstitute}
        />
      }


      <div className={classes.scrollContent}>

        {instituteMembers !== null && instituteMembers.results.map((oneMember, index) => {

          return <SingleUserDetails key={index}
            oneMember={oneMember}
            selectedInstitute={props.selectedInstitute}
            isAdminOrOwner={isAdminOrOwner}
            userData={props.userData}
            rerender={rerenderHandler}
            isOwner={isOwner}
            isStudent={isStudent}
          />

        })

        }






      </div>
    </div>
  );
}

export default People;
