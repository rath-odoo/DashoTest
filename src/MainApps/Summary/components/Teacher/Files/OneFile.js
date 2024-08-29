
import React, { useEffect, useState } from 'react';
import classes from './OneFile.module.css';
//import { Document, Page,pdfjs } from 'react-pdf';
//import { Page, Text, View, Document } from 'react-pdf';
//import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
//import DocViewer, { DocViewerRenderers }  from "react-doc-viewer";
//import FileViewer from 'react-file-viewer';

//import FileViewer from 'react-file-viewer';
//import { CustomErrorComponent } from 'custom-error';


import { BsFilePdf } from "react-icons/bs";
import { AiFillDelete } from 'react-icons/ai';
import { deleteFileById, getCourseAdmins } from '../../../../../CommonApps/AllAPICalls';

const truncateText = (text, wordLimit) => {

  if (text.length > wordLimit) {
    return text.slice(0, wordLimit) + '...';
  }
  return text;
};
const OneFile = (props) => {

  const url = "https://arxiv.org/pdf/1602.06581.pdf";
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }



  //  const docs = [
  //    { uri: require("./filedir/mobile.png") },
  //  ];


  const openFileHandler = () => {

    let filelink = props.fileaddress;

    console.log("filelink: ", filelink);
    window.open(filelink, '_black');

  }
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };




  const deletefilehandler = (fileId) => {
    deleteFileById(fileId, props.setIsDeleted, props.isDeleted);
  };


  // const [isHovered, setIsHovered] = useState(false);
  const truncatedDescription = truncateText(props.description, 20);
  const shouldTruncate = true;

  return (

    <div className={classes.oneFile}  >




      {(props.isOwner || props.isAdmin || props.isTeacher) &&
        <button
          className={classes.delete}
          onClick={handleDeleteConfirm}
        >
          <AiFillDelete className={classes.deleteicon} />
        </button>

      }
      {showDeleteConfirm && (
        <div className={classes.overLay}>
          <div className={classes.confirmDialog}>
            <p className={classes.p}>
              {isDeleting ? (
                <div>
                  <p>"Are you sure you want to delete this video?"</p>
                  <div className={classes.div}>
                    <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                    <button className={classes.deleteYes}>Deleting...</button>
                  </div>
                </div>
              ) : "Are you sure you want to delete this Notice?"}
            </p>
            {!isDeleting && (
              <div className={classes.div}>
                <button className={classes.deleteNo} onClick={() => setShowDeleteConfirm(false)
                }>Cancel</button>
                <button className={classes.deleteYes} onClick={() => deletefilehandler(props.id)}>Yes, Delete</button>
              </div>
            )}
          </div>
        </div>
      )}


      {/* <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={docs}
               config={{
          header: {
            disableHeader: false,
            disableFileName: false,
            retainURLParams: false
          }
        }}
        style={{ height: 500 }}
      />
    */}
      <div className={classes.fileImage} onClick={openFileHandler} >
        <BsFilePdf size={130} style={{ color: "grey" }} />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}> {props.name}</div>
      <div
        className={classes.displaydesc}
        style={{ textAlign: "center", marginTop: "10px" }}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      >
        {shouldTruncate ? truncatedDescription : props.description}
      </div>


    </div>

  );










}

export default OneFile;
