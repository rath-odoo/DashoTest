import React,{useState,useEffect} from 'react';
import classes from './ChapterCreationForm.module.css';
import {AiFillCloseCircle} from "react-icons/ai";
import { TextInput, OptionField} from './FormInputs/FormInputObjects';

import {createnewchapter,getchapternumbers} from '../../../CommonApps/AllAPICalls.js';







const ChapterCreationForm=(props)=>{



  const initialFormData = Object.freeze({


        chapterTitle: "",
        chapterNumber: null,
	syllabusId: props.syllabusData.id,  

        });



const [formData, updateFormData] = useState(initialFormData)



    const [chapterNumbers, setChapterNumbers] = useState([1,2,3,4,5]);


    useEffect(()=>{

     getchapternumbers({setChapterNumbers});


    },[]);






    const handleSubmit =(e)=>{
     e.preventDefault();
    

     if(formData.chapterTitle===""){
                  alert('please enter chapter title');
                  return null;
          }

     if(formData.chapterNumber===null){
                  alert('please enter chapter number');
                  return null;
          }



     createnewchapter({formData});

     props.onPress();

    }



    const handleChange = (e) =>{

     updateFormData({
                        ...formData,
                        [e.target.name]: e.target.value.trim(),
                });

     //console.log("formData: ", formData);

    }






return (

<div className={classes.formScreen}>



   <div className={classes.formScreenView} >

	  <div className={classes.closeButtonDiv}>
            <button onClick={props.onPress} className={classes.closeFormButton}> <AiFillCloseCircle className={classes.closeButtonIcon}/> </button>
          </div> 


           <form className={classes.createChapterForm} onSubmit={handleSubmit}>

            <OptionField handleChange={handleChange}  
	                 label="Chapter Number" 
	                 name="chapterNumber"  
	                 options={chapterNumbers}
                         addedChapters={props.syllabusData.chapters}
	                 />

            <TextInput  label="Chapter Title" placeholder="Name the title" name="chapterTitle"  handleChange={handleChange}/>


            <div className={classes.submitButtonDiv}>
                <button type="submit"  className= {classes.submit_button} ><b>Create </b> </button>
             </div>






          </form>





   </div>	

</div>	

);




}


export default ChapterCreationForm;
