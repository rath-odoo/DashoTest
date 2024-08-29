import classes from "./OnePost.module.css";
import BajrangImg from "./Bajarang.jpg";

import PostImage from "./postimg.jpeg";

import { BsPlusCircle,BsHandThumbsUp,BsShare,BsChatDots } from "react-icons/bs";

const OnePost = () => {
  return (
    <div className={classes.onePost}>
      <div className={classes.topTitleDiv}>
        <div className={classes.topLeftContainer}>
          <img src={BajrangImg} className={classes.posterImage} />

          <div className={classes.leftContainer}>
            <div className={classes.postTitleDiv}>Bajrang Sutar </div>

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
        <img src={PostImage} className={classes.postImage} />
      </div>

	  <div className={classes.horizontalLIne}></div>


      <div className={classes.likeCommentDiv}>
        <div className={classes.LikeContainer}>
		<BsHandThumbsUp className={classes.likeImg}/>
          <div className={classes.likeText}>Like</div>
        </div>

        <div className={classes.commentContainer}>
        <BsChatDots className={classes.commentImg}/>
          <div className={classes.commentText}>Comment</div>
        </div>

        <div className={classes.shareContainer}>
         
			<BsShare className={classes.shareImg}/>
		 
          <div className={classes.shareText}>Share</div>
        </div>
      </div>
    </div>
  );
};

export default OnePost;
