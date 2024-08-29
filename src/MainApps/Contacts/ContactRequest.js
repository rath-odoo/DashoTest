import React, { useState, useEffect } from 'react';
import classes from './ContactRequest.module.css';

import { useHistory } from "react-router-dom";
import { AiFillCloseCircle } from 'react-icons/ai';
import { getContactRequests, respondToContactRequest } from '../../CommonApps/AllAPICalls';

const ContactRequest = (props) => {
  const [contactRequests, setContactRequests] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getContactRequests(props.userData.id)
      .then(data => {
        setContactRequests(data);
      })
      .catch(err => {
        setError('Failed to fetch contact requests');
      });
  }, [props.userData.id]);

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  const handleResponse = (requestId, action) => {
    setLoadingStates(prev => ({ ...prev, [requestId]: action }));
    respondToContactRequest(props.userData.id, requestId, action ,props)
      .then(() => {
        setContactRequests(prevRequests => 
          prevRequests.filter(request => request.id !== requestId)
        );
        setLoadingStates(prev => ({ ...prev, [requestId]: null }));

      })
      .catch(() => {
        setError('Failed to respond to the contact request');
        setLoadingStates(prev => ({ ...prev, [requestId]: null }));
      });
  };

  let history = useHistory();


  const viewPublicProfileHandler=(contact)=>{
    //  history.push("/public/profile");
  
    //  history.push(`/public/profile/${props.contact.id}`);
    //  state: { userData: props.contact } 
  
    history.push({
      pathname: `/public/profile/${contact.id}`,
      
      state: { userData: contact } 
        });
     //window.open("/some-link", "_blank");
   }

   console.log(props);

  return (
    <div className={classes.overLay}>
      <div className={classes.outerContainer}>
        <button onClick={props.onBack} className={classes.closeFormButton}>
          <AiFillCloseCircle className={classes.closeButtonIcon} />
        </button>

        {error && <p className={classes.error}>{error}</p>}

        <div className={classes.contactList}>
          {contactRequests.map(request => (
            <div key={request.id} className={classes.container}>
              <div className={classes.card}>
                <div className={classes.divInnerOne}>
                  <div className={classes.div}>  
                    <div className={classes.inDiv}>{request.status}</div>
                    <div className={classes.dateBadge}>{formatDate(request.created_at)}</div>
                  </div>
                  <div className={classes.requestEmail}  onClick={() => viewPublicProfileHandler(request.from_user)}>{request.from_user.firstname} {request.from_user.lastname}  <span className={classes.span}>sent you a friend request.</span></div>
                </div>
                <div className={classes.buttons}>
                  <button 
                    className={classes.acceptButton} 
                    onClick={() => handleResponse(request.id, 'accept')}
                    disabled={loadingStates[request.id]}
                  >
                    {loadingStates[request.id] === 'accept' ? 'Accepting...' : 'Accept'}
                  </button>
                  <button 
                    className={classes.rejectButton} 
                    onClick={() => handleResponse(request.id, 'reject')}
                    disabled={loadingStates[request.id]}
                  >
                    {loadingStates[request.id] === 'reject' ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ContactRequest;
