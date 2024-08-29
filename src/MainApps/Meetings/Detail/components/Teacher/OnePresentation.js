import React,{useState} from 'react';
import classes from './OnePresentation.module.css';
import {BiEdit} from 'react-icons/bi'
import {BsBoxArrowUpRight,BsUpload, BsTrash,BsXLg, BsFileEarmarkPdf} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import UploadTalkForm from './Forms/UploadTalkForm';
import EditPresentatonForm from './Forms/EditPresentatonForm';
import {deletepresentation} from '../../../../../CommonApps/AllAPICalls';

//import basewebURL from '../../../../../basewebURL';




const OnePresentation =(props)=>{


    let presentationid = props.presentation.id;

    const openFileInNewTabHandler=({talkfilelink})=>{
       let fileLink = talkfilelink;
       window.open(fileLink, "_blank");
    }

    const [showFileUploadForm, setShowFileUploadForm] = useState(false);
    const [showEditPresentation, setShowEditPresentation] = useState(false);

    const showUploadFormHandler=()=>{

        if(props.selectedMeeting !==null && props.userData.id !==null && props.presentation !==null){

           if(Number(props.selectedMeeting.creater.id) === Number(props.userData.id) ){

              setShowFileUploadForm(true);

           }else if(   Number(props.presentation.speaker.id)=== Number(props.userData.id )   ){

              setShowFileUploadForm(true);


           }else{

               alert("Only hosts or speakers can upload talks");
           }
       }











    }

    const closeFileUploadForm=()=>{
     setShowFileUploadForm(false);
     props.rerender();	    
    }

    const deleteTalkHandler=()=>{

    let talkId = props.presentation.id;	   
       //deletepresentation({talkId});
       //window.location.reload(false)
       //props.rerender();	


       if(props.selectedMeeting !==null && props.userData.id !==null && props.presentation !==null){

           if(Number(props.selectedMeeting.creater.id) === Number(props.userData.id) ){

              deletepresentation({talkId});
              props.rerender();


           }else if(   Number(props.presentation.speaker.id)=== Number(props.userData.id )   ){

              alert("Only hosts can delete presentations");


           }else{

               alert("Only hosts can delete presentations");
           }
       }

















    }

    const showEditPresentationHandler=()=>{
     

       if(props.selectedMeeting !==null && props.userData.id !==null && props.presentation !==null){

           if(Number(props.selectedMeeting.creater.id) === Number(props.userData.id) ){

              setShowEditPresentation(true);

           }else if(   Number(props.presentation.speaker.id)=== Number(props.userData.id )   ){

            setShowEditPresentation(true);


	   }else{

               alert("Only hosts or speakers can edit presentations");
           }
       }

    }


    const closeEditPresentation=()=>{
       setShowEditPresentation(false);
       props.rerender();
    }





   console.log("One Presentation: ", props.presentation);


return <div className={classes.onePresentation}>


         <div className={classes.onePresentation_talkTitleDiv}> 
		<i > <span className={classes.talkID}> {props.presentation.id} </span> 
		    <b style={{color:"var(--themeColor)"}}>{props.presentation.talktitle} </b>
		</i>
 
		<i>  Speaker: { props.presentation.speaker !==null && props.presentation.speaker.firstname +" "+ props.presentation.speaker.lastname}</i>

	</div>


	 <div className={classes.onePresentation_talkTitleDiv}> 
	     <span style={{color:"grey"}}> Time (IST):  
	                      
                          <b>{props.presentation.talktime.split(":")[0]}
                              {":"}
                              {props.presentation.talktime.split(":")[1]}
                               {", "}{props.presentation.duration}{" mins "}
                               
                              
                              {/*" "+props.Class.classdate.split("-")[2]+" "*/}
                              {/*NumToMonth[Number(props.Class.classdate.split("-")[1])]*/}{" "}
                              {/*props.Class.classdate.split("-")[0]*/}
                           </b>

	     </span>
	</div>	

         <div className={classes.onePresentation_talkTitleDiv} style={{color:"grey"}}> 

	    <span> Attachments:


                       {
                         props.presentation.talkfiles.map((talkfile,index)=>{
				 let talkfilelink = talkfile.talkfile;
                           return <button onClick={()=>openFileInNewTabHandler({talkfilelink})} className={classes.uploadedFile} key={index}>
                                     <BsFileEarmarkPdf className={classes.uploadfileIcon}/>
					
                                         {talkfilelink.split("?AWSAccessKeyId")[0].split("/").at(-1)}
                                  </button>




			 })

		       }




           {

            showFileUploadForm && <UploadTalkForm onPress={closeFileUploadForm} meeting={props.selectedMeeting} presentation={props.presentation}/>


	   }

           <button type='button' className={classes.addFileButton} onClick={showUploadFormHandler}>
                              +add file
           </button>






             {/*
             <form className={classes.imageUpload} onSubmit={handleSubmit}>

              <input
                    type="file"
                    onChange={handleChange}
                    name="iddocfile"
                    accept="*"
                    className={classes.image_field}
              />



              { selectedFile !==null &&
              <button type="submit"  className= {classes.submit_button} ><b>Upload </b> </button>
              }

            </form>
            */}






             
	    </span>	
	   

            <span>
            <button className={classes.talkEditButton} type='button' onClick={showEditPresentationHandler}> <BiEdit/> </button>
	    <button className={classes.talkEditButton} type='button' onClick={deleteTalkHandler}> <BsTrash/> </button>
            </span>


            {showEditPresentation && <EditPresentatonForm onPress={closeEditPresentation} presentation={props.presentation}/>}


	</div>


</div>


}

export default OnePresentation;

