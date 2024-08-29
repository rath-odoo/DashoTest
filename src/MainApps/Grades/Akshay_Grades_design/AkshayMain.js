import classes from "./AkshayMain.module.css";

import TopBar from "./topBar";
import Certificate from "./singleCertificate";
import UserView from "./singleUserGrades";

function AkshayMain() {
  return (
    <div className={classes.parentGrades}>
      <TopBar />

      <div className={classes.mainContainer}>
        <div className={classes.userContainer}>
          <div className={classes.allStudentTitle}>All Students</div>

          <div className={classes.searchbox}>
            <input
              className={classes.searchEditBox}
              placeholder="Search Student Name..."
            />
          </div>

          <UserView />
          <UserView />
          <UserView />
          <UserView />
          <UserView />
          <UserView />
          <UserView />
          <UserView />
          <UserView />
        </div>

        <div className={classes.certificateContainer}>
          <Certificate />
          <Certificate />
          <Certificate />
          <Certificate />
        </div>
      </div>
    </div>
  );
}

export default AkshayMain;
