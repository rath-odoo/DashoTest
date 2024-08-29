import React,{useState} from 'react';
import classes from './CourseImageUploadForm.module.css';
import {AiFillCloseCircle} from "react-icons/ai";


import {uploadcoursecardimage} from '../../../../../../CommonApps/AllAPICalls';
import FadeLoader from "react-spinners/FadeLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};









const CourseImageUploadForm =(props)=>{

    let color="var(--themeColor);";
    const [selectedFile, setSelectedFile] = useState(null);

    const [changePic, setChangePic]=useState(false);

    const [imageUpload, setImageUploaded] = useState("notUploaded");

    const handleChange=(e)=>{


       if(e.target && e.target.files[0]){
           //console.log("image: ", [e.target.name]);
            if(e.target.name === 'card_cover_image' ){

                  setSelectedFile({
                        image: e.target.files
                  });

            }

       }

    }


   const handleSubmit = async(e)=>{
       e.preventDefault();
       let imageformData = new FormData();
       let courseId = props.Course.id;
       //console.log("seletced file: ", selectedFile.image[0]);     
       imageformData.append('card_cover_image', selectedFile.image[0]);
       setImageUploaded("uploading");
       uploadcoursecardimage({imageformData, setImageUploaded,courseId, props});

    }


















return (

  <div className={classes.uploadFormParent}>

     <div className={classes.uploadForm}>
         <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
         </div>

         <input
              type="file"
              onChange={handleChange}
              name="card_cover_image"
              accept="image/*"
	      className={classes.image_field}
           />


         { selectedFile &&
           <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedFile.image[0])} className={classes.previewImage} />
         }




         {  imageUpload === "uploading" &&
             <div className={classes.registerDiv}>
                  <div style={{margin:'auto',zIndex:'9999'}}>
                      <FadeLoader color={color} loading={true} css={override} size={50}   />
                  </div>
            </div>
         }

	 { selectedFile &&
         <button type="button" onClick={handleSubmit} className={classes.uploadButton}> Upload </button>
         }

     </div>
  </div>
);
} 

export default CourseImageUploadForm;





