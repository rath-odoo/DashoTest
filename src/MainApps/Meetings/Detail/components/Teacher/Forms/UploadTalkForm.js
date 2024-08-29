import React,{useState,useEffect} from "react";
import classes from "./EditMeetingForm.module.css";
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
import {getuser, uploadtalk} from '../../../../../../CommonApps/AllAPICalls';

import {TimeField, TextInput, TextInput2, TextInput3, OptionField2, DateField2, DayField} from './FormInputObjects'; 






const AboutEditForm=(props)=>{

    const [selectedFile, setSelectedFile] = useState(null);

    const [ data, setData ] = useState({});

    useEffect(() =>{
     getuser({setData});
    },[]);


    const initialFormData = Object.freeze({

    });



    const [formData, updateFormData] = useState(initialFormData)

    const handleChange = (e) => {

       if(e.target && e.target.files[0]){

            //console.log("image: ", [e.target.name]);

            if(e.target.name === 'talkfile' ){


                  setSelectedFile({
                        image: e.target.files
                   });
            }
       }
    };






    const handleSubmit = (e) => {
	e.preventDefault();
        let imageformData = new FormData();
        let talkid = props.presentation.id;	
	//console.log("selected file: ", selectedFile.image[0]);    

        imageformData.append('talkfile', selectedFile.image[0]);
	imageformData.append('talkId', talkid);    

        //console.log("file upload formData: ", imageformData);

        uploadtalk({imageformData, props});

	//props.userDataUpdated(true);
	//window.location.reload(false);
	//props.onPress();
	    

	};



  




return(

<div className={classes.aboutEditFormDivParent}>


  <form className={classes.aboutEditForm} onSubmit={handleSubmit} style={{height:"60vh"}}>



      <div className={classes.closeButtonDiv}>
          <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
      </div>	


      <div className={classes.logoAndTitleContainer}>
           <div className={classes.titleDiv}><i style={{fontStyle:"normal",fontSize: "25px"}}>  Upload talk  </i></div>
      </div>

            <input
                    type="file"
                    onChange={handleChange}
                    name="talkfile"
                    accept="*"
                    className={classes.image_field}
              />






    { selectedFile !==null &&

     <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Upload </b> </button>

     </div>
    }



  </form>



</div>	
);

}


export default AboutEditForm;
