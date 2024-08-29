import React,{useState} from 'react';
import classes from './OneFriend.module.css';
import { useHistory } from "react-router-dom";
import {putaddcontact} from '../../../CommonApps/AllAPICalls.js';
import {BsCheck2Circle} from 'react-icons/bs';
import FadeLoader from "react-spinners/BeatLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "var(--themeColor)",
};





const OneFriend=(props)=>{

  //console.log('contact: ',props.contact);
  //console.log('contact: ', props.contact);

  let imageurl = `${props.contact.profile_image}`
  let color="var(--themeColor);";

  const [userAdded, setUserAdded] = useState("notAdded");

  const addContactHandler=()=>{

    setUserAdded("adding");	 
    let contactId = props.contact.id;
    let userId = props.userData.id;
    let setRerender = props.setRerender;	  
    putaddcontact({userId ,contactId, setUserAdded, setRerender } , props);
    //window.location.reload(false);
  }

 let result = props.userData.contacts.map(a => a.id);


//  console.log("result: ", result);
let history = useHistory();

const viewPublicProfileHandler=()=>{
  //  history.push("/public/profile");

  //  history.push(`/public/profile/${props.contact.id}`);
  //  state: { userData: props.contact } 

  history.push({
    pathname: `/public/profile/${props.contact.id}`,
    state: { userData: props.contact } // Pass user data as state
  });
   //window.open("/some-link", "_blank");
 }



return (


<div className={classes.oneFriend}>
  {
  <img src={imageurl}  className={classes.friendImage} />	
  }
  <div className={classes.InfoBox}> 
	<div className={classes.fullName} onClick={viewPublicProfileHandler}> 
	   <i>
	     {props.contact.firstname !==""? <b>{props.contact.firstname+" "+props.contact.lastname}</b>: <span style={{color:"grey"}}>Name not Available</span>}
	   </i>
	</div>
        {userAdded ==="notAdded" && !result.includes(props.contact.id) && props.userData.id !== props.contact.id &&
	<button type='button' className={classes.addContactButton} onClick={addContactHandler}>
		Add contact  
	</button>
        }


         {  userAdded==="adding" &&
                <button type='button' className={classes.addContactButtonLoading} disabled>
                    <FadeLoader color={color} loading={true} css={override} size={15}  />
                </button>
         }




        { result.includes(props.contact.id) && props.userData.id !== props.contact.id &&
        <button type='button' className={classes.addedContactButton} onClick={addContactHandler} style={{background: "var(--bodyBkgColor)"}} disabled>
		<BsCheck2Circle/>	<span>Added   </span>      
	</button>
        }


  </div>

</div>
);


}

export default OneFriend;
