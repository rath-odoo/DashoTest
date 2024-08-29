import classes from "./singleUser.module.css";

import IMG from "./p2.jpg";
import SingleUserDetails from "./singleUserDetails";

function singleUser() {
  return (
    <div className={classes.parentClassmain}>
      
      <div className={classes.topNavigationBar}>
        <button className={classes.schedule}>Add</button>
        <button className={classes.showSummary}>Filter</button>
      </div>

      <div className={classes.parentClass}>
        <div className={classes.nameContainer}>Name</div>
        <div className={classes.rolwContainer}>Role</div>
        <div className={classes.dateContainer}>Date Joined</div>
        <div className={classes.statusContainer}>Status</div>
      </div>



      <div className={classes.scrollContent}>

   
      <SingleUserDetails />
      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />
      <SingleUserDetails />
      <SingleUserDetails />

      <SingleUserDetails />

      <SingleUserDetails />
      <SingleUserDetails />
      </div>
    </div>
  );
}

export default singleUser;
