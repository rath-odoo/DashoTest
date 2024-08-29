import React, { useState, useEffect, useRef } from "react";
import classes from "../../CommonAppUtilities/MainAppContainer.module.css";
import TopInfoBarSettings from "./TopInfoBarSettings";
import TopTitleBar from "../Common/TopTitleBar";

import PaymentDesign from "./PaymentPage";

import classes2 from "./PaymentPage.module.css";

const Billing = (props) => {
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

  let title = "Billing";
  let mainAppContainerStyle = {
    left: sideNavBarWidth,
    width: mainAppContainerWidth,
  };

  return (
    <div className={classes.mainAppContainer} style={mainAppContainerStyle}>
      <TopTitleBar title={title} userData={props.userData} />

      <div className={classes2.Scrollview}>
        <PaymentDesign />
      </div>
    </div>
  );
};

export default Billing;
