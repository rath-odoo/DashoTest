import React,{useState} from 'react';
import classes from './BookCreateForm.module.css';
import {AiFillCloseCircle} from "react-icons/ai";
import logoImage from '../../../../../../CommonApps/BWlogo.JPG'
//import {TextInput, FileInput} from './FormInputObjects';

import {createnewbook} from '../../../../../../CommonApps/AllAPICalls';

//import axiosInstance from '../../../../../../axios';


import axios from 'axios';
const BookCreateForm =(props)=>{

 const [selectedFile, setSelectedFile] = useState(null);


   const handleChange=(e)=>{

    //console.log("change data: ", e.target.name);

   if([e.target.name] == 'image' ){

   setSelectedFile({
    image: e.target.files
   });

   }

   //console.log("e.target.files: ", e.target.files);

   }


   const handleSubmit=(e)=>{
   e.preventDefault();


   const config = {headers:{'Content-Type': 'multipart/form-data'}}
   const URL = 'http://127.0.0.1:8000/api/book/upload/';
   let formData = new FormData();
   formData.append('name',"bibhu");
   formData.append('coverimage', selectedFile.image[0]);	   

  // axios.post(URL, formData, config).then((res)=>{console.log(res.data)});


   axiosInstance.post(`book/upload/`,formData ).then((res)=>{console.log(res.data)});






  }	




return (

<div className={classes.bookCreateFormParent}>

   <div className={classes.bookCreateForm}>

     <div className={classes.closeButtonDiv}>
                 <button onClick={props.onPress}
                       className={classes.closeFormButton}>
                            <AiFillCloseCircle className={classes.closeButtonIcon}/>
                 </button>
     </div>

      <div className={classes.logoAndTitleContainer}>
                 <img  className={classes.bwLogo} src={logoImage} alt='edr Logo' />
                  <div className={classes.formTitleDiv}><i>  Create  a book in edrFormat </i></div>
      </div>



   <form className={classes.formElement1} onSubmit={handleSubmit} encType="multipart/form-data">
       {/*
      <TextInput handleChange={handleChange} label="Name of the Book" placeholder="e.g. Concepts of Physics I" name="bookName"/>


      <TextInput handleChange={handleChange} label="Name of the Author" placeholder="e.g. H.C. Verma" name="authorName"/>

	 
      <FileInput handleChange={handleChange} label="Book cover page" selectedFile={selectedFile} name="coverPage"/>
      */}

       <input
          type="text"
          name="name"
          onChange={handleChange}
        />




      <input
          type="file"
          name="image"
	  id = "post-image"
          onChange={handleChange}
        />


      <div>
	{ selectedFile.image[0] &&
        <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedFile.image[0])} />
	}
      </div>	



     <div className={classes.submitButtonDiv}>
          <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>

     </div>



  </form>




   </div>
</div>
);

}


export default BookCreateForm;
