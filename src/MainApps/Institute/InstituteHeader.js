import React, { useState, useEffect } from "react";
import classes from "./InstFeaturesContentDiv.module.css";
import { BsPlusLg, BsChevronDown } from "react-icons/bs";
import insIcon from "./instituteIICON.jpeg";
import CreateInstituteForm from './Forms/CreateInstituteForm';
import {getmyinstitutes} from '../../CommonApps/AllAPICalls';
import InstituteNamesDropDown from './InstituteNamesDropDown';





const InstituteHeader=(props)=>{

   const [showPayroll, setShowPayroll] = useState(false);
   const [showPurchaseAsset, setShowPurchaseAsset] = useState(false);
   const [showBillingInvoice, setShowBillingInvoice] = useState(false);
 
   const togglePayroll = () => {
     setShowPayroll(!showPayroll);
     setShowPurchaseAsset(false);
     setShowBillingInvoice(false);
   };
 
   const togglePurchaseAsset = () => {
     setShowPurchaseAsset(!showPurchaseAsset);
     setShowPayroll(false);
     setShowBillingInvoice(false);
   };
 
   const toggleBillingInvoice = () => {
     setShowBillingInvoice(!showBillingInvoice);
     setShowPayroll(false);
     setShowPurchaseAsset(false);
   };

  const [myInstitutes, getMyInstitutes] = useState([]);

  const [selectedInstitute, setSelectedInstitute] = useState(null);

  const [showCreateInstituteForm, setShowCreateInstituteForm] = useState(false);

  const [showDropDown, setShowDropDown] = useState(false);

  const [rerender, setRerender] = useState(false);

  const showCreateInstituteFormHandler=()=>{
     setShowCreateInstituteForm(true);
  }

  const closeCreateInstituteFormHandler=()=>{
    setShowCreateInstituteForm(false);
    setRerender(rerender=>!rerender);

  }

   useEffect(()=>{
     
      getmyinstitutes({getMyInstitutes});

   },[rerender])



   const dropDownHandler=()=>{

    setShowDropDown(true);	   

   }




   console.log("props.selectedInstitute: ", props.selectedInstitute);	


   

return <div className={classes.topbox}>

        <div className={classes.innerTopBox}>

           <button type="button" className={classes.createInstButton} onClick={showCreateInstituteFormHandler}>
                  <BsPlusLg size={20}/>
           </button>
	    { props.selectedInstitute !==null &&	
             <img src={props.selectedInstitute.logo} className={classes.insLogo} />
	    }
           <div className={classes.insName}>
              <span>
		  <div className={classes.instituteNameText}>

		      {props.selectedInstitute !==null && props.selectedInstitute.name}

	              <span className={classes.NoInstituteSelSpan}>{props.selectedInstitute ===null && "No Institute Selected"}</span>

		  </div>
		  { props.selectedInstitute !==null &&  
			  <div className={classes.instituteRelation}> You are {props.selectedInstitute.relationship} of this institute</div>
		  }
	      </span>
	      <button type="button" className={classes.instituteDropDownButton} onClick={dropDownHandler}> 
		   <BsChevronDown/> 
	      </button>
           </div>



            { showCreateInstituteForm &&
              <CreateInstituteForm onPress={closeCreateInstituteFormHandler}/>
            }


            { showDropDown &&
	          <InstituteNamesDropDown setDropDown = {setShowDropDown} 
		                          myInstitutes = {myInstitutes}
			                  />		    
	    } 


       </div>

     

   
      </div>





}


export default InstituteHeader;
