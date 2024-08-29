import React, { useState, useEffect, useRef } from "react";
import classes from "../CommonAppUtilities/MainAppContainer.module.css";
//import TopInfoBarEMail from './TopInfoBarEMail';
import TopInfoBarGeneral from "../Dashboard/General/TopInfoBarGeneral";
//import TopTitleBar from '../../CommonAppUtilities/TopTitleBar';
import Separator from "../CommonAppUtilities/Separator";

import InstituteContentDiv from "./InstituteContentDiv"
import base from "../CommonAppUtilities/AppContentDiv.module.css";


const Utility = (props) => {
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

    return () => { };
  }, [props.sideNavBarWidth]);

  useEffect(() => {
    isMounted.current = true;
    props.passMountInfo(true);
    return () => {
      isMounted.current = false;
      props.passMountInfo(false);
    };
  }, [props]);

  //let title="Email"
  let mainAppContainerStyle = {
    left: sideNavBarWidth,
    width: mainAppContainerWidth,
    borderTopStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: "1px",
  };
  const infoBarActiveButtonColor = {
    color: "white",
    backgroundColor: "#919191",
  };




  console.log("Institute.js .....");


  return (
    <div className={classes.mainAppContainer} style={mainAppContainerStyle}>

      <div className={base.appContentDiv}>

        <InstituteContentDiv userData={props.userData} rerender={props.rerender} />

      </div>

    </div>
  );
};

export default Utility;
