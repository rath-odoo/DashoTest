import {useState} from 'react';
import classes from "./AddNameForm.module.css";
import {TextInput} from "./CommonApps/FormInputObjects";
import { putuser, putuserprofile, updateusersname} from './CommonApps/AllAPICalls';



const AddNameForm=(props)=>{




   const initialFormData = {
                firstname:'',
                lastname:'',
        };


   const [editState, setEditState] = useState("notSaved");


   const [formData, updateFormData] = useState(initialFormData);

   const handleChange=(event)=>{

     updateFormData({
                        ...formData,
                        [event.target.name]: event.target.value.trim(),
     });

    }


   console.log("formData: ", formData);

   const reloadHandler=()=>{

     props.rerender();

   }




   const handleSubmit = (e) => {
                e.preventDefault();

                if(formData.firstname ==="" ){ 
		  alert("Enter first name");	
                  return null;
		}

                setEditState("saving");
                updateusersname({formData,  setEditState, props});

        };


   const goToDashboard=()=>{

    


   }






 return <div className={classes.addNameForm}>
          <div className={classes.formDiv}>


          <div className={classes.marginDiv}>


           <div className={classes.setYourName}> Set Your name</div>

           <TextInput  label="Firstname" 
	               placeholder="" 
	               name="firstname"  
	               handleChange={handleChange}
		       />             

            <TextInput label="Lastname"     
                       placeholder=""               
                       name="lastname"     
                       handleChange={handleChange}
                       />

           </div>


         { editState === "notSaved" && 
	  <button type="buttom" className={classes.saveButton} onClick={handleSubmit}> Save </button>	
         }


	 { editState === "saving" &&
          <button type="buttom" className={classes.saveButton} disabled={true}> Saving </button>
         }

	 { editState === "saved" &&
          <button type="buttom" className={classes.saveButton} disabled={true} onClick={goToDashboard}> Proceed </button>
         }






          </div>
       </div>

}

export default AddNameForm;
