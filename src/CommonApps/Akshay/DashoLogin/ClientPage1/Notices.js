import { useEffect, useState, useRef } from "react";
import classes from "./Notices.module.css";

import { BsSearch, BsArrowBarDown } from "react-icons/bs";

import OneNotice from "./OneNotice";

import TextImg from "./textDemo.jpg";

const Notices = (props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);

    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  return (
    <div className={classes.notices}>
      {/* <div className={classes.searchbar}>
        <BsSearch className={classes.serchIcon} />
        <input className={classes.searchInput} placeholder="  search..." />
      </div>

      <OneNotice />
      <OneNotice />
      <OneNotice />
      <OneNotice />
      <OneNotice /> */}

      <div className={classes.mainContainer}>
        <div className={classes.leftContainer}>
          <div className={classes.docBox}>
            <div className={classes.topBar}>
              <div className={classes.title}>Uploaded Document</div>
            </div>

            <div className={classes.mainImg}>
              <img src={TextImg} className={classes.pic} />
            </div>
          </div>

          <button className={classes.uploadDocument}>Upload Document</button>
        </div>

        <div className={classes.rightContainer}>
          <div className={classes.docBox}>
            <div className={classes.topBar}>
              <div className={classes.title}>By Law</div>
            </div>

            <div className={classes.law}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.The
              standard chunk of Lorem Ipsum used since the 1500s is reproduced
              below for those interested. Sections 1.10.32 and 1.10.33 from "de
              Finibus Bonorum et Malorum" by Cicero are also reproduced in their
              exact original form, accompanied by English versions from the 1914
              translation by H. Rackham.Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
            </div>
          </div>
        </div>
      </div>

      <div className={classes.changesContainer}>
        <div className={classes.circleContainer}>
          <div className={classes.changesTitle}>comparison</div>
          {/* <BsArrowBarDown className={classes.arrowIcon} /> */}
        </div>

        <div className={classes.mainChangesDetailsContainer}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s
          is reproduced below for those interested. Sections 1.10.32 and 1.10.33
          from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in
          their exact original form, accompanied by English versions from the
          1914 translation by H. Rackham.Contrary to popular belief, Lorem Ipsum
          is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the
        </div>
      </div>
    </div>
  );
};

export default Notices;
