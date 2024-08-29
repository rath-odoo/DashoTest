import classes from "./topBar.module.css";

function TopBar() {
  return (
    <div className={classes.parentTopBar}>
      <div className={classes.mainContainer}>
        <div className={classes.leftBox}>
          <div className={classes.GradesTitle}>Grades</div>
          <button type="button" className={classes.addGrade}>
            Add Grades
          </button>
        </div>

        <div className={classes.rightBox}>
          <div className={classes.viewGradesbtton}>
            <button type="button" className={classes.viewgradesBtn}>
              View Grades
            </button>
          </div>
        </div>


        
      </div>
    </div>
  );
}
export default TopBar;
