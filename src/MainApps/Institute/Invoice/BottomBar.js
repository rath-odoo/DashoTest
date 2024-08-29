import classes from "./BottomBar.module.css";

function BottomBar() {
  return (
    <div className={classes.Parent}>
      <div className={classes.mainContainer}>
        <div className={classes.instituteName}>Naresh It Institute, HYD</div>

        <div className={classes.instituteAddress}>
          2nd Floor, Durga Bhavani Complex, Plaza, Ameerpet, Hyderabad,
          Telangana 500016
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
