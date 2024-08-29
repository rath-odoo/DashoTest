import classes from "./singleCertificate.module.css";

import cert from "./cert.jpg";

import { BsFillTrash3Fill } from "react-icons/bs";

function SingleCertificate() {
  return (
    <div className={classes.parentSingleCertificate}>


      <div className={classes.certificateContainer}>
        
        <div className={classes.firstContainer}>
          <div className={classes.docTitleContainer}>
            <div className={classes.docTitle}>10th Marksheet</div>

            <div className={classes.deleteIcon}>
              <BsFillTrash3Fill />
            </div>
          </div>
          <img className={classes.pic} src={cert} alt="logo"></img>
        </div>

   
      </div>
    </div>
  );
}
export default SingleCertificate;
