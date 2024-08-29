import React,{useState, useEffect, CSSProperties} from "react";
import classes from "./CreateInstituteForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../CommonApps/BWlogo.JPG'
import {OptionField, OptionFieldSubmitValue, OptionFieldSecondaryObjs, ParagraphField,TextInput} from '../../../CommonApps/FormInputObjects';
import {createinstitute, addSocialMediaToInstitute} from '../../../CommonApps/AllAPICalls';
//import FadeLoader from "react-spinners/FadeLoader";
import FadeLoader from "react-spinners/BeatLoader";
import {BsLink45Deg} from 'react-icons/bs';
import { BsPlusLg } from "react-icons/bs";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize:"10px",
};





const AddSocialMediaIconForm=(props)=>{



    let color="white";

    const [editState, setEditState] = useState("notSaving");

    const [selectedFile, setSelectedFile] = useState(null);

    const initialFormData = Object.freeze({

        name: "",
        
        url: "",

        });
	
    const [formData, updateFormData] = useState(initialFormData)



    const handleChange = (e) => {
        updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });
    }









   const handleChangeFile=(e)=>{

       if(e.target && e.target.files[0]){

            if(e.target.name === 'logo' ){

                  setSelectedFile({
                        image: e.target.files
                  });

            }

       }



    }


    const handleSubmit=(e)=>{
      e.preventDefault();


      if(formData.name===""){
      
	  alert("please enter social media name");
	   return null;

      }

     if(formData.url===""){
       alert("Please enter url");
	return null;


     }





       setEditState("Saving");
       //let fileFormData = new FormData();
       //fileFormData.append('name',formData.name);
       //fileFormData.append('logo', selectedFile.image[0]);
       //createinstitute({fileFormData, props, setEditState});
       let instituteId = props.selectedInstitute.id;
       let addingUserId = props.userData.id;
       addSocialMediaToInstitute({instituteId, addingUserId, formData,setEditState, props});
    }


    const [classRank, setClassRank] = useState([{"id": "facebook","name": "facebook"},
	                                        {"id": "linkedIn","name": "linkedIn"},
	                                        {"id": "youtube","name": "youtube"},
	                                        {"id": "x","name": "x"},
	                                        {"id": "instagram","name": "instagram"},
                                               ]);
                                                 



    console.log("formData: ", formData);

return(

<div className={classes.createTicketFormDivParent}>



   { 	
  <form className={classes.createTicketForm} onSubmit={handleSubmit}>

    <div className={classes.innerDiv}>


     {/*form close button below*/}	
    <div className={classes.closeButtonDiv}>
        <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
    </div>	

 
     {/*logo and field title container below*/}
    <div className={classes.logoAndTitleContainer}>
	   {/*
	  <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
	   */}
           <div className={classes.formTitleDiv}> 
	          <BsPlusLg className={classes.tubeIcon}/>
	          <span className={classes.tubeIconText}> Add Social Media links </span>
	   </div>
    </div>



       <OptionField handleChange={handleChange}
                     label="Name"
                     name="name"
                     options={classRank}
                     requirement="*"
                     width="100%"
                     />







       <TextInput handleChange={handleChange}
                label="URL"
                placeholder="https://facebook.com/snn.."
                name="url"
                requirement="*"
                defaultValue=""
                />






    {/*
     <div className={classes.logoFileDiv} style={{marginTop:"30px"}}>   Preview </div>
     <div className={classes.previewDiv}>

         <div className={classes.logopreviewDiv}>
            { selectedFile &&
               <img alt="not fount" width="100%" height="100%" src={URL.createObjectURL(selectedFile.image[0])} className={classes.logoImage} />
	    }
	 </div>
         <div className={classes.instnamepreviewDiv}> 
	   <span>   {formData.name}</span>
	 </div>
     </div>
    */}



       {/*
       selectedFile &&
           <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedFile.image[0])} className={classes.userImage} />
        

       <ParagraphField label="Short description" 
	               name="description"  
	               placeholder="Short description..."  
	               handleChange={handleChange}
	               defaultValue=""
		       />	
        */}


    <div className={classes.submitButtonDiv} style={{marginTop:"100px"}}>
          {editState ==="Saving" &&
		         <button type="submit"  className= {classes.submit_button} disabled={true}>
                            <FadeLoader color={color} loading={true} css={override} size={10}/>
                            Saving ...
		         </button>
                         }

           {editState ==="notSaving" &&
            <button type="submit"  className= {classes.submit_button}><b>
		   Save </b> 
            </button>
	   }

           {editState ==="Saved" &&
            <button type="submit"  className= {classes.submit_button} disabled={true}><b>
                   Saved </b>
            </button>
           }




    </div>


    <div className={classes.emptyDiv}>

     dshdfjhd sdns dasd ashda sdhasd asdjas djasd asdas da asd asd
     asd asda asdb sadasdj dDMNASD ASDNBSAD ASDNBADS ADSNBA Dsj dn
     dcnd ASDNAS DJASD AJSDA DBASD ASDB SADBSA dasjdnbqww dwbdw dd


    </div>


   </div>	   

  </form>

   }


</div>	
);

}


export default AddSocialMediaIconForm;
