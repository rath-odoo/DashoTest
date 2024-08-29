import classes from "./TopBar.module.css";

import pic from "./pic.jpg";

function TopBar() {
  return (
    <div className={classes.parents}>
      <div className={classes.mainContainer}>
        <div className={classes.leftsideContainer}>
          <img src={pic} className={classes.pic} />

          <div className={classes.name}>Akshay Bhasme</div>
        </div>

        <div className={classes.class}>Class : 12th</div>

        <div className={classes.mobilenu}>+91 8855935799</div>

        <div className={classes.email}>akshayBhasme@gmail.com</div>
      </div>
    </div>
  );
}

export default TopBar;
