import classes from "./InstituteCertificate.module.css";

import Person from "./InsCertificate.jpg";

function InstituteCertificate() {
  return (
    <div className={classes.mainBlock}>
    <div className={classes.nameContainer1}>Land Conversion Certificate</div>
    <div className={classes.dateContainer1}>12-12-2024</div>
    <a className={classes.linkContainer1} href="https://www.google.com/">
      {" "}
      www.google.com
    </a>
  </div>
  );
}

export default InstituteCertificate;
