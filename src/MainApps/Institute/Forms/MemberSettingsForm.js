import classes from './MemberSettingsForm.module.css';
import { AiFillCloseCircle } from "react-icons/ai";

import {useState,useEffect} from 'react';

import { TimeField, TextInput, TextInputAddSpeaker, OptionField } from './../../../CommonApps/FormInputObjects';

import {editinstitutemember, deleteinstitutemember} from './../../../CommonApps/AllAPICalls';
import Logo from '../../../CommonApps/Logo'



const MemberSettingsForm=(props)=>{




   const [editState, setEditState]= useState('notSaved');

   const initialFormData = Object.freeze({
           "userType": "",
           "userId": props.oneMember.user_id,
           "employee_id": props.oneMember.employee_id
           
   });

  const [formData, updateFormData] = useState(initialFormData)

   const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
   };




   console.log("props.oneMember: ", props.oneMember.user_id);

   const handleSave=()=>{

    
      if(formData.userType===""){
         alert("Please select a role");
         return null;
      }

      if(formData.userId ===""){
         alert("Error selecting user");
         return null;
      }

      setEditState("saving");	   
      let institute_id = props.selectedInstitute.id; 
      let user_id = props.userData.id;

      console.log("formData: ", formData);	 
      if(user_id !== props.oneMember.id){
      editinstitutemember({institute_id,user_id,formData, setEditState, props});
      }else{

        alert("You cannot edit your own membership");	      
       return null 
      }
   }

   console.log("-----", formData);

   const handleDelete=()=>{
      let institute_id = props.selectedInstitute.id;
      let user_id = props.oneMember.user_id;
      let deletingUserId = props.userData.id;
      if(user_id !== deletingUserId){	   
      deleteinstitutemember({ institute_id, user_id, deletingUserId, setEditState, props});
      }else{

       alert("You cannot delete your own membership");  
       return null

      }
   }	





  let timeintervals = [
    { "name": "Owner", "id": "Owner" },
    { "name": "Admin", "id": "Admin" },
    { "name": "Teacher", "id": "Teacher" },
    { "name": "Student", "id": "Student" },
    { "name": "Staff", "id": "Staff" },
  ]




return <div className={classes.editFormDivParent}>

     <div className={classes.editForm} style={{ height: "600px" }}>
        <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon} /> </button>
        </div>

         <div className={classes.logoAndTitleContainer}>
            <div  style={{ width: "35px" }}> <Logo /> </div>
            <div className={classes.titleDiv}> Change Role  of member </div>
          </div>		

 
	 <div className={classes.memberDetail}>{props.oneMember.firstname+" "+props.oneMember.lastname}  </div>	


	<div style={{width:"80%"}}>	
         <OptionField handleChange={handleChange}
                  label="Role"
                  name="userType"
                  options={timeintervals}
                  defaultValue={""}
                  width="100%"
                  />


        </div>


<div className={classes.uploadSection}>
                <label htmlFor="emmployee_id" className={classes.uploadLabel}>Employee id</label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id" 
                  onChange={handleChange}
                  className={classes.uploadInput2}
                />
              </div>

        <div className={classes.submitButtonDiv}>
	  { editState === "notSaved" &&
            <button type="submit" className={classes.submit_button} onClick={handleSave}>
              <b>Save </b>
            </button>

	  }

         { editState === "saving" &&
            <button type="submit" className={classes.submit_button} disabled={true}>
              <b>Saving.. </b>
            </button>

          }

	 { editState === "saved" &&
            <button type="submit" className={classes.submit_button} disabled={true}>
              <b>Saved </b>
            </button>

          }




        </div>

	<h3> OR </h3>	
 
	<div className={classes.submitButtonDiv}>
            <button type="submit" className={classes.submit_button} style={{backgroundColor:"red"}} onClick={handleDelete}>
              <b>Delete Member </b>
            </button>
        </div>	




     </div>		



</div>

}

export default MemberSettingsForm;
