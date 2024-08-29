import React,{useState} from 'react';
import classes from './ContactTitleDiv.module.css';
import {FaUsers} from 'react-icons/fa';
import AddContactForm from './Forms/AddContactForm';
import {BsPlusCircle} from 'react-icons/bs'; 
import ContactRequest from './ContactRequest';

const UnitFriendsIcon=(props)=>{


const [contactAddForm,showContactAddForm]=useState(false);
const [contactRequest,showcontactRequest]=useState(false);



const contactRequestHandler =()=>{


	showcontactRequest(true);
	
	}

	const closeContactRequest =()=>{


		showcontactRequest(false);
		
		}
	


const contactAddFormHandler =()=>{


showContactAddForm(true);

}

const closeContactFormHandler=()=>{

showContactAddForm(false);

}









return (

<div className={classes.contactTitleDiv}>

	
        <div className={classes.contactTitle}>My Contacts </div>   

		<div className={classes.requestContainer}>
			<button className={classes.requestInnerBtn} onClick={contactRequestHandler}>Requests</button>
		</div>

		
	<button onClick={contactAddFormHandler} className={classes.editButtonAbout} type='button'> <BsPlusCircle/> <span>add contact</span> </button>
	{contactAddForm && <AddContactForm onPress={closeContactFormHandler} userData={props.userData} rerender={props.rerender}/>}   

		{ contactRequest && 
		<ContactRequest
		onBack={closeContactRequest} 
		userData={props.userData} 
		rerender={props.rerender}
		 />
		}

</div>
);


}
export default UnitFriendsIcon;
