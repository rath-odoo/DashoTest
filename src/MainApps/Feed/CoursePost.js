import classes from "./CoursePost.module.css";
import BajrangImg from "./Bajarang.jpg";

import PostImage from "./postimg.jpeg";

import CoursePic from "./java.png";

import {
  BsPlusCircle,
  BsHandThumbsUp,
  BsShare,
  BsChatDots,
  BsFillSendFill,
} from "react-icons/bs";

const CoursePost = () => {
  return (
    <div className={classes.onePost}>
      <div className={classes.topTitleDiv}>
        <div className={classes.topLeftContainer}>
          <img src={BajrangImg} className={classes.posterImage} />

          <div className={classes.leftContainer}>
            <div className={classes.detailsBlock}>
              <div className={classes.postTitleDiv}>Bajrang Sutar </div>
              <div className={classes.status}>Teacher</div>
            </div>

            <div className={classes.aboutDetail}>
              Web Development | Java | Python | Mysql
            </div>
          </div>
        </div>

        <div className={classes.followBtnContainer}>
          <BsPlusCircle className={classes.addImg} />

          <div className={classes.followText}>Follow</div>
        </div>
      </div>

      <div className={classes.horizontalLIne}></div>

      <div className={classes.textDiv}>
        By equipping your phone with Sygic as an alternative to preinstalled
        free and subsidized navigations by the global giants, you have clearly
        demonstrated the validity of this choice. Allow me to extend my
        gratitude for downloading Sygic and utilizing it whenever it aligns as
        the finest option – your daily commute or exploring the world on holiday
        trips.
      </div>

      <div className={classes.ImageDiv}>
        <div className={classes.demo}>Title</div>

        <div className={classes.mainContainer}>
          <img src={CoursePic} className={classes.pic} />

          <div className={classes.leftContainer}>
            <div className={classes.block1}>
              <div className={classes.demo}>Course Name :</div>
              <div className={classes.name}>Fundamentals of Biology</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.demo}>Instructor :</div>
              <div className={classes.name}>Mr. Akshay Bhasme</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.demo}>Course ID :</div>
              <div className={classes.name}>123654</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.demo}>Start Date :</div>
              <div className={classes.name}>25-12-2023</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.demo}>End Date :</div>
              <div className={classes.name}>30-3-2024</div>
            </div>

            <div className={classes.block1}>
              <div className={classes.demo}>Status :</div>
              <div className={classes.name}>Start</div>
            </div>
          </div>
        </div>

        <button className={classes.enrollBTN}>Enroll</button>
      </div>

      <div className={classes.horizontalLIne}></div>

      <div className={classes.likeCommentDiv}>
        <div className={classes.LikeContainer}>
          <BsHandThumbsUp className={classes.likeImg} />
          <div className={classes.likeText}>Like</div>
        </div>

        <div className={classes.commentContainer}>
          <BsChatDots className={classes.commentImg} />
          <div className={classes.commentText}>Comment</div>
        </div>

        <div className={classes.shareContainer}>
          <BsShare className={classes.shareImg} />

          <div className={classes.shareText}>Share</div>
        </div>
      </div>

      <div className={classes.horizontalLIne}></div>

      <div className={classes.commentView}>
        <img src={BajrangImg} className={classes.userimgComment}></img>

        <input
          className={classes.commentInputBox}
          type="text"
          placeholder="Write Comment ..."
        />
        <BsFillSendFill className={classes.sendCommentButtonDiv} />
      </div>
    </div>
  );
};

export default CoursePost;
