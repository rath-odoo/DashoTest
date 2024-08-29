import classes from "./SuccessStoryDetails.module.css";

import imageNews1 from "./placeholder.jpg";

import { BsCalendar2EventFill } from "react-icons/bs";

const SuccessStoryDetails=(props)=> {
  return (
    <div className={classes.parent}>
      
      <div className={classes.leftContainer}>
        <div className={classes.imgAndHeading}>
          <img className={classes.mainImg} src={imageNews1} alt="logo"></img>
        </div>

        <div className={classes.title}>
	  {props.Blog.title}
        </div>

        <div className={classes.details}>
	  {props.Blog.longDescription}
        </div>
      </div>
     {/*
      <div className={classes.rightContainer}>
        <div className={classes.boxContainer}>
          <div className={classes.recentPost}>Recent Posts</div>

          <div className={classes.recentPost1}>Stories About Your Success</div>

          <div className={classes.container1}>
            <div className={classes.iconCal}>
              <BsCalendar2EventFill />
            </div>

            <div className={classes.date}>26-05-2022</div>
          </div>


          <div className={classes.horiBorder}></div>

          <div className={classes.recentPost2}>Secret About Your Success</div>

          <div className={classes.container1}>
            <div className={classes.iconCal}>
              <BsCalendar2EventFill />
            </div>

            <div className={classes.date}>26-05-2022</div>
          </div>
        </div>
      </div>
      */}

    </div>
  );
}

export default SuccessStoryDetails;
