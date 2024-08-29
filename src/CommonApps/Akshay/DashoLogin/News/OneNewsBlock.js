import classes from "./OneNewsBlock.module.css";
import newsImg from "./placeholder.jpg";
import { useHistory } from "react-router-dom";



const OneNewsBlock = (props) => {
  const readNewsHandler = () => {
    window.open(props.link, "_blank");
  };

  const history = useHistory();

  const detailsHandler = () => {
    history.push("/successstory/"+props.Blog.id);
  };



  return (
    <div className={classes.parentNews}>
      {/* <div className={classes.latest}>
        <div className={classes.latestTitle}>NEWS</div>
        <div className={classes.latestsubTitle}>Latest  News</div>
      </div> */}

      <div className={classes.newsContainer}>
        <div className={classes.newsBlock1}>
          <div className={classes.imgAndHeading}>
            <img className={classes.mainImg} src={props.image} alt="logo"></img>
          </div>

          <div className={classes.contentDetails}>
            <div className={classes.mainTitle}>{props.Blog.title}</div>

            <div className={classes.newsDetails}>{props.Blog.shortDescription}</div>

            <button
              type="button"
              className={classes.readMore}
              onClick={detailsHandler}
            >
              Read more..
            </button>
          </div>
          
        </div>

        {/* <div className={classes.newsBlock2}>
          <div className={classes.imgAndHeading}>
            <img className={classes.mainImg} src={newsImg} alt="logo"></img>

            <div className={classes.mainTitle}>
              Telecom Startup Wiom Secures $17 Million in Series
            </div>
          </div>

          <div className={classes.contentDetails}>
            <div className={classes.newsDetails}>
              Telecom startup Wiom has scooped Rs 140 crore (approximately $17
              million) in a Series A round led by RTP Global. This is also the
              first investment raised by the Delhi-based startup in 2023. The
              round also saw participation from YourNest, Omidyar Network India,
              Global Brain, Blume Founders Fund, Alteria Capital, Stride
              Ventures, Stride One and 9 Unicorns.
            </div>

            <div className={classes.readMore}>Read More ...</div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OneNewsBlock;
