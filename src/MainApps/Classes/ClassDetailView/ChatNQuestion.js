import classes from "./ChatNQuestion.module.css";
import picture from "./img.jpg";

import UserComment from "./UserComment";

import { BsChatTextFill } from "react-icons/bs";

function ChapterNTopics() {
  return (
    <div className={classes.parentConatiner}>
      <div className={classes.instituteBar}>
        <div className={classes.topContainer}>
          <div className={classes.commentIcon}>
            <BsChatTextFill />
          </div>
          <div className={classes.mainTitlte}>All Comments</div>
        </div>

        <div className={classes.mainContinaer}>
          <img className={classes.pic} src={picture} alt="logo" />

          <input
            type={"text"}
            className={classes.commentBox}
            placeholder="Add a Comment"
          />
        </div>

        <div className={classes.postButtonContainer}>
          <button className={classes.postButton}>Post</button>
        </div>

        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
        <UserComment />
      </div>
    </div>
  );
}
export default ChapterNTopics;
