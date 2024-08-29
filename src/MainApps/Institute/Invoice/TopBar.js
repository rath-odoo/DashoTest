import classes from "./TopBar.module.css";

import Inst from "./inst.jpeg";

function TopBar() {
  return (
    <div className={classes.parentContianer}>
      <div className={classes.topheading}>Invoice</div>

      <div className={classes.Parent}>
        
        <div className={classes.leftContainer}>
          <div className={classes.logoContainer}>
            <img src={Inst} className={classes.imgLogo} />
          </div>

          <div className={classes.instituteName}>Naresh It Institute, HYD</div>
        </div>

        <div className={classes.instituteAddress}>
          2nd Floor, Durga Bhavani Complex, Plaza, Ameerpet, Hyderabad,
          Telangana 500016
        </div>
      </div>
    </div>
  );
}

export default TopBar;
