import classes from "./SingleDocument.module.css";

import doc from "./maindoc.png";

import { MdOutlineFileDownload } from "react-icons/md";



function SingleDocument() {
  return (
    <div className={classes.parentContainer}>
      <div className={classes.docSr}>1</div>

      <div className={classes.docName}>Aadhar Card</div>

      <div className={classes.docUpload}>12-12-2024</div>

      <div className={classes.docLink}>
        <a lassName={classes.docLink} href="https://www.w3schools.com/">
          Visit W3Schools.com!
        </a>
      </div>

      <div className={classes.docDownload}><MdOutlineFileDownload/></div>
    </div>
  );
}

export default SingleDocument;
