import React,{useState} from 'react';
import classes from './Presentations.module.css';
import {BiEdit} from 'react-icons/bi';
//import VideoClickBox from './VideoClickBox';
//import {BsUpload} from 'react-icons/bs';
//import {RiVideoUploadFill} from 'react-icons/ri';
import {AiOutlineFilePdf, AiOutlineFilePpt} from 'react-icons/ai';
import OnePresentation from './OnePresentation';
import CreatePresentation from './Forms/CreatePresentation';







const InstituteBar=(props)=>{

   //console.log("contributions:  ", props.selectedMeeting.contributions);


   const [showPPTCreationForm, setShowPPTCreationForm] = useState(false);

   const addPresentationHandler=()=>{


      if(props.selectedMeeting !==null && props.userData.id !==null){

           if(Number(props.selectedMeeting.creater.id) === Number(props.userData.id) ){

              setShowPPTCreationForm(true);

           }else{

               alert("Only hosts can add presentations");
           }
       } 

   }

  const closePPTCreateForm=()=>{


  setShowPPTCreationForm(false);

  props.rerendermeeting();

  }





return (

<div className={classes.instituteBar}>

   <i className={classes.titleSpace}> 
	<span><i>PRESENTATIONS :</i>

         <button className={classes.uploadButton} onClick={addPresentationHandler}> 
	        + Add a presentation 
	 </button>

	</span>  


        {showPPTCreationForm && <CreatePresentation onPress={closePPTCreateForm} 
		       meeting={props.selectedMeeting}
		       />
	}

        {/*    
	<button className={classes.editButton}> <BiEdit className={classes.editIcon}/></button>
        */}


    </i>
        



      <div className={classes.presentationContainer}>

         
	{ 
           props.selectedMeeting.contributions.map((presentation,index)=>{

               return <OnePresentation key={index} 
		            presentation={presentation} 
		            userData={props.userData}
		            selectedMeeting={props.selectedMeeting}
		            rerender={props.rerendermeeting} />

	   })
        }



      </div>



    {/*
    <div className={classes.videoMicroContainer}>
 
         <AiOutlineFilePdf className={classes.pdfFileIcon} style={{color:'red'}}/>
         <AiOutlineFilePdf className={classes.pdfFileIcon}/>
         <AiOutlineFilePdf className={classes.pdfFileIcon}/>    	
         <AiOutlineFilePpt  className={classes.pdfFileIcon} style={{color:'green'}}/>

    </div>
   */}


</div>

);

}

export default InstituteBar;
