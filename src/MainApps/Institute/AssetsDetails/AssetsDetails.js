import classes from "./AssetsDetails.module.css";

import SingleAssetsDetails from "./SingleAssetsDetails";

function AssetsDetails() {
  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <SingleAssetsDetails />
      </div>
    </div>
  );
}

export default AssetsDetails;
