import { useEffect, useState, useRef } from "react";

import BlogAndNewsBlock from "./BlogAndNewsBlock";
import OneFriend from "../../MainApps/Account/UserProfile/Friends/OneFriend";
import OneNewsBlock from "./OneNewsBlock";
import classes from "./News.module.css";

import imageNews1 from "./placeholder.jpg";
import imageNews2 from "./blog.jpg";
import imageNews3 from "./nw3.png";
import imageNews4 from "./nw4.jpg";

import Blog1 from './Blog1.json';
import Blog2 from './Blog2.json';
import Blog3 from './Blog3.json';
import Blog4 from './Blog4.json';
import Blog5 from './Blog5.json';
import Blog6 from './Blog6.json';




const News = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);


  console.log("blog1: ", Blog1);



  return (
    <div className={classes.parentContainer}>
      {/* <div className={classes.latest}>
        <div className={classes.latestTitle}>NEWS</div>
        <div className={classes.latestsubTitle}>Latest News</div>
      </div> */}

      <div className={classes.topPic}>

       <div className={classes.topContentDiv}>  
        <div className={classes.Heading1s}>Success Stories</div>

        <div className={classes.subheading1s}>
          Learn the Best Tips From Exam Toppers to Study and Prepare for Exams
        </div>

        <div className={classes.editbtnContainer}>
          <input
            className={classes.emailEditBox}
            type="text"
            placeholder="Your Email Id"
          />

          <button className={classes.subBtn}>Subscribe Now</button>
        </div>
       </div>

      </div>

      <div className={classes.newsContainer}>
        <OneNewsBlock
	  Blog={Blog1}
	  image={imageNews1}
        />

        <OneNewsBlock
          Blog={Blog2}
          image={imageNews1}
        />

	<OneNewsBlock
          Blog={Blog3}
          image={imageNews1}
        />

	<OneNewsBlock
          Blog={Blog4}
          image={imageNews1}
        />

	<OneNewsBlock
          Blog={Blog5}
          image={imageNews1}
        />

	<OneNewsBlock
          Blog={Blog6}
          image={imageNews1}
        />


      </div>
    </div>
  );
};

export default News;
