import classes from "./UserComment.module.css";

import image from "./img.jpg";

function UserComment() {
  return (
    <div className={classes.parentContainer}>
      <img src={image} className={classes.pic} />

      <div className={classes.rightContainer}>
        <div className={classes.topContainer}>
          <div className={classes.userName}>Akshay Bhasme</div>

          <div className={classes.timepost}>1 day ago</div>
        </div>

        <div className={classes.comment}>
          Hello This is the First Demo comment
        </div>
      </div>
    </div>
  );
}
export default UserComment;
