import classes from "./Single_user_latest_post.module.css";

import BajrangImg from "./Bajarang.jpg";

const UnitFriendsIcon = (props) => {
  return (
    <div className={classes.container1}>
      <div className={classes.iconBg}>
        <img src={BajrangImg} className={classes.postImage} />
      </div>

      <div className={classes.heading1}>Bajrang Sutar</div>
    </div>
  );
};
export default UnitFriendsIcon;
