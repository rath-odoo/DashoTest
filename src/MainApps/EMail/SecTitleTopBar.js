import React from "react";

import classes from "./SecTitleTopBar.module.css";

import { FaSearch } from "react-icons/fa";
// import { SlArrowLeft } from "react-icons/sl";
// import { SlArrowRight } from "react-icons/sl";

import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsGear } from "react-icons/bs";





const SecTitleTopBar = (props) => {
  return (
    <div className={classes.searchHeader}>
      <div className={classes.secTitleTopBar}>
        <div className={classes.sectionTitle}>
          <span> {props.title} </span>

          <div className={classes.searchDiv}>
            <FaSearch className={classes.searchIcon} />

            <div className={classes.searchBox}>
              <input
                type="text"
                id="fname"
                name="fname"
                placeholder="Search.."
              />
            </div>
          </div>
        </div>

        <div className={classes.rightIcon}>

        <div className={classes.navEmail}>
          <div className={classes.nuOfEmail}>1-50 of 999</div>
          <div className={classes.arrowBack}>
            <BsChevronLeft />
          </div>
          <div className={classes.arrowNext}>
            <BsChevronRight />
          </div>
        </div>

        <div className={classes.settingIcon}> <BsGear/> </div>

        </div>

       
      </div>

      {/* <div className={classes.ctgy}>

<div className={classes.all}>
  <div>All</div>
</div>

<div className={classes.all}>
  <div>Personal</div>
</div>

<div className={classes.all}>
  <div>Transaction</div>
</div>

<div className={classes.all}>
  <div>OTP</div>
</div>

<div className={classes.all}>
  <div>OTHER</div>
</div>

<div className={classes.navEmail}>
    <div className={classes.nuOfEmail}>1-50 of 999</div>
    <div className={classes.arrowBack}><FaSearch/></div>
    <div className={classes.arrowNext}><FaSearch/></div>
</div>

</div> */}
    </div>
  );
};

export default SecTitleTopBar;
