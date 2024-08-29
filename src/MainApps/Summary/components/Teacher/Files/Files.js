import React, { useState, useEffect, useRef } from 'react';
import classes from './Files.module.css';
import { BsUpload } from 'react-icons/bs';
import { AiOutlineLink } from 'react-icons/ai';
import OutsideAlerter from '../../../../../CommonApps/OutsideAlerter';
import OneFile from './OneFile';
import picture from './file.png';
import FileForm from './FileForm';
import { getfilesbyCourseId, putFileInACourse } from '../../../../../CommonApps/AllAPICalls';








const Files = (props) => {


   console.log("Files rendeering ");
   const [showAddFileOptions, setShowAddFileOptions] = useState(false);

   const Render = () => {
      setRender(!render);
   }

   const addFileHandler = () => {

      setShowAddFileOptions(showAddFileOptions => !showAddFileOptions);

   }

   const [filesData, getFilesData] = useState(null);
   const [pageNo, setPageNo] = useState(1);
   const [render, setRender] = useState(false);
   const [isDeleted, setIsDeleted] = useState(false);

   useEffect(() => {
      let courseId = props.selectedCourse[0].id;
      getfilesbyCourseId({ pageNo, courseId, getFilesData });

   }, [props.userData, pageNo, render, isDeleted]);



   console.log("filesData: ", filesData !== null ? filesData.results : null);




   const [fileForm, setFileForm] = useState(false);
   const handleClick = () => {
      setFileForm(!fileForm);
   }

   const fileInputRef = useRef(null);
   const [sendingFile, setSendingFile] = useState(null);
   const [formData, setFormData] = useState({
      displayname: null,
      fileaddress: null,
      description: null,
   });

   const [state, setState] = useState(null);

   const handleFileChange = async (event) => {
      try {
         let courseId = props.selectedCourse[0].id;
         const file = event.target.files[0];
         const formData = new FormData();
         formData.append('fileaddress', file);
         formData.append('displayname', "ddu gky");
         formData.append('description', "This is is good file");
         console.log(formData);
         setShowAddFileOptions(false);
         courseId = Number(courseId);
         putFileInACourse({ courseId, formData, setState })
         console.log('File uploaded successfully');
      } catch (error) {
         console.error('Error uploading file:', error);
      }
   };



   const AddFileHandler = () => {


   }

   console.log("formData: ", formData);

   const [showUploadForm, setShowUploadForm] = useState(false);



   const setShowFormHandler = () => {

      setShowUploadForm(true);

   }






   return (
      <div className={classes.files}>

         <div className={classes.toolsDiv}>


            {(props.isOwner || props.isAdmin || props.isTeacher) &&
               <button type="button" className={classes.uploadButton} onClick={addFileHandler}> + Add a file </button>
            }

            {showAddFileOptions &&

               <OutsideAlerter setDropDown={() => setShowAddFileOptions(false)}>
                  <div className={classes.addFileOptions}>
                     <button type="button" className={classes.fileOptionButton} onClick={handleClick}>
                        <BsUpload className={classes.uploadIcon} /> Upload from your computer
                     </button>
                     {/*
                     <button type="button" className={classes.fileOptionButton}>
                        <AiOutlineLink className={classes.youtubeIcon} />Add a external link
                     </button>
		     */}

                  </div>

               </OutsideAlerter>

            }
         </div>




         <div className={classes.videoBoxContainer}>
            {filesData !== null &&
               filesData.results.map((fileobj, index) => {
                  return (
                     <OneFile picture={picture}
                        name={fileobj.displayname}
                        description={fileobj.description}
                        id={fileobj.id}
                        fileaddress={fileobj.fileaddress}
                        rerender={props.rerender}
                        CourseId={props.selectedCourse[0]}
                        userData={props.userData}
                        isAdmin={props.isAdmin}
                        isTeacher={props.isTeacher}
                        isStudent={props.isStudent}
                        isOwner={props.isOwner}
                        setIsDeleted={setIsDeleted}
                        isDeleted={isDeleted}
                     />
                  )
               })
            }





         </div>

         {fileForm &&
            <FileForm onPress={handleClick}
               CourseId={props.selectedCourse[0].id}
               setRender={Render}
            />
         }



      </div>
   );

}

export default Files;
