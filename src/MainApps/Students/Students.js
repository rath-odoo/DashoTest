import React, { useState, useEffect, useRef } from "react";
import classes from "../CommonAppUtilities/MainAppContainer.module.css";
import Separator from "../CommonAppUtilities/Separator";

import TopInfoBarSubject from "./TopInfoBarSubject";
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import StudentsContentDiv from "./StudentsContentDiv";

const Subject = (props) => {
  const [sideNavBarWidth, setSideNavBarWidth] = useState(
    "calc( 0.5% + " + props.sideNavBarWidth + " )"
  );
  const [mainAppContainerWidth, setMainAppContainerWidth] = useState(
    "calc( 99% - var(--sideNavBarWidth) )"
  );

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    setSideNavBarWidth("calc( 0.5% + " + props.sideNavBarWidth + " )");
    if (props.sideNavBarWidth === "var(--sideNavBarWidth)") {
      setMainAppContainerWidth("calc( 99% - var(--sideNavBarWidth) )");
    }
    if (props.sideNavBarWidth === "var(--sideNavBarWidthOnContract)") {
      setMainAppContainerWidth(
        "calc( 99% - var(--sideNavBarWidthOnContract) )"
      );
    }

    return () => {};
  }, [props.sideNavBarWidth]);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  //let title="Subject"
  let mainAppContainerStyle = {
    left: sideNavBarWidth,
    width: mainAppContainerWidth,
  };
  const infoBarActiveButtonColor = {
    color: "white",
    backgroundColor: "#919191",
  };

  return (
    <div className={classes.mainAppContainer} style={mainAppContainerStyle}>
      {/*
      <TopInfoBarSubject styles={infoBarActiveButtonColor} selectedCourse={props.selectedCourse}/>
      <Separator/>

       
         <TopTitleBar title={title}/>
       */}

      <StudentsContentDiv selectedCourse={props.selectedCourse} userData={props.userData} rerender={props.rerender} />
    </div>
  );
};

export default Subject;
