import React,{useState, useEffect, CSSProperties} from "react";
import classes from "./CreateCourseForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import {OptionField, OptionFieldSubmitValue, OptionFieldSecondaryObjs, ParagraphField,TextInput} from '../../../../CommonApps/FormInputObjects';
import {getclassobjectbyId, getclassrank, editcoursesummary, getsubjectsfromclassandboard, addyoutubevideotocourse} from '../../../../CommonApps/AllAPICalls';

import {addyoutubevideotoclass, addfiletoclass} from '../../../../CommonApps/AllAPICalls';


//import FadeLoader from "react-spinners/FadeLoader";
import FadeLoader from "react-spinners/BeatLoader";
import {BsYoutube} from 'react-icons/bs';


const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
  fontSize:"10px",
};





const CourseEditForm=(props)=>{



    let color="white";

    const [editState, setEditState] = useState("notSaving");

    const [selectedFile, setSelectedFile] = useState(null);


    const initialFormData = Object.freeze({

        name: "",
        link: "",
        description: "",
	studyfile: null,

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
           
            if(e.target.name === 'studyfile' ){

                  setSelectedFile({
                        image: e.target.files
                  });

            }

       }



    }












    const handleSubmit=(e)=>{
      e.preventDefault();
      let classId=props.oneClass.id;
      console.log("classId: ", classId);
      setEditState("Saving");	   
      let fileFormData = new FormData();
       fileFormData.append('displayname',formData.name);
       fileFormData.append('description', formData.description);
       fileFormData.append('fileaddress', selectedFile.image[0]);

       addfiletoclass({ fileFormData, classId,props, setEditState});	    
    }	



    //console.log("formData: ", formData);



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
           <div className={classes.formTitleDiv}> 
	          <span className={classes.tubeIconText}> Upload a file </span></div>
    </div>


         <input
              type="file"
              onChange={handleChangeFile}
              name="studyfile"
              accept="*/*"
              className={classes.image_field}
             />



    <TextInput handleChange={handleChange}
                label="Title "
                placeholder="Parallelogram vector addition"
                name="name"
                requirement="*"
	        defaultValue=""
                />

    {/*
      <TextInput handleChange={handleChange}
                label="Link"
                placeholder="https://www.youtube.com/watch?v=b1t41Q3xRM8"
                name="link"
                requirement="*"
                defaultValue=""
                />

    */}




       <ParagraphField label="Short description" 
	               name="description"  
	               placeholder="Short description..."  
	               handleChange={handleChange}
	               defaultValue=""
		       />	



 
 




    <div className={classes.submitButtonDiv}>
          {editState ==="Saving" &&
		         <button type="submit"  className= {classes.submit_button} disabled={true}>
                            <FadeLoader color={color} loading={true} css={override} size={10}/>
                            Saving ...
		         </button>
                         }

           {editState ==="notSaving" && selectedFile !==null &&
            <button type="submit"  className= {classes.submit_button} ><b>
		   Upload </b> 
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


export default CourseEditForm;
