import classes from "./Single_user_latest_post.module.css";

import BajrangImg from "./institute.jpeg";

const UnitFriendsIcon = (props) => {
  return (
    <button className={classes.container1}>
      <div className={classes.iconBg}>
        <img src={BajrangImg} className={classes.postImage} />
      </div>

      <div className={classes.heading1}>Naresh It Institute</div>
    </button>
  );
};
export default UnitFriendsIcon;
