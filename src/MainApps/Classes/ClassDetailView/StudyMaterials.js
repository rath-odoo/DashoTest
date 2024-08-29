import {useState} from 'react';
import classes from "./StudyMaterials.module.css";
import doc from "./doc.png";
import { BiEdit } from "react-icons/bi";
import { AiOutlineFilePdf, AiOutlineFilePpt } from "react-icons/ai";

import {
  BsJournalBookmarkFill,
  BsFillJournalBookmarkFill,
  BsFillBookmarkFill,
  BsPencilSquare,
} from "react-icons/bs";


import FileUploadForm from './Forms/FileUploadForm';



const StudyMaterials=(props)=>{


    const [showUploadForm, setShowUploadForm] = useState(false); 

    const uploadFormHandler=()=>{
        setShowUploadForm(true);
    }
    

   const closeFormHandler=()=>{

     setShowUploadForm(false);
     props.rerender();
   }

    const openLinkHandler=({url})=>{
      console.log("url: ");
      window.open(url,"__blank");
   }

  //  if (!props.selectedCourse || !props.selectedCourse[0]) {
  //   return <div>Loading...</div>;
  // }
 
  //  let isOwner = Number(props.selectedCourse[0]?.creater?.id) === Number(props.userData.id) ? true : false;
  //  let isAdmin = props.selectedCourse[0]?.admins?.some(admin => Number(admin.id) === Number(props.userData.id)) ? true : false;
  //  const teacherIds = (props.selectedCourse[0]?.teachers || []).map(teacher => teacher.id);
  //  const isTeacher = teacherIds.includes(props.userData.id);



  return (
    <div className={classes.parentContainer}>
      <div className={classes.instituteBar}>
        <div className={classes.topContainer}>
          <div className={classes.leftSideContainer}>
            
            <div className={classes.studyIcon}>
              <BsFillBookmarkFill />
            </div>

            <div className={classes.mainTitle}>STUDY MATERIALS and NOTES</div>

            {(props.isOwner || props.isAdmin || props.isTeacher) &&
             <button className={classes.uploadButton} type="button" onClick={uploadFormHandler}>
	         + Upload
	     </button>
          }

             { showUploadForm && 
	        <FileUploadForm onPress={closeFormHandler} oneClass={props.oneClass}/>
             }


          </div>
          {/*
          <button className={classes.editBtnContainer}>
            <BsPencilSquare className={classes.editbutton} />

            <div className={classes.editText}>Edit</div>
          </button>
	  */}
        </div>

        <div className={classes.videoMicroContainer}>

        
	  { props.oneClass.files.map((fileObj, index)=>{

               let url = fileObj.fileaddress;
	      return <button key={index} className={classes.fileDiv} type="button" onClick={()=>openLinkHandler({url})}> 
			  <AiOutlineFilePdf  className={classes.pdfFileIcon} />
			  <span> {fileObj.displayname}</span>
                     </button>
	      })

	  }


        </div>
      </div>
    </div>
  );
}


export default StudyMaterials;



