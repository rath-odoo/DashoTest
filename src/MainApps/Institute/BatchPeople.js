import React, { useEffect, useState } from 'react';
import classes from "./BatchPeople.module.css";
// import BatchPeopleEach from './BatchPeopleEach';
// import sci from "./sci.jpeg";
import { fetchBatchMembers, getinstitutemembers } from '../../CommonApps/AllAPICalls';
import BatchPeopleEach from './BatchPeopleEach';
import AddMemberBatch from './AddMemberBatch';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import AddMultiplePeople from './AddMultiplePeople';

// import AddMemberBatch from './AddMemberBatch';

// Dummy data to simulate institute members

function BatchPeople(props) {


  const [instituteMembers, setInstituteMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [showMultipleForm, setshowMultipleForm] = useState(false);



  useEffect(() => {
    const batchId = props.batch.id;
    fetchBatchMembers(batchId, page).then(data => { setInstituteMembers(data.results); setTotalPages(Math.ceil(data.count / 100)); });
  }, [props, page]);
  console.log("batch id ", props.batch.id);
  console.log("batch member ", instituteMembers);


  const toggleAddContactForm = () => {
    setShowAddContactForm(!showAddContactForm);
    props.rerender();
  };


  const toggleAddMultipleForm = () => {
    setshowMultipleForm(!showMultipleForm);
    props.rerender();
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  console.log(props.isAdminOrOwner);

  return (
    <div className={classes.peopleOuter}>

      <div className={classes.peopleContainer}>
        { props.isAdminOrOwner && (
        <button className={classes.schedule} onClick={toggleAddContactForm}>  {showAddContactForm ? 'Close' : 'Add People'}</button>
      )}
        {/* <button className={classes.schedule} onClick={toggleAddMultipleForm}> Add Multiple Peoples</button> */}
      </div>
      <div className={classes.pagination}>
        <BsChevronDoubleLeft className={page > 1 ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handlePreviousPage} />
        <span className={classes.pageInfo}>{`Page ${page} of ${totalPages}`}</span>
        <BsChevronDoubleRight className={page < totalPages ? classes.arrowIcon : classes.arrowIconDisabled} onClick={handleNextPage} />
      </div>

      <div className={classes.parentClass}>
        <div className={classes.nameContainer}>Name</div>
        <div className={classes.rolwContainer}>Role</div>
        {/* <div className={classes.dateContainer}>ID</div> */}
        {/* <div className={classes.statusContainer}>Status</div> */}
        { props.isAdminOrOwner && (
        <div className={classes.statusContainer}>Remove</div>
        )}

      </div>


      <div className={classes.scrollContent}>
        {instituteMembers.map((oneMember, index) => (
          <BatchPeopleEach
            key={index}
            oneMember={oneMember}
            selectedInstitute={props.selectedInstitute}
            userData={props.userData}
            rerender={props.rerender}
            batch={props.batch}
            isAdminOrOwner={props.isAdminOrOwner} 

          />
        ))}
      </div>


      {showAddContactForm && (
        <AddMemberBatch
          batchId={props.batch.id}
          onClose={toggleAddContactForm}
          selectedInstitute={props.selectedInstitute.id}
          userData={props.userData}
          rerender={props.rerender}
        />
      )}

      {showMultipleForm && (
        <AddMultiplePeople
          batchId={props.batch.id}
          onClose={toggleAddMultipleForm}
          selectedInstitute={props.selectedInstitute.id}
          userData={props.userData}
          rerender={props.rerender}
        />
      )

      }
    </div>
  );
}

export default BatchPeople;
