import React,{useState, CSSProperties, useEffect} from "react";
import classes from "./ProfileImage.module.css";
import basewebURL from "../../../../basewebURL";
import {getuser, uploadprofieimage} from '../../../../CommonApps/AllAPICalls.js';
import FadeLoader from "react-spinners/FadeLoader";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};









const ProfileImage = (props) => {


  const [data, setData] = useState({});

  useEffect(() => {
    let isMounted = true;  

    getuser({ setData });

    return () => {
      isMounted = false;  
    };
  }, [props]);

 

const userImage = data.profile_image ;


  

  // let imageurl;
  // imageurl= props.userData.profile_image;



    let color="#2626BA";



    /*	
    if(window.location.host === 'localhost:3000'){
        imageurl=basewebURL+props.data.profile_image;	  
      }

    if(window.location.host === '127.0.0.1:8000'){
        imageurl=basewebURL+props.data.profile_image;
      }

    if(window.location.host === 'edresearch.co.in'){
        imageurl=props.data.profile_image;
      }

    if(window.location.host === 'webapp.diracai.com'){
        imageurl=props.data.profile_image;
     }
     */

    const [selectedFile, setSelectedFile] = useState(null);

    const [changePic, setChangePic]=useState(false);

    const handleChange=(e)=>{


       if(e.target && e.target.files[0]){
           //console.log("image: ", [e.target.name]);
            if(e.target.name === 'profile_image' ){

                  setSelectedFile({
                        image: e.target.files
                  });

            }

       }

    }

    const [imageUpload, setImageUploaded] = useState("notUploaded");

    //const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const handleSubmit = async(e)=>{
       e.preventDefault();
       let imageformData = new FormData();
       //console.log("seletced file: ", selectedFile.image[0]);	    
       imageformData.append('profile_image', selectedFile.image[0]);	  
       setImageUploaded("uploading"); 	    
       await uploadprofieimage({imageformData, setImageUploaded, cancelHandler ,props});
      //  setImageUploaded(false);
      //  window.location.reload(true);
       //await delay(5000);
       //props.rerender();
       //cancelHandler();
        
    }


    const cancelHandler=()=>{
       setChangePic(false);
       setSelectedFile(null); 	 
       props.rerenderHandler(); 
   
    }








return (


<div className={classes.profileImageDiv}>

        { !selectedFile &&
            <img className={classes.userImage} src={userImage} alt='edr Logo' />
        }

        { selectedFile && 
           <img alt="not fount" width={"280px"} src={URL.createObjectURL(selectedFile.image[0])} className={classes.userImage} />
         }



         {  imageUpload === "uploading" &&
          <div className={classes.registerDiv}>
	        		 
               <div style={{margin:'auto',zIndex:'9999'}}>
                   <FadeLoader color={color} loading={true} css={override} size={50}   />
               </div>
          </div>
        }



{/* 
       { !changePic &&
         <button className={classes.changePicButton} onClick={()=>setChangePic(true)}>
            Upload
         </button>	
       } */}


       { changePic &&
          <button className={classes.changePicButton} onClick={cancelHandler}>
              Cancel
         </button>
       }





       { changePic &&  
        <form className={classes.imageUpload} onSubmit={handleSubmit}>

          <input
              type="file"
              onChange={handleChange}
              name="profile_image"
	      accept="image/*"
              className={classes.image_field}
           />




          <button type="submit"  className= {classes.submit_button} ><b>Upload </b> </button>	


       </form>
     }
</div>
);


}


export default ProfileImage;
