import classes from "./StudentDocument.module.css";
import { BsFillFileRichtextFill,BsFilePdfFill } from "react-icons/bs";

import SingleDocument from "./SingleDocument";

function StudentDocument() {
  return (
    <div className={classes.parentContainer}>
      <div className={classes.topbar}>
        <div className={classes.leftdiv}>
          <div className={classes.icon}>
            <BsFilePdfFill />
          </div>
          <div className={classes.studentTitle}>Student Documents</div>
        </div>

        <button className={classes.edit}>Add Document</button>
      </div>

      <div className={classes.topDetailsContainer}>
        <div className={classes.docSr}>#</div>

        <div className={classes.docName}>Name</div>

        <div className={classes.docUpload}>Upload Date</div>

        <div className={classes.docLink}>Link</div>

        <div className={classes.docDownload}>Download</div>
      </div>

      <div className={classes.mainContainer}>
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
        <SingleDocument />
      </div>
    </div>
  );
}
export default StudentDocument;
